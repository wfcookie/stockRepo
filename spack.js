process.env.http_proxy="http://cnwuco:welcome19!@proxy.chn.fujixerox.com:8000";
process.env.https_proxy="https://cnwuco:welcome19!@proxy.chn.fujixerox.com:8000";
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

function getInfoCallBack(packInfo,callback) { 
       req(npmUrl+packInfo.packUrl,function(err,res,body){
         if(err) {
           console.log(err);
           return;
         } else {
           if(res.statusCode === 200) {
             var  downloads = parseInt($(body).find('strong.monthly-downloads').text());
             var pack={downloads:downloads,packInfo:sprintf('packName:%s  packUrl:%s',packInfo.packName,packInfo.packUrl)};
            callback(null,packInfo)
           }
         }
       } );
}

req(url,function(err,res,body){
  if(err){
    console.log(err);
    return ;
  }
  if(!err) {
    if(res.statusCode === 200) {
        var packageArr=[];
        $(body).find('div[class="package-details"] h3').each(function(index,package){
          var a = $(package).find('a'); 
         url = npmUrl+a.attr('href');
         var packInfo={packName:a.text(),packUrl:npmUrl+a.attr('href')};
         packageArr.push(packInfo);
        });
      var callbacks = packageArr.map(function(item) {
          return getInfoCallBack.bind(null,item);
      });
    
      async.parallel(callbacks,function(err,results){
        if(err) {
           console.log(err);
           return;
        }
        printResult(results);
      });
    }
  }
});

function printResult(staticArr) {
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
}
