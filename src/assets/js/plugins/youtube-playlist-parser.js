//object for storing and managing YouTube video objects
klrn.youtubeVideos = {
  'getObjects': [],
  'setObject': function(videoID) {
    var video = new YT.Player(videoID, {
			events: {
			'onReady': this.onPlayerReady,
			'onStateChange': this.onPlayerStateChange
			}
		});
    this.getObjects.push(video);
    return video;
  },
  'onPlayerReady': function(e) {
    //e.target.playVideo();
    if (window.ga && ga.create) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Become a Sponsor Videos',
        eventAction: 'Plays',
        eventLabel: e.target.getVideoData()['title']
      });
    }
  },
  'onPlayerStateChange': function(e) {
    //when a video plays, make sure any others pause
    if (e.data == YT.PlayerState.PLAYING) {
      for (i=0;i<klrn.youtubeVideos.getObjects.length;i++) {         
        if (klrn.youtubeVideos.getObjects[i].h.id === e.target.h.id) continue;      
        klrn.youtubeVideos.getObjects[i].pauseVideo();
      }
    }  
  },
  'stopVideos': function() {
    var i;
    for (i=0;i<this.getObjects.length;i++) {      
      this.getObjects[i].stopVideo();
    }    
  },  
  'pauseVideos': function() {
    var i;
    for (i=0;i<this.getObjects.length;i++) {      
      this.getObjects[i].pauseVideo();
    }    
  }  
}    

klrn.loadVideo = function(videoID) {  
  return function(e) {    
    //remove click event since it's only needed once
    e.target.removeEventListener(e.type, arguments.callee);

    //make sure target is set to embed_wrapper even if a nested element is clicked     
    var target = e.target;
    if (e.target.tagName.toLowerCase() === 'path') target = e.target.parentNode.parentNode.parentNode;
    else if (e.target.tagName.toLowerCase() === 'svg') target = e.target.parentNode.parentNode;
    else if (e.target.tagName.toLowerCase() === 'button') target = e.target.parentNode;
    else if (e.target.className.toLowerCase() === 'video_title') target = e.target.parentNode;

    //add iframe  
    var iframe = document.createElement('iframe');
    var videoLink = 'https://www.youtube.com/embed/' 
        + videoID 
        + '/?rel=0&enablejsapi=1&version=3&autohide=1&showinfo=0&html5=1&playsinline=1';
    
    //for playing video from within click event when video is ready 
    //to get around IOS blocking autoplay after loading video    
    var videoObject, attempts = 0;
    var playWhenReady = function(video) {
      if (attempts === 60) return;
      if (video && typeof video.playVideo === 'function') {
        video.playVideo();
      }
      else {
        attempts += 1;
        setTimeout(function(){playWhenReady(video)}, 50);
      }      
    }    
    
    //load iframe
    iframe.className = 'youtube-player';
    iframe.id = videoID;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('marginwidth', '0');
    iframe.setAttribute('marginheight', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('webkit-playsinline', '');
    iframe.setAttribute('allow', 'autoplay'); //chrome requires to play on load from a click    
    iframe.src = videoLink;
    
    //empty video wrapper div and add video
    target.innerHTML = '';
    target.appendChild(iframe);
    
    //create video object to manage plays, pauses and event tracking
    videoObject = klrn.youtubeVideos.setObject(videoID); 
    playWhenReady(videoObject);    
  }
}

klrn.parseYoutubePlaylist = function(data, carousel) {
  
  //prep variables for parsing and dom insertion
  var target = document.querySelector(carousel + ' .carousel-item.active');
  var i, thePlayer, listID, imgUrl, videoTitle;
  var shorterTitle, cleanShorterTitle, newTitle;
  var carouselControls = document.querySelectorAll(
    '.carousel-control-prev, .carousel-control-next');
  
  //add all created elements to this, and then make only one dom insertion
  var fragment = document.createDocumentFragment(), div1, div2; 
  
  //grab elements to show and hide when loading's complete 
  var showElems = document.querySelectorAll(carousel + ' .d-none'); 
  var hideElem = target.querySelector('.loader'); 
  
  //helper to trim long titles
  var trimTitle = function(title, index) {
    var index = index || 60;
    if (title.length < index+1) return title;
    
    shorterTitle = title.substring(0, index);
    if (title.charAt(index-1) === ' ') {
      newTitle = shorterTitle + '...';
    }
    else if (title.charAt(index) === ' ') newTitle = shorterTitle + ' ...';  
    else {
       cleanShorterTitle = shorterTitle.split(/\ +/)
       cleanShorterTitle.pop();
       newTitle = cleanShorterTitle.join(' ') + ' ...';
    }
    return newTitle; 
  }
  
  //YouTube style play button
  var playButton = '<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>'
  
  //console.log(carousel);
  //console.log(data);
  
  //set dom elements for each video 
  for (i = 0; i < data.items.length; i++) {
    if (!data.items[i].snippet.thumbnails.high) continue;
    imgUrl = data.items[i].snippet.thumbnails.high.url;
    videoID = data.items[i].snippet.resourceId.videoId;
    //videoTitle = trimTitle(data.items[i].snippet.title);
    videoTitle = data.items[i].snippet.title;
    
    //carousel item container
    div1 = document.createElement('div');
    div1.className = 'carousel-item';
    
    //video wrapper
    div2 = document.createElement('div');
    div2.className = 'embed_wrapper ratio_16-9 youtube-player';
    div2.style.backgroundImage = 'url(' + imgUrl + ')';
    div2.addEventListener('click', klrn.loadVideo(videoID))
    
    //title div
    div3 = document.createElement('div');
    div3.className = 'video_title';
    div3.innerHTML = videoTitle;
    
    //YouTube play button
    button = document.createElement('button');
    button.className = 'ytp-large-play-button ytp-button temp';
    button.setAttribute('aria-label', 'Play');
    button.innerHTML = playButton;
    
    //put it together
    div2.appendChild(button);
    div2.appendChild(div3);    
    div1.appendChild(div2);
    fragment.appendChild(div1);    
  }
  
  //insert everything as siblings after target element
  target.parentNode.insertBefore(fragment, target.nextSibling); 
  
  //show and hide pre-loading elements
  hideElem.classList.add('d-none');
  for (i=0;i<showElems.length;i++) { 
    showElems[i].classList.remove('d-none'); 
  }

  //add events to pause videos when any carousel's previous or next controls get clicked 
  for (i=0;i<carouselControls.length;i++) {
    carouselControls[i].addEventListener('click', function() { 
      klrn.youtubeVideos.pauseVideos();
    });
  }  
}