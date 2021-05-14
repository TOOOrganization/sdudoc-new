<template>
<div id="article">
  <v-app-bar
    app
    color="brown darken-1"
    dark
  >
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-4"
    >
      <span class="hidden-sm-and-down">SDUDOC检索系统</span>
    </v-toolbar-title>
  </v-app-bar>
  <v-content>
    <v-card
      class="mx-auto"
      width="600"
      max-height="250"
      v-for="infos in value.slice((startpage-1)*5,(startpage-1)*5+5)"
      :key="infos._id"
      @click="getSvg(infos)"
      :disabled="dialog"

    >
      <v-card-text>
        <div id="title" v-if="$store.state.search_mode=='title'" v-html="$options.filters.font_color(infos.title)"></div>
        <div id="title1" v-if="$store.state.search_mode!='title'" v-html="infos.title"></div>
        <!--        <div id="title">{{infos.title}}</div>-->
        <div id="author">{{infos.articleAuthor}}</div>
        <div id="xiangxi" class="text--primary" v-if="$store.state.search_mode=='content'"  v-html="$options.filters.ellipsis(infos.content)">
        </div>
        <div id="xiangxi1" class="text--primary" v-if="$store.state.search_mode!='content'"  v-html="$options.filters.ellipsis1(infos.content)">
        </div>
        <div id="dbn" style="color: blue">{{infos.dynasty}}&#12288&#12288&#12288{{infos.bookname}}</div>
      </v-card-text>
    </v-card>
    <!-- 分页 -->
    <div style="text-align: center;margin-top: 20px">
      <el-pagination background layout="prev, pager, next" @current-change="pageChange" :page-size="pageSize"
                     :total="totalusers" />
    </div>
  </v-content>

  <v-dialog v-model="dialog" width="1000">
    <div style="display: flex">
      <div style="width: 500px;background-color: white">
        <div style="text-align: center;color: blue;font-size: 25px" v-if="$store.state.search_mode=='title'" v-html="$options.filters.font_color(detail.title)"></div>
        <div style="text-align: center;color: blue;font-size: 25px" v-if="$store.state.search_mode!='title'" v-html="detail.title"></div>
        <div style="margin:auto;max-width: 450px;max-height: 500px;">
        <strong
          color="black"
          v-if="$store.state.search_mode=='content'"
          v-html="$options.filters.font_color(detail.content)"
        ></strong>
          <strong
            color="black"
            v-if="$store.state.search_mode !='content'"
            v-html="detail.content"
          ></strong>
        </div>
      </div>
      <div style="width: 500px;background-color: white">
        <v-carousel
          hide-delimiter-background
          height="700"
        >
          <template v-slot:prev="{ on, attrs }">
            <v-btn
              color="secondary"
              v-bind="attrs"
              v-on="on"
              small
              fab
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn
              color="secondary"
              v-bind="attrs"
              v-on="on"
              small
              fab
            >
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </template>
          <v-carousel-item
            v-for=" i in svg.length"
            :key="i"
          >

            <div v-html="svg[i-1]" >
              {{ svg[i-1] }}
            </div>

          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </v-dialog>
</div>
</template>

