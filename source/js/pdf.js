$(document).ready(function() {
  $(".download-button").click(function() {
    var doc = new jsPDF();
    doc.setFont('helvetica');

    doc.addImage($('#gov-logo').get(0), 41, 8, 130, 22);
    doc.addImage($('#gov-footer').get(0), 8, 270, 195, 26);

    doc.setFontSize(22);
    doc.text(10, 40, 'Program');

    doc.setFontSize(16);
    doc.text(10, 50, 'Day One');

    var titles = $('.program-table__item--title');
    var details = $('.program-table__item--details');
    var times = $('.program-table__time');

    doc.setFontSize(12);

    var y = 60;
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
          doc.text($(times[i]).text().trim(), 10, y);
          y += 10;
          doc.text($(this).text(), 10, y);
          column = 2;
          return;
        } else if ($(this).hasClass('parallel') && column == 2) {
          doc.text($(this).text(), 100, y);

          if ($(details[j]).find('.program-table__item--speaker').length) {
            // none of the split sessions use this but should update if that changes
          } else {
            $(details[j]).find('li').each(function(index) {
              if (y > 260) {
                doc.addPage();
                doc.addImage($('#gov-logo').get(0), 41, 8, 130, 22);
                doc.addImage($('#gov-footer').get(0), 8, 270, 195, 26);
                y = 40;
              } else {
                y += 8;
              }
              doc.setFontSize(10);

              // col 1
              var unsplit = $(this).text();
              var t = doc.splitTextToSize(unsplit, 80);
              if (unsplit.length) {
                doc.text(10, y, t);
              }

              // col 2
              unsplit = $($(details[j+1]).find('li')[index]).text();
              var t2 = doc.splitTextToSize(unsplit, 80);
              if (unsplit.length) {
                doc.text(100, y, t2);
              }

              if (t.length > t2.length) {
                y += 4*(t.length-1);
              } else {
                y += 4*(t2.length-1);
              }
            });
            doc.setFontSize(12);
          }

          j++;
          column = 1;

        } else {
          doc.text($(times[i]).text().trim(), 10, y);
          doc.text($(this).text(), 60, y);

          if ($(details[j]).text().trim().length > 0) {
            if ($(details[j]).find('.program-table__item--speaker').length) {
              $(details[j]).find('.program-table__item--speaker').each(function(index) {
                if (y > 260) {
                  doc.addPage();
                  doc.addImage($('#gov-logo').get(0), 41, 8, 130, 22);
                  doc.addImage($('#gov-footer').get(0), 8, 270, 195, 26);
                  y = 40;
                } else {
                  y += 8;
                }
                doc.setFontSize(10);
                var t = doc.splitTextToSize($(this).text(), 180);
                doc.text(10, y, t);
                y += 4*(t.length-1);
              });
              doc.setFontSize(12);
            } else {
              $(details[j]).find('li').each(function(index) {
                if (y > 260) {
                  doc.addPage();
                  doc.addImage($('#gov-logo').get(0), 41, 8, 130, 22);
                  doc.addImage($('#gov-footer').get(0), 8, 270, 195, 26);
                  y = 35;
                } else {
                  y += 8;
                }
                doc.setFontSize(10);
                var t = doc.splitTextToSize($(this).text(), 180);
                doc.text(10, y, t);
                y += 4*(t.length-1);
              });
              doc.setFontSize(12);
            }
          }
        }

        if (y > 260) {
          doc.addPage();
          doc.addImage($('#gov-logo').get(0), 41, 8, 130, 22);
          doc.addImage($('#gov-footer').get(0), 8, 270, 195, 26);
          y = 40;
        } else {
          y += 10;
        }
        i++;
        j++;
      }
    });

    doc.save('program.pdf');
  });
});
