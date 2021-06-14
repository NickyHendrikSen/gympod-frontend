<template>
  <div class="Dashboard">
    <NavBar v-bind:user="user"/>
    <div class="DashboardContent">
        <div class="DashboardContentFilterWrapper">
            <div class="DashboardFilters">
                <md-field class="FilterField">
                    <label for="pod">Pod's Name</label>
                    <md-select v-model="pod_chosen" name="pod" id="pod">
                        <md-option v-for="pod in pods" :key="pod.id" :value="pod.id">{{pod.pod_name}}</md-option>
                    </md-select>
                </md-field>
                <md-field class="FilterField">
                    <label for="status">Status</label>
                    <md-select v-model="status_chosen" name="status" id="status">
                        <md-option v-for="s in status" :key="s.id" :value="s.id">{{s.status_name}}</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="DashboardFilters">
                <md-datepicker v-model="start_date">
                    <label>Start date</label>
                </md-datepicker>
                <md-datepicker v-model="end_date">
                    <label>End date</label>
                </md-datepicker>
            </div>
          <md-button class="FilterSearchBtn" v-on:click="search">Search</md-button>
        </div>

        <div class="ListBookings">
            <md-table>
                <md-table-row>
                    <md-table-head md-numeric>Pod Name</md-table-head>
                    <md-table-head>User Name</md-table-head>
                    <md-table-head>Phone</md-table-head>
                    <md-table-head>Status</md-table-head>
                    <md-table-head>Price</md-table-head>
                    <md-table-head>Booking Date</md-table-head>
                    <md-table-head>Booking Time</md-table-head>
                </md-table-row>

                <md-table-row v-for="booking in bookings.data" :key="booking.id" v-on:click="openDetail(booking.id)">
                    <md-table-cell>{{booking.pod_name}}</md-table-cell>
                    <md-table-cell>{{booking.user_name}}</md-table-cell>
                    <md-table-cell>{{booking.phone}}</md-table-cell>
                    <md-table-cell>{{booking.status}}</md-table-cell>
                    <md-table-cell>${{booking.price}}</md-table-cell>
                    <md-table-cell>{{new Date(booking.booking_start).getDate().toString().padStart(2, '0') + "-" + 
                            (new Date(booking.booking_start).getMonth() + 1).toString().padStart(2, '0') + "-" + 
                            new Date(booking.booking_start).getFullYear()}}</md-table-cell>
                    <md-table-cell>{{new Date(booking.booking_start).getHours().toString().padStart(2, '0') + ":" + 
                            new Date(booking.booking_start).getMinutes().toString().padStart(2, '0') + ":" + 
                            new Date(booking.booking_start).getSeconds().toString().padStart(2, '0') + " - " +
                            new Date(booking.booking_end).getHours().toString().padStart(2, '0') + ":" + 
                            new Date(booking.booking_end).getMinutes().toString().padStart(2, '0') + ":" + 
                            new Date(booking.booking_end).getSeconds().toString().padStart(2, '0') }}</md-table-cell>
                </md-table-row>
            </md-table>
            <div class="Pagination">
                Page
                <div class="Pages">
                    <input v-model="currentPage" type="number" class="InputPage" v-on:keyup.enter="changePage"/>
                    Of
                    {{this.bookings.last_page}}
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import NavBar from "@/components/navBar/NavBar.vue"


export default {
  name: 'Dashboard',
  components:{
      NavBar,
  },
  data: () => ({
      user: [],
      pods: [],
      status: [],
      bookings: [],
      pod_chosen: null,
      status_chosen: null,
      start_date: null,
      end_date: null,
      currentPage: 1,
  }),
  mounted: function(){
    var token = localStorage.getItem("access_token")
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get('http://localhost:8000/api/user', config).then((res) =>{
        this.user = res.data
    }).catch(() => {
        this.$router.push({name: 'Login'})
    })

    this.getPods();
    this.getStatus();
    this.getBookings();
  },
  methods:{
      getPods(){
        var token = localStorage.getItem("access_token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://localhost:8000/api/getPods', config).then((res) =>{
            this.pods = res.data
        }).catch(() => {
            // this.$router.push({name: 'Login'})
        })
      },
    getStatus(){
        var token = localStorage.getItem("access_token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://localhost:8000/api/getStatus', config).then((res) =>{
            this.status = res.data
        }).catch(() => {
            // this.$router.push({name: 'Login'})
        })
      },
    getBookings(){
        var token = localStorage.getItem("access_token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var filters = "&pod_id=" + (this.pod_chosen == null ? "" : this.pod_chosen) + "&status_id=" + (this.status_chosen == null ? "" : this.status_chosen) + 
                    "&start_date=" + (this.start_date == null ? "" : 
                            new Date(this.start_date).getFullYear()) + "-" + 
                            (new Date(this.start_date).getMonth() + 1).toString().padStart(2, '0') + "-" + 
                            new Date(this.start_date).getDate().toString().padStart(2, '0') + 
                    "&end_date=" + (this.end_date == null ? "" : 
                            new Date(this.end_date).getFullYear() + "-" +
                            (new Date(this.end_date).getMonth() + 1).toString().padStart(2, '0') + "-" + 
                            new Date(this.end_date).getDate().toString().padStart(2, '0'));
        // console.log('http://localhost:8000/api/getBookings?page=' + this.currentPage + filters)  
        axios.get('http://localhost:8000/api/getBookings?page=' + this.currentPage + filters, config).then((res) =>{
            this.bookings = res.data
            // console.log(res.data)
        }).catch(() => {
            // this.$router.push({name: 'Login'})
        })
      },
    search(){
        this.currentPage = 1;
        this.bookings = [];
        this.getBookings();
    },
    changePage(){
        var curr = parseInt(this.currentPage)
        if(isNaN(curr)){
            curr = 1
            this.currentPage = curr
        }
        this.bookings = [];
        this.getBookings();
    },
    openDetail(id){
        localStorage.setItem("booking_id", id)
        this.$router.push({name: 'Detail', booking_id: id})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./Dashboard.scss";
</style>