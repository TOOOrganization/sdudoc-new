<template>
<div id="surplus">
  <v-content>
    <v-card
      max-width="500"
    >
      <strong style="font-size: 20px">账户余额</strong>

      <v-divider></v-divider>
      <v-divider style="margin-bottom: 20px"></v-divider>

      <p>余额：<strong style="color: blue">{{$store.state.surplus_money}}</strong> </p>

      <v-btn color="success" fab dark style="margin-bottom: 10px">充值</v-btn>
    </v-card>
  </v-content>
</div>
</template>

<script>
export default {
  name: "surplus"
}
</script>

<style scoped>
#surplus{
  margin-left: 300px;
  margin-top: -670px;
}
</style>
