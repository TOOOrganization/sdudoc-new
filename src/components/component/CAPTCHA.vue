<template>
  <div class="form-group" style="display: flex;">
    <div class="login-code" @click="refreshCode">
      <!--验证码组件-->
      <Identify :identifyCode="identifyCode"></Identify>
    </div>
  </div>
</template>

<script>
import Identify  from '../component/indentify'
import store from '../../store/index'
export default {
  name: "CAPTCHA",
  components: {Identify},
  mounted(){
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  },
  created() {
    this.identifyCode = '';
    this.makeCode(this.identifyCode,4)
  },
  data(){
    return{
      identifyCodes: "1234567890",
      identifyCode: '',
      code: '',//text框输入的验证码
    }
  },
  methods:{
    //验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          ];
      }
      store.state.identifyCode = this.identifyCode
    },
  }
}
</script>

<style scoped>

.login-code{
  cursor: pointer;
}
</style>
