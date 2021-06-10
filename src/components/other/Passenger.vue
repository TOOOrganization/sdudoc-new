<template>
  <q-page class="flex flex-center">

    <q-dialog v-model="show_dialog">
      <q-card class="my-card">
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset">

            <q-input filled v-model="name" clearable fill-input label="乘客姓名" type="text"
                     :rules="[ val => val !== null && val.length > 0 || '请输入乘客姓名']"/>

            <q-input filled v-model="identity" clearable fill-input label="乘客身份证号" type="text"
                     :rules="[ val => /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/g.test(val) || '请输入正确的身份证号']"/>

            <q-select filled v-model="sex" label="乘客性别" :options="sex_opts"
                      :rules="[ val => val !== null && val.length > 0 || '请选择乘客性别']" type="text"
                      @filter="filterFn" @filter-abort="abortFilterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select filled v-model="type" label="乘客类型" :options="type_opts"
                      :rules="[ val => val !== null && val.length > 0 || '请选择乘客类型']" type="text"
                      @filter="filterFn" @filter-abort="abortFilterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-btn color="primary" type="submit" class="full-width" :label="index < 0 ? '添加乘客' : '修改乘客'" size="lg"/>

          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="white" text-color="black" />
          <span class="q-ml-sm">这是一个不可逆操作，请问您确认删除乘客【{{ index < 0 ? '' : data[index].name }}】么？</span>
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

            <q-btn outline color="grey-4" class="passenger-card q-my-sm q-pa-sm bg-white border text-black"
                   @click="index = -1;show_dialog = true;onReset();">
              <div class="text-black">
                <q-icon name="add" style="margin-top: -2px"></q-icon>
                添加乘客
              </div>
            </q-btn>

            <q-card flat bordered class="passenger-card q-my-sm" v-for="p_data in data" :key="p_data.pid">
              <div class="row q-pa-none">
                <q-item class="q-pa-md">{{ p_data.name }}</q-item>
                <q-item class="q-pa-md">{{ sex_opts[p_data.sex] }}</q-item>
                <q-item class="q-pa-md">{{ type_opts[p_data.gid] }}</q-item>
                <q-space></q-space>
                <q-btn flat dense icon="build" label="修改乘客" class="q-my-auto q-mr-md"
                       @click="index = data.indexOf(p_data);show_dialog = true;
                               pid = p_data.pid;
                               name = p_data.name;
                               identity = p_data.identity;
                               sex = sex_opts[p_data.sex];
                               type = type_opts[p_data.gid];"/>
                <q-btn flat dense icon="delete" label="删除乘客" class="q-my-auto q-mr-md text-red-4"
                       @click="index = data.indexOf(p_data);confirm = true;pid = p_data.pid;"/>
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
  name: "Passenger",
  data () {
    return {
      pid: 0,
      name: null,
      identity: null,
      sex: null,
      type:null,

      sex_opts: ["男", "女"],
      type_opts: ["成人", "学生", "儿童"],

      data: [],

      index: -1,
      show_dialog: false,
      confirm: false,
    }
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    onSubmit () {
      axios({
        // 默认请求方式为get
        method: 'get',
        url: this.pid > 0 ? '/passenger/modify' : '/passenger/add',
        // 传递参数
        params: {
          pid: this.pid,
          name: this.name,
          identity: this.identity,
          sex: this.sex_opts.indexOf(this.sex),
          gid: this.type_opts.indexOf(this.type)
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
              message : this.pid > 0 ? '修改成功！': '添加成功！',
              icon: this.pid > 0 ? 'build' : 'add',
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
    onRefresh(){
      axios({
        // 默认请求方式为get
        method: 'get',
        url: '/passenger/get',
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
            this.show_dialog = false;
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
        url: '/passenger/del',
        // 传递参数
        params: {
          pid: this.pid
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
      this.pid = 0;
      this.name = null;
      this.identity = null;
      this.sex = null;
      this.type = null;
    },
    filterFn (val, update, abort) {
      update(() => {

      }, ref => {
        if (val !== '' && ref.options.length > 0 && ref.optionIndex === -1) {
          ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
          ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
        }
      });
    },
    abortFilterFn () {
      // console.log('delayed filter aborted')
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
