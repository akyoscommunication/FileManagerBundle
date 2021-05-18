// import external dependencies
import 'jquery';

import LazyLoad from "./modules/lazyLoad";

class Front {
    static init() {
        LazyLoad.init();
    }
}

jQuery(document).ready(function () {
    Front.init();
});
