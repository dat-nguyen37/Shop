import { EuiAvatar, EuiButton, EuiFieldText, EuiFilePicker, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiFormRow, EuiHorizontalRule, EuiInlineEditText, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import React, { useContext, useState } from 'react'
import {AuthContext} from '../../context/AuthContext'
import validator from '../../Validator'
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../axios'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { imgDb } from '../../firebase';

export default function Acount() {
    const {user,dispatch}=useContext(AuthContext)
    const [percent,setPercent]=useState(0)

    const [data,setData]=useState({
        name:user?.name,
        email:user?.email,
        phone:user?.phone,
        imageUrl:user?.imageUrl

    })

    const handleSave=(field,value)=>{
        setData({
            ...data,
            [field]:value
        })
    }
    const changeFile=async(files)=>{
        const file=Array.from(files)[0]
        try {
            const imgRef = ref(imgDb, `/avata/${file.name}`);
            const uploadTask = uploadBytesResumable(imgRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                },
                (err) => console.log(err),
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    data.imageUrl=url;
                }
            );
        } catch (err) {
            console.error("Error uploading image:", err);
        }
    }
    const handleUpdate=async()=>{
        try {
            const res=await axios.patch('/user/update/'+user._id,data)
            dispatch({type:'LOGIN_SUCCESS',payload:res.data})
            toast.success('Cập nhật thành công!', {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
              });
        } catch (err) {
            toast.error('Cập nhật thất bại!', {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
              });
        }
    }
  return (
    <>
        <ToastContainer />
        <EuiText>Hồ sơ của tôi</EuiText>
        <EuiText size='xs'>Quản lý thông tin hồ sơ để bảo mật tài khoản</EuiText>
        <EuiHorizontalRule margin='s'/>
        <EuiFlexGroup>
            <EuiFlexGroup direction='column'>
                <EuiFlexGroup alignItems='center' gutterSize='none'>
                    <EuiText style={{width:'120px'}}>Tên đăng nhập</EuiText>
                    <EuiInlineEditText defaultValue={data?.name} onSave={(newvalue)=>handleSave('name',newvalue)}  inputAriaLabel="Edit username inline"/>
                </EuiFlexGroup>
                <EuiFlexGroup alignItems='center' gutterSize='none'>
                    <EuiText style={{width:'120px'}}>Email</EuiText>
                    <EuiInlineEditText defaultValue={data?.email} onSave={(newvalue)=>handleSave('email',newvalue)}  inputAriaLabel="Edit email inline"/>
                </EuiFlexGroup>
                <EuiFlexGroup alignItems='center' gutterSize='none'>
                    <EuiText style={{width:'120px'}}>Số điện thoại</EuiText>
                    <EuiInlineEditText defaultValue={data?.phone} onSave={(newvalue)=>handleSave('phone',newvalue)}  inputAriaLabel="Edit phone inline"/>
                </EuiFlexGroup>
            </EuiFlexGroup>
            <EuiFlexGroup direction='column' alignItems='center'>
                <EuiAvatar name='DN' size='xl' imageUrl={data.imageUrl}/>
                <EuiFilePicker isLoading={percent<100?true:false} onChange={changeFile}/>
            </EuiFlexGroup>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFlexGroup>
            <EuiButton fill onClick={handleUpdate}>Lưu</EuiButton>
        </EuiFlexGroup>
    </>
  )
}
