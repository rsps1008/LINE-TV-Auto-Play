// ==UserScript==
// @name        linetv.tw 解任務神器
// @namespace   Violentmonkey Scripts
// @match       *://www.linetv.tw/drama/*
// @grant       none
// @version     1.0
// @author      -
// @description 2024/8/26 上午10:18:23
// ==/UserScript==

count = 0;
StopCount = 0;
LastTime = 0;

console.log("start:",new Date());

setInterval(function(){
  // 標題 +s 確認script正常運作
  if (!document.title.startsWith("ltv")) {
    document.title = "ltv" + document.title;
  };

  // 檢查最後一集
  var listItems = document.querySelectorAll('ul.flex.flex-auto.content-start.overflow-y-hidden.hover\\:overflow-y-auto.mx-\\[calc\\(var\\(--eps-menu-list-padding\\)\\*-1\\.5\\)\\].flex-col.pr-0 > li');
  var isLastItemHighlighted = listItems[listItems.length - 1].classList.contains('bg-linetv-grey-700');
  if(isLastItemHighlighted){
    const video = document.querySelector('video[id="player_html5_api"]');
    if(video.currentTime/video.duration > 0.96){
      if (!document.title.startsWith("ltv-end")) {
        document.title = "ltv-end " + document.title;
      };
    }
  }

  //自動播放影片(*出現播放按鈕)
  if (document.querySelector('video[id="player_html5_api"]').paused){ // if (document.querySelector('span.icon_linetv_play')){
    document.querySelector('video[id="player_html5_api"]').muted = true;
    document.querySelector('video[id="player_html5_api"]').play(); //document.querySelector('span.icon_linetv_play').click();
  }else{
    //自動關掉彈跳廣告(*出現叉叉按鈕)
    if (!document.querySelector('.vjs-overlay-pause-ad').classList.contains('vjs-hidden')){
      document.querySelector('.vjs-overlay-pause-ad').classList.add('vjs-hidden');
    };
  };

  //如果太久沒有播放
  if(document.querySelector('video[id="player_html5_api"]').currentTime - LastTime == 0){
    StopCount = StopCount + 1;
    console.log("StopCount",StopCount);
    if(StopCount>10){
      document.querySelector('video[id="player_html5_api"]').play();
    }
    if(StopCount>20){
      StopCount = 0;
      window.location.reload();
    }
  }else{
    LastTime = document.querySelector('video[id="player_html5_api"]').currentTime;
    StopCount = 0;
  }

  //廣告加速(*廣告影片長度超過0秒)
  if (document.querySelector('video[title="Advertisement"]').duration){
    document.querySelector('video[title="Advertisement"]').playbackRate = 16.0;
  };

} , 2000);