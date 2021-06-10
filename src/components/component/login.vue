<template>
<div
  id="login"
>
  <v-col
    id="lo"
  >
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
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min,rules.max]"
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
    ></v-text-field>
    <v-text-field
      label="请输入验证码"
      prepend-icon="mdi-qrcode-edit" v-model="code" counter="4"
    ></v-text-field>
    <yx-identify
      style="margin-left:255px;margin-top: 20px;margin-bottom: 20px"
    ></yx-identify>
    <v-row
      style="margin-left: 200px"
    >
      <v-btn
        text
        color="error"
        @click="toRegister"
      >
        注册
      </v-btn>
      <v-btn
        elevation="2"
        medium
        outlined
        color="indigo"
        @click="check(username,password,code)"
      >登录</v-btn>
    </v-row>

  </v-col>
</div>
</template>

<script>
import qs from 'qs'
import store from '../../store/index'
export default {
  inject: ['reload'],
  name: "login",
  data(){
    return{
      code: '',
      username: '',
      password: '',
      show: false,
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
    }
  },
  methods: {
    check(username,password,code){
      if (username == ''){
        this.$message.error('请输入账号');
      }else {
        if (password == ''){
          this.$message.error('请输入密码');
        }else {
          if (code == ''){
            this.$message.error('请输入验证码');
          }else {
            if (code != store.state.identifyCode){
              this.$message.error('验证码错误，请重新输入或者点击二维码刷新');
            }else {
              this.$http({
                method: 'post',
                url: '/api/search-engine/user/login',
                data: qs.stringify({
                  username: username,
                  password: password
                })
              })
                .then(res => {
                  if (JSON.stringify(res.data).length > 29){
                    window.localStorage.setItem('user',JSON.stringify(res.data.user))
                    console.log(window.localStorage.getItem('user'))
                    this.$router.go(0)
                  }else {
                    this.$message.error(res.data);
                  }
                })
            }
          }
        }
      }
    },
    toRegister(){
      this.$router.replace('/register')
    }
  }
}
</script>

<style scoped>
#lo{
  background: aliceblue;
  text-align: center;
  width: 400px;
  height: 350px;
  position: absolute;
}

</style>
