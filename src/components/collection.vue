<template>
  <div>
    <el-table
    height="500"
    border
    :data="value"
    style="width: 80%;margin: auto"
    >
      <el-table-column
      width="200"
      label="作者"
      prop="articleauthor"
      >
      </el-table-column>
      <el-table-column
        width="300"
        label="书名"
        prop="bookname"
      >
      </el-table-column>
      <el-table-column
        width="200"
        label="朝代"
        prop="dynasty">
      </el-table-column>
      <el-table-column
        width="400"
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button
            @click="delete_before(scope.row)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>
        确认删除这项收藏吗？
      </span>
      <span
        slot="footer"
        class="dialog-footer"
      >
    <el-button
      @click="dialogVisible = false"
    >
      取 消
    </el-button>
    <el-button
      @click="delete_aid"
      type="primary"
    >
      确 定
    </el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import store from "../store";
import qs from "qs";

export default {
  name: "collection",
  data(){
    return{
      username: store.state.JSON_user.username,
      value: [],
      dialogVisible: false,
      aid: ''
    }
  },
  methods:{
    delete_aid(){
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/bookmark/delete',
        data: qs.stringify({
          username: this.username,
          aid: this.aid
        })
      }).then(res => {
        console.log(res.data)
      })
      // let data = this.value
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].aid === this.aid) {
      //     delete data[i]
      //   }
      // }
      // data.forEach((item) => {
      //   if (item.aid === this.aid)
      //   delete (item)
      // })
      // this.value = data
      this.dialogVisible = false
      this.$message.success("请稍等待，不要进行其他操作");
        setTimeout(() => {
          this.$router.go(0)
        }, 1500+Math.random()*1000);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    delete_before(aid){
      this.aid = aid.aid
      this.dialogVisible = true
    }
  },
  mounted() {
    this.$http({
      method: 'post',
      url: 'http://211.87.232.198:8081/search-engine/bookmark/find',
      data: qs.stringify({
        username: this.username,
      })
    }).then(res => {
      console.log(res.data)
      this.value = res.data
    })
  }
}
</script>

<style scoped>

</style>
