//takes [playlistID, carouselID] item or or array of such items
//and adds script links and callbacks to grab playlists from YouTube
klrn.loadYoutubePlaylists = function(lists) {  
  var elem, body = document.querySelector('body'), i; 
  
  //if only one item, not nested in outer array, add it to an array to loop through once
  if (lists[0].constructor !== Array) lists = [lists];
  
  for (i=0;i<lists.length;i++) {
    //create callbacks for each playlist 
    domSelector = '#' + lists[i][1]
    window[lists[i][1]] = new Function('data', 'return klrn.parseYoutubePlaylist(data, "' + domSelector + '")');
    
    //create script calls to YouTube for each playlist
    elem = document.createElement('script');
    elem.async = 1;  
    elem.setAttribute('type', 'text/javascript');     
    elem.src = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId='
      + lists[i][0]    
      + '&key=AIzaSyDraaM_dJplqR3JbRtmx-HSIMfIZHTqXV4&callback='
      + lists[i][1];       
    body.appendChild(elem); 
  }
}