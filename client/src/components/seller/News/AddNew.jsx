import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useContext, useRef, useState } from 'react';
import { EuiButton, EuiFieldText, EuiFilePicker, EuiFlexGroup, EuiForm, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiPanel } from '@elastic/eui';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { imgDb } from '../../../firebase'
import axios from '../../../axios'
import {ShopContext} from '../../../context/ShopContext'

export default function AddNew({setIsModalAddNewVisible}) {
    const {shop}=useContext(ShopContext)
    const [detail, setDetail] = useState('');
    const reactQuillRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image,setImage]=useState([])
    const [percent,setPercent]=useState(0)
    const changeFile=async(files)=>{
        const file=Array.from(files)[0]
        try {
            const imgRef=ref(imgDb,`/news/${file.name}`)
            const uploadTask=uploadBytesResumable(imgRef,file)
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const percent=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                    setPercent(percent)
                },
                (err)=>console.log(err),
                async()=>{
                    const url=await getDownloadURL(uploadTask.snapshot.ref)
                    setImage(url)
                }
            )
        } catch (err) {
            console.log("Error uploading image:",err)
        }

    }
    const handleAddNew=async()=>{
        try {
            await axios.post('/news/create',{
                author:shop._id,
                title,
                content,
                image,
                detail
            })
            setIsModalAddNewVisible(false)
        }
        catch(err){
            console.log("Error adding new:",err)
        }
    }
    

    return (
        <EuiModal onClose={() => setIsModalAddNewVisible(false)} style={{width:'70vw'}}>
            <EuiModalHeader>
                <h2>Thêm bài viết</h2>
            </EuiModalHeader>
            <EuiModalBody>
                <EuiFormRow label="Tiêu đề" fullWidth>
                    <EuiFieldText placeholder="Nhập tiêu đề" onChange={(e)=>setTitle(e.target.value)} fullWidth/>
                </EuiFormRow>
                <EuiFormRow label="Nội dung" fullWidth>
                    <EuiFieldText placeholder="Nhập nội dung" onChange={(e)=>setContent(e.target.value)} fullWidth/>
                </EuiFormRow>
                <EuiFormRow label="Ảnh đại diện" fullWidth>
                    <EuiFilePicker onChange={changeFile} multiple fullWidth isLoading={percent<100}/>
                </EuiFormRow>
                <EuiFormRow label="Nội dung chi tiết" fullWidth>
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
                        value={detail}
                        onChange={setDetail}
                    />
                </EuiFormRow>
            </EuiModalBody>
            <EuiModalFooter>
                <EuiFlexGroup justifyContent="flexEnd">
                    <EuiButton onClick={() => setIsModalAddNewVisible(false)}>Hủy</EuiButton>
                    <EuiButton fill onClick={handleAddNew}>Thêm</EuiButton>
                </EuiFlexGroup>
            </EuiModalFooter>
        </EuiModal>
    );
}
