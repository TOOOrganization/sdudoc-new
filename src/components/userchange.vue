<template>
  <v-card max-width="38%" style="margin-left: 10%">
    <v-card-text>
      <strong style="font-size: 20px">修改密码</strong>

      <v-divider></v-divider>
      <v-divider style="margin-bottom: 4%"></v-divider>

      <v-text-field
        label="这里输入新密码"
        v-model="password"
        style="margin-top: 4%"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
      ></v-text-field>

      <v-text-field
        label="确认新密码"
        v-model="confirmPassword"
        style="margin-top: 4%"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"></v-text-field>

      <v-btn color="primary" @click="changePassword">
        确认
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import qs from "qs";
import store from "../store";

export default {
  name: "userchange",
  data(){
    return{
      show: false,
      show1: false,
      username: store.state.JSON_user.username,
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    changePassword(){
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/user/set_password',
        data: qs.stringify({
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
      })
        .then(res => {
          switch (res.data){
            case "密码重复":
              this.$message.error('密码重复');
              break
            case "两次输入密码不同":
              this.$message.error('两次输入密码不同');
              break
            default:
              this.$message.success('更改成功');
              break
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
