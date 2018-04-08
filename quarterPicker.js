/**
 * 季度选择器(兼容ie8)
 * jQuery QuarterPicker
 * Version 1.0
 * Author:minchao 
 * Date:2018-04-08 13:43:21
 *  添加了回调callback供
 */
(function($) {
	var QuarterPicker = function(dom, options) {
		this.$dom = dom,
		this.defaults = {
			currentYear: '',
			callback:null,
		},
		this.opts = $.extend({}, this.defaults, options)
	}
	/**
	 * 添加渲染页面和数据的方法
	 * */
	QuarterPicker.prototype = {
		renderQuarterPicker: function() {
			var self = this;
			this.$dom.focus(function(event) {
				if(!self.opts.currentYear){
					self.opts.currentYear = new Date().getFullYear();
				}
				$('body').find('.mc-quarter-picker-box').empty().remove();
				$('body').append('<div class="mc-quarter-picker-box" style="left:' + $(this).offset().left + 'px;top:' + ($(this).offset().top + 30) + 'px;">' +
					'<div class="mc-year-picker">' +
					'<div class="mc-prev-year"></div>' +
					'<span>' + self.opts.currentYear + '</span>' +
					'<div class="mc-next-year"></div>' +
					'</div>' +
					'<ul class="mc-quarter-picker">' +
					'<li quarter="01" >第一季度</li><li quarter="02">第二季度</li><li quarter="03" >第三季度</li><li quarter="04" >第四季度</li>' +
					'</ul>' +
					'<div class="mc-quarter-picker-clear">清空</div>'+
					'</div>');
			})
		},
		handleClick: function() {
			var self = this;
			this.$dom.blur(function() {
				var innerSelf = this;
				$('div.mc-prev-year').click(function() {
					$(this).next().html(--self.opts.currentYear);
				})
				$('div.mc-next-year').click(function() {
					$(this).prev().html(++self.opts.currentYear);
				})
				$('ul.mc-quarter-picker li').click(function(event) {
					var value = self.opts.currentYear +"" + $(this).attr("quarter");
					if(self.opts.callback){
						if(self.opts.callback(value)){
							$(innerSelf).val(value);
						}
					}else{
						$(innerSelf).val(value);
					}
					$(this).parent().parent().empty().remove();
				})
				$('div.mc-quarter-picker-clear').click(function(event) {
					$(innerSelf).val("");
					$(this).parent().empty().remove();
				})
			})
		},
		constructor: QuarterPicker
	};
	$.fn.QuarterPicker = function(options) {
		var quarterPicker = new QuarterPicker(this, options);
		quarterPicker.renderQuarterPicker();
		quarterPicker.handleClick();
		return this.each(function() {});
	}
})(jQuery)