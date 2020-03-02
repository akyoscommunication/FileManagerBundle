class LazyLoad {
	
	static init() {
		const lazyLoadImages = document.querySelectorAll('.lazy-load.not-loaded');
		window.addEventListener('scroll', function() {
			lazyLoadImages.forEach(function(image) {
				if (image.classList.contains('not-loaded')) {
					const rect = image.getBoundingClientRect();
					const html = document.documentElement;
					if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth)) {
						$(image).attr('src', $(image).data('src'));
						image.classList.remove('not-loaded')
					}
				}
			})
		});
	}
}

export default LazyLoad