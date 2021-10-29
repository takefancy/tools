var store = (function() {
	var localStorage;
	try {
		localStorage = window.localStorage;
	} catch (e) {}
	return {
		get: function(name) {
			return localStorage.getItem(name);
		},
		set: function(name, value) {
			localStorage.setItem(name, value);
		}
	};
})();

$(function() {
	var PORT = store.get('port') || 3003,
		current;

	function next() {
		var START = store.get('start') || 101,
			END = store.get('end') || 167;
		current = store.get('current');
		if (current > END || current < START) {
			current = START;
		}
		var url = 'http://localhost:' + PORT + '/' + current;
		current++;
		store.set('current', current);
		return url;
	}

	var elem = document.documentElement;

	function openFullscreen() {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) { /* Safari */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { /* IE11 */
			elem.msRequestFullscreen();
		}
	}
	$(elem).click(openFullscreen);

	//videos
	for (var i = 0; i < 9; i++) {
		var url = next();
		console.log('=====>>> url ', url);
		var html = `<div class="col-4 col-md-4 video-item">
			<div class="switch"></div>
            <video class="video-js vjs-default-skin" controls>
                <source src="${url}" type='video/mp4' />
            </video>
        </div>`;
		$('#container').append(html);
	}

	var height = window.screen.height; // * window.devicePixelRatio;
	$('video').each(function() {
		$(this).css('height', height / 3);
	});
	$('.switch').click(function() {
		var video = $(this).next('video');
		var src = $(video).find('source')[0];
		var url = next();
		console.log('====>>> ', url);
		$(src).attr('src', url);
		$(video).load();
		$(this).html(current);
	});
});