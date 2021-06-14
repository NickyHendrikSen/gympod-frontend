<template>
  <div class="NavBar">
    <router-link class="NavBarTitle" to="/">Gym Pod</router-link>
    <div class="NavBarRight">
        <div class="NavBarGreet">Hello, {{this.user.user_name == undefined ? "Loading..." : this.user.user_name}}</div>
        <div class="BtnLogout">
          <md-button v-on:click="logOut">Log Out</md-button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'NavBar',
  props: {
    user: []
  },
  data: () => ({
    //   user: this.user
  }),
  mounted(){
  },
  methods:{
    logOut(){
      axios.post('http://localhost:8000/api/logout', {id: this.user.id}).then(()=>{
        localStorage.removeItem("access_token")
        this.$router.push("Login")
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./NavBar.scss";
</style>