var screenWidth = $(window).width();
var fullScreenHeight = $('.fullScreen.videoContainer').height();
console.log(fullScreenHeight);
var distanceVideo = 80;
if(screenWidth > 768) distanceVideo = 360;
console.log(distanceVideo);
var videoContainerTop = $('.fullScreen.videoContainer').offset().top + distanceVideo;

$(window).scroll(function(){
  if($(this).scrollTop() >= videoContainerTop){
    $('.fullScreen.videoContainer').addClass('fixedVideo');
    $('.spaceContainer').show().css("height", fullScreenHeight + "px");
  }else if($(this).scrollTop() <= videoContainerTop){
    $('.videoContainer.fixedVideo').removeClass('fixedVideo');
    $('.spaceContainer').hide();
  }
});
