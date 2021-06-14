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
                    <label>Select date</label>
                </md-datepicker>
                <md-datepicker v-model="end_date">
                    <label>Select date</label>
                </md-datepicker>
            </div>
          <md-button class="FilterSearchBtn">Search</md-button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import NavBar from "@/components/navBar/NavBar.vue"

var token = localStorage.getItem("access_token")
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

export default {
  name: 'Dashboard',
  components:{
      NavBar,
  },
  data: () => ({
      user: [],
      pods: [],
      status: [],
      pod_chosen: null,
      status_chosen: null,
      start_date: null,
      end_date: null
  }),
  mounted: function(){
    axios.get('http://localhost:8000/api/user', config).then((res) =>{
        this.user = res.data
    }).catch(() => {
        this.$router.push({name: 'Login'})
    })

    this.getPods();
    this.getStatus();
  },
  methods:{
      getPods(){
        axios.get('http://localhost:8000/api/getPods', config).then((res) =>{
            this.pods = res.data
        }).catch(() => {
            // this.$router.push({name: 'Login'})
        })
      },
      getStatus(){
        axios.get('http://localhost:8000/api/getStatus', config).then((res) =>{
            this.status = res.data
        }).catch(() => {
            // this.$router.push({name: 'Login'})
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./Dashboard.scss";
</style>