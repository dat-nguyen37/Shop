import React from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import { EuiPanel } from '@elastic/eui';

export default function News() {
    const cloud = useCKEditorCloud({
        version: '44.1.0',
        premium: true
    });

    if (cloud.status === 'error') {
        return <div>Error!</div>;
    }

    if (cloud.status === 'loading') {
        return <div>Loading...</div>;
    }

    const {
        ClassicEditor,
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Image,
        ImageToolbar,
        ImageUpload,
        SimpleUploadAdapter,
    } = cloud.CKEditor;

    const { FormatPainter } = cloud.CKEditorPremiumFeatures;

    return (
        <EuiPanel style={{ minHeight: 'calc(100vh - 3rem)' }}>
            <CKEditor
                editor={ClassicEditor}
                data={'<p>Hello world!</p>'}
                config={{
                    licenseKey: '<YOUR_LICENSE_KEY>',
                    plugins: [
                        Essentials,
                        Paragraph,
                        Bold,
                        Italic,
                        Image,
                        ImageToolbar,
                        ImageUpload,
                        SimpleUploadAdapter,
                        FormatPainter
                    ],
                    toolbar: [
                        'undo', 'redo', '|', 'bold', 'italic', '|',
                        'insertImage', 'formatPainter'
                    ],
                    simpleUpload: {
                        // URL API nơi ảnh sẽ được upload
                        uploadUrl: 'https://example.com/api/upload',
                        
                        // Token hoặc header nếu cần xác thực
                        headers: {
                            Authorization: 'Bearer <YOUR_ACCESS_TOKEN>'
                        }
                    }
                }}
            />
        </EuiPanel>
    );
};
