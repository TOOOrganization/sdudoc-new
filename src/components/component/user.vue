<template>
<div id="user">
  <v-content>
    <v-card
      max-width="500"
    >
      <v-card-text>
        <strong style="font-size: 20px">账户信息</strong>

        <v-divider></v-divider>
        <v-divider style="margin-bottom: 20px"></v-divider>

        <p>用户名：{{$store.state.menu_text}}</p>

        <v-divider style="margin-top: 20px"></v-divider>
        <v-divider style="margin-bottom: 20px"></v-divider>

        <p>绑定手机号：{{$store.state.menu_text}} <strong style="color: blue;margin-left: 15px;margin-right: 5px">解绑</strong> <strong style="color: blue">换绑</strong></p>
      </v-card-text>
    </v-card>

    <v-card
      max-width="500"
      style="margin-top: 40px"
    >
      <v-card-text>
        <strong style="font-size: 20px">个人信息</strong>

        <v-divider></v-divider>
        <v-divider style="margin-bottom: 20px"></v-divider>

        <p>真实姓名：{{$store.state.menu_text}}</p>

        <v-divider style="margin-top: 20px"></v-divider>
        <v-divider style="margin-bottom: 20px"></v-divider>

        <p>单位/部门名称：{{$store.state.menu_text}}</p>

        <v-divider style="margin-top: 20px"></v-divider>
        <v-divider style="margin-bottom: 20px"></v-divider>

        <p>联系电话：{{$store.state.menu_text}}</p>

        <v-divider style="margin-top: 20px"></v-divider>
        <v-divider style="margin-bottom: 20px"></v-divider>

        <p>邮箱：{{$store.state.menu_text}}</p>
      </v-card-text>
    </v-card>
  </v-content>
</div>
</template>

<script>
export default {
  name: "user"
}
</script>

<style scoped>
#user{
  margin-left: 300px;
  margin-top: -670px;
}
</style>
