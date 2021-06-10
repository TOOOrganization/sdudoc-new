<template>
  <div>

    <v-row>
      <v-sparkline
        :value="value"
        :gradient="gradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        auto-draw
      ></v-sparkline>
    </v-row>
    <v-row style="margin: auto">
      <p style="color: red">
        点击按钮选择要更换的头像之后，确定即可替换，请稍等片刻
      </p>
    </v-row>
    <v-row
      style="margin: auto"
    >
      <v-btn
        @click="upload"
        depressed
      >
       点这里选择新头像
      </v-btn>
      <input
        type="file"
        id="upload"
        ref="upload"
        @change="change_img"
        accept=".jpg, .jpeg, .png"
      >
    </v-row>
  </div>
</template>

<script>

import qs from "qs";
import store from "../store";
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]
export default {
  name: "avatar",
  data(){
    return{
      username: store.state.JSON_user.username,
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }
  },
  methods: {
    upload () {
      this.$refs.upload.click();
    },
    change_img (e) {
      let reader = new FileReader();
      let that = this;
      reader.onload = function(event){
        that.$http({
          method: 'post',
          url: 'http://211.87.232.198:8081/search-engine/user/set_avatar',
          data: {
            username: that.username,
            img: event.target.result
          },
          headers: {
            'content-type': 'application/json'
          }
        }).then(res => {
          console.log(res.data)
          that.$router.go(0)
        })
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
}
</script>

<style scoped>

#upload {
  height: 0;
  width: 0;
  visibility: hidden;
}
</style>
