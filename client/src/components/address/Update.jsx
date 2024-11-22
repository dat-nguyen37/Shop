import { EuiButton, EuiButtonEmpty, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiRadio, EuiSpacer } from '@elastic/eui'
import React, { useState } from 'react'
import axios from '../../axios'
import { ToastContainer,toast } from 'react-toastify'

export default function Update({setModalUpdate,getAddress,item}) {
    const [errors,setErrors]=useState({
        name:'',
        phone:'',
        address:'',
        addressDetail:'',
    })
    const [data,setData]=useState({
        name:item.name,
        phone:item.phone,
        address:item.address,
        addressDetail:item.addressDetail,
    })
    const onChange=(field)=>(e)=>{
        setData({
            ...data,
            [field]:e.target.value
        })
    }
    const [status,setStatus]=useState(item.status)

    const handleUpdate=async()=>{
        try {
          const res=await axios.patch('/updateAddress/'+item._id,{
            name:data.name,
            phone:data.phone,
            address:data.address,
            addressDetail:data.addressDetail,
            status:status
          })
          setModalUpdate(false)
          toast.success('Cập nhật thành công')
          getAddress()
        } catch (err) {
          if(err.response && err.response.data.errors){
            setErrors(err.response.data.errors)
          }else{
            console.log(err)
            toast.error('Lỗi server')
          }
        }
      }
  return (
    <EuiModal style={{width:'300px'}} onClose={()=>setModalUpdate(false)}>
        <ToastContainer/>
        <EuiModalHeader>
            <EuiModalHeaderTitle>Cập nhật địa chỉ</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
            <EuiFlexGroup alignItems='center'>
                <EuiFlexItem>
                    <EuiFormRow isInvalid={!!errors.name} error={errors.name}>
                        <EuiFieldText placeholder='Họ và tên' defaultValue={data.name} fullWidth onChange={onChange('name')} isInvalid={!!errors.name}/>
                    </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiFormRow isInvalid={!!errors.phone} error={errors.phone}>
                        <EuiFieldText placeholder='Số điện thoại' defaultValue={data.phone} fullWidth onChange={onChange('phone')} isInvalid={!!errors.phone}/>
                    </EuiFormRow>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer/>
            <EuiFormRow isInvalid={!!errors.address} error={errors.address}>
                <EuiFieldText placeholder='Tỉnh/thành phố, Quận/Huyện, Phường/Xã' defaultValue={data.address} onChange={onChange('address')} fullWidth isInvalid={!!errors.address}/>
            </EuiFormRow>
            <EuiSpacer/>
            <EuiFormRow isInvalid={!!errors.addressDetail} error={errors.addressDetail}>
                <EuiFieldText placeholder='Địa chỉ cụ thể' fullWidth defaultValue={data.addressDetail} onChange={onChange('addressDetail')} isInvalid={!!errors.addressdetail}/>
            </EuiFormRow>
            <EuiSpacer/>
            <EuiRadio label="Đặt làm địa chỉ mặc định" id='1' checked={status} onChange={(e)=>setStatus(e.target.checked)}/>
        </EuiModalBody>
        <EuiModalFooter>
            <EuiButtonEmpty onClick={()=>setModalUpdate(false)}>Hủy</EuiButtonEmpty>
            <EuiButton fill onClick={handleUpdate}>Hoàn thành</EuiButton>
        </EuiModalFooter>
    </EuiModal>
  )
}
