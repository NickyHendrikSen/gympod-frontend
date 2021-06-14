<template>
  <div class="Login">
    <div class="LoginHeader">
      <div class="HeaderTitle">Gym Pod</div>
    </div>
    <div class="LoginContent">
      <div class="LoginContentWrapper">
        <div class="LoginTitle">Login</div>
        <form v-on:submit.prevent="onSubmit">
          <md-field>
            <label>Username</label>
            <md-input v-model="user_name"></md-input>
          </md-field>
          <md-field :md-toggle-password="false">
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
          <md-button type="submit">Login</md-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
  
export default {
  name: 'Login',
  data: () => ({
    user_name: "",
    password: "",
  }),
  methods:{
    onSubmit(){
      axios.post('http://localhost:8000/api/login', {'user_name': this.user_name, 'password': this.password}).then((res)=>{
        localStorage.setItem("access_token", res.data.access_token)
        console.log(res.data.access_token)
        this.$router.push({name: 'Dashboard'})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./Login.scss";
</style>