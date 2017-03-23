$(document).ready(function() {
  $(".download-button").click(function() {
    var doc = new jsPDF();
    doc.setFont('helvetica');

    doc.addImage($('#gov-logo').get(0), 65, 10, 80, 10);
    doc.addImage($('#gov-footer').get(0), 7, 275, 195, 18);

    doc.setFontSize(22);
    doc.text(10, 30, 'Program');

    doc.setFontSize(16);
    doc.text(10, 40, 'Day One');

    var titles = $('.program-table__item--title');
    var details = $('.program-table__item--details');
    var times = $('.program-table__time');

    doc.setFontSize(12);

    var y = 50;
    var column = 1;
    var first = true;
    var i = 0;
    var j = 0;

    titles.each(function( index ) {
      if ($(this).hasClass('break') && first) {
        y += 5
        doc.setFontSize(16);
        doc.text(10, y, 'Day Two');
        doc.setFontSize(12);
        first = false;
        y += 15;
      } else {
        if ($(this).hasClass('parallel') && column == 1) {
          doc.text($(times[i]).text(), 10, y, {'width': 180});
          doc.text($(this).text(), 60, y, {'width': 90});
          column = 2;
          return;
        } else if ($(this).hasClass('parallel') && column == 2) {
          doc.text($(this).text(), 110, y, {'width': 90});

          var detailsLines1 = $(details[j]).html();
          var detailsLines2 = $(details[j+1]).html();

          if ($(details[j]).text().trim().length > 0) {
            y += 5;
            if (y + doc.getTextDimensions(detailsLines1).h > 250 || y + doc.getTextDimensions(detailsLines2).h > 250) {
              doc.addPage();
              doc.addImage($('#gov-logo').get(0), 65, 10, 80, 10);
              doc.addImage($('#gov-footer').get(0), 7, 275, 195, 18);
              y = 30;
            }
            doc.fromHTML(detailsLines1, 10, y, {'width': 80});
          }

          j++;

          if ($(details[j]).text().trim().length > 0) {
            doc.fromHTML(detailsLines2, 100, y, {'width': 80});
            if (doc.getTextDimensions(detailsLines1).h > doc.getTextDimensions(detailsLines2).h) {
              var yd = doc.getTextDimensions(detailsLines1).h;
            } else {
              var yd = doc.getTextDimensions(detailsLines2).h;
            }
            y += yd + 5;
          }

          column = 1;
        } else {
          doc.text($(times[i]).text(), 10, y, {'width': 180});
          doc.text($(this).text(), 60, y, {'width': 180});

          if ($(details[j]).text().trim().length > 0) {
            var detailsLines = $(details[j]).html();
            y += 5;
            if (y + doc.getTextDimensions(detailsLines).h > 250) {
              doc.addPage();
              doc.addImage($('#gov-logo').get(0), 65, 10, 80, 10);
              doc.addImage($('#gov-footer').get(0), 7, 275, 195, 18);
              y = 30;
            }
            doc.fromHTML(detailsLines, 10, y, {'width': 180});
            y += doc.getTextDimensions(detailsLines).h - 5;
          }
        }

        if (y > 250) {
          doc.addPage();
          doc.addImage($('#gov-logo').get(0), 65, 10, 80, 10);
          doc.addImage($('#gov-footer').get(0), 7, 275, 195, 18);
          y = 30;
        } else {
          y += 10;
        }
        i++;
        j++;
      }
    });

    doc.save('program.pdf');
  })
})
