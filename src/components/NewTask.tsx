import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { updateTaskList } from "../redux/slice/StoreTaskList";
import { useParams } from "react-router-dom";

const NewTask = () => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const [formData, setFormData] = useState({
        title: "New Task",
        content: "Content New Task",
        status: "Not Done",
        created_at: "",
        id: "",
        file: "",
        fileNames: "No file selected",
    })

    const generateTime = () => {
        // Create a new Date object with the current date and time
        const currentDate = new Date();

        // Define the options for formatting
        const options: any = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // 24-hour format
        };

        // Format the date and time using Intl.DateTimeFormat
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

        // Input date and time in "10/26/2023, 13:30:19" format
        const inputDateTime = formattedDate;

        // Parse the input date and time
        const parsedDate = new Date(inputDateTime);

        // Get the components (year, month, day, hour, minute, second)
        const year = parsedDate.getFullYear();
        const month = parsedDate.getMonth() + 1; // Month is zero-based
        const day = parsedDate.getDate();
        const hour = parsedDate.getHours();
        const minute = parsedDate.getMinutes();
        const second = parsedDate.getSeconds();

        // Create the ISO 8601 formatted string
        const iso8601String = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;

        console.log(iso8601String); // Output: "2023-10-26T13:30:19"


        return iso8601String;
    }
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const generateRandomString = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    const handleForm = (method: any, value: any) => {
        if (method == "content") {
            setFormData({
                ...formData,
                content: value.target.value
            })
        }
        else if (method == "title") {
            setFormData({
                ...formData,
                title: value.target.value
            })
        }
    }
    const handleFormSubmission = () => {
        const time = generateTime();
        const randomCharacter = generateRandomString(6);
        const generatedId = `${id}T${randomCharacter}`;
        console.log("TIME : ", time, "GENERATED ID : ", generatedId);
        const item = { ...formData, id: generatedId, created_at: time }
        const initialFormData: any = {
            title: "New Task",
            content: "Content New Task",
            status: "Not Done",
            created_at: "",
            id: "",
            file: "",
            fileNames: "No file selected",
        }
        console.log("FORM DATA NEW : ", item);
        const method = "insert";
        setFormData(initialFormData);
        dispatch(updateTaskList({ item, method, id }))
        handleClose();
    }
    const handleFormDiscard = () => {
        const initialFormData: any = {
            title: "New Task",
            content: "Content New Task",
            status: "Not Done",
            created_at: "",
            id: "",
            file: "",
            fileNames: "No file selected",
        }
        setFormData(initialFormData);
        handleClose();
    }
    const textareaRef: any = React.createRef();

    // const handleFormContent = (style: any) => {
    //     const textarea = textareaRef.current;
    //     const start = textarea.selectionStart;
    //     const end = textarea.selectionEnd;
    //     const selectedText = formData.content.substring(start, end);
    //     const formattedText = `<${style}>${selectedText}</${style}>`;
    //     if (selectedText.length < 1) return;
    //     const newContent =
    //         formData.content.substring(0, start) +
    //         formattedText +
    //         formData.content.substring(end);
    //     setFormData({ ...formData, content: newContent });
    // };

    const fileToBase64 = (filename: any) => {
        let filepath = '';
        return new Promise(resolve => {
            var file = new File([filename], filepath);
            var reader = new FileReader();
            reader.onload = function (event: any) {
                resolve(event.target.result);
            };
            reader.readAsDataURL(file);
        });
    };

    // const insertLink = () => {
    //     const url = prompt("Enter a URL:");
    //     if (url) {
    //         const textarea = textareaRef.current;
    //         const start = textarea.selectionStart;
    //         const end = textarea.selectionEnd;
    //         const selectedText = formData.content.substring(start, end);
    //         const linkText = `<a href="${url}">${selectedText}</a>`;
    //         if (selectedText.length < 1) return;
    //         const newContent =
    //             formData.content.substring(0, start) +
    //             linkText +
    //             formData.content.substring(end);
    //         setFormData({ ...formData, content: newContent });
    //     }
    // };
    const getFileNameWithoutExtension = (filename: any) => {
        return filename.replace(/\.[^/.]+$/, "");
    }
    const getFileExtension = (filename: any) => {
        return filename.split('.').pop();
    }


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = event?.target?.files?.[0];
        const fileName = getFileNameWithoutExtension(file.name);
        const fileExt = getFileExtension(file.name);
        console.log("FILE NAME : ", fileName);
        fileToBase64(file).then(result => {
            const inputString: any = result;
            const base64Prefix = 'base64,';
            const base64Index = inputString.indexOf(base64Prefix);
            const base64Data = `${inputString.substring(base64Index + base64Prefix.length)}.${fileExt}`;

            setFormData({ ...formData, file: base64Data, fileNames: `${fileName}.${fileExt}` })
            console.log("IMG : 3", base64Data);
        });
    }
    return (
        <>
            <div className="fixed bottom-[20px] left-[20px] bg-[#e66842] border-4 border-white/100 shadow-lg rounded-full p-2">
                <ul className="space-y-2">
                    <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-[40px] h-[40px] mx-auto hover:bg-white/20 p-1 rounded-full cursor-pointer" onClick={handleOpen}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </li>
                </ul>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="w-[100%] max-w-[800px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#ff7043] border-black/30 border-4 text-white outline-none p-4 rounded overflow-hidden">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className="flex items-center gap-2">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg> */}
                            <input type="text" className="text-4xl outline-none w-full bg-transparent" onChange={(event) => { handleForm('title', event) }} value={formData.title} />
                        </div>
                    </Typography>
                    <div className="my-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <span>Attach File / Image</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-full">
                                <label htmlFor="file" className="cursor-pointer text-center border-white border-2 border-dotted rounded px-2 w-full py-4 flex items-center justify-center flex-col">Choose File<br />{formData.fileNames}</label>
                                <input type="file" name="files" hidden id="file" onChange={(event: any) => { handleFileChange(event) }} />
                            </div>
                        </div>
                    </div>
                    {/* <div className="my-4 space-y-2">
                        <div className="flex gap-2">
                            <span>Style Content</span>
                            <div className="relative group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <p className="absolute bg-white text-black font-medium text-sm px-2 rounded top-0 left-[120%] group-hover:block hidden w-[240px] text-center border border-black">Select the text you want to style, then click on styling to apply</p>
                            </div>
                        </div>
                        <ul className="flex">
                            <li className="hover:bg-black/20 p-2 rounded w-[40px] h-[40px] cursor-pointer transition ease-in-out duration-300 flex items-center justify-center" title="Insert Link" onClick={insertLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                            </li>
                            <li className="hover:bg-black/20 p-2 rounded w-[40px] h-[40px] cursor-pointer transition ease-in-out duration-300 flex items-center justify-center" title="Bold Text" onClick={() => { handleFormContent('b') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill="white" d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z" /></svg>
                            </li>
                            <li className="hover:bg-black/20 p-2 rounded w-[40px] h-[40px] cursor-pointer transition ease-in-out duration-300 flex items-center justify-center" title="Italic Text" onClick={() => { handleFormContent('i') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill="white" d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z" /></svg>
                            </li>
                            <li className="hover:bg-black/20 p-2 rounded w-[40px] h-[40px] cursor-pointer transition ease-in-out duration-300 flex items-center justify-center" title="Attach File or Image">

                            </li>
                        </ul>
                    </div> */}
                    {/* <span className="my-4 block">Task Content</span> */}
                    <textarea name="" id="" ref={textareaRef} className="bg-black/20 w-full h-[200px] p-2 rounded resize-none text-white outline-none overflow-auto" onChange={(event) => { handleForm('content', event) }} value={formData.content}></textarea>
                    {/* <p dangerouslySetInnerHTML={{ __html: formData.content }}></p> */}
                    <div className="flex my-4 gap-2 justify-end">
                        <div className="bg-green-500 p-1 px-2 rounded w-fit cursor-pointer" onClick={handleFormSubmission}>Create</div>
                        <div className="bg-red-500 p-1 px-2 rounded w-fit cursor-pointer" onClick={handleFormDiscard}>Discard</div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default NewTask;