import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useRef, useState } from 'react';
import { EuiPanel } from '@elastic/eui';

export default function News() {
    const [value, setValue] = useState('');
    const reactQuillRef = useRef(null);
    console.log(value);

    return (
        <EuiPanel style={{height:'calc(100vh - 3rem'}}>
            <ReactQuill
                ref={reactQuillRef}
                theme="snow"
                placeholder="Start writing..."
                modules={{
                    toolbar: {
                    container: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["code-block"],
                        ["clean"],
                    ],
                    },
                    clipboard: {
                    matchVisual: false,
                    },
                }}
                formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                    "code-block",
                ]}
                value={value}
                onChange={setValue}
                />

        </EuiPanel>
    );
}
