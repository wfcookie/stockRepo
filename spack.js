var req = require('request');
var async=require('async');
var sprintf=require('sprintf');
var jsdom = require('jsdom').jsdom();
var $= require('jquery')(jsdom.defaultView);
if(process.argv.length < 3){
  console.log('input search package\n');
  return -1;
}
var package = process.argv[2];
var npmUrl = "https://www.npmjs.com"
var url = npmUrl+"/search?q="+package;
console.log('url:%s\n',url);
var staticArr=[];
var packageArr=[];
async.waterfall(
  function(callback) {
      req(url,function(err,res,body){
        if(!err) {
          if(res.statusCode === 200) {
              $(body).find('div[class="package-details"] h3').each(function(index,package){
                var a = $(package).find('a'); 
               url = npmUrl+a.attr('href');
               var packInfo={packName:a.text(),packUrl:npmUrl+a.attr('href');
               packageArr.push(packInfo);
              });
              callback(null,packageArr);
          }
        }
      });
    }
  },
  function(result,callback) {
         async.paramel
         req(npmUrl+a.attr('href'),function(err,res,body){
           if(err) {
             console.log(err);
             return;
           } else {
             if(res.statusCode === 200) {
               var  monthDownloads = $(body).find('strong.monthly-downloads').text();
                var packInfo = sprintf('package:name=[%s]:url=[%s]:monthDownloads=[%s]',a.text(),a.attr('href'),
                           monthDownloads
                           );
              staticArr.push({packInfo:packInfo,downloads:parseInt(monthDownloads)});;               
              console.log(staticArr.length);
             }
           }
         } );

  },
  function(err,result){

  });
console.log(staticArr.length);
var sortArr = staticArr.sort(function(a,b) {
             if(a.downloads > b.downloads) {
               return 1;
             }
             if (a.downloads === b.downloads) {
               return 0;
             }
             return -1;
});

for(var i=0;i<sortArr.length;i++){
  console.log(sortArr[i].packInfo+' downloads:'+sortArr[i].downloads+"\n");
}
