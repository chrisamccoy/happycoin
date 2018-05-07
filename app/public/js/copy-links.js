/**
 * Initializes Media Dashboard page.
 *
 * @module cs.page.Media
 */
(function (window, document) {
  'use strict';

  var exclude = ['hc-intro', 'note', 'worker-types-timeline'];

  var content = '<div class="copy-link-wrapper">' +
    '<div class="copy-link" data-link="{$}">' +
      '<div class="copy-link-text">Copy Link</div>' +
      '<i class="copy-link-icon ion-link"></i>' +
    '</div>' +
  '</div>';

  function bindEvents() {
    $('.copy-link').click(function(ev) {
      ev.preventDefault();

      var $el = $(this);
      $el.addClass('copied');
      $el.find('.copy-link-text').html('Copied');

      copyToClipboard($el.attr('data-link'));

      setTimeout(function() {
        $el.removeClass('copied');
        $el.find('.copy-link-text').html('Copy Link');
      }, 3000);
    });
  }

  function copyToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  function appendElem(id) {
    if (exclude.indexOf(id) > -1) {
      return;
    }

    var $el = $('#' + id),
        url = window.location.origin + '#' + id;

    $el.append(content.replace('{$}', url));
  }

  function append() {
    $('.hc-feature').each(function() {
      var id = $(this).attr('id');
      if (id && id.length > 0) {
        appendElem(id);
      }
    });

    bindEvents();
  }

  $(document).ready(function() {
    if ($('.home-page').length == 0 && $('.blog-news').length == 0) {
      return;
    }

    append();
  });

}(window, document));
