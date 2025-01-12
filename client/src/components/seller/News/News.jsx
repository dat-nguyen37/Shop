import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useRef, useState } from 'react';
import { EuiPanel } from '@elastic/eui';

export default function News() {
    const [value, setValue] = useState('');
    const reactQuillRef = useRef(null);

    return (
        <EuiPanel style={{height:'calc(100vh - 3rem'}}>
            <ReactQuill ref={reactQuillRef} theme="snow" value={value} onChange={setValue} />
        </EuiPanel>
    );
}
