$(document).ready(function(){
  var closed = true;
  $('.js-open-details').click(function() {
    if (closed) {
        $(this).addClass('js-active')
         $(this).find(".program-table__item--details").addClass("js-active")
        closed = false;
    }
    else {
        $(this).removeClass('js-active')
        $(this).find(".program-table__item--details").removeClass("js-active")
        closed = true;        
    }
  });

});

