javascript:(function() { setInterval(function(){
	if (document.querySelector("#player > div.vjs-control-bar > button.vjs-play-control.vjs-control.vjs-button").textContent.includes("播放")){
		document.querySelector("#player > div.vjs-control-bar > button.vjs-play-control.vjs-control.vjs-button.vjs-paused").click();
	};}
, 3000);})()
