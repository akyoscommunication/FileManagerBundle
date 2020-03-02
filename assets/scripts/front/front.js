// import external dependencies
import 'jquery';

import LazyLoad from "./modules/LazyLoad";

class Front {
	static init() {
		LazyLoad.init();
	}
}

jQuery(document).ready(function () {
	Front.init();
});
