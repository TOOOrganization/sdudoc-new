<template>
  <p v-html="svg">
    {{svg}}
  </p>
</template>

<script>
import qs from "qs";

export default {
  name: "test",
  data(){
    return{
      dialog:true,
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
        width: "500"
      })
    })
    .then(res => {
      let data = res.data.substring(5, res.data.length - 6)
      let list = data.split('/svg>, <svg')
      for (let i = 0; i < list.length; i++){
        list[i] = '<svg' + list[i] + '/svg>';
      }
      this.svg = list[0]
      console.log(this)
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
