const Uppy = require('@uppy/core');
const Dashboard = require('@uppy/dashboard');
const GoogleDrive = require('@uppy/google-drive');
const Instagram = require('@uppy/instagram');
const Webcam = require('@uppy/webcam');
const FileInput = require('@uppy/file-input');

class AkyUppyInit {
    static init() {
        const uppy = Uppy({
            debug: true,
            autoProceed: false,
            restrictions: {
                maxFileSize: 1000000,
                maxNumberOfFiles: 3,
                minNumberOfFiles: 2,
                allowedFileTypes: ['image/*', 'video/*']
            }
        })
            .use(FileInput, {
                target: '.uppyInit',
                pretty: true,
            })
            .use(Dashboard, {
                trigger: '.btn',
                inline: true,
                target: '.uppyInit',
                replaceTargetContent: true,
                showProgressDetails: true,
                note: 'Images and video only, 2–3 files, up to 1 MB',
                height: 470,
                metaFields: [
                    { id: 'name', name: 'Name', placeholder: 'file name' },
                    { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
                ],
                browserBackButtonClose: true
            })
            .use(GoogleDrive, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
            .use(Instagram, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
            .use(Webcam, { target: Dashboard });

        uppy.on('complete', result => {
            console.log('successful files:', result.successful);
            console.log('failed files:', result.failed);
        })
    }
}

export default AkyUppyInit