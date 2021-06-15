<template>
  <div
    id="search"
  >
    <v-row>
      <v-col
        cols="2"
      >
        <v-radio-group
          class="radio"
          v-model="mode"
        >
          <v-radio
            class="radio1"
            value="articleAuthor"
          >
            <template
              v-slot:label
            >
              <div>
                <p style="color: blue">
                  作者
                </p>
              </div>
            </template>
          </v-radio>
          <v-radio
            class="radio1"
            value="content"
          >
            <template
              v-slot:label
            >
              <div>
                <p style="color: blue">
                  原文
                </p>
              </div>
            </template>
          </v-radio>
          <v-radio
            class="radio1"
            value="translation"
                   disabled
          >
            <template
              v-slot:label
            >
              <div>
                <p style="color:gray">
                  译文
                </p>
              </div>
            </template>
          </v-radio>
          <v-radio
            class="radio1"
                   value="title"
          >
            <template
              v-slot:label
            >
              <div>
                <p style="color: blue">
                  标题
                </p>
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
      <v-col
        cols="8"
      >
        <v-text-field
          style="margin-left: 25px;margin-top: 125px;margin-right: 25px;"
          prepend-icon="mdi-account-search"
          class="radio"
          v-model="keyword"
        >
          <template
            v-slot:label
          >
            <div>
              <p style="color: blue;font-size: 20px">
                {{modes(mode)}}
              </p>
            </div>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          class="radio"
          style="margin-top: 130px"
          depressed
          elevation="2"
          outlined
          plain
          raised
          rounded
          @click="search"
        >
          <div
            style="font-size: 20px;color: blue"
          >
            查询
          </div>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import store from '../../store/index'
import qs from 'qs'
export default {
  name: "search",
  data () {
    return {
      mode: "content",
      keyword: ""
    }
  },
  methods:{
    modes(mode){
      switch (mode){
        case "content":
          return "请输入原文进行搜索"
        case "articleAuthor":
          return "请输入作者进行搜索"
        case "translation":
          return "请输入译文进行搜索"
        case "title":
          return "请输入标题进行搜索"
      }
    },
    search(){
      this.$http({
        method: 'post',
        url: '/api/search-engine/solr/query',
        data: qs.stringify({
          corename: "dms_article",
          field: this.mode,
          keyword: this.keyword
        })
      })
        .then(res => {
          if (res.data.length != 0) {
            window.localStorage.setItem('search_keyword',this.keyword)
            console.log(res.data)
            window.localStorage.setItem('search_value',JSON.stringify(res.data))
            console.log(window.localStorage.getItem('search_value'))
            window.localStorage.setItem('search_mode',this.mode)
            console.log(window.localStorage.getItem('search_mode'))
            this.$router.push({
              name: "article"
            });
          } else {
            this.$message.error('缺乏响应数据');
            return false;
          }
        });

    }
  },
}
</script>

<style scoped>
#search{
  width: 650px;
}

.radio{
  zoom: 125%;
}
.radio1{
  zoom: 120%;
}
</style>
