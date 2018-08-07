//add module for parallax scrolling
//tutorial: http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641
$(function() {        
  var $window = $(window); //cache Window object
  
  $('div[data-type="parallax"]').each(function(){
    var $obj = $(this); // assign object
    var yPos, coords;

    $(window).on('scroll', (function() {
    
      //scroll at variable speed
      //the yPos is a negative value because we're scrolling up								
      yPos = -(($window.scrollTop() - $obj.offset().top) / $obj.data('speed'));
      
      //put together final position
      coords = '50% ' + yPos + 'px';
      
      //move background
      $obj.css({backgroundPosition: coords});
        
    })); //end window scroll
  });	
}); 