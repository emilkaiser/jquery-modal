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

var template = '<section class="modal" tabindex="-1"><div class="inner"><div class="content"></div></div><a href="#" class="close" data-close="">×</a></section>',
defaults = {
    html: {},
    show: true,
    closeText: 'Stäng'
};

function Modal (options) {
  this.options = $.extend({}, defaults, options);
  if (this.options.show) {
    this.init();
    this.show();
  }
}

Modal.prototype = {
    init: function () {
      if (this.$modal) {
        return;
      }
      $('.modal').each(remove);
      this.$modal = $(template);
      this.$modal.find('.close').attr('data-close', this.options.closeText);
      this.$modal.find('a').on('click', $.proxy(function (event) {
        event.preventDefault();
        this.hide();
      }, this));
      $('body').append(this.$modal);
      this.update(this.options.html);
    },
    show: function () {
      this.init();
      this.$modal.addClass('active');
    },
    hide: function () {
      this.$modal.removeClass('active');
    },
    remove: function () {
      remove(this.$modal);
    },
    ajax: function (url, settings) {
      this.init();
      return $.ajax(url, settings).done($.proxy(function (response) {
        this.update(response);
      }, this));
    },
    update: function (html) {
      this.$modal.find('.content').html(html);
    },
    $: function () {
      return this.$modal;
    }
};

$.modal = function (options) {
  return new Modal(options);
};

function remove (i, el) {
  var $el = $(el);
  $el.children().off();
  $el.remove();
}

})(jQuery);
