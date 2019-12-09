class ManageFolder {
    static init() {
        $(document).on('click', 'button[data-target="#aky-filemanager-modal-manage-folder"]', function () {
            const action = $(this).data('folder');
            $('input#name_folder_form_folder').val(action);
        });
    }
}

export default ManageFolder