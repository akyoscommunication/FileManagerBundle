import 'bootstrap';
import loadPreview from "./loadPreview";

class IframeAdd {

    constructor() {
        this.akyOpenFolder = '';
        this.akyTarget = '';

        this.init();
    }

    init() {
        const $document = $(document);
        const $body = $('body');
        const _this = this;

        $document.on('click', '.aky-filemanager-open', function () {
                _this.akyOpenFolder = this;
                _this.akyTarget = $(this).data('target');

                const $iframe = $(_this.akyTarget).find('.aky-filemanager-iframe');
                if (!$iframe.attr('src')) {
                    $iframe.attr('src', $iframe.data('src'));
                }
                _this.clickButton($iframe);
            })
    }

    clickButton(iframe) {
        const _this = this;
        iframe.off('load');
        iframe.on('load', function () {
            const iframeContent = $(iframe).contents();

            iframeContent.on('click', '.aky-file-addto-btn', function () {
                const pathFile = $(this).data('path');
                _this.changeValueOfInput(pathFile);
            });
            iframeContent.on('click', '.aky-file-updateiframe-btn', function () {
                _this.clickButton(iframe);
            });
        });
    }

    changeValueOfInput(pathFile) {
        const input = $(this.akyOpenFolder).parents('.aky-file').find('.aky-file-input').children('input');
        const target = this.akyTarget;

        $.ajax({
            method: 'GET',
            url: '/admin/file/get-file-id/',
            data: {
                path : pathFile
            },
            success: function (res) {
                $(input).val(res);
                $(target).modal('hide');
                $('.modal-backdrop').remove();
                loadPreview.loadPreview($(input), pathFile);
            },
            error: function(er) {
                console.log(er, 'error');
            }
        });
    }
}

export default IframeAdd