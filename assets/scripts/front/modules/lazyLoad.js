class LazyLoad {
	
	static init() {
		const that = this;
		that.lazyLoadImages();
		window.addEventListener('scroll', function() {
			that.lazyLoadImages();
		});
	}
	
	static lazyLoadImages() {
		const lazyLoadImages = document.querySelectorAll('.lazy-load.not-loaded');
		lazyLoadImages.forEach(function(image) {
			if (image.classList.contains('not-loaded')) {
				const rect = image.getBoundingClientRect();
				const html = document.documentElement;
				if (
					((rect.top >= 0 && rect.top < (window.innerHeight || html.clientHeight))
					|| (rect.bottom > 0 && rect.bottom <= (window.innerHeight || html.clientHeight)))
					&&
					((rect.left >= 0 && rect.left < (window.innerWidth || html.clientWidth))
					|| (rect.right > 0 && rect.right <= (window.innerWidth || html.clientWidth))) )
				{
					$(image).attr('src', $(image).data('src'));
					image.classList.remove('not-loaded')
				}
			}
		})
	}
}

export default LazyLoad