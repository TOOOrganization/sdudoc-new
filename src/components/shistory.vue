<template>
  <div id="shistory">
    <v-row  style="width:80%;margin-left: auto">
      <v-radio-group
        v-model="type"
        row
        style="display: inline-block;"
      >
        <v-radio
          value= "1"
          label="全部"
          light
          on-icon="mdi-hand-right"
        >
        </v-radio>
        <v-radio
          value= "2"
          label="搜索记录"
          light
          on-icon="mdi-hand-right"
        ></v-radio>
          <v-radio
            value= "3"
            label="文章记录"
            light
            on-icon="mdi-hand-right"
          >
        </v-radio>
        <v-btn
          rounded
          color="primary"
          dark
          @click="search_history"
        >
          查看
        </v-btn>
      </v-radio-group>
    </v-row>
    <v-row>
      <strong style="width: 80%;margin: auto;color: red">最多只显示20条搜索记录</strong>
    </v-row>
    <v-row>
      <v-timeline
        style="width: 50%;margin: auto"
        :dense="$vuetify.breakpoint.smAndDown"
      >
        <v-timeline-item
          v-for="(values,i) in value"
          :key="i"
        >
          <span slot="opposite">搜索关键词：<strong style="color: blue">{{values.word}}</strong></span>
          <v-card class="elevation-2">
            <v-card-title class="text-h5">
              {{getFullTime(values.add_time) }}
            </v-card-title>
            <v-card-text>
              {{getType(values.type)}}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-row>
  </div>
</template>

<script>
import qs from "qs";
import store from "../store/index"
import {formatDate} from './date'
import Moment from 'moment'
export default {
  name: "shistory",
  data(){
    return{
      username: store.state.JSON_user.username,
      data: [],
      type: "2",
      value: []
    }
  },
  mounted() {
  },
  // filters: {
  //   formatDate(time) {
  //     let date = new Date(time);
  //     return formatDate(date, 'yyyy-MM-dd hh:mm');
  //   }
  // },
  methods: {
    getType(type){
      let type_int = parseInt(type)
      switch (type_int){
        case 1 :
          return "使用了模糊搜索，搜索的类型是作者"
        case 2:
          return "使用了模糊搜索，搜索的类型是标题"
        case 3:
          return "使用了模糊搜索，搜索的类型是原文"
        case 4:
          return "使用了精确搜索，搜索的类型是作者"
        case 5:
          return "使用了精确搜索，搜索的类型是标题"
        case 6:
          return "使用了精确搜索，搜索的类型是原文"
        case 7:
          return "这个是您点击过的信息查询时候的关键词"
      }
    },
    add0(m){
      return m<10?'0'+m:m
    },
    getFullTime(timeStamp){
      // console.log(typeof (timeStamp))
      // const stamp = new Date(parseInt(timeStamp))
      // const time = Moment(stamp).format('YYYY-MM-DD HH:mm:ss')
      // return time

      // let date = new Date(timeStamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // let Y = date.getFullYear() + '-'
      // let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      // let D = date.getDate() + ' '
      // let h = date.getHours() + ':'
      // let m = date.getMinutes() + ':'
      // let s = date.getSeconds()
      // return Y+M+D+h+m+s
      console.log(timeStamp)
      let time = new Date(parseInt(timeStamp)*1000);
      let y = time.getFullYear();
      let m = time.getMonth()+1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
    },

    search_history(){
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/shis/find',
        data: qs.stringify({
          username: this.username,
          type: parseInt(this.type)
        })
      }).then(res => {
        if (res.data.length == 0){
          this.$message.error("缺乏记录");
        }
        this.value = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
