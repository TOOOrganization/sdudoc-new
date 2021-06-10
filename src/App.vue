<template>
  <v-app>
    <v-app-bar
      flat
      light
      app
      v-show="!(path==='/login'||path==='/register'||path==='/search')"
    >
      <strong
        style="font-size: 25px"
        class="mx-lg-auto"
      >
        S D U D O C  检 索 系 统
      </strong>
    </v-app-bar>
    <v-navigation-drawer
      permanent
      app
      v-show="!(path==='/login'||path==='/register'||path==='/search')">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img id="avatar" ref="avatar" :src="image"></v-img>
          </v-list-item-avatar>
        </v-list-item>
<!--        <v-list-item>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>-->
<!--              <el-upload-->
<!--                class="upload-demo"-->
<!--                action="http://211.87.232.198:8081/search-engine/user/set_avatar"-->
<!--              data={"username":}></el-upload>-->
<!--            </v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{nickname}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-model="list">
        <v-list-item value="search" @click="toindex">
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              搜索
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          :value="true"
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title>用户</v-list-item-title>
          </template>

            <v-list-item @click="touserinfo" value="userinfo">
              <v-list-item-icon>
                <v-icon>mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>用户信息</v-list-item-title>
            </v-list-item>

          <v-list-item @click="touserchange" value="userchange">
            <v-list-item-icon>
              <v-icon>mdi-stack-exchange</v-icon>
            </v-list-item-icon>
            <v-list-item-title>修改密码</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toavatar" value="avatar">
            <v-list-item-icon>
              <v-icon>mdi-rhombus-split</v-icon>
            </v-list-item-icon>
            <v-list-item-title>修改头像</v-list-item-title>
          </v-list-item>
          </v-list-group>

        <v-list-item @click="toshistory" value="shistory">
          <v-list-item-icon>
            <v-icon>mdi-account-voice</v-icon>
          </v-list-item-icon>
          <v-list-item-title>搜索历史</v-list-item-title>
        </v-list-item>

          <v-list-item @click="tocollection" value="collection">
            <v-list-item-icon>
              <v-icon>mdi-thumbs-up-down</v-icon>
            </v-list-item-icon>
            <v-list-item-title>收藏</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main v-show="!(path==='/login'||path==='/register'||path==='/search')"><router-view v-if="isRouterAlive"/></v-main>
    <div v-show="path==='/login'||path==='/register'||path==='/search'"><router-view/></div>
  </v-app>
</template>

<script>
import search from "./components/component/search";
import store from "./store";

export default {
  name: 'App',
  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
    return {
      isRouterAlive: true,
      list: window.sessionStorage.getItem('list'),
      path: '',
      files: [],
      image: 'https://cdn.vuetifyjs.com/images/john.png',
      nickname: store.state.JSON_user ? store.state.JSON_user.nickname : null
    }
  },
  mounted() {
    this.path = this.$route.path
    if (store.state.user!= null){
      this.image = 'http://211.87.232.198:8081/search-engine/user/get_avatar?username=' + store.state.JSON_user.username;
    }
  },
  watch: {
    $route(to,from){
      this.path = to.path
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
    toindex(){
      this.$router.replace('/')
      window.sessionStorage.setItem('list','search')
    },
    touserinfo(){
      this.$router.replace('/userinfo')
      window.sessionStorage.setItem('list','userinfo')
    },
    touserchange(){
      this.$router.replace('/userchange')
      window.sessionStorage.setItem('list','userchange')
    },
    toavatar(){
      this.$router.replace('/avatar')
      window.sessionStorage.setItem('list','avatar')
    },
    toshistory(){
      this.$router.replace('/shistory')
      window.sessionStorage.setItem('list','shistory')
    },
    tocollection(){
      this.$router.replace('/collection')
      window.sessionStorage.setItem('list','collection')
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
