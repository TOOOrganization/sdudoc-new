<template>
<div id="keyword">
  <v-content>
    <v-card max-width="500">
      <v-card-text>
        <strong style="font-size: 20px">修改密码</strong>

        <v-divider></v-divider>
        <v-divider style="margin-bottom: 20px"></v-divider>

        <v-text-field label="这里输入原密码"></v-text-field>

        <v-text-field label="这里输入新密码" style="margin-top: 20px"></v-text-field>

        <v-text-field label="确认新密码" style="margin-top: 20px"></v-text-field>

        <v-btn color="primary">
          确认
        </v-btn>
      </v-card-text>
    </v-card>
  </v-content>
</div>
</template>

<script>
export default {
  name: "keyword"
}
</script>

<style scoped>
#keyword{
  margin-left: 300px;
  margin-top: -670px;
}
</style>
