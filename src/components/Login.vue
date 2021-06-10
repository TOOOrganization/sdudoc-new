<template>
  <div
    id="Login"
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
        prepend-icon="mdi-qrcode-edit" v-model="codeif" counter="4"
      ></v-text-field>
      <yx-identify
        style="margin-left:255px;margin-top: 20px;margin-bottom: 20px"
      ></yx-identify>
      <v-row style="margin-left: 200px">
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
          @click="check(username,password,codeif)"
        >
          登录
        </v-btn>
      </v-row>

    </v-col>
  </div>
</template>

<script>
import qs from 'qs'
import store from "../store/index";
// import Identify from "./component/CAPTCHA";
export default {
  name: "login",
  // components: {Identify},
  data(){
    return{
      codeif: '',
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
      // identifyCodes: "1234567890",
      // identifyCode: '',
      // code: '',//text框输入的验证码
    }
  },
  // mounted() {
  //   this.identifyCode = '';
  //   this.makeCode(this.identifyCodes, 4);
  // },
  // created() {
  //   this.identifyCode = '';
  //   this.makeCode(this.identifyCode,4)
  // },
  methods: {
    check(username,password,codeif){
      if (username == ''){
        this.$message.error('请输入账号');
      }else {
        if (password == ''){
          this.$message.error('请输入密码');
        }else {
          if (codeif == ''){
            this.$message.error('请输入验证码');
          }else {
            if (codeif != store.state.identifyCode){
              this.$message.error('验证码错误，请重新输入或者点击二维码刷新');
            }else {
              this.$http({
                method: 'post',
                url: 'http://211.87.232.198:8081/search-engine/user/login',
                data: qs.stringify({
                  username: username,
                  password: password
                })
              })
                .then(res => {
                  if (JSON.stringify(res.data).length > 29){
                    window.localStorage.setItem('user',JSON.stringify(res.data.user))
                    console.log(window.localStorage.getItem('user'))
                    this.$router.replace('/')
                    window.sessionStorage.setItem('list','search')
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
    },
    // //验证码
    // randomNum(min, max) {
    //   return Math.floor(Math.random() * (max - min) + min);
    // },
    //
    // refreshCode() {
    //   this.identifyCode = "";
    //   this.makeCode(this.identifyCodes, 4);
    // },
    // makeCode(o, l) {
    //   for (let i = 0; i < l; i++) {
    //     this.identifyCode += this.identifyCodes[
    //       this.randomNum(0, this.identifyCodes.length)
    //       ];
    //   }
    //   store.state.identifyCode = this.identifyCode
    // },
  }
}
</script>

<style scoped>
#lo{
  text-align: center;
  width: 400px;
  height: 450px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
#Login{
  background: url("../assets/img/index2.jpeg") no-repeat;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
/*.login-code{*/
/*  cursor: pointer;*/
/*}*/
</style>
