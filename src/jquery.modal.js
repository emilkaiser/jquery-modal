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

  var template = '<section class="jqm" tabindex="-1"><div class="jqm-inner"><div class="jqm-content"></div><a href="#" class="jqm-close"></a></div><a href="#" class="jqm-close phone" data-close=""></a><a href="#" class="jqm-overlay"></a></section>',
  defaults = {
      html: false,
      closeText: 'Stäng',
      className: 'modal',
      bodyClassName: 'jqm-active'
    };

  function Modal (options) {
    this.options = $.extend({}, defaults, options);
    this.$modal = $(template).addClass(this.options.className);
    this.$modal.find('.jqm-close').attr('data-close', this.options.closeText);
    this.$modal.find('a').on('click', $.proxy(function (event) {
      event.preventDefault();
      this.hide();
    }, this));
    this.deferred = $.Deferred();
    $('body').append(this.$modal);
    if (this.options.html) {
      this.update(this.options.html);
    }
  }

  Modal.prototype = {
    show: function () {
      return this.deferred.done(function () {
        $('.jqm').removeClass('jqm-active');
        if (this.options.bodyClassName) {
          $('body').addClass(this.options.bodyClassName);
        }
        this.$modal.addClass('jqm-active');
      });
    },
    hide: function () {
      if (this.options.bodyClassName) {
        $('body').removeClass(this.options.bodyClassName);
      }
      this.$modal.removeClass('jqm-active');
    },
    remove: function () {
      this.$modal.children().off();
      this.$modal.remove();
    },
    promise: function (promise) {
      promise.done($.proxy(function (response) {
        this.update(response);
      }, this));
      return this.deferred.promise();
    },
    update: function (html) {
      this.$modal.find('.jqm-content').html(html);
      this.deferred.resolveWith(this, [this]);
    },
    $: function () {
      return this.$modal;
    }
  };

  $.modal = function (options) {
    return new Modal(options);
  };

})(jQuery);
