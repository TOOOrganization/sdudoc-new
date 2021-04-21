<template>
<div id="login">
  <v-col>
    <v-text-field
      label="账号"
      prepend-icon="mdi-account-circle"
      style="width: 300px;margin-left: 100px"
    ></v-text-field>
    <v-text-field
      label="密码"
      prepend-icon="mdi-account-key"
      style="width: 300px;margin-left: 100px"
    ></v-text-field>
    <yx-identify style="margin-left: 105px;margin-bottom: 20px"></yx-identify>
    <v-btn
      elevation="2"
      medium
      outlined
      color="indigo"
    >登录</v-btn>
  </v-col>
</div>
</template>

<script>
export default {
  name: "login"
}
</script>

<style scoped>
#login{
  width: 500px;
  border-top:1px solid #000;
  border-left:1px solid #000;
  border-right:1px solid #000;
  border-bottom:1px solid #000
}
</style>
