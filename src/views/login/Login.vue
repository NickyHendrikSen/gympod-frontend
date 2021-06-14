<template>
  <div class="Login">
    <div class="LoginHeader">
      <div class="HeaderTitle">Gym Pod</div>
    </div>
    <div class="LoginContent">
      <div class="LoginContentWrapper">
        <div class="LoginTitle">Login</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./Login.scss";
</style>