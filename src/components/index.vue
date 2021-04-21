<template>
  <div id="background">
    <yx-menu></yx-menu>
    <yx-search id="search" v-if="$store.state.menu_text=='index'"></yx-search>
    <yx-navigation v-if="$store.state.menu_text=='user'"></yx-navigation>
    <yx-user v-if="$store.state.menu_text=='user'&&$store.state.list_title=='账号信息'"></yx-user>
    <yx-keyword v-if="$store.state.menu_text=='user'&&$store.state.list_title=='修改密码'"></yx-keyword>
    <yx-surplus v-if="$store.state.menu_text=='user'&&$store.state.list_title=='余额'"></yx-surplus>
  </div>

</template>

<script>


export default {
  name: "index"
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

</style>
