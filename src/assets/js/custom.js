window.klrn = window.klrn || {};

var jquery = require('jquery/dist/jquery');
global.$ = global.jQuery = jquery;

require('jquery/dist/jquery');
require('popper.js/dist/umd/popper');
require('bootstrap/dist/js/bootstrap');
require('./plugins/parallax');
require('./plugins/in-view');
require('./plugins/animate-scrolling');
require('./plugins/youtube-playlist-loader');
require('./plugins/youtube-playlist-parser');

//set up plugins and manage page events
(function () {
  //get page
  var page = location.pathname;
  if (page) page = page.replace('corporate-support/', '');
  if (page) page = page.split('/')[1];
  if (!page) page = 'home'; 
  else page = page.toLowerCase();  
  
  //keep contact form in view after attempted submit
  if (location.href.indexOf('#contact_us') != -1) {
    location.hash = '';
    location.hash = '#contact_us';
  }  

  if (page == 'examples') {
    
    //youtubePlaylistLoader takes an array with a playlist id first, and carousel id second 
    //or it can take an array of multiple [playlist id, carousel id] items  
    var youtubePlaylists = [
      ['PLO5rIpyd-O4HEc0Z15XnYzDgyTilZ7Buq', 'medicalCarousel'],    
      ['PLO5rIpyd-O4Fy260DvVYK1ZLKOVVHl6q9', 'eventsCarousel'],
      ['PLO5rIpyd-O4ENrvuAAgppRsUXjcdf5JPc', 'individualsCarousel'],
      ['PLO5rIpyd-O4Gwyrn8jhl2dpf6iJ_OXKTN', 'productsCarousel'],
      ['PLO5rIpyd-O4GxeLEmOCxA7D_h7szI9utb', 'schoolsCarousel'],
      ['PLO5rIpyd-O4H0EeIliUPAxI8v5Lk2A4Kq', 'financialCarousel'] 
    ];
    
    klrn.loadYoutubePlaylists(youtubePlaylists);  
  }    

  //remove active classes in nav when needed
  var removeActive = function () {
    $('#navbar .active').removeClass('active');
  }
  
  //set actions based on elements in viewport 
  $(window).on('resize scroll', function() {  

    //stop and start carousels when in view or not
    $('.carousel').each(function() {
      if ($(this).inView()) {
          $(this).carousel('cycle');
      }
      else {
        $(this).carousel('pause');
      } 
    }); 

    //highlight navigation
    if ($('#footer').inView()) {
      removeActive();
      $('a[href$="#footer"]').addClass('active');
    } 
    else {
      removeActive();
      $('#' + page).addClass('active');
    }    
  });
  
  //activate scroll to check for any active elements
  $(function () {
    $(window).scroll();
  });
  
  //fade in body so loading doesn't look so jerky
  $('body').fadeTo(250, 1, function(){
      document.querySelector('html').style.backgroundColor = '#f8fbfc';
  });  
  
  //add click event to close mobile menu when Become a Sponsor is clicked
  var becomeSponsor = document.querySelector('#become_sponsor');  
  var navbar = document.querySelector('#navbar');
  if (becomeSponsor && navbar) becomeSponsor.addEventListener('click', function() {
    navbar.classList.remove('show');    
  });  
  
  //add click event to validate form and show loading image
  var submit_loader = document.querySelector('#submit_loader');
  var contact_us = document.querySelector('#contact_us');
  var contact_us_submit = document.querySelector('#contact_us_submit');
  if (contact_us_submit) contact_us_submit.addEventListener('click', function() {
    contact_us.classList.add('d-none'); 
    if (submit_loader) submit_loader.classList.remove('d-none');   
    location.hash = '#contact_us';    
  });
}());

//add modules to klrn object  
(function (exports) { 

  exports.config = function(optionClass) {
  };
  
}(klrn)); //end adding modules to klrn object 