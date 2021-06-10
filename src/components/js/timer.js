      //
      //   let timeLeft=90*60*1000;//设定90分钟计时器
      //   function countTime(){
      //   if(timeLeft==0){
      //   alert("时间到！");
      //   return;
      // }
      //   let startMinutes=parseInt(timeLeft/(60*1000));
      //   let startSec=parseInt(timeLeft-(startMinutes*60*1000))/1000;
      //   document.getElementById("show").innerHTML="剩余时间:"+startMinutes+"分,"+startSec+"秒";
      //   timeLeft=timeLeft-1000;
      //   setTimeout(countTime,1000);
      // }
      //

              function countTime(){
              //获取当前时间
              let date=new Date();
                let now=date.getTime();
              //设置截至时间
                let endDate=new Date("2018-12-15");
                let end=endDate.getTime();
              //时间差
                let leftTime=end-now;
              //定义d,h,m,s保存倒计时的时间
                let d, h, m,s
              if(leftTime>=0){
              d=Math.floor(leftTime/1000/60/60/24);//天
              h=Math.floor(leftTime/1000/60/60%24);//时
              m=Math.floor(leftTime/1000/60%60);//分
              s=Math.floor(leftTime/1000%60);//秒
            }
              //将倒计时赋值到div中
              document.getElementById("_d").innerHTML=d+"天";
              document.getElementById("_h").innerHTML=h+"时";
              document.getElementById("_m").innerHTML=m+"分";
              document.getElementById("_s").innerHTML=s+"秒";
              setTimeout(countTime,1000);
            }
