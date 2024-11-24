import { EuiButton, EuiFieldText, EuiFilePicker, EuiFlexGroup, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiSpacer } from '@elastic/eui'
import React, { useState } from 'react'
import { toast,ToastContainer } from 'react-toastify'
import axios from '../../../axios'
import {imgDb} from '../../../firebase'
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage'

export default function UpdateCategory({setModalUpdate,getCategory,selectedItem}) {
    const [image,setImage]=useState('')
    const [name,setName]=useState(selectedItem.name)
    const [errors,setErrors]=useState({
        name:''
    })

    const changeFile=async(files)=>{
        const file=Array.from(files)[0]
        try {
            const imgRef = ref(imgDb, `/category/${file.name}`);
            const uploadTask = uploadBytesResumable(imgRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (err) => console.log(err),
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    setImage(url);
                }
            );
        } catch (err) {
            console.error("Error uploading image:", err);
        }
    }
    const handleUpdate=async()=>{
        console.log(image)
        try {
            await axios.patch('/category/update/'+selectedItem._id,{
                name:name,
                image:image
            })
            getCategory()
            setModalUpdate(false)
            toast.success('Cập nhật thành công')
        } catch (err) {
            if(err.response&&err.response.data.errors){
                setErrors(err.response.data.errors)
            }else{
                console.log(err)
            }
        }
    }

  return (
    <EuiModal onClose={()=>setModalUpdate(false)}>
        <ToastContainer/>
        <EuiModalHeader>
            <EuiModalHeaderTitle>Cập nhật</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
            <EuiFormRow fullWidth isInvalid={!!errors.name} error={errors.name}>
                <EuiFieldText onChange={(e)=>setName(e.target.value)} value={name} fullWidth isInvalid={!!errors.name}/>
            </EuiFormRow>
            <EuiSpacer/>
            <EuiFilePicker onChange={changeFile} multiple fullWidth/>
        </EuiModalBody>
        <EuiModalFooter>
            <EuiFlexGroup justifyContent='flexEnd'>
                <EuiButton onClick={()=>setModalUpdate(false)}>Hủy</EuiButton>
                <EuiButton fill onClick={handleUpdate}>Lưu</EuiButton>
            </EuiFlexGroup>
        </EuiModalFooter>
    </EuiModal>
  )
}
