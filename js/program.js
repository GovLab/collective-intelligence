$(document).ready(function(){
  var closed = true;
  var open = false;
  $('.js-open-details').click(function() {
    if ($(this).find(".program-table__item--details").hasClass("js-active")) {
      open = true;
      closed = false;
      // $(this).find(".js-open-details")
    }
    if (closed) {
      $(this).addClass('js-active')
      $(this).find(".program-table__item--details").addClass("js-active")
      closed = false;
    } else if (!closed && open) {
      $(this).removeClass('js-active');
      $(this).find(".program-table__item--details").removeClass("js-active")
      closed = true;
    } else {
      $(this).removeClass('js-active')
      $(this).find(".program-table__item--details").removeClass("js-active")
      closed = true;
    }
  });
});
