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

        const fileManagerInputs = $('.aky-file-container .aky-file-input input');
        const forms = fileManagerInputs.parents('form');
        forms.on('submit', function (e) {
            e.preventDefault();
            let valid = false;
            const inputs = $(this).find('.aky-file-container .aky-file-input input');
            inputs.each(function () {
                $(this).parents('.aky-file-container').find('.empty-field').remove();
                if ($(this)[0].hasAttribute('data-required') && !$(this).val()) {
                    $(this).parents('.aky-file-container').after('<div class="empty-field small text-danger">Ce champ est obligatoire!</div>');
                } else {
                    $.ajax({
                        method: 'GET',
                        url: $(this).data('previous-value-url'),
                        data: {
                            new_value: $(this).val()
                        },
                        success: function (res) {
                            console.log(res);
                        },
                        error: function (er) {
                            console.log(er, 'error');
                        }
                    });
                    valid = true;
                }
            })
            if (valid) {
                $(this).off('submit');
                $(this).submit();
            }
        })

        $('[data-toggle="tooltip"]').tooltip();
    }

    clickButton(iframe) {
        const _this = this;
        iframe.off('load');
        iframe.on('load', function () {
            const iframeContent = $(iframe).contents();

            iframeContent.on('click', '.aky-file-addto-btn', function (e) {
                e.preventDefault();
                $('<div id="Loader" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;display: flex;justify-content: center;align-content: center;background-color: rgba(0,0,0,0.75);"><spinning-dots style="margin: auto;width:50px;height:50px;stroke-width:10px;color: #dee2e6;" dots="8"></spinning-dots></div>').insertAfter($(this).parents('.aky-file-collection'));
                const pathFile = $(this).data('path');
                const url = $(this).data('urltoget');

                _this.changeValueOfInput(pathFile, url, iframeContent);
            });

            iframeContent.on('click', '.aky-file-updateiframe-btn', function () {
                _this.clickButton(iframe);
            });
        });
    }

    changeValueOfInput(pathFile, url, iframeContent) {
        const input = $(this.akyOpenFolder).parents('.aky-file').find('.aky-file-input').children('input');
        const target = this.akyTarget;

        $.ajax({
            method: 'GET',
            url: url,
            data: {
                path: pathFile
            },
            success: function (res) {
                iframeContent.find('#Loader').remove();
                $(input).val(res);
                $(target).modal('hide');
                $('.modal-backdrop').remove();
                loadPreview.loadPreview($(input), pathFile);
            },
            error: function (er) {
                console.log(er, 'error');
            }
        });
    }
}

export default IframeAdd