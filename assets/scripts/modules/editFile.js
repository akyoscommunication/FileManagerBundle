import Toast from "../../../../CoreBundle/assets/scripts/modules/Toast";

class EditFile {
    static init() {
        $(document).on('click', '.aky-filemanager-modal-edit-file-btn', function () {
            const path = $(this).data('path');

            fetch('/admin/file/edit?path='+encodeURI(path))
                .then(function (res) {
                    return res.text()
                        .then(function (response) {
                            console.log(response);
                            const modal = $('#aky-filemanager-modal-edit-file-body');
                            modal.html(response);
                        })
                        .then(function () {
                            $('#aky-filemanager-modal-edit-file-body > form').submit(function (e) {
                                e.preventDefault();

                                $.ajax({
                                    method: 'POST',
                                    url: '/admin/file/edit?path='+encodeURI(path),
                                    data: $(this).serialize(),
                                    success: function (res) {
                                        window.location.reload();
                                    },
                                    error: function(er) {
                                        console.log(er, 'error');
                                    }
                                });
                            });
                        });
                })
        });
    }
}

export default EditFile