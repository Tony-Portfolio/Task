import React from "react";
import { useDrag } from "react-dnd";
import "./Item.css";
import { formatDate } from "../composables/getTime";

const Item = ({ data }: { data: any }) => {
    const [copied, setCopied] = React.useState('Copy content');
    const [{ isDragging }, drag] = useDrag(() => ({
        type: data.status,
        item: data,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    function copyTextToClipboard(data: any) {
        const textToCopy = `Task: ${data.title}\nCreated: ${formatDate(data.created_at)}\nStatus: ${data.status}\nContent: ${data.content}`;

        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        // Append the textarea to the document
        document.body.appendChild(textArea);

        // Select the text within the textarea
        textArea.select();

        // Copy the selected text to the clipboard
        document.execCommand("copy");

        // Remove the textarea from the document
        document.body.removeChild(textArea);
        setCopied("Copied!");
        setTimeout(() => {
            setCopied("Copy Content");
        }, 2000);
    }

    const processFile = (file: any) => {
        if (file.length < 2) return;
        file = `data:application/octet-stream;base64,${file}`;
        var fileExt = file.slice(((file.lastIndexOf(".") - 1) >>> 0) + 1);
        fileExt = fileExt.replace('.', '');
        file = file.slice(0, file.lastIndexOf("."));
        const decodedData = atob(file.split(",")[1]);
        const byteArray = new Uint8Array(decodedData.length);

        for (let i = 0; i < decodedData.length; i++) {
            byteArray[i] = decodedData.charCodeAt(i);
        }

        var blob;
        var contentType;
        var isImage = false;

        // Determine content type based on file extension
        if (fileExt === "jpg" || fileExt === "jpeg") {
            contentType = "image/jpeg";
            isImage = true;
        } else if (fileExt === "png") {
            contentType = "image/png";
            isImage = true;
        } else if (fileExt === "pdf") {
            contentType = "application/pdf";
        } else if (fileExt === "txt") {
            contentType = "text/plain";
        } else if (fileExt === "doc") {
            contentType = "application/msword";
        } else {
            contentType = "application/octet-stream"; // Default content type for unknown file types
        }

        blob = new Blob([byteArray], { type: contentType });

        var url = URL.createObjectURL(blob);
        return { url, isImage, fileExt };
    };
    const processFileResult = processFile(data.file);

    const url: any = processFileResult ? processFileResult.url : null;
    const isImage: any = processFileResult ? processFileResult.isImage : false;

    const statusToBackgroundColor: any = {
        "Not Done": "bg-red-500",
        "In Progress": "bg-sky-500",
        "Done": "bg-green-500",
    };

    const backgroundClass = statusToBackgroundColor[data.status];




    // Use dragPreview to wrap your component
    // const preview = dragPreview(<div className="custom-drag-preview">Custom Preview</div>);

    return (
        <div className={`${isDragging ? 'shake-element' : ''} w-full`} ref={drag}>
            <div className="bg-[#ff7043] text-white p-2 py-3 rounded border-4 border-black/20 after:content-[''] after:top-[4px] after:right-[4px] after:bg-white after:w-[15px] after:h-[6px] after:rounded relative after:absolute before:top-[4px] before:content-[''] before:absolute before:right-[25px] before:bg-white/70 before:h-[6px] before:w-[8px] before:rounded">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <span className="text-xl">{data.title}</span>
                        <div className={`px-2 rounded flex items-center justify-center ${backgroundClass}`}>
                            {data.status}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="relative group z-[100]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" onClick={() => { copyTextToClipboard(data) }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                            <p className="absolute bg-white text-black font-medium text-sm px-2 rounded top-[-200%] left-[-300%] group-hover:block hidden w-[120px] text-center border border-black">{copied}</p>
                            <div className="absolute top-[-140%] left-[10px] w-[10px] h-[10px] bg-white rotate-45 border-b border-r border-black hidden group-hover:block"></div>
                        </div>
                        {/* <p className={`bg-yellow-300/80 text-black px-2 rounded`}>{data.status}</p> */}
                    </div>
                </div>
                <div className="bg-black/20 p-2 rounded mt-4 text-sm">
                    <p onClick={() => { console.log("WHAT ? ") }}>{data.content}</p>
                </div>
                {/* <img src={`${processFile(data.file)}`} alt="" className="w-full" /> */}
                <div className="text-sm text-white/90">
                    {data.file === '' ? null : <span className="my-2 block">File Attachment : <a className="underline" title={`download ${data.fileNames}`} href={url} download={`${data.fileNames}`}>{data.fileNames}</a></span>}

                    {data.file !== '' ? (
                        isImage ? (
                            <img src={url} alt="" className="w-full h-[200px] object-cover object-top" />
                        ) : (
                            ''
                        )
                    ) : null}
                </div>
            </div>
            {/* {preview} */}
        </div >
    );
}

export default Item;
