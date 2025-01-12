import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useRef, useState } from 'react';
import { EuiButton, EuiFieldText, EuiFlexGroup, EuiForm, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiPanel } from '@elastic/eui';

export default function AddNew({setIsModalAddNewVisible}) {
    const [value, setValue] = useState('');
    const reactQuillRef = useRef(null);
    console.log(value);

    return (
        <EuiModal onClose={() => setIsModalAddNewVisible(false)} style={{width:'70vw'}}>
            <EuiModalHeader>
                <h2>Thêm bài viết</h2>
            </EuiModalHeader>
            <EuiModalBody>
                <EuiFormRow label="Tiêu đề">
                    <EuiFieldText placeholder="Nhập tiêu đề"/>
                </EuiFormRow>
                <EuiFormRow label="Nội dung">
                    <EuiFieldText placeholder="Nhập nội dung"/>
                </EuiFormRow>
                <EuiFormRow label="Ảnh đại diện">
                    <EuiFieldText placeholder="Chọn ảnh"/>
                </EuiFormRow>
                <EuiFormRow label="Nội dung chi tiết">
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
                </EuiFormRow>
            </EuiModalBody>
            <EuiModalFooter>
                <EuiFlexGroup justifyContent="flexEnd">
                    <EuiButton onClick={() => setIsModalAddNewVisible(false)}>Hủy</EuiButton>
                    <EuiButton fill>Thêm</EuiButton>
                </EuiFlexGroup>
            </EuiModalFooter>
        </EuiModal>
    );
}
