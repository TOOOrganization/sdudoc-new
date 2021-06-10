<template>
  <div id="article">
    <!--    <v-app-bar-->
    <!--      app-->
    <!--      color="brown darken-1"-->
    <!--      dark-->
    <!--    >-->
    <!--      <v-toolbar-title-->
    <!--        style="width: 300px"-->
    <!--        class="ml-0 pl-4"-->
    <!--      >-->
    <!--        <span class="hidden-sm-and-down">SDUDOC检索系统</span>-->
    <!--      </v-toolbar-title>-->
    <!--    </v-app-bar>-->
    <!--    <div style="margin-left: 10%;width: 600px;height: 300px;margin-bottom: 2%;background-color: blueviolet">-->
    <!--      <el-input placeholder="请输入内容" size="medium" v-model="input2">-->
    <!--        <template slot="append">.com</template>-->
    <!--      </el-input>-->
    <!--    </div>-->
    <div
      style="margin-left: 10%;width: 600px;height: 200px;"
    >
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
        <v-radio-group
          v-model="vague"
          row
          style="display: inline-block;"
        >
          <v-radio
            value="vague"
            label="模糊搜索"
            light
            on-icon="mdi-hand-right"
          >
          </v-radio>
          <v-radio
            value="precise"
            label="精确搜索"
            light
            on-icon="mdi-hand-right"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col>
        <v-text-field
          color="blue"
          outlined
          label="输入要搜索的信息"
          append-outer-icon="mdi-logout-variant"
          @click:append-outer="search"
          v-model="keyword"
        ></v-text-field>
      </v-col>

    </div>
    <v-card
      style="left: 10%"
      width="600"
      max-height="250"
      v-for="infos in value"
      :key="infos._id"
      @click="getSvg(infos)"
      :disabled="dialog"
      tile
      outlined
    >
      <v-card-text>
        <div
          id="title"
          v-if="$store.state.search_mode=='title'"
          v-html="$options.filters.font_color(infos.title)"
        ></div>
        <div
          id="title1"
          v-if="$store.state.search_mode!='title'"
          v-html="infos.title"
        ></div>
        <!--        <div id="title">{{infos.title}}</div>-->
        <div
          id="author"
        >
          {{infos.articleAuthor}}
        </div>
        <div
          id="xiangxi"
          class="text--primary"
          v-if="$store.state.search_mode=='content'"
          v-html="$options.filters.ellipsis(infos.content)"
        >
        </div>
        <div
          id="xiangxi1"
          class="text--primary"
          v-if="$store.state.search_mode!='content'"
          v-html="$options.filters.ellipsis1(infos.content)"
        >
        </div>
        <div
          id="dbn"
          style="color: blue"
        >
          {{infos.dynasty}}&#12288&#12288&#12288{{infos.bookname}}
        </div>
      </v-card-text>
    </v-card>
    <!-- 分页 -->
    <div
      style="text-align: center;margin-top: 20px"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageChange"
        :page-size="pageSize"
                     :total="totalusers" />
    </div>
    <v-dialog
      v-model="dialog"
      width="1000">
      <div
        style="display: flex"
      >
        <div
          style="width: 500px;background-color: white"
        >
          <div
            style="text-align: center;color: blue;font-size: 25px"
            v-if="$store.state.search_mode=='title'"
            v-html="$options.filters.font_color(detail.title)"
          ></div>
          <div
            style="text-align: center;color: blue;font-size: 25px"
            v-if="$store.state.search_mode!='title'"
            v-html="detail.title"
          ></div>
          <v-btn
            @click="pdf = true;dialog_slider = true"
                 text
                 color="indigo"
          >
            下载成pdf
          </v-btn>
          <v-btn
            @click="pdf = false;dialog_slider = true"
                 text
                 color="indigo"
          >下载成png
          </v-btn>
          <v-icon
            v-if="!add_collection"
            @click="AddCollection(detail._id)"
          >
            mdi-thumb-up-outline
          </v-icon>
          <v-icon
            v-if="add_collection"
          @click="DeleteBefore(detail._id)">
            mdi-thumb-up
          </v-icon>
          <div
            style="margin:auto;max-width: 450px;max-height: 500px;"
          >
            <strong
              color="black"
              v-if="$store.state.search_mode=='content'"
              v-html="$options.filters.font_color(detail.content)"
            ></strong>
            <strong
              color="black"
              v-if="$store.state.search_mode !='content'"
              v-html="detail.content"
            ></strong>
          </div>
        </div>
        <div
          style="width: 500px;background-color: white"
        >
          <v-carousel
            hide-delimiter-background
            height="700"
          >
            <template
              v-slot:prev="{ on, attrs }"
            >
              <v-btn
                color="secondary"
                v-bind="attrs"
                v-on="on"
                small
                fab
              >
                <v-icon>
                  mdi-arrow-left-bold
                </v-icon>
              </v-btn>
            </template>
            <template
              v-slot:next="{ on, attrs }"
            >
              <v-btn
                color="secondary"
                v-bind="attrs"
                v-on="on"
                small
                fab
              >
                <v-icon>
                  mdi-arrow-right-bold
                </v-icon>
              </v-btn>
            </template>
            <v-carousel-item
              v-for=" i in svg.length"
              :key="i"
            >
              <div v-html="svg[i-1]" >
                {{ svg[i-1] }}
              </div>
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
    </v-dialog>
    <v-dialog
      v-model="dialog_slider"
      width="450"
      persistent
    >
      <div
        style="background-color: white"
      >
        <h1>
          请选择下载的精确度
        </h1>
        <p style="color: red;margin-top: 5%">
          注意：选择数字越小下载的图片越清晰，选择1最清晰，但是有可能文件很大，请谨慎下载
        </p>
        <p
          style="color: red">
          点击下载可能会有卡顿，请稍等待
        </p>
        <v-slider
          style="width: 400px;margin-top: 10%"
          v-model="slider_value"
          thumb-label="always"
          step="1"
          ticks
          min="1"
          max="5"
        ></v-slider>
        <v-btn
          color="green darken-1"
          text
          @click="dialog_slider = false"
        >
          关闭
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="dialog_slider = false; pdf ? svg2pdf() : svg2png()"
        >
          下载
        </v-btn>
      </div>
    </v-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>确定取消收藏吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="DeleteCollection">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '../store/index'
