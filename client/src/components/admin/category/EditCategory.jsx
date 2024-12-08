import { EuiButton, EuiButtonIcon, EuiComboBox, EuiFieldText, EuiFilePicker, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPopover, EuiSpacer } from '@elastic/eui'
import React, { useState } from 'react'
import { toast,ToastContainer } from 'react-toastify'
import axios from '../../../axios'
import {imgDb} from '../../../firebase'
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage'

export default function UpdateCategory({setModalUpdate,getCategory,selectedItem}) {
    const [image,setImage]=useState(selectedItem.image)
    const [name,setName]=useState(selectedItem.name)
    const [subcategories,setSubcategories]=useState(selectedItem.subcategories?.map(item=>({id:item._id,label:item.name})))
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
    const handleUpdate=async()=>{
        try {
            await axios.patch('/category/update/'+selectedItem._id,{
                name:name,
                image:image,
                subcategories:subcategories?.map(item=>(
                    {_id:item.id,name:item.label}
                ))
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
