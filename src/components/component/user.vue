<template>
<div id="user">
  <v-content>
    <v-card
      max-width="500"
      max-height="200"
    >
      <v-col>
      <v-card-text>
        <strong style="font-size: 20px">账户信息</strong>

        <v-divider></v-divider>
        <v-divider></v-divider>

        <p>用户名：{{$store.state.JSON_user.username}}</p>

        <p v-if="$store.state.JSON_user.phone==null">绑定手机号: <v-btn text><strong style="color: blue">绑定</strong></v-btn></p>
        <p v-if="$store.state.JSON_user.phone!=null">绑定手机号：{{$store.state.JSON_user.phone}} <v-btn text><strong style="color: blue">解绑</strong></v-btn> <v-btn text style="margin-left: 15px"><strong style="color: blue">换绑</strong></v-btn></p>
      </v-card-text>
      </v-col>
    </v-card>

    <v-card
      max-width="500"
      style="margin-top: 10px"
    >
      <v-col>
      <v-card-text>
        <strong style="font-size: 20px">个人信息</strong>

        <v-divider></v-divider>
        <v-divider></v-divider>

        <p v-if="$store.state.JSON_user.sex==null">性别：<v-btn text><strong style="color: blue">选择性别</strong></v-btn></p>
        <p v-if="$store.state.JSON_user.sex!=null">性别：{{$store.state.JSON_user.sex}}</p>

        <p v-if="$store.state.JSON_user.birthday == null">生日：<v-btn text><strong style="color: blue">设置生日</strong></v-btn></p>
        <p v-if="$store.state.JSON_user.birthday!=null">生日：{{$store.state.JSON_user.birthday}}<v-btn text><strong style="color: blue;margin-left: 10px">修改</strong></v-btn></p>

        <p>昵称：{{$store.state.JSON_user.nickname}}<v-btn text><strong style="color: blue;margin-left: 10px">修改</strong></v-btn></p>

        <p v-if="$store.state.JSON_user.email==null">邮箱：<v-btn text><strong style="color: blue;">增添邮箱</strong></v-btn></p>
        <p v-if="$store.state.JSON_user.email!=null">邮箱：{{$store.state.JSON_user.email}}<v-btn text><strong style="color: blue;margin-left: 10px">修改</strong></v-btn></p>
      </v-card-text>
      </v-col>
    </v-card>
  </v-content>
</div>
</template>

<script>
export default {
  name: "user",
  data(){
    return{

    }
  },
  methods: {
    ceshi(){
      console.log("caonima")
    }
  }
}
</script>

<style scoped>
#user{
  margin-left: 300px;
  margin-top: -670px;
}
</style>
