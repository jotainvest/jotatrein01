$(document).ready(function(){
  var distance = $(window).height() * 3/4;
  var initial = 0;

  function counting(){
    $('.count').each(function(){
      var $this = $(this);
      var totalValue = $this.html();
      var dotPosition = totalValue.indexOf('.');
      var increment = setInterval(incrementNumber, 5);

      if(dotPosition >= 0){
        var targetValue = parseInt(totalValue.replace('.', ''));
        var hDot = 'have';
        incrementNumber();
      }else{
        var targetValue = parseInt(totalValue);
        incrementNumber();
      }

      function incrementNumber(){
        if(initial < targetValue){
          initial++;
          $this.html(initial);
        }else{
          clearInterval(increment);

          if(hDot === 'have'){
            targetValue = targetValue.toString();
            var numberWithDot = targetValue.slice(0, dotPosition) + '.' + targetValue.slice(dotPosition, targetValue.length);

            $this.html(numberWithDot);
          }
        }
      }
    });
  }

  function animateScroll(){
    var itemTop = $('.count').offset().top - distance;
    if($(document).scrollTop() >= itemTop){
      counting();
    }
  }

  var findCount = $(document).find('.count');
  if(findCount.length >= 1) animateScroll();

  $(window).scroll(function(){
    if(findCount.length >= 1) animateScroll();
  });

  //------------------

  function anime(){
    $('.bonus .container .itensBonus .flex').each(function(){
      var itemTop = $(this).offset().top - distance;

      if($(document).scrollTop() >= itemTop){
        $(this).addClass('anime');
      }
    });
  }

  anime();

  $(window).scroll(function(){
    anime();
  });
});
