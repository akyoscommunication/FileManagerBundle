import IframeAdd from "./modules/iframeAdd";
import loadPreview from "./modules/loadPreview";
import removeFile from "./modules/removeFile";
import editFile from "./modules/editFile";
import manageFolder from "./modules/manageFolder";
import moveManager from "./modules/moveManager";
import utils from "./common/utils";

import '@grafikart/drop-files-element';
import '@grafikart/spinning-dots-element';

import 'symfony-collection';
import initCollectionType from "../../../CoreBundle/assets/scripts/modules/collectionType";
import AkyUppyInit from "./modules/_uppy";
import SpinningDots from "@grafikart/spinning-dots-element";

class FileManager {
    static init() {
        new IframeAdd();
        loadPreview.init();
        removeFile.init();
        editFile.init();
        manageFolder.init();
        moveManager.init();
        // initCollectionType.initDataPrototype('.aky-file-collection', '.aky-file');
        // AkyUppyInit.init();
        
        this.initFileCollection();


    }
    
    static initFileCollection() {
        if($('.aky-file-collection').length) {
            $('.aky-file-collection').each(function () {
                const $this = $(this);
                $this.collection({
                    fade_out: false,
                    max: $this.data('max'),
                    min: $this.data('min'),
                    init_with_n_elements: $this.data('init-with-n-elements'),
                    add: '<a href="#" class="aky-file-add"><span class="fas fa-plus"></span></a>',
                    add_at_the_end: $this.data('add-at-the-end'),
                    after_add: function (collection, element) {
                        new IframeAdd();
                        return true;
                    },
                    before_remove: function (collection, element) {
                        new IframeAdd();
                        return true;
                    }
                });
            });
        }
    }
}

export default FileManager;

jQuery(document).ready(function () {
    new SpinningDots();
    FileManager.init();
    utils.init();
});
