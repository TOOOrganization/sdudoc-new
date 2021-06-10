<template>
  <div class="userinfo">
    <v-col style="text-align: center">
      <h1 style="display: inline-block">账号信息</h1>
      <v-btn
        text
        color="primary"
        @click="exit"
      >
        <strong>退出</strong>
      </v-btn>
    </v-col>
    <v-col>
      <h3 style="display: inline-block">账号名：{{username}}</h3>
    </v-col>
    <v-col>
      <h3  v-if="nickname == null" style="display: inline-block">用户名：<v-btn text @click="open('nickname','add')"><strong style="color: blue">增添</strong></v-btn></h3>
      <h3  v-if="nickname != null" style="display: inline-block">用户名：{{nickname}}<v-btn text @click="open('nickname','change')"><strong style="color: blue">更改</strong></v-btn></h3>
    </v-col>
    <v-col>
      <h3  v-if="sex == null" style="display: inline-block">性别：<v-btn text @click="open('sex','add')"><strong style="color: blue">增添</strong></v-btn></h3>
      <h3  v-if="sex != null&&sex==1" style="display: inline-block">性别：女<v-btn text @click="open('sex','change')"><strong style="color: blue">更改</strong></v-btn></h3>
      <h3  v-if="sex != null&&sex==0" style="display: inline-block">性别：男<v-btn text @click="open('sex','change')"><strong style="color: blue">更改</strong></v-btn></h3>
    </v-col>
    <v-col>
      <h3  v-if="email == null" style="display: inline-block">邮箱：<v-btn text @click="open('email','add')"><strong style="color: blue">增添</strong></v-btn></h3>
      <h3  v-if="email != null" style="display: inline-block">邮箱：{{email}}<v-btn text @click="open('email','change')"><strong style="color: blue">更改</strong></v-btn></h3>
    </v-col>
    <v-col>
      <h3  v-if="phone == null" style="display: inline-block">电话：<v-btn text @click="open('phone','add')"><strong style="color: blue">增添</strong></v-btn></h3>
      <h3  v-if="phone != null" style="display: inline-block">电话：{{phone}}<v-btn text @click="open('phone','change')"><strong style="color: blue">更改</strong></v-btn></h3>
    </v-col>
    <v-col>
      <h3  v-if="birthday == null" style="display: inline-block">生日：<v-btn text @click="open('birthday','add')"><strong style="color: blue">增添</strong></v-btn></h3>
      <h3  v-if="birthday != null" style="display: inline-block">生日：{{birthday}}<v-btn text @click="open('birthday','change')"><strong style="color: blue">更改</strong></v-btn></h3>
    </v-col>
    <v-dialog
      v-model="dialog"
      persistent
      width="25%"
    >
      <v-card>
        <v-card-title class="headline">
          请输入
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="newValue"
              label="再此输入"
              clearable
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            关闭
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="set(type,method)"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from '../store/index'
import qs from "qs";
export default {
  name: "userinfo",
  data(){
    return{
      username: store.state.JSON_user.username,
      nickname: store.state.JSON_user.nickname,
      sex: store.state.JSON_user.sex,
      email: store.state.JSON_user.email,
      phone: store.state.JSON_user.phone,
      birthday: store.state.JSON_user.birthday,
      type: '',
      method: '',
      dialog:false,
      newValue: '',
      sexnumber: 2
    }
  },
  mounted() {
  },
  methods: {
    exit(){
      window.localStorage.removeItem('search_mode')
      window.localStorage.removeItem('search_value')
      window.localStorage.removeItem('search_keyword')
      window.localStorage.removeItem('mode')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('numFound')
      this.$router.go(0)
    },
    set(type,method){
      console.log(this.newValue)
      console.log(typeof (this.newValue))
      if (this.newValue == ''){
        this.$message.error('输入内容不能为空');
      }else{
        if (type == 'sex'){
          switch (this.newValue){
            case "男":
              this.sexnumber = 0
              break
            case "女":
              this.sexnumber = 1
              break
            default:
              this.sexnumber = 2
          }
          this.$http({
            method: 'post',
            url: 'http://211.87.232.198:8081/search-engine/user/set_sex',
            data: qs.stringify({
              username: this.username,
              sex: this.sexnumber
            })
          })
            .then(res => {
              if (res.data==0||res.data==1){
                let newuser =  JSON.parse(window.localStorage.getItem('user'))
                newuser.sex = this.sexnumber
                window.localStorage.setItem('user',JSON.stringify(newuser))
                this.dialog = false
                this.$message.success('更改成功');
                this.sex = this.sexnumber
              }else{
                this.$message.error('输入‘男‘或者’女‘');
              }
            })
        }else{
          switch (type){
            case "nickname":
              if (this.newValue.length>10){
                this.$message.error('用户名长度不能超过10');
              }else{
                this.$http({
                  method: 'post',
                  url: 'http://211.87.232.198:8081/search-engine/user/set_nickname',
                  data: qs.stringify({
                    username: this.username,
                    nickname: this.newValue
                  })
                })
                  .then(res => {
                    let newnickname =  JSON.parse(window.localStorage.getItem('user'))
                    newnickname.nickname = this.newValue
                    window.localStorage.setItem('user',JSON.stringify(newnickname))
                    this.dialog = false
                    this.$message.success('更改成功');
                    this.nickname = this.newValue
                  })
              }
              break
            case "email":
              this.$http({
                method: 'post',
                url: 'http://211.87.232.198:8081/search-engine/user/set_email',
                data: qs.stringify({
                  username: this.username,
                  email: this.newValue
                })
              })
                .then(res => {
                  if (res.data=='邮箱地址格式错误'){
                    this.$message.error('邮箱地址格式错误');
                  }else{
                    let newemail =  JSON.parse(window.localStorage.getItem('user'))
                    newemail.email = this.newValue
                    window.localStorage.setItem('user',JSON.stringify(newemail))
                    this.dialog = false
                    this.$message.success('更改成功');
                    this.email  = this.newValue
                  }
                })
              break
            case "phone":
              this.$http({
                method: 'post',
                url: 'http://211.87.232.198:8081/search-engine/user/set_phone',
                data: qs.stringify({
                  username: this.username,
                  phone: this.newValue
                })
              })
                .then(res => {
                  if (res.data == '号码格式不正确'){
                    this.$message.error('号码格式不正确');
                  }else{
                    let newphone =  JSON.parse(window.localStorage.getItem('user'))
                    newphone.phone = this.newValue
                    window.localStorage.setItem('user',JSON.stringify(newphone))
                    this.dialog = false
                    this.$message.success('更改成功');
                    this.phone  = this.newValue
                  }
                })
              break
            case "birthday":
              this.$http({
                method: 'post',
                url: 'http://211.87.232.198:8081/search-engine/user/set_birthday',
                data: qs.stringify({
                  username: this.username,
                  birthday: this.newValue
                })
              })
                .then(res => {
                  console.log(res.data)
                  if (res.data=='生日格式应为 yyyy-MM-dd'){
                    this.$message.error('生日格式应为 yyyy-MM-dd');
                  }else {
                    let newbirthday =  JSON.parse(window.localStorage.getItem('user'))
                    newbirthday.birthday = this.newValue
                    window.localStorage.setItem('user',JSON.stringify(newbirthday))
                    this.dialog = false
                    this.$message.success('更改成功');
                    this.birthday  = this.newValue
                  }
                })
              break
          }
        }
      }
    },
    open(type,method){
      this.type = type
      this.method = method
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.userinfo{
  margin-left:25%;
  margin-top: 1%;
  width: 50%;
  height: 100%;
}
</style>