import qs from "qs";
import * as jspdf from "jspdf";
import Canvg from "canvg";
import JSZip from "jszip";
import FileSaver from "file-saver";

export default {
  inject:['reload'],
  name: "search",
  filters:{
    ellipsis(value){
      if (!value) return ''

      let newvalue = value.split('<br>')
      if (newvalue.length == 1){
        if (value.length>100){
          value = value.slice(0,100)
        }
      }
      if (newvalue.length==2){
        if (newvalue[0].length<=42){
          if (newvalue[1].length>58){
            value = newvalue[0]+"<br>"+newvalue[1].slice(0,58)+"..."
          }else{
            value = newvalue[0]+"<br>"+newvalue[1]
          }
        }else{
          if (newvalue[0].length>100){
            value = newvalue[0].slice(0,100)+"..."
          }else{
            if(newvalue[0].length>84){
              value = newvalue[0]+"..."
            }else{
              if (newvalue[1].length>16){
                value = newvalue[0]+"<br>"+newvalue[1].slice(0,16)+"..."
              }else{
                value = newvalue[0]+"<br>"+newvalue[1]
              }
            }
          }
        }
      }

      if (newvalue.length >= 3){
        if (newvalue[0].length>100){
          value = newvalue[0].slice(0,100)+"..."
        }else {
          if(newvalue[0].length>84){
            value = newvalue[0].slice(0,84)+"..."
          }else{
            if (newvalue[0].length>42){
              if (newvalue[1].length>16){
                value = newvalue[0] + "<br>" + newvalue[1].slice(0,16)+"..."
              }else{
                value = newvalue[0] + "<br>" + newvalue[1]
              }
            }else{
              if (newvalue[1].length>58){
                value = newvalue[0] + "<br>" + newvalue[1].slice(0,58)+"..."
              }else{
                if (newvalue[1].length>42){
                  value = newvalue[0] + "<br>" + newvalue[1]+"..."
                }else {
                  if (newvalue[2].length>16){
                    value = newvalue[0] + "<br>" + newvalue[1] + "<br>" + newvalue[2].slice(0,16)+"..."
                  }else{
                    value = newvalue[0] + "<br>" + newvalue[1] + "<br>" + newvalue[2].slice(0,16)
                  }
                }
              }
            }
          }
        }
      }
      let search_keyword = store.state.search_keyword
      if (value.includes(search_keyword)){
        value = value.replaceAll(
          search_keyword,
          '<font style="color: red!important;">'+search_keyword+'</font>'
        )
        return value
      }else{
        return value
      }
    },
    ellipsis1(value){
      if (!value) return ''

      let newvalue = value.split('<br>')
      if (newvalue.length == 1){
        if (value.length>100){
          value = value.slice(0,100)
        }
      }
      if (newvalue.length==2){
        if (newvalue[0].length<=42){
          if (newvalue[1].length>58){
            value = newvalue[0]+"<br>"+newvalue[1].slice(0,58)+"..."
          }else{
            value = newvalue[0]+"<br>"+newvalue[1]
          }
        }else{
          if (newvalue[0].length>100){
            value = newvalue[0].slice(0,100)+"..."
          }else{
            if(newvalue[0].length>84){
              value = newvalue[0]+"..."
            }else{
              if (newvalue[1].length>16){
                value = newvalue[0]+"<br>"+newvalue[1].slice(0,16)+"..."
              }else{
                value = newvalue[0]+"<br>"+newvalue[1]
              }
            }
          }
        }
      }

      if (newvalue.length >= 3){
        if (newvalue[0].length>100){
          value = newvalue[0].slice(0,100)+"..."
        }else {
          if(newvalue[0].length>84){
            value = newvalue[0].slice(0,84)+"..."
          }else{
            if (newvalue[0].length>42){
              if (newvalue[1].length>16){
                value = newvalue[0] + "<br>" + newvalue[1].slice(0,16)+"..."
              }else{
                value = newvalue[0] + "<br>" + newvalue[1]
              }
            }else{
              if (newvalue[1].length>58){
                value = newvalue[0] + "<br>" + newvalue[1].slice(0,58)+"..."
              }else{
                if (newvalue[1].length>42){
                  value = newvalue[0] + "<br>" + newvalue[1]+"..."
                }else {
                  if (newvalue[2].length>16){
                    value = newvalue[0] + "<br>" + newvalue[1] + "<br>" + newvalue[2].slice(0,16)+"..."
                  }else{
                    value = newvalue[0] + "<br>" + newvalue[1] + "<br>" + newvalue[2].slice(0,16)
                  }
                }
              }
            }
          }
        }
      }
      return value
    },
    font_color:function (val){
      if (!val) return ''
      let search_keyword = store.state.search_keyword
      if (val.includes(search_keyword)){
        val = val.replaceAll(
          search_keyword,
          '<font style="color: red!important;">'+search_keyword+'</font>'
        )
        return val
      }else{
        return val
      }
    }
  },
  data () {
    return {
      mode: "content",
      keyword: store.state.search_keyword,
      dialog: false,
      page: 1,
      value: [],
      totalusers: 10, //总行数
      pageSize: 5, //每页几行
      startpage: 1, //起始页
      detail: {},
      svg: [],
      svg_id: [],
      dialog_slider: false,
      slider_value: 3,
      pdf: false,
      vague: "vague",
      username: store.state.JSON_user.username,
      add_collection: false,
      aid: '',
      dialogVisible: false
    }
  },
  watch: {

  },
  mounted() {
    this.getTaskList()
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    DeleteBefore(aid){
      console.log(aid)
      this.aid = aid
      this.dialogVisible = true
    },
    DeleteCollection(aid){
      this.dialogVisible = false
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
      this.add_collection = !this.add_collection
      this.$message.success("删除成功");
    },
    AddCollection(aid){
      this.add_collection = !this.add_collection
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/bookmark/insert',
        data: qs.stringify({
          username: this.username,
          aid: aid
        })
      }).then(res => {
        console.log(res.data)
      })
      this.$message.success("收藏成功");
    },
    async replaceImgPromise(svgData, i){
      return new Promise((resolve => {
        let imageUrl = /href="([^"]*)"/.exec(svgData[i])[1];
        let imageId = /href="http:\/\/211\.87\.232\.197:8081\/sdudoc\/img\/get_by_id\?id=([^"]*)"/.exec(svgData[i])[1];
        this.$http({
          method: 'post',
          url: 'http://211.87.232.198:8081/search-engine/solr/getPNG',
          params: {
            pid: String(imageId)
          }
        }).then(res => {
          console.log(res.data)
          svgData[i] = svgData[i].replace(imageUrl, res.data);
          resolve();
        });
      }));
    },
    async replaceImgPromiseAll(svgData){
      return new Promise((resolve => {
        let imageUrls = [];
        let imageIds = []
        for(let i = 0; i < svgData.length; i++){
          imageUrls[i] = /href="([^"]*)"/.exec(svgData[i])[1];
          let id = /href="http:\/\/211\.87\.232\.197:8081\/sdudoc\/img\/get_by_id\?id=([^"]*)"/.exec(svgData[i]);
          id = id || /href="http:\/\/211\.87\.232\.197:8080\/img\/get_by_id\?id=([^"]*)"/.exec(svgData[i]);
          imageIds[i] = id[1];
        }
        this.$http({
          method: 'post',
          url: 'http://211.87.232.198:8081/search-engine/solr/getPNGs',
          data: qs.stringify({
            pids: JSON.stringify(imageIds)
          })
        }).then(res => {
          for(let i = 0; i < svgData.length; i++){
            svgData[i] = svgData[i].replace(imageUrls[i], res.data[i]);
          }
          resolve();
        });
      }));
    },
    async replaceImg(svgData){
      await this.replaceImgPromiseAll(svgData)
      this.svg = svgData;
    },
    async svg2ImagePromise(svgData, i, dataUrls, width, height, padding){
      return new Promise((resolve => {
        let source = '<?xml version="1.0" standalone="no"?>\r\n' + svgData[i];
        let image = new Image;
        // 解决跨域 Canvas 污染问题
        // image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          let realWidth = width - padding * 2;
          let realHeight = realWidth / width * height ;
          context.drawImage(image, padding, padding, realWidth, realHeight);
          dataUrls[i] = canvas.toDataURL("image/png");
          resolve();
        }
        image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        let context = canvas.getContext("2d");
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, width, height);
      }));
    },
    async svg2png(){
      let pageWidth = 2480;
      let pageHeight = 3508;
      let drawWidth = pageWidth;
      let drawHeight = drawWidth / 592.28 * 841.89;

      drawWidth /= this.slider_value;
      drawHeight /= this.slider_value;

      let padding = drawWidth * 0.05;

      let dataUrls = [];

      for(let i = 0; i < this.svg.length; i++){
        await this.svg2ImagePromise(this.svg, i, dataUrls, drawWidth, drawHeight, padding);
        // let a = document.createElement("a");
        // a.download = "Atlas.png";
        // a.href = dataUrls[i];
        // a.click();
      }

      let zip = new JSZip();
      let folder = zip.folder(this.detail.title);
      for(let i = 0; i < dataUrls.length; i++){
        folder.file(this.detail.title + "_" + i + ".png", dataUrls[i].substring(22), {
          base64: true
        });
      }
      let title = this.detail.title;
      zip.generateAsync({ type: "blob" }).then(function(content) {
        FileSaver.saveAs(content, title + ".zip");
      });
    },
    async svg2pdf(){
      let pageWidth = 2480;
      let pageHeight = 3508;
      let drawWidth = pageWidth;
      let drawHeight = drawWidth / 592.28 * 841.89;

      drawWidth /= this.slider_value;
      drawHeight /= this.slider_value;

      let pdfImageWidth = 595.28;
      let pdfImageHeight = 592.28 / drawWidth * drawHeight;

      let padding = drawWidth * 0.05;

      let dataUrls = [];

      for(let i = 0; i < this.svg.length; i++){
        await this.svg2ImagePromise(this.svg, i, dataUrls, drawWidth, drawHeight, padding);
        // let a = document.createElement("a");
        // a.download = "Atlas.png";
        // a.href = dataUrls[i];
        // a.click();
      }

      let pdf = new jspdf.jsPDF('p', 'pt', 'a4');
      for(let i = 0; i < dataUrls.length; i++){
        pdf.addImage(dataUrls[i], 'PNG', 0, 0, pdfImageWidth, pdfImageHeight);
        if(i !== dataUrls.length - 1) pdf.addPage();
      }
      pdf.save(this.detail.title + ".pdf");
    },
    search(){
      let type = 1
      switch (this.mode) {
        case "content":
          if (this.vague == "vague"){
            type = 3
          }else{
            type = 6
          }
          break
        case "articleAuthor":
          if (this.vague == "vague"){
            type = 1
          }else{
            type = 4
          }
          break
        case "title":
          if (this.vague == "vague"){
            type = 2
          }else{
            type = 5
          }
          break
      }
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/shis/insert',
        data: qs.stringify({
          username: this.username,
          word: this.keyword,
          type: type
        })
      })
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/solr/query',
        data: qs.stringify({
          coreName: "dms_article",
          defaultField: this.mode,
          query: this.keyword,
          rows: 5,
          mode: this.vague
        })
      }).then(res => {
        if (res.data.numFound>0){
          window.localStorage.setItem('numFound',res.data.numFound)
          window.localStorage.setItem('search_keyword',this.keyword)
          window.localStorage.setItem('search_value',JSON.stringify(res.data.results))
          window.localStorage.setItem('search_mode',this.mode)
          this.$router.go(0)
        }else{
          this.$message.error('缺乏响应数据');
          return false;
        }
      })
    },
    //分页 pageChange当前页发生改变触发函数
    async pageChange(page) {
      console.log(page)
      this.startpage = page
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/solr/query',
        data: qs.stringify({
          coreName: "dms_article",
          defaultField: store.state.search_mode,
          query: store.state.search_keyword,
          start: (page-1)*5,
          rows: 5
        })
      }).then(res => {
        console.log(res.data)
        // window.localStorage.setItem('search_value',JSON.stringify(res.data.results))
        this.value = res.data.results
        for (let j=0;j<this.value.length;j++){
          this.value[j].content =  this.value[j].content.replaceAll("\\n","<br>")
        }
      });
      //调用获取列表的方法
      // this.getTaskList()
    },
    //获取分页列表
    getTaskList() {
      this.value = JSON.parse(window.localStorage.getItem('search_value'))
      for (let j=0;j<this.value.length;j++){
        this.value[j].content =  this.value[j].content.replaceAll("\\n","<br>")
      }
      this.totalusers = parseInt(store.state.numFound)
    },
    getSvg(value){
      this.svg_id = []
      this.detail = value
      console.log(value._id)
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/bookmark/exist',
        data: qs.stringify({
          username: this.username,
          aid: value._id
        })
      })
        .then(res => {
          this.add_collection = res.data
          console.log(res.data)
        })
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/solr/getSVG',
        data: qs.stringify({
          aid: this.detail._id,
          keyword: store.state.search_keyword,
          width: "500",
          height: "700",
          mode: window.localStorage.getItem('mode')
        })
      }).then(res => {
        console.log(res.data)
        let data = res.data.substring(5, res.data.length - 6)
        let list = data.split('/svg>, <svg')
        for (let i = 0; i < list.length; i++){
          list[i] = '<svg' + list[i] + '/svg>';
        }
        this.replaceImg(list)
      })
      this.dialog = true
      this.$http({
        method: 'post',
        url: 'http://211.87.232.198:8081/search-engine/shis/insert',
        data: qs.stringify({
          username: this.username,
          word: this.keyword,
          type: 7
        })
      })
    }
  }
}
</script>

<style scoped>

#title{
  color: blue;
  font-size: 25px;
  max-height: 60px;
  min-height: 30px;
  font-weight: 500;
}
#title1{
  color: blue;
  font-size: 25px;
  max-height: 60px;
  min-height: 30px;
  font-weight: 500;
}
#xiangxi{
  max-height: 70px;
  min-height: 50px;
  margin-bottom: 5px;
}
#xiangxi1{
  max-height: 70px;
  min-height: 50px;
  margin-bottom: 5px;
}
#author{
  height: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}
#dbn{
  height: 20px;
}
</style>
