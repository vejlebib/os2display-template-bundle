/**
 * Vejlebib calendar list slide.
 */

// Register the function, if it does not already exist.
if (!window.slideFunctions['vejlebib-calendar-list']) {
  window.slideFunctions['vejlebib-calendar-list'] = {
    /**
     * Setup the slide for rendering.
     * @param scope
     *   The slide scope.
     */
    setup: function setupCalendarSlide(scope) {
      var slide = scope.ikSlide;

      // Only show first image in array.
      if (slide.media_type === 'image' && slide.media.length > 0) {
        slide.currentImage = slide.media[0].image;
      }

      // Set currentLogo.
      slide.currentLogo = slide.logo;

      // Setup the inline styling
      scope.theStyle = {
        width: "100%",
        height: "100%",
        fontsize: slide.options.fontsize * (scope.scale ? scope.scale : 1.0)+ "px"
      };

      // Set the responsive font size if it is needed.
      if (slide.options.responsive_fontsize) {
        scope.theStyle.responsiveFontsize = slide.options.responsive_fontsize * (scope.scale ? scope.scale : 1.0)+ "vw";
      }
    },

    /**
     * Run the slide.
     *
     * @param slide
     *   The slide.
     * @param region
     *   The region object.
     */
    run: function runCalendarSlide(slide, region) {
      region.itkLog.info("Running calendar slide: " + slide.title);

      var duration = slide.duration !== null ? slide.duration : 15;

      if (slide.external_data) {
        var now = new Date();
        now = now.getTime();
        var start = new Date();
        start.setHours(0,0,0);
        start = start.getTime();
        var end = new Date();
        end.setHours(23,59,59);
        end = end.getTime();

        var arr = [];

        // Filter out finished events.
        for (var i = 0; i < slide.external_data.length; i++) {
          if (slide.external_data[i].end_time * 1000 > now) {
            var booking = slide.external_data[i];

            if (booking.start_time * 1000 < start) {
              booking.start_time = parseInt(start / 1000);
            }

            if (booking.end_time * 1000 > end) {
              booking.multiDay = true;
            }

            var startDate = new Date(booking.start_time * 1000);
            var endDate = new Date(booking.end_time * 1000);

            booking.startDate = startDate;
            booking.endDate = endDate;

            booking.from = booking.start_time;
            booking.to = booking.end_time;

            if (booking.is_all_day_event || startDate.getHours() === endDate.getHours()) {
              booking.fullDay = true;
            }

            arr.push(booking);
          }
        }

        // Handle manual events.
        slide.options.eventitems.forEach(function(event) {
          event.location = event.place;
          event.event_name = event.title;
          arr.push(event);
        });

        slide.futureEvents = arr;
      }

      // Wait fadeTime before start to account for fade in.
      region.$timeout(function () {
        // Set the progress bar animation.
        region.progressBar.start(duration);

        // Wait for slide duration, then show next slide.
        // + fadeTime to account for fade out.
        region.$timeout(function () {
          region.nextSlide();
        }, duration * 1000 + region.fadeTime);
      }, region.fadeTime);
    }
  };
}
