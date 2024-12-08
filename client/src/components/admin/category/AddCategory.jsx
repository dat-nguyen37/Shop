import { EuiButton, EuiButtonIcon, EuiComboBox, EuiFieldText, EuiFilePicker, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPopover, EuiSpacer } from '@elastic/eui'
import React, { useState } from 'react'
import { toast,ToastContainer } from 'react-toastify'
import axios from '../../../axios'
import {imgDb} from '../../../firebase'
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage'

export default function AddCategory({setModalAdd,getCategory}) {
    const [image,setImage]=useState('')
    const [name,setName]=useState()
    const [subcategories,setSubcategories]=useState([])
    const [nameSubcategory,setNameSubcategory]=useState('')
    const [popover,setPopover]=useState(false)

    const [errors,setErrors]=useState({
        name:''
    })
    const addSubcategories=()=>{
        setSubcategories((prev) => [
            ...prev,
            { label: nameSubcategory,},
          ]);
          setNameSubcategory('')
    }
    const onChangeSubcategory=(category)=>{
        setSubcategories(category)
    }
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
    const handleAdd=async()=>{
        try {
            await axios.post('/category/create',{
                name:name,
                image:image,
                subcategories:subcategories?.map(item=>(
                    {name:item.label}
                ))
            })
            getCategory()
            setModalAdd(false)
            toast.success('Thêm mới thành công')
        } catch (err) {
            if(err.response&&err.response.data.errors){
                setErrors(err.response.data.errors)
            }else{
                console.log(err)
            }
        }
    }

  return (
    <EuiModal onClose={()=>setModalAdd(false)}>
        <ToastContainer/>
        <EuiModalHeader>
            <EuiModalHeaderTitle>Thêm mới</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
            <EuiFormRow label="Tên danh mục" fullWidth isInvalid={!!errors.name} error={errors.name}>
                <EuiFieldText onChange={(e)=>setName(e.target.value)} fullWidth isInvalid={!!errors.name}/>
            </EuiFormRow>
            <EuiSpacer/>
            <EuiFormRow label="Tên danh mục con" fullWidth>
                <EuiFlexGroup gutterSize='s'>
                <EuiFlexItem>
                    <EuiComboBox
                        options={subcategories}
                        selectedOptions={subcategories}
                        onChange={onChangeSubcategory} fullWidth/>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiPopover
                    isOpen={popover}
                    closePopover={()=>setPopover(false)}
                    hasArrow={false}
                    anchorPosition='upRight'
                    button={<EuiButtonIcon iconType="plus" display='fill' size='m' onClick={() => setPopover(!popover)}/>}
                    >
                            <EuiFieldText placeholder='Nhập tên' onChange={(e)=>setNameSubcategory(e.target.value)}/>
                            <EuiButton iconType="plusInCircle" fill onClick={addSubcategories}>Thêm</EuiButton>
                    </EuiPopover>
                </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFormRow>
            <EuiSpacer/>
            <EuiFilePicker onChange={changeFile} multiple fullWidth/>
        </EuiModalBody>
        <EuiModalFooter>
            <EuiFlexGroup justifyContent='flexEnd'>
                <EuiButton onClick={()=>setModalAdd(false)}>Hủy</EuiButton>
                <EuiButton fill onClick={handleAdd}>Lưu</EuiButton>
            </EuiFlexGroup>
        </EuiModalFooter>
    </EuiModal>
  )
}
