class RemoveFile {
    static init() {
        $(document).on('click', '.aky-filemanager-delete', function () {
            $($(this).data('input')).val('');
            $(this).parents('.aky-file').find('.aky-file-preview').html('');
        });
    }
}

export default RemoveFile