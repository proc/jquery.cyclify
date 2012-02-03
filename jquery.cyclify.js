/* jQuery.cyclify
 * Peter Tran ( http://github.com/proc )
 */

(function($) {
  $.fn.extend({
    cyclify : function(options) {
      var defaults = {
        loop : false,
        transition: 'swing',
        delay : 0,
        begin_at : 0
      }
      var $controls     = this.find('.cycle-controls'),
          $begin        = $controls.find('.cycle-begin'),
          $prev         = $controls.find('.cycle-prev'),
          $next         = $controls.find('.cycle-next'),
          $end          = $controls.find('.cycle-end'),
          $cycles       = this.find('.cycle-cycles div'),
          max           = $cycles.length,
          current_index = 0,
          options       = $.extend(defaults, options);
      
      function _set_current_cycle(num) {
        current_index = num;
        $cycles.removeClass('current-cycle');
        $cycles.hide();
        $($cycles[num]).show(options.delay, options.transition).addClass('current-cycle');

      }
      
      function _callback_if_necessary() {
        if(typeof options.success === 'function') {
          options.success($($cycles[current_index]));
        }
      }

      var next = function next() {
        var cycle_num = current_index,
            $current = $($cycles[cycle_num]);
        if(cycle_num < (max - 1)) { 
          _set_current_cycle(cycle_num + 1);
          callback_if_necessary();
        } else {
          if(options.loop) {
            begin();
          }
        }
      };
      var prev = function prev() {
        var cycle_num = current_index,
        $current = $($cycles[cycle_num]);
        if(cycle_num > 0) { 
          _set_current_cycle(cycle_num - 1);
          callback_if_necessary();
        } else {
          if(options.loop) {
            end();
          }
        }
      };
      var begin = function begin() {
        _set_current_cycle(0);
        callback_if_necessary();
      };
      var end = function end() {
        _set_current_cycle(max - 1);
        callback_if_necessary();
      };

      var _init = function() {
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
        _set_current_cycle(options.begin_at);
        callback_if_necessary();
      }

      _init();

      return {
        next  : next,
        prev  : prev,
        begin : begin,
        end   : end,
      }
    }
});
})(jQuery);
