import { FileManager } from "filemanager-element";
import "filemanager-element/FileManager.css";

// @ts-ignore
FileManager.register("file-manager", {
    renderFileCell(file, actions) {
        console.log('test', file)
        const template = document.querySelector('#FileCell');
        if (template) {
            let file_cell = template.content.cloneNode(true);
            const fm_file = file_cell.querySelector('.fm-file')
            const fm_thumbnail = file_cell.querySelector('.fm-thumbnail img')
            const fm_delete = file_cell.querySelector('.fm-delete')
            const fm_alt_input = file_cell.querySelector('.fm-alt')
            fm_alt_input.value = file?.alt
            fm_thumbnail.setAttribute('src', file?.url)

            fm_delete.addEventListener('click', e => {
                e.preventDefault()
                console.log(actions)
                // actions.handleDelete()
            })

            fm_file.addEventListener('click', e => {
                e.preventDefault()
                actions.handleClick()
            })

            fm_alt_input.addEventListener('change', e => {
                e.preventDefault()

                const myHeaders = new Headers();

                const myRequest = new Request('/api/file-manager/files', {
                    method: 'PATCH',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: JSON.stringify({...file, alt: fm_alt_input.value}),
                });

                fetch(myRequest)
                    .then(r => r.json())
                    .then(r => file = r)
            })

            return file_cell
        }

        return null;
    }
});

const fileManager = document.querySelector("file-manager")!;
fileManager.addEventListener("close", (e) => {
    (e.currentTarget as HTMLElement).setAttribute("hidden", "");
});

fileManager.addEventListener("selectfile", ((e: CustomEvent) => {
    console.log("fileselect", e.detail);
}) as EventListener);

document.querySelector("*[data-toggle-fm]")!.addEventListener("click", () => {
    fileManager.removeAttribute("hidden");
});
