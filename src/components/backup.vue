<template>

</template>

<script>
import jspdf from "jspdf";

export default {
  name: "backup"
}
/*
svg23pdf(svgData){
  let contentWidth = 500;
  let contentHeight = 700;

  //一页pdf显示html页面生成的canvas高度;
  let pageHeight = contentWidth / 592.28 * 841.89;
  //未生成pdf的html页面高度
  let leftHeight = contentHeight;
  //页面偏移
  let position = 0;
  //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
  let imgWidth = 595.28;
  let imgHeight = 592.28/contentWidth * contentHeight;

  let pdf = new jspdf.jsPDF('p', 'pt', 'a4');
  //pdf.addSvgAsImage(svgData, 0, 0, imgWidth, imgHeight);
  pdf.html(this.$refs.card)
  pdf.save("content.pdf");


  let canvas = document.createElement("canvas");
  let imageUrl = /href="([^"]*)"/.exec(svgData)[1];
  let imageId = /href="http:\/\/211\.87\.232\.197:8081\/sdudoc\/img\/get_by_id\?id=([^"]*)"/.exec(svgData)[1];
  this.$http({
    method: 'post',
    url: 'http://211.87.232.198:8081/search-engine/solr/getPNG',
    params: {
      pid: String(imageId)
    }
  }).then(res => {
    console.log(res.data)
    svgData = svgData.replace(imageUrl, res.data)

    var serializer = new XMLSerializer();
    var source = '<?xml version="1.0" standalone="no"?>\r\n' + res.data;
    var image = new Image;
    image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    console.log(image.src)
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext("2d");
    context.fillStyle = '#fff';//#fff设置保存后的PNG 是白色的
    context.fillRect(0, 0, 10000, 10000);
    image.onload = function() {
      context.drawImage(image, 0, 0);
      var a = document.createElement("a");
      a.download = "Atlas.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    }

    let pdf = new jspdf.jsPDF('p', 'pt', 'a4');
    pdf.addSvgAsImage(svgData,0, 0, imgWidth, imgHeight);
    pdf.save('1.pdf')
  })




  let image = new Image;
  image.src = imageUrl;
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    svgData = svgData.replace(imageUrl, canvas.toDataURL("image/png"))
    console.log(svgData)
  }

  var serializer = new XMLSerializer();
  var svg1 = this.$refs.card
  var toExport = svg1.cloneNode(true);
  var bb = svg1.getBBox();
  toExport.setAttribute('viewBox', bb.x + ' ' + bb.y + ' ' + bb.width + ' ' + bb.height);
  toExport.setAttribute('width', bb.width);
  toExport.setAttribute('height', bb.height);
  var source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(svg1);
  var image = new Image;
  image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  console.log(image.src)
  var canvas = document.createElement("canvas");
  canvas.width = bb.width;
  canvas.height = bb.height;
  var context = canvas.getContext("2d");
  context.fillStyle = '#fff';//#fff设置保存后的PNG 是白色的
  context.fillRect(0, 0, 10000, 10000);
  image.onload = function() {
    context.drawImage(image, 0, 0);
    var a = document.createElement("a");
    a.download = "Atlas.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }

  let canvas = document.createElement('canvas');

  let svgXml = new XMLSerializer().serializeToString(this.$refs.card);//在svg标签上 用ref=elSvg
  console.log(svgXml); //处理svg传给canvg的格式(这里会输出传给后端的字段)

  let canvg = new Canvg(canvas.getContext('2d'), svgXml);
  let imgData = canvas.toDataURL('image/png');
  console.log(imgData)


  let canvg = new Canvg(canvas.getContext('2d'), svgData);
  canvg.start()

  canvg.ready().then(() => {
    let imgData = canvas.toDataURL('image/png');
    console.log(imgData)
    let pdf = new jspdf.jsPDF('p', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save("content.pdf");
  })

  return;
  let imgData = canvas.toDataURL('image/png');
  console.log(imgData)
  let pdf = new jspdf.jsPDF('p', 'pt', 'a4');
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

  //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
  //当内容未超过pdf一页显示的范围，无需分页
  // if (leftHeight < pageHeight) {
  //   pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
  // } else {
  //   while(leftHeight > 0) {
  //     pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
  //     leftHeight -= pageHeight;
  //     position -= 841.89;
  //     //避免添加空白页
  //     if(leftHeight > 0) {
  //       pdf.addPage();
  //     }
  //   }
  // }

  pdf.save("content.pdf");
},*/
</script>

<style scoped>

</style>
