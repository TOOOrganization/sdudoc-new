<template>
  <v-dialog v-model="dialog" width="1000" >
    <div style="display: flex">
    <div class="div1" style="width: 500px">
      dsada
    </div>
    <div style="width: 500px;background-color: white"class="div2">
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
    >

        <div v-html="svg" >
          {{ svg }}
        </div>

    </v-carousel-item>
  </v-carousel>
    </div>
    </div>
  </v-dialog>
</template>

<script>
import qs from "qs";

export default {
  name: "test2",
  data(){
    return{
      dialog: true,
      value: '',
      svg: ''
    }
  },
  mounted() {
    this.$http({
      method: 'post',
      url: 'http://211.87.232.198:8081/search-engine/solr/getSVG',
      data: qs.stringify({
        aid: "60975d6637ad8e7e7a329a9f",
        keyword: "李",
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
        this.svg = list[0]
        // console.log(this.$refs)
        // this.$refs.svg_pic.innerHTML = list[0]
        console.log(list)
        // this.value = res.data.replace("[","").replace("]","")
        // console.log(this.value)
        // console.log(typeof (this.value))
        // this.value = this.value.split(",")
        // console.log(this.value)
        // console.log(typeof (this.value))
      })
  }
}
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

</style>
