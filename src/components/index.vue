<!--<template>-->
<!--  <div id="background">-->
<!--    <yx-menu></yx-menu>-->
<!--    <yx-login id="login" v-if="iflogin"></yx-login>-->
<!--    <yx-search id="search" v-if="$store.state.menu_text=='index'&&$store.state.user != null"></yx-search>-->
<!--    <yx-navigation v-if="$store.state.menu_text=='user'&&$store.state.user != null"></yx-navigation>-->
<!--    <yx-user v-if="$store.state.menu_text=='user'&&$store.state.list_title=='账号信息'&&$store.state.user != null"></yx-user>-->
<!--    <yx-keyword v-if="$store.state.menu_text=='user'&&$store.state.list_title=='修改密码'&&$store.state.user != null"></yx-keyword>-->
<!--    <yx-surplus v-if="$store.state.menu_text=='user'&&$store.state.list_title=='余额'&&$store.state.user != null"></yx-surplus>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->

<!--import store from '../store/index'-->
<!--export default {-->
<!--  name: "index",-->
<!--  data(){-->
<!--    return{-->
<!--      iflogin: false-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    if (store.state.user == null){-->
<!--      this.iflogin = true-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--#background {-->
<!--  background: url("../assets/img/index1.jpeg") no-repeat;-->
<!--  height: 100%;-->
<!--  width: 100%;-->
<!--  background-size: cover;-->
<!--  position: fixed;-->
<!--}-->
<!--#search {-->
<!--  margin-top: 170px;-->
<!--  margin-left: 440px;-->
<!--}-->
<!--#login{-->
<!--  margin-left: 550px;-->
<!--  margin-top: 200px;-->
<!--}-->
<!--</style>-->
<template>
  <div class="search">
    <v-col>
      <v-img :src="require('../assets/img/sdudoc.png')" width="25%" style="margin: auto" class="mb-4"></v-img>
    </v-col>
    <v-col style="text-align: center">
      <!--      <el-input-->
      <!--        placeholder="请输入内容"-->
      <!--        v-model="keyword"-->
      <!--        style="width: 50%;margin: auto;height: 100%"-->
      <!--        color="blue"-->
      <!--      >-->
      <!--        <template slot="append">搜索</template>-->
      <!--      </el-input>-->
      <!--      <template slot="paceholder">-->
      <!--        <div><p style="color: blue;font-size: 120%">{{modes(mode)}}</p></div>-->
      <!--      </template>-->
      <v-text-field
        v-model="keyword"
        style="width: 40%"
        class="mx-auto mb-0"
        color="blue"
        outlined
      >
        <template v-slot:label>
          <div><p style="color: blue;font-size: 120%">{{modes(mode)}}</p></div>
        </template>
        <template v-slot:append>
          <v-icon
            color="primary"
            light
            style="vertical-align: top"
            @click="search"
          >
            mdi-magnify
          </v-icon>
        </template>
      </v-text-field>
    </v-col>
    <v-col style="text-align: center; margin-top:-2%">
      <v-radio-group
        v-model="mode"
        row
        style="display: inline-block;"
      >
        <v-radio
          value="articleAuthor"
          label="作者"
          light
          on-icon="mdi-hand-right"
        >
        </v-radio>
        <v-radio
          value="content"
          label="原文"
          light
          on-icon="mdi-hand-right"
        >
        </v-radio>
        <v-radio
          value="title"
          label="标题"
          light
          on-icon="mdi-hand-right"
        >
        </v-radio>
      </v-radio-group>
      <v-radio-group
        v-model="vague"
        row
        style="display: inline-block;"
      >
        <v-radio
          value="vague"
          label="模糊搜索"
          light
          on-icon="mdi-hand-right"
        >
        </v-radio>
        <v-radio
          value="precise"
          label="精确搜索"
          light
          on-icon="mdi-hand-right"
        >
        </v-radio>
      </v-radio-group>

    </v-col>


    <v-col style="text-align: center">

    </v-col>
  </div>
</template>

<script>
import qs from "qs";
import store from "../store/index"
export default {
  name: "test",
  data() {
    return {
      mode: "content",
      keyword: "",
      vague: "vague",
      username: store.state.JSON_user.username
    }
  },
  methods: {
    change(){
      store.state.search_state = true
      console.log( store.state.search_state)
    },
    modes(mode){
      switch (mode){
        case "content":
          return "请输入原文进行搜索"
        case "articleAuthor":
          return "请输入作者进行搜索"
        case "title":
          return "请输入标题进行搜索"
      }
    },
    search(){
      let type = 1
      switch (this.mode) {
        case "content":
          if (this.vague == "vague"){
            type = 3
          }else{
            type = 6
          }
          break
        case "articleAuthor":
          if (this.vague == "vague"){
            type = 1
          }else{
            type = 4
          }
          break
        case "title":
          if (this.vague == "vague"){
            type = 2
          }else{
            type = 5
          }
          break
      }
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/shis/insert',
        data: qs.stringify({
          username: this.username,
          word: this.keyword,
          type: type
        })
      })
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/solr/query',
        data: qs.stringify({
          coreName: "dms_article",
          defaultField: this.mode,
          query: this.keyword,
          rows: 5,
          mode: this.vague
        })
      })
        .then(res => {
          if (res.data.numFound>0){
            window.localStorage.setItem('mode',this.vague)
            window.localStorage.setItem('numFound',res.data.numFound)
            window.localStorage.setItem('search_keyword',this.keyword)
            window.localStorage.setItem('search_value',JSON.stringify(res.data.results))
            window.localStorage.setItem('search_mode',this.mode)
            this.$router.push({
              name: "search"
            });
            store.state.search_state = false

          }else {
            this.$message.error('缺乏响应数据');
            return false;
          }

        });

    }
  }
}
</script>

<style scoped>
.search{
  width: 100%;
  padding: 10% 0;
}
</style>
