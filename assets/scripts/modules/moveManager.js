class MoveManager {
    static init() {
        $(document).on('click', 'button[data-target="#aky-filemanager-modal-move-manager"]', function () {
            const target = $(this).data('file');
            const type = $(this).data('type');
            $('input#move_file').val(target);
            $('input#move_type').val(type);
        });
    }
}
export default MoveManager