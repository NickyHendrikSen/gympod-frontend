<template>
  <div class="Detail">
    <NavBar v-bind:user="user"/>
    <div class="DetailContent">
        <div class="PodName">
            {{this.detail.pod_name == undefined ? "Loading.." : this.detail.pod_name}}
        </div>
        <hr />
        <div class="BookName">
            Booked By {{this.detail.user_name == undefined ? "Loading.." : this.detail.user_name}}
            ({{this.detail.phone == undefined ? "Loading.." : this.detail.phone}})
        </div>
        <div class="Price">
            Total Price : ${{this.detail.price == undefined ? "Loading.." : this.detail.price}}
        </div>
        <div class="Date">
            Scheduled at {{this.detail.booking_start == undefined ? "Loading.." : this.detail.booking_start}} -
            {{this.detail.booking_end == undefined ? "Loading.." : this.detail.booking_end}}
        </div>
        <div :class="'Status' + ' Status' + this.detail.status">
            Status : {{this.detail.status}}
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
      detail:{},
      user: []
    //   booking_id: 0,
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

    this.getDetail();
  },
  methods:{
      getDetail(){
        var id = localStorage.getItem("booking_id");
        var token = localStorage.getItem("access_token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://localhost:8000/api/getBookingDetail/' + id, config).then((res) =>{
            this.detail = res.data
            console.log(res.data)
        }).catch(() => {
            // this.$router.push({name: 'Login'})
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./Detail.scss";
</style>