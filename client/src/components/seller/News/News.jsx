import React, { useState } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EuiPanel } from '@elastic/eui';

export default function News() {
    const [editorData, setEditorData] = useState("");



    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <EuiPanel style={{ minHeight: 'calc(100vh - 3rem)' }}>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
                config={{
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'blockQuote',
                        'insertTable',
                        'mediaEmbed',
                        '|',
                        'undo',
                        'redo'
                    ]
                }}
            />
        </EuiPanel>
    );
};
