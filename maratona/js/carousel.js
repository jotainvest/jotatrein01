setInterval(function(){
  var carousel = $('.carousel .card:first-of-type');
  $('.carousel .card').each(function(){
    $(this).animate({left: '-260px'}, '400', function(){
      $(carousel).insertAfter('.carousel .card:last-of-type');
      $(this).css('left', '0');
    });
  });
}, 6000);
