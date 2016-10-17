$(document).ready(function() {
    var allEvents = $(".e-event");
    var allTimeboxes = $(".e-timebox");
    var first = true;


    allEvents.each(function(i) {
        var eventDate = new Date($(this).find("time").attr("datetime"));

        if ( first && eventDate >= $.now() ) {
            $(this).addClass("m-current");
            $(allTimeboxes.get(i)).addClass("m-current");
            first = false;
        };

    });

});
