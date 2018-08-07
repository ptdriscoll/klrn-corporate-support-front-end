//animate scrolling for anchor links that also have scroll class
(function () {
  //height of header
  var topOffset = 68;  
  
  //get all anchors that include scroll class and #, but not those with just #, and add click events 
  $('a.scroll[href*=\\#]:not([href=\\#])').click(
    function () {
      if (location.pathname.replace(/^\//, '')
          == this.pathname.replace(/^\//, '')
          && location.hostname == this.hostname) {
        var target = $(this.hash);  
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - topOffset
          }, 1000);
          return false;
        } //target.length   
      } //location hostname
    }) //on click
}());