// ==UserScript==
// @name        linetv.tw 解任務神器
// @namespace   Violentmonkey Scripts
// @match       *://www.linetv.tw/drama/*
// @grant       none
// @version     1.0
// @author      -
// @description 2023/8/27 上午2:18:23
// ==/UserScript==

count = 0;

setInterval(function(){
  // 標題 +s 確認script正常運作
  if (!document.title.startsWith("s ")) {
    document.title = "s " + document.title;
  };

  //自動播放影片(*出現播放按鈕)
  if (document.querySelector('span.icon_linetv_play')){  //if (document.querySelector('video[id="player_html5_api"]').paused){
    document.querySelector('video[id="player_html5_api"]').muted = true;
    document.querySelector('span.icon_linetv_play').click();  //document.querySelector('video[id="player_html5_api"]').play();
  }else{
    //自動關掉彈跳廣告(*出現叉叉按鈕)
    if (!document.querySelector('.vjs-overlay-pause-ad').classList.contains('vjs-hidden')){
      document.querySelector('.vjs-overlay-pause-ad').classList.add('vjs-hidden');
    };
  };

  //如果讀取太久沒有載入則重新整理頁面(*出現波浪動畫)
  if(window.getComputedStyle(document.querySelector('.vjs-loading-spinner')).display === 'block'){
    count = count + 1;
    if(count>30){
      window.location.reload();
    }
  }else{
    count = 0;
  }

  //廣告加速(*廣告影片長度超過0秒)
  if (document.querySelector('video[title="Advertisement"]').duration){
    document.querySelector('video[title="Advertisement"]').playbackRate = 16.0;
  };

} , 1000);
