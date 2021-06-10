<template>
  <q-page class="flex flex-center">

    <q-card flat class="absolute-full">
      <q-layout view="lhh LpR lff" container class="bg-grey-1">
        <q-page-container>
          <q-page class="q-pa-none q-py-sm flex flex-center">

            <q-input filled v-model="date" fill-input label="日期" class="passenger-card q-mt-md q-ml-sm"
                     :rules="[ val => /^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/g.test(val) || '请输入正确的日期，例如：2020-10-01']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" minimal mask="YYYY-MM-DD" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-btn outline color="grey-4" class="passenger-card q-my-sm q-pa-sm bg-white border text-black"
                   @click="method = 0; onSubmit();">
              <div class="text-black">
                <q-icon name="add" style="margin-top: -2px"></q-icon>
                添加当天所有车次
              </div>
            </q-btn>

            <q-btn outline color="grey-4" class="passenger-card q-my-sm q-pa-sm bg-white border text-black"
                   @click="method = 1; onSubmit();">
              <div class="text-black">
                <q-icon name="delete" style="margin-top: -2px"></q-icon>
                删除当天所有车次
              </div>
            </q-btn>

          </q-page>

        </q-page-container>
      </q-layout>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "Administrator",
  data () {
    return {
      date: null,
      method: 0
    }
  },
  methods: {
    onSubmit () {
      axios({
        // 默认请求方式为get
        method: 'get',
        url: ['/ticket/add-seat', '/ticket/del-seat'][this.method],
        // 传递参数
        params: {
          date: this.date
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
        switch (res.status){
          case 200:
            this.$q.notify({
              color : 'white',
              textColor : 'black',
              message : ['添加成功！', '删除成功！'][this.method],
              icon: ['add', 'delete'][this.method],
              position : 'top'
            });
            break;
          default:
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '系统错误，请稍后尝试。',
              icon: 'warning',
              position : 'top'
            });
        }
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
    }
  }
}
</script>

<style scoped>
.passenger-card{
  width: 100%;
  max-width: 1024px;
}
</style>
