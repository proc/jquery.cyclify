/* jQuery.cyclify
 * Peter Tran ( http://github.com/proc )
 */

(function($) {
  $.fn.extend({
    cyclify : function(options) {
      var defaults = {
        loop : false,
        transition: 'swing',
        delay : 0
      }
      var $controls = this.find('.cycle-controls'),
          $begin = $controls.find('.cycle-begin'),
          $prev  = $controls.find('.cycle-prev'),
          $next  = $controls.find('.cycle-next'),
          $end   = $controls.find('.cycle-end'),
          $cycles = this.find('.cycle-cycles div'),
          max     = $cycles.length,
          min     = 0,
          options = $.extend(defaults, options);

      function current_cycle_num() {
        var rval;
        $cycles.each(function(i, elem) {
          if($(elem).is(':visible')) {
            rval = i;
            return false; // returning false stops each() from within callback
          }
        });
        return rval;
      }
      function callback_if_necessary() {
        if(typeof options.success === 'function') {
          options.success($($cycles[current_cycle_num()]));
        }
      }

      var next = function next() {
        var cycle_num = current_cycle_num(),
            $current = $($cycles[cycle_num]);
        if(cycle_num < (max - 1)) { 
          $current.hide(options.delay, options.transition, function() {
            $($cycles[cycle_num + 1]).show(options.delay, options.transition);
          });
          callback_if_necessary();
        } else {
          if(options.loop) {
            begin();
          }
        }
      };
      var prev = function prev() {
        var cycle_num = current_cycle_num(),
            $current = $($cycles[cycle_num]);
        if(cycle_num > min) { 
          $current.hide( options.delay, options.transition, function() {
            $($cycles[cycle_num - 1]).show(options.delay, options.transition);
          });
        callback_if_necessary();
        } else {
          if(options.loop) {
            end();
          }
        }
      };
      var begin = function begin() {
        var cycle_num = current_cycle_num(),
            $current = $($cycles[cycle_num]);
          $current.hide(options.delay, options.transition, function() {
            $($cycles[0]).show(options.delay, options.transition);
          });
          callback_if_necessary();
      };
      var end = function end() {
        var cycle_num = current_cycle_num(),
            $current = $($cycles[cycle_num]);
        $current.hide(options.delay, options.transition, function() {
          $($cycles[max - 1]).show(options.delay, options.transition);
        });
        callback_if_necessary();
      };

      var init = function() {
        $next.die().live('click', function() {
          next();
        });
        $prev.die().live('click', function() {
          prev();
        });
        $begin.die().live('click', function() {
          begin();
        });
        $end.die().live('click', function() {
          end();
        });
        begin();
        $cycles.not(":first-child").hide();
      }

      init();

      return {
        next : next,
        prev : prev,
        begin : begin,
        end : end
      }
    }
});
})(jQuery);
