<template>
  <div
    class="search"
  >
    <v-col>
      <v-img
        :src="require('../../assets/img/sdudoc.png')"
        width="75%"
        style="margin: auto"
      ></v-img>
    </v-col>
    <v-col
      style="text-align: center"
    >
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
        prepend-icon="mdi-folder-search-outline"
        v-model="keyword"
        style="width: 40%;margin: auto;"
        color="blue"
        outlined
      >
        <template
          v-slot:label
        >
          <div>
            <p style="color: blue;font-size: 120%">
              {{modes(mode)}}
            </p>
          </div>
        </template>
        <template
          slot="append-outer"
        >
          <v-btn
            color="primary"
            light
            style="vertical-align: top"
          >
            搜索
          </v-btn>
        </template>
      </v-text-field>
    </v-col>
    <v-col
      style="text-align: center"
    >

    </v-col>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      mode: "content",
      keyword: ""
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>
.search{
  width: 100%;
  padding: 10% 0;
}
</style>
