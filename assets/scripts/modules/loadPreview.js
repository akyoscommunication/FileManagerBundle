class LoadPreview {
    static init() {
        const _this = this;

        // $('.aky-file-input input[type=text]').on('change', function () {
        //     _this.loadPreview($(this));
        //
        // });
    }

    static loadPreview(that, path) {
        const file = that.val();

        const previewContainer = that.parents('.aky-file').find('.aky-file-preview');
        previewContainer.html('');
        previewContainer.append('<img src="' + location.origin + path + '" width="100%"/>')

        $.ajax({
            method: 'GET',
            url: '/file-manager/render-file/' + file,
            success: function (res) {
                const previewContainer = that.parents('.aky-file').find('.aky-file-preview');
                previewContainer.html('');
                previewContainer.append(res)
            },
            error: function (er) {
                console.log(er, 'error');
            }
        });
    }
}

export default LoadPreview