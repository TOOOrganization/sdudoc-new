<template>
  <div id="menu">
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
        <v-spacer></v-spacer>
        <span v-if="$store.state.user!=null" class="hidden-sm-and-down">你好，{{$store.state.JSON_user.nickname}}</span>
        <span v-if="$store.state.user!=null">
          <v-btn
          text
          @click="exit"
        >
            退出
          </v-btn>
        </span>
        <v-spacer></v-spacer>
        <v-btn-toggle
          tile
          color="yellow accent-4"
          group
          v-model = $store.state.menu_text
        >
          <v-btn value="index">
            <span class="hidden-sm-and-down" style="font-size: 16px">首页</span>

            <v-icon right>
              mdi-file-find
            </v-icon>
          </v-btn>

          <v-btn value="recharge">
            <span class="hidden-sm-and-down" style="font-size: 16px">积分兑换</span>

            <v-icon right>
              mdi-credit-card-plus
            </v-icon>
          </v-btn>

          <v-btn value="user">
            <span class="hidden-sm-and-down" style="font-size: 16px">用户信息</span>

            <v-icon right>
              mdi-account
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-app-bar>
  </div>
</template>

<script>
import store from '../../store/index'
export default {
  name: "menu",
  data () {
    return {
    }
  },
  mounted() {
  },
  methods: {
    exit(){
      localStorage.removeItem('user')
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>