<script>
import store from '../store/index'
import qs from "qs";
export default {
  name: "article",
  filters:{
    ellipsis(value){
      if (!value) return ''

      let newvalue = value.split('<br>')
      if (newvalue.length == 1){
        if (value.length>100){
          value = value.slice(0,100)
        }
      }
      if (newvalue.length==2){
        if (newvalue[0].length<=42){
          if (newvalue[1].length>58){
            value = newvalue[0]+"<br>"+newvalue[1].slice(0,58)+"..."
          }else{
            value = newvalue[0]+"<br>"+newvalue[1]
          }
        }else{
          if (newvalue[0].length>100){
            value = newvalue[0].slice(0,100)+"..."
          }else{
            if(newvalue[0].length>84){
              value = newvalue[0]+"..."
            }else{
              if (newvalue[1].length>16){
                value = newvalue[0]+"<br>"+newvalue[1].slice(0,16)+"..."
              }else{
                value = newvalue[0]+"<br>"+newvalue[1]
              }
            }
          }
        }
      }

      if (newvalue.length >= 3){
        if (newvalue[0].length>100){
          value = newvalue[0].slice(0,100)+"..."
        }else {
          if(newvalue[0].length>84){
            value = newvalue[0].slice(0,84)+"..."
          }else{
            if (newvalue[0].length>42){
              if (newvalue[1].length>16){
                value = newvalue[0] + "<br>" + newvalue[1].slice(0,16)+"..."
              }else{
                value = newvalue[0] + "<br>" + newvalue[1]
              }
            }else{
              if (newvalue[1].length>58){
                value = newvalue[0] + "<br>" + newvalue[1].slice(0,58)+"..."
              }else{
                if (newvalue[1].length>42){
                  value = newvalue[0] + "<br>" + newvalue[1]+"..."
                }else {
                  if (newvalue[2].length>16){
                    value = newvalue[0] + "<br>" + newvalue[1] + "<br>" + newvalue[2].slice(0,16)+"..."
                  }else{
                    value = newvalue[0] + "<br>" + newvalue[1] + "<br>" + newvalue[2].slice(0,16)
                  }
                }
              }
            }
          }
        }
      }
      let search_keyword = store.state.search_keyword
      if (value.includes(search_keyword)){
        value = value.replaceAll(
          search_keyword,
          '<font style="color: red!important;">'+search_keyword+'</font>'
        )
        return value
      }else{
        return value
      }
    },
    ellipsis1(value){
      if (!value) return ''

      let newvalue = value.split('<br>')
      if (newvalue.length == 1){
        if (value.length>100){
          value = value.slice(0,100)
        }
      }
      if (newvalue.length==2){
        if (newvalue[0].length<=42){
          if (newvalue[1].length>58){
            value = newvalue[0]+"<br>"+newvalue[1].slice(0,58)+"..."
          }else{
            value = newvalue[0]+"<br>"+newvalue[1]
          }
        }else{
          if (newvalue[0].length>100){
            value = newvalue[0].slice(0,100)+"..."
          }else{
            if(newvalue[0].length>84){
              value = newvalue[0]+"..."
            }else{
              if (newvalue[1].length>16){
                value = newvalue[0]+"<br>"+newvalue[1].slice(0,16)+"..."
              }else{
                value = newvalue[0]+"<br>"+newvalue[1]
              }
            }
          }
        }
      }

      if (newvalue.length >= 3){
        if (newvalue[0].length>100){
          value = newvalue[0].slice(0,100)+"..."
        }else {
          if(newvalue[0].length>84){
            value = newvalue[0].slice(0,84)+"..."
          }else{
            if (newvalue[0].length>42){
              if (newvalue[1].length>16){
                value = newvalue[0] + "<br>" + newvalue[1].slice(0,16)+"..."
              }else{
                value = newvalue[0] + "<br>" + newvalue[1]
              }
            }else{
              if (newvalue[1].length>58){
                value = newvalue[0] + "<br>" + newvalue[1].slice(0,58)+"..."
              }else{
                if (newvalue[1].length>42){
                  value = newvalue[0] + "<br>" + newvalue[1]+"..."
                }else {
                  if (newvalue[2].length>16){
                    value = newvalue[0] + "<br>" + newvalue[1] + "<br>" + newvalue[2].slice(0,16)+"..."
                  }else{
                    value = newvalue[0] + "<br>" + newvalue[1] + "<br>" + newvalue[2].slice(0,16)
                  }
                }
              }
            }
          }
        }
      }
      return value
    },
    font_color:function (val){
      if (!val) return ''
      let search_keyword = store.state.search_keyword
      if (val.includes(search_keyword)){
        val = val.replaceAll(
          search_keyword,
          '<font style="color: red!important;">'+search_keyword+'</font>'
        )
        return val
      }else{
        return val
      }
    }
  },
  data () {
    return {
      dialog: false,
      page: 1,
      value: [],
      totalusers: 10, //总行数
      pageSize: 5, //每页几行
      startpage: 1, //起始页
      detail: {},
      svg: []
       }
  },
  watch: {
    // dialog (val) {
    //   if (!val) return
    //
    //   setTimeout(() => (this.dialog = false), 1000)
    // }
  },
  mounted() {
    this.getTaskList()
  },
  methods: {
    //分页 pageChange当前页发生改变触发函数
    async pageChange(page) {
      this.startpage = page
      //调用获取列表的方法
      this.getTaskList()
    },
    //获取分页列表
    getTaskList() {
      this.value = JSON.parse(window.localStorage.getItem('search_value'))
      for (let j=0;j<this.value.length;j++){
        this.value[j].content =  this.value[j].content.replaceAll("\\n","<br>")
      }
      this.totalusers = this.value.length
    },
    getSvg(value){
      this.detail = value
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/solr/getSVG',
        data: qs.stringify({
          aid: this.detail._id,
          keyword: store.state.search_keyword,
          width: "500",
          height: "700"
        })
      })
        .then(res => {
          let data = res.data.substring(5, res.data.length - 6)
          let list = data.split('/svg>, <svg')
          for (let i = 0; i < list.length; i++){
            list[i] = '<svg' + list[i] + '/svg>';
          }
          this.svg = list
        })
      this.dialog = true
    }
  }
}
</script>

<style scoped>
#title{
  color: blue;
  font-size: 25px;
  max-height: 60px;
  min-height: 30px;
  font-weight: 500;
}
#title1{
  color: blue;
  font-size: 25px;
  max-height: 60px;
  min-height: 30px;
  font-weight: 500;
}
#xiangxi{
  max-height: 70px;
  min-height: 50px;
  margin-bottom: 5px;
}
#xiangxi1{
  max-height: 70px;
  min-height: 50px;
  margin-bottom: 5px;
}
#author{
  height: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}
#dbn{
  height: 20px;
}
</style>
