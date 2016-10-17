$(document).ready(function() {
  var currentDate = new Date($.now()).toISOString().slice(0, 10);
  var allEvents = $(".e-event").find("time");

  allEvents.each(function() {
    var eventDate = $(this).attr("datetime");

    if ( eventDate >= currentDate ) {
      $(".e-event").addClass("m-current");
    };

  });

});
