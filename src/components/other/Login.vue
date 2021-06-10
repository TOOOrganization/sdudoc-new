<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="">

          <q-input v-model="username" clearable filled fill-input label="用户名"
                   :rules="[ val => val !== null && val.length > 0 || '请输入用户名']">
          </q-input>

          <q-input v-model="password" clearable filled :type="isPwd ? 'password' : 'text'" fill-input label="密码"
                   :rules="[ val => val !== null && val.length > 0 || '请输入密码']">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-btn color="primary" type="submit" class="full-width q-mt-md" label="登录" size="lg"/>

        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import Cookie from "js-cookie";

export default {
  name: "Login",
  data () {
    return {
      username: null,
      password: null,
      isPwd: true
    }
  },
  methods: {
    onSubmit() {
      axios({
        // 默认请求方式为get
        method: 'get',
        url: '/login/pwd',
        // 传递参数
        params: {
          username: this.username,
          password: this.password
        },
        // 设置请求头信息
        headers: {
          'content-type': "application/json"
        },
        responseType: 'json'
      }).then(response => {
        // 请求成功
        let res = response.data;
        console.log(res)
        let opts = {
          color : 'white',
          textColor : 'red-5',
          message : '',
          icon: 'warning',
          position : 'top'
        }
        switch (res.status){
          case 200:
            opts.message = '登录成功，正在跳转！';
            opts.icon = 'cloud_done';
            opts.textColor = 'green-4';
            Cookie.set('token', res.token, { expires: 7 })
            this.$router.go(-1)
            break;
          case 500: opts.message = '登陆失败，用户名不存在。'; break;
          case 501: opts.message = '登陆失败，用户名或密码错误。'; break;
          default: opts.message = '系统错误，请稍后尝试。';
        }
        this.$q.notify(opts)
      }).catch(error => {
        // 请求失败，
        console.log(error);
        this.$q.notify({
          color : 'white',
          textColor : 'red-5',
          message : '系统错误，请稍后尝试。',
          icon: 'warning',
          position : 'top'
        });
      });
    },
    onReset () {
      this.username = null;
      this.password = null;
      this.isPwd = true;
    }
  }
}
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-top: -100px;
}
</style>
