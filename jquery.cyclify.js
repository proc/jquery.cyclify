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
          current_index = 0,
          options = $.extend(defaults, options);
      
      function set_current_cycle(num) {
        current_index = num;
        $cycles.removeClass('current-cycle');
        $cycles.hide();
        $($cycles[num]).show(options.delay, options.transition).addClass('current-cycle');

      }
      
      function current_cycle_num() {
        return current_index;
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
            set_current_cycle(cycle_num + 1);
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
          set_current_cycle(cycle_num - 1);
          callback_if_necessary();
        } else {
          if(options.loop) {
            end();
          }
        }
      };
      var begin = function begin() {
        set_current_cycle(0);
        callback_if_necessary();
      };
      var end = function end() {
        set_current_cycle(max - 1);
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
        set_current_cycle(0);
        begin();
      }

      init();

      return {
        next : next,
        prev : prev,
        begin : begin,
        end : end,
      }
    }
});
})(jQuery);
