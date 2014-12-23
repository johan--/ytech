/**
 * Equalizer jQuery plugin
 *
 * @author Mikhail Golovkin <mikhail.golovkin@gmail.com>
 * @link https://github.com/fdr-/eq
 * @version 1.0
 */

;(function($, window, document) {
  /**
   * Стандартные опции.
   */
   
  var defaults = {
    colWidth: 1
  };
  
  /**
   * Запуск.
   * 
   * @param {Object} el jQuery объект
   * @param {Number} timeout Время анимации
   */
   
  function run(el, timeout) {
    up(el.data(), timeout)
      .pipe(function() {
        down(el.data(), timeout);
      })
      .done(function() {
        run(el, timeout);
      });
  };
  
  /**
   * Анимация "роста".
   * 
   * @param {Number} data.height Высота контейнера
   * @param {Object} data.spans jQuery колллекция span'ов
   * @param {Number} timeout Время анимации
   * 
   * @returns {Object} Promise-объект
   */
  
  function up(data, timeout) {
    return data.spans.each(function(i) {
      var colHeight = Math.round(data.height * Math.random());
      
      return $(this).animate(
        {height: colHeight},
        timeout,
        'linear'
      )
    }).promise();
  };
  
  /**
   * Анимация "спада".
   * 
   * @param {Number} data.height Высота контейнера
   * @param {Object} data.spans jQuery колллекция span'ов
   * @param {Number} timeout Время анимации
   * 
   * @returns {Object} Promise-объект
   */
  
  function down(data, timeout) {
    return data.spans.animate(
      {height: data.height / 2},
      timeout,
      'linear'
    );
  };
  
  /**
   * Инициация.
   * 
   * @param {Object} jQuery коллекция
   * @param {Number} options.colWidth Ширина колонки
   * @param {Number} options.timeout Время анимации
   */
  
  function init(els, options) {
    var settings = $.extend({}, defaults, options);
    
    els.each(function() {
      var el = $(this),
          colQuantity = Math.ceil(el.width() / settings.colWidth);
      
      for (var i = 0; i < colQuantity; i++) {
        var span = $('<span/>').appendTo(el);
        
        span.css({
          'width': settings.colWidth,
          'height': $(this).height() / 2
        });
      };
      
      el.data('height', el.height());
      el.data('spans', el.find('span'));
      
      run(el, settings.timeout);
    });
  }
  
  $.fn.equalizer = function(options) {
    return init(this, options);
  };
})(jQuery, window, document);