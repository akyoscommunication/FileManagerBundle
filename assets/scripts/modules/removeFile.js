class RemoveFile {
    static init() {
        $(document).on('click', '.aky-filemanager-delete', function () {
            $($(this).data('input')).val('');
            const $akyFile = $(this).parents('.aky-file');
            $akyFile.find('.aky-file-preview').html('');
            $akyFile.find('.aky-filemanager-eye').attr('href', '#').hide();
        });
    }
}

export default RemoveFile