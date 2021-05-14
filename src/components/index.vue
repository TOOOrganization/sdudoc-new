<template>
  <div id="background">
    <yx-menu></yx-menu>
    <yx-login id="login" v-if="iflogin"></yx-login>
    <yx-search id="search" v-if="$store.state.menu_text=='index'&&$store.state.user != null"></yx-search>
    <yx-navigation v-if="$store.state.menu_text=='user'&&$store.state.user != null"></yx-navigation>
    <yx-user v-if="$store.state.menu_text=='user'&&$store.state.list_title=='账号信息'&&$store.state.user != null"></yx-user>
    <yx-keyword v-if="$store.state.menu_text=='user'&&$store.state.list_title=='修改密码'&&$store.state.user != null"></yx-keyword>
    <yx-surplus v-if="$store.state.menu_text=='user'&&$store.state.list_title=='余额'&&$store.state.user != null"></yx-surplus>
  </div>

</template>

<script>

import store from '../store/index'
export default {
  name: "index",
  data(){
    return{
      iflogin: false
    }
  },
  mounted() {
    if (store.state.user == null){
      this.iflogin = true
    }
  }
}
</script>

<style scoped>
#background {
  background: url("../assets/img/index1.jpeg") no-repeat;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
#search {
  margin-top: 170px;
  margin-left: 440px;
}
#login{
  margin-left: 550px;
  margin-top: 200px;
}
</style>
