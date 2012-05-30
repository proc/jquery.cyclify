/* jQuery.cyclify
 * Peter Tran ( http://github.com/proc )
 */

(function($) {
  $.fn.extend({
    cyclify : function(options) {

      var Cycler = function($element, options) {
        this.container = $element;
        this.settings = {
          loop       : false,
          transition : 'swing',
          delay      : 0,
          begin_at   : 0,
          next       : '.cycle-next',
          previous   : '.cycle-prev',
          begin      : '.cycle-begin',
          end        : '.cycle-end',
          cycles     : '.cycle-cycles div',
          controls   : '.cycle-controls',
          success    : null
        };
        $.extend(this.settings, options);

        this.elements = {};
        this.elements.controls = this.container.find(this.settings.controls);
        this.elements.cycles = this.container.find(this.settings.cycles);
        this.elements.max = this.elements.cycles.length;
        this.elements.current_index = 0;

        $.extend(this.elements, {
          begin         : this.elements.controls.find(this.settings.begin),
          prev          : this.elements.controls.find(this.settings.previous),
          next          : this.elements.controls.find(this.settings.next),
          end           : this.elements.controls.find(this.settings.end)
        });
        this._init();
      }

      Cycler.prototype._init = function() {
        var $this = this;
        this.elements.next.die().live('click', function() {
          $this.next();
        });
        this.elements.prev.die().live('click', function() {
          $this.prev();
        });
        this.elements.begin.die().live('click', function() {
          $this.begin();
        });
        this.elements.end.die().live('click', function() {
          $this.end();
        });
        this._set_current_cycle(this.settings.begin_at);
        this.callback_if_necessary();
      };

      Cycler.prototype._set_current_cycle = function(num) {
        this.elements.current_index = num;
        this.elements.cycles.removeClass('current-cycle');
        this.elements.cycles.hide();
        $(this.elements.cycles[num]).show(this.settings.delay, this.settings.transition).addClass('current-cycle');
      }

      Cycler.prototype.callback_if_necessary = function() {
        if(typeof this.settings.success === 'function') {
          this.settings.success($(this.elements.cycles[this.elements.current_index]));
        }
      }

      Cycler.prototype.prev = function() {
        var cycle_num = this.elements.current_index;
        if(cycle_num < (this.elements.max - 1)) {
          this._set_current_cycle(cycle_num + 1);
          this.callback_if_necessary();
        } else {
          if(this.settings.loop) {
            this.begin();
          }
        }
      };

      Cycler.prototype.next = function() {
        var cycle_num = this.elements.current_index;
        if(cycle_num > 0) {
          this._set_current_cycle(cycle_num - 1);
          this.callback_if_necessary();
        } else {
          if(this.settings.loop) {
            this.end();
          }
        }
      };

      Cycler.prototype.begin = function() {
        this._set_current_cycle(0);
        this.callback_if_necessary();
      };

      Cycler.prototype.end = function() {
        this._set_current_cycle(this.elements.max - 1);
        this.callback_if_necessary();
      };

      return new Cycler(this, options);
    }
});
})(jQuery);



