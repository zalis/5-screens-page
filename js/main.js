
var main = (function(w, d, $) {
	
	var autoLoad = true;

	return {
	
		init: function(config) {
			
			var that = this;
			
			$.extend(this, config);
		
			this.pageHeight = $(w).height();
			
			this.addPages();
			
			this.loadContent();
			
			$(w).scroll(function() {

				if ($(this).data('scrollTimeout')) {
					w.clearTimeout($(this).data('scrollTimeout'));
				}
				
				$(this).data('scrollTimeout', w.setTimeout(function() {

						var page = that.getViewport($(w).scrollTop());
				
						if (page) {
							that.sortArray(that.pages, page);
//							autoLoad = false;
							that.loadContent();
						};
					
				}, 300, w));
				
			});

			w.setTimeout(function() { that.loadScripts(); }, that.delays.delayBeforeWidgets);
			
		},
		
		addPages: function() {
			
			var that = this;
			
			var wrapper = $('<div></div>')
				.attr('id', 'wrapper')
				.appendTo('body');
				
			if (this.pages) {
			
				$.each(this.pages, function(i, p) {	
					
					var page = $('<div></div')
						.attr('id', p.id)
						.addClass('page')
						.css('height', that.pageHeight)
						.appendTo(wrapper);
						
					p.container = $('<div></div')
						.addClass('container')
						.appendTo(page);
						
					p.content = $('<div></div')
						.addClass('content')
						.appendTo(p.container);
						
					if (p.before) {
						$.each(p.before, function() {
							p.container.before($(this.toString()));
						});
					}
						
					if (p.after) {
						$.each(p.after, function() {
							var el = $(this.toString())
							p.container.after(el).css('height', that.pageHeight - el.height());
						});
					}
					
					$('<a href="#' + p.id + '">' + (i + 1) + '</a>')
						.click(function(e) {
							e.preventDefault();
							w.scrollTo(0, page.offset().top);
							autoLoad = false;
							that.sortArray(that.pages, p);
							that.loadContent();
						})
						.appendTo($('#nav'))
						.wrap("<li></li>");
					
				});
				
			};
			
			if (this.menu) {
				
				var ul = $('#menu');
				
				$.each(this.menu, function(i, item) {
					$('<li><a href="' + item.url + '">' + item.text + '</a></li>').appendTo(ul);
				});
				
			};
			
			that.waitingString = '<div class="waiting"><div class="loading"></div></div>';
			
			if (that.widgets){
				
				var ul = $('#social ul');
		
				$.each(that.widgets, function(){
					if (this.social) {
						$(document.createElement(this.tag))
							.attr(this.attrs).appendTo(ul)
							.wrap("<li></li>");
					};
				});
				
				ul.on('mouseover', function(){
					$(this).off('mouseover');
					var arr = [];
					$.each(that.widgets, function(){
						if (this.social) {
							arr.push(this);
						};
					});
					that.sortArray(that.widgets, arr);
				});
		
			};

			
		},
		
		loadContent: function() {
			
			var that = this;
		
			if (!that.pages.length) return;
			
			var p = that.pages.shift(),
			selector = '#' + p;
		
			$.ajax({
				url: p.url,
				beforeSend: function() {
					p.waiting = $(that.waitingString).prependTo(p.container);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR, textStatus, errorThrown)
				}
			})
			.done(function(data) {
	
				p.content.html(data);

				w.setTimeout(function() {
	
					that.contentComplete(p.content, function() {
						
						p.content.find('img').css('visibility', 'visible');
						p.waiting.fadeOut( "slow", function() {
							$(this).remove();
						});
						
						if (autoLoad) {
							that.loadContent();
						}
					});
					
				}, that.delays.delayPageLoading);
				
			});
							
		},
		
		contentComplete: function(content, callback) {
			
			var images = content.find('img'),
			num = images.length;
			
			function onComplete() {
				if (num === 0)
					callback();
			};
			
			images.each(function() {
				if (this.complete) {
					--num;
				}
				else {
					$(this).load(function() {
						--num;
						onComplete();
					});
				};
			});
			
			onComplete();
		},
		
		sortArray: function(array, els) {
			
			if (array.length < 2) return;
		
			var splitArray = function(el) {
				var index = array.indexOf(el);
				if (index > 0) {
					array.splice(index, 1);
					array.splice(0, 0, el);
				};
			};
			
			if ($.isArray(els)) {
				for (var i=els.length-1; i>=0; i--) {
					splitArray(els[i]);
				};
			}
			else
				splitArray(els);

		},
		
		getViewport: function(scrollY) {
			
			var that = this, p;
			
			$.each(that.pages, function(){
				
				var page = $('#' + this.id),
	
				pageY = page.offset().top + 10;
	
				if (scrollY > pageY - page.height() && scrollY <= pageY) {
					
					p = this;
	
					return false;
					
				}
	
			});
			
			return p;
		},
		
		loadScripts: function() {
			
			var that = this;
			
			if (!that.widgets || !that.widgets.length) return;
			
			var el = that.widgets.shift();
			
			var script = d.createElement('script');
			script.id = el.id;
			script.src = el.src;
			script.async = true;
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(script, s);
	
			script.onload = script.onreadystatechange = function(){

				if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
					
					if (script.id == 'vkontakte') {
						VK.init({apiId: 4789255, onlyWidgets: true});
						VK.Widgets.Like("vk_like", {type: "button"});
					}
					
					console.log(el.id, 'loaded');

					w.setTimeout(function() { that.loadScripts(); }, that.delays.delayBetweenWidgets);

			  	}
				
			};

		}
		
	};

})(window, document, jQuery);



