<template>
<div id="register">
  <v-col id="res">
    <h1 style="margin-bottom: 30px">申请账号</h1>
    <v-text-field
      label="账号"
      prepend-icon="mdi-account-circle"
      v-model="username"
      :rules="[ruleu.required, ruleu.min,ruleu.max]"
    ></v-text-field>
    <v-text-field
      label="密码"
      prepend-icon="mdi-account-key"
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min,rules.max]"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-text-field
      label="重复密码"
      prepend-icon="mdi-account-key"
      v-model="repassword"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min,rules.max]"
      :type="show2 ? 'text' : 'password'"
      @click:append="show2 = !show2"
    ></v-text-field>
    <v-text-field
      label="昵称"
      prepend-icon="mdi-account-convert"
      v-model="nickname"
      :rules="[rulen.required, rulen.max]"
    ></v-text-field>
    <v-btn
      elevation="2"
      medium
      outlined
      color="indigo"
      style="margin-top: 20px"
      @click="register(username,password,repassword,nickname)"
    >注册</v-btn>
  </v-col>
  <v-dialog v-model="dialog" width="300">
    <v-card>
      <v-card-title class="headline grey lighten-2">
         注册成功！
      </v-card-title>

      <v-card-text>
        <h3>恭喜您，注册成功，是否现在就用这个账号登录呢?</h3>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="toLogin(username,password)"
        >
          {{content}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="dialog = false"
        >
        关闭
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import qs from 'qs'
export default {
  name: "register",
  data(){
    return {
      content: ' 现在就登录',
      seconds: 3,
      dialog: false,
      username : '',
      password : '',
      repassword: '',
      nickname : '',
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || '不能为空',
        min: v => v.length >= 8 || '最小8字符',
        max: v => v.length <= 16 || '最大16字符',
      },
      ruleu: {
        required: value => !!value || '不能为空',
        min: v => v.length >= 5 || '最小5字符',
        max: v => v.length <= 8 || '最大8字符',
      },
      rulen: {
        required: value => !!value || '不能为空',
        max: v => v.length <= 10 || '最大10字符'
      }
    }
  },
  methods: {
    register(username,password,repassword,nickname){
      if (username == '' || username.length > 8 || username.length <5){
        this.$message.error('账号的长度为5-8');
      }else {
        if(password == '' || password.length > 16 || password.length < 8){
          this.$message.error('密码的长度为8-16');
        }else {
          if (repassword != password){
            this.$message.error('两次输入密码需要一致');
          }else{
            if (nickname == '' || nickname.length > 10){
              this.$message.error('请重新输入昵称');
            }else {
              this.$http({
                method: 'post',
                url: 'http://211.87.232.198:8081/search-engine/user/register',
                data: qs.stringify({
                  username: username,
                  password: password,
                  nickname: nickname
                })
              })
                .then(res => {
                  if (JSON.stringify(res.data).length>19){
                    this.dialog = true
                  }else{
                    this.$message.error(res.data);
                  }
                })
            }
          }
        }
      }
    },
    toLogin(username,password){
      this.content = this.seconds+'s后跳转界面'
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/user/login',
        data: qs.stringify({
          username: username,
          password: password
        })
      })
          .then(res => {
            window.localStorage.setItem('user',JSON.stringify(res.data.user))
            console.log(window.localStorage.getItem('user'))
            setTimeout(()=>{
              this.$router.push({
                name:"index"
              });
              this.$router.go(0)
              //延迟时间
            },3000+1000*Math.random())
            this.$message.success("即将跳转，请不要进行其他操作");
            let clock = window.setInterval(() =>{
              this.seconds--
              this.content = this.seconds+'s后跳转界面'
            },1000)
          })
    }
  }
}
</script>

<style scoped>
#res{
  text-align: center;
  width: 400px;
  height: 450px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
#register{
  background: url("../assets/img/index2.jpeg") no-repeat;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
</style>
