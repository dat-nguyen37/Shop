import { EuiButton, EuiButtonEmpty, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiRadio, EuiSpacer } from '@elastic/eui'
import React, { useState } from 'react'
import axios from '../../axios'
import { toast,ToastContainer } from 'react-toastify'

export default function Add({setModalAdd,getAddress}) {
    const [errors,setErrors]=useState({
        name:'',
        phone:'',
        address:'',
        addressDetail:'',
    })
    const [data,setData]=useState({
        name:'',
        phone:'',
        address:'',
        addressDetail:'',
    })
    const [status,setStatus]=useState(false)
    const onChange=(field)=>(e)=>{
        setData({
            ...data,
            [field]:e.target.value
        })
    }

    const handleAddress=async()=>{
            try {
                await axios.post('/addAddress',{
                    name:data.name,
                    phone:data.phone,
                    address:data.address,
                    addressDetail:data.addressDetail,
                    status:status
                })
                toast.success('Cập nhật thành công')
                getAddress()
                setModalAdd(false)
            } catch (err) {
                if(err.response && err.response.data.errors){
                    setErrors(err.response.data.errors)
                }else{
                    toast.error('Lỗi server',{
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                      })
                }
            }
    }
  return (
    <EuiModal style={{width:'300px'}} onClose={()=>setModalAdd(false)}>
        <ToastContainer/>
        <EuiModalHeader>
            <EuiModalHeaderTitle>Địa chỉ mới</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
            <EuiFlexGroup alignItems='center'>
                <EuiFlexItem>
                    <EuiFormRow isInvalid={!!errors.name} error={errors.name}>
                        <EuiFieldText placeholder='Họ và tên' fullWidth onChange={onChange('name')} isInvalid={!!errors.name}/>
                    </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiFormRow isInvalid={!!errors.phone} error={errors.phone}>
                        <EuiFieldText placeholder='Số điện thoại' fullWidth onChange={onChange('phone')} isInvalid={!!errors.phone}/>
                    </EuiFormRow>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer/>
            <EuiFormRow isInvalid={!!errors.address} error={errors.address}>
                <EuiFieldText placeholder='Tỉnh/thành phố, Quận/Huyện, Phường/Xã' onChange={onChange('address')} fullWidth isInvalid={!!errors.address}/>
            </EuiFormRow>
            <EuiSpacer/>
            <EuiFormRow isInvalid={!!errors.addressDetail} error={errors.addressDetail}>
                <EuiFieldText placeholder='Địa chỉ cụ thể' fullWidth onChange={onChange('addressDetail')} isInvalid={!!errors.addressdetail}/>
            </EuiFormRow>
            <EuiSpacer/>
            <EuiRadio label="Đặt làm địa chỉ mặc định" id='1' checked={status} onChange={(e)=>setStatus(e.target.checked)}/>
        </EuiModalBody>
        <EuiModalFooter>
            <EuiButtonEmpty onClick={()=>setModalAdd(false)}>Hủy</EuiButtonEmpty>
            <EuiButton fill onClick={handleAddress}>Lưu</EuiButton>
        </EuiModalFooter>
    </EuiModal>
  )
}
