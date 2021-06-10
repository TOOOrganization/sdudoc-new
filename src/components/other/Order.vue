<template>
  <q-page class="flex flex-center">

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="white" text-color="black" />
          <span class="q-ml-sm">这是一个不可逆操作，请问您确认退票【{{ index < 0 ? '' : data[index].oid }}】么？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="确定" color="primary" v-close-popup @click="onDelete"/>
          <q-btn flat label="取消" color="red-4" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-card flat class="absolute-full">
      <q-layout view="lhh LpR lff" container class="bg-grey-1">
        <q-page-container>
          <q-page class="q-pa-none q-py-sm flex flex-center">

            <q-card flat bordered class="passenger-card q-my-sm" v-for="o_data in data" :key="o_data.oid">
              <div class="row q-pa-none">
                <q-item class="q-pa-md">订单#{{ o_data.oid }}</q-item>
                <q-item class="q-pa-md">订单时间：{{ o_data.time }}</q-item>
                <q-item class="q-pa-md">总价格：{{ o_data.price }}</q-item>
                <q-space></q-space>
                <q-btn flat dense icon="delete" label="退票" class="q-my-auto q-mr-md text-red-4"
                       @click="index = data.indexOf(o_data);confirm = true;oid = o_data.oid;"/>
              </div>
              <q-separator/>
              <div class="row q-pa-none">
                <q-item class="q-pa-md">车票#{{ o_data.ticket_id }}</q-item>
                <q-item class="q-pa-md">{{ o_data.journey }}</q-item>
                <q-item class="q-pa-md">车次：{{ o_data.tid }}</q-item>
                <q-item class="q-pa-md">{{ o_data.seat_type }}</q-item>
                <q-item class="q-pa-md">{{ o_data.seat_number }}</q-item>
                <q-space></q-space>
                <q-btn flat dense icon="build" label="改签" class="q-my-auto q-mr-md"/>
              </div>
              <div class="row q-pa-none">
                <q-item class="q-pa-md">出发日期：{{ o_data.date }}</q-item>
                <q-item class="q-pa-md">{{ o_data.schedule[0] }}开</q-item>
                <q-item class="q-pa-md">{{ o_data.schedule[1] }}到</q-item>
                <q-item class="q-pa-md">乘客姓名：{{ o_data.passenger }}</q-item>
                <q-item class="q-pa-md">身份证号：{{ o_data.identity }}</q-item>
              </div>
            </q-card>

          </q-page>

          <q-page-scroller position="bottom">
            <q-btn fab icon="keyboard_arrow_up" color="red" />
          </q-page-scroller>

        </q-page-container>
      </q-layout>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "Order",
  data () {
    return {
      data: [],

      oid : -1,
      index: -1,
      confirm: false,
    }
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    onRefresh(){
      axios({
        // 默认请求方式为get
        method: 'get',
        url: '/ticket/get',
        // 传递参数
        params: {},
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
            this.data = res.data;
            this.index = -1;
            break;
          case 500:
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '登录失效，请先登录。',
              icon: 'warning',
              position : 'top'
            });
            this.$router.push('/login')
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
    },
    onDelete () {
      axios({
        // 默认请求方式为get
        method: 'get',
        url: '/ticket/del',
        // 传递参数
        params: {
          oid: this.oid
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
              message : '删除成功！',
              icon: 'delete',
              position : 'top'
            });
            this.onRefresh();
            break;
          case 500:
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '登录失效，请先登录。',
              icon: 'warning',
              position : 'top'
            });
            this.$router.push('/login')
            break;
          case 501:
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '非法用户，您没有权限删除该乘客！',
              icon: 'delete',
              position : 'top'
            });
            this.onRefresh();
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
    },
    onReset () {

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
.passenger-card{
  width: 100%;
  max-width: 1024px;
}
</style>
