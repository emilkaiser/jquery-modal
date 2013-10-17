/**
 * jQuery Modal
 * Version: 0.1.0
 * URL: http://github.com/emilkaiser/jquery-modal
 * Dependecies: jQuery
 * Author: Emil Kaiser (emilkaiser@gmail.com)
 * License: MIT
 */

;(function ($, undefined) {

  'use strict';

  var template = '<section class="jqm" tabindex="-1"><div class="jqm-inner row"><div class="jqm-content"></div><a href="#" class="jqm-close"></a></div><a href="#" class="jqm-close phone" data-close="Stäng"></a><a href="#" class="jqm-overlay"></a></section>',
  defaults = {
      html: '',
      show: true,
      closeText: 'Stäng',
      className: 'modal',
      bodyClassName: 'jqm-active'
    };

  function Modal (options) {
    this.options = $.extend({}, defaults, options);
    if (this.options.show) {
      this.show();
    }
  }

  Modal.prototype = {
    init: function () {
      if (this.$modal) {
        return;
      }
      this.$modal = $(template).addClass(this.options.className);
      this.$modal.find('.jqm-close').attr('data-close', this.options.closeText);
      this.$modal.find('a').on('click', $.proxy(function (event) {
        event.preventDefault();
        this.hide();
      }, this));
      $('body').append(this.$modal);
      this.update(this.options.html);
    },
    show: function () {
      this.init();
      $('.jqm').removeClass('jqm-active');
      if (this.options.bodyClassName) {
        $('body').addClass(this.options.bodyClassName);
      }
      this.$modal.addClass('jqm-active');
      return this;
    },
    hide: function () {
      this.init();
      if (this.options.bodyClassName) {
        $('body').removeClass(this.options.bodyClassName);
      }
      this.$modal.removeClass('jqm-active');
      return this;
    },
    remove: function () {
      this.init();
      this.$modal.children().off();
      this.$modal.remove();
    },
    ajax: function (url, settings) {
      this.init();
      return $.ajax(url, settings).done($.proxy(function (response) {
        this.update(response);
      }, this));
    },
    update: function (html) {
      this.init();
      this.$modal.find('.jqm-content').html(html);
      return this;
    },
    $: function () {
      return this.$modal;
    }
  };

  $.modal = function (options) {
    return new Modal(options);
  };

})(jQuery);
