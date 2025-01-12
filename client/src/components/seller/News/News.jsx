import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react';
import { EuiPanel } from '@elastic/eui';

export default function News() {
    const [editorData, setEditorData] = useState("");

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <EuiPanel style={{height:'calc(100vh - 3rem'}}>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
                config={{
                    toolbar: ['bold', 'italic', 'undo', 'redo']
                }}
            />
        </EuiPanel>
    );
}
