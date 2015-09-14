/*
======================================================================
	jquery.flatheights.js
	Version: 2010-09-15
	http://www.akatsukinishisu.net/itazuragaki/js/i20070801.html
======================================================================
/*-------------------------------------------*/
/*	$.changeLetterSize.addHandler(func)
/*	文字の大きさが変化した時に実行する処理を追加
/*-------------------------------------------*/
jQuery.changeLetterSize = {
	handlers : [],
	interval : 1000,
	currentSize: 0
};

(function($) {

	var self = $.changeLetterSize;

	/* 文字の大きさを確認するためのins要素 */
	var ins = $('<ins>M</ins>').css({
		display: 'block',
		visibility: 'hidden',
		position: 'absolute',
		padding: '0',
		top: '0'
	});

	/* 文字の大きさが変わったか */
	var isChanged = function() {
		ins.appendTo('body');
		var size = ins[0].offsetHeight;
		ins.remove();
		if (self.currentSize == size) return false;
		self.currentSize = size;
		return true;
	};

	/* 文書を読み込んだ時点で
	   文字の大きさを確認しておく */
	$(isChanged);

	/* 文字の大きさが変わっていたら、
	   handlers中の関数を順に実行 */
	var observer = function() {
		if (!isChanged()) return;
		$.each(self.handlers, function(i, handler) {
			handler();
		});
	};

	/* ハンドラを登録し、
	   最初の登録であれば、定期処理を開始 */
	self.addHandler = function(func) {
		self.handlers.push(func);
		if (self.handlers.length == 1) {
			setInterval(observer, self.interval);
		}
	};

})(jQuery);


/*-------------------------------------------*/
/*	$(expr).flatHeights()
/*	$(expr)で選択した複数の要素について、それぞれ高さを
/*	一番高いものに揃える
/*-------------------------------------------*/

(function($) {

	/* 対象となる要素群の集合 */
	var sets = [];

	/* 高さ揃えの処理本体 */
	var flatHeights = function(set) {
		var maxHeight = 0;
		set.each(function(){
			var height = this.offsetHeight;
			if (height > maxHeight) maxHeight = height;
		});
		set.css('height', maxHeight + 'px');
	};

	/* 要素群の高さを揃え、setsに追加 */
	jQuery.fn.flatHeights = function() {
		if (this.length > 1) {
			flatHeights(this);
			sets.push(this);
		}
		return this;
	};

	/* 高さ揃えを再実行する処理 */
	var reflatting = function() {
		$.each(sets, function() {
			this.height('auto');
			flatHeights(this);
		});
	};

	/* 文字の大きさが変わった時に高さ揃えを再実行 */
	$.changeLetterSize.addHandler(reflatting);

	/* ウィンドウの大きさが変わった時に高さ揃えを再実行 */
	$(window).resize(reflatting);

})(jQuery);

jQuery(document).ready(function($){
    // .topPrTitには高さのpaddingを入れる事もあるので a に対して指定
    jQuery('.topPrTit a').flatHeights();
    jQuery('.topPrDescription').flatHeights();
    jQuery('.child_page_block').flatHeights();
    jQuery('.child_page_block p').flatHeights();
	jQuery('#content .child_page_block h4 a').flatHeights();
});
/*-------------------------------------------*/
/*  facebookLikeBox
/*-------------------------------------------*/
/*  jquery.flatheights.js 
/*-------------------------------------------*/
/*  snsCount
/*-------------------------------------------*/

pagePluginReSize();
jQuery(window).resize(function(){
	pagePluginReSize();
});

/*-------------------------------------------*/
/*	facebookLikeBox
/*-------------------------------------------*/
function pagePluginReSize(){
	// jQuery('.fb_iframe_widget').each(function(){
	// 	var element = jQuery(this).parent().width();
	// 	console.log(element);
	// 	jQuery(this).attr('data-width',element);
	// 	jQuery(this).children('span:first').css({"width":element});
	// 	jQuery(this).children('span iframe.fb_ltr').css({"width":element});
	// });
}

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

/*-------------------------------------------*/
/*	jquery.flatheights.js 
/*-------------------------------------------*/
(function($){
$(function() {
    $('.prArea > .subSection-title').flatHeights();
    $('.prArea > .summary').flatHeights();
    $('.childPage_list_title').flatHeights();
});
window.onload = function() {
	$('.childPage_list_text').flatHeights();
    $('.childPage_list_box').flatHeights();
}
})(jQuery);

/*-------------------------------------------*/
/*	snsCount
/*-------------------------------------------*/
(function($){
var facebook = {
  init: function() {

    this.open();

    var url = 'http://graph.facebook.com/?id=' + encodeURIComponent(location.href);
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(json) {
        var count = json.shares ? json.shares : 0;
        $('.veu_socialSet').find('.vk_count_sns_fb').html(count);
      }
    });
  },
  open: function() {
    var $target = $('.veu_socialSet').find('.vk_count_sns_fb');
    $target.on('click', function(event) {
      event.preventDefault();
      window.open($(this).attr('href'), 'facebook', 'width=670, height=400, menubar=no, toolbar=no, scrollbars=yes');
    });
  }
}
facebook.init();

window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return t;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));
var twitter = {
  init: function() {

    this.open();

    var url = 'http://urls.api.twitter.com/1/urls/count.json?url=' + encodeURIComponent(location.href);
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(json) {
        var count = json.count ? json.count : 0;
        $('.veu_socialSet').find('.vk_count_sns_tw').html(count);
      }
    });
  },
  open: function() {
    var $target = $('.veu_socialSet').find('.vk_count_sns_tw');
    $target.on('click', function(event) {
      event.preventDefault();
      window.open($(this).attr('href'), 'Twitter でリンクを共有する', 'width=550, height=400, menubar=no, toolbar=no, scrollbars=yes');
    });
  }
}
twitter.init();

var hatena = {
  init: function() {

    this.open();

    var url = 'http://api.b.st-hatena.com/entry.count?url=' + encodeURIComponent(location.href);
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(json) {
        var count = json ? json : 0;
        $('.veu_socialSet').find('.vk_count_sns_hb').html(count);

        if(typeof(count) == 'undefined'){
          count = 0;
        }
      }
    });
  },
  open: function() {
    var $target = $('.veu_socialSet').find('.vk_count_sns_hb');
    $target.on('click', function(event) {
      event.preventDefault();
      window.open($(this).attr('href'), 'はてなブックマークブックマークレット', 'width=550, height=420, menubar=no, toolbar=no, scrollbars=yes');
    });
  }
}
hatena.init();
})(jQuery);
