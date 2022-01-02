var video = document.getElementById('video');

function playM3u8(url){
  if(Hls.isSupported()) {
      video.volume = 0.3;
      var hls = new Hls();
      var m3u8Url = decodeURIComponent(url)
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);
      hls.subtitleTrack = 0;			//disable subtitles
      hls.subtitleDisplay = false;              //disable subtitles
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
	video.controls = false   //turn off/on control panel  

			       
      });
      document.title = url
    }
	else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = url;
		video.addEventListener('canplay',function() {
		  video.play();
		  video.controls = false;    //turn off/on control panel
		});
		video.volume = 0.3;
		document.title = url;
  	}vidFullscreen();
}

function playPause() {
    video.paused?video.play():video.pause();
}

function volumeUp() {
    if(video.volume <= 0.9) video.volume+=0.1;
}

function volumeDown() {
    if(video.volume >= 0.1) video.volume-=0.1;
}

//function seekRight() {
//    video.currentTime+=5;
//}

function seekRight() {

}

//function seekLeft() {
//    video.currentTime-=5;
//}

function seekLeft() {    
    
}	
	
function menu() {
	window.location.href = "../";    //go to the menu page (index.html)
}

//fullscreen function
function vidFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
}


playM3u8(window.location.href.split("#")[1])
$(window).on('load', function () {
    $('#video').on('click', function(){this.paused?this.play():this.pause();});
    Mousetrap.bind('space', playPause);
    //Mousetrap.bind('up', volumeUp);
    //Mousetrap.bind('down', volumeDown);
    //Mousetrap.bind('f', vidFullscreen);
    //Mousetrap.bind('right', seekRight);
    //Mousetrap.bind('left', seekLeft); 
	
    Mousetrap.bind('right', seekRight);
    Mousetrap.bind('left', seekLeft);    
    Mousetrap.bind('up', menu); // press "up" to activate function "menu"
    Mousetrap.bind('down', vidFullscreen); // press "down" to activate function "fullscreen"

});
