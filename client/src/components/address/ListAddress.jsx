import { EuiButton, EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiLink, EuiPanel, EuiText } from '@elastic/eui'
import React, { useEffect, useState } from 'react'
import Add from './Add'
import Update from './Update'
import axios from '../../axios'
import { ToastContainer,toast } from 'react-toastify'

export default function ListAddress() {
    const [modalAdd,setModalAdd]=useState(false)
    const [modalUpdate,setModalUpdate]=useState(false)
    const [data,setData]=useState([])
    const [addressSelected,setAddressSelected]=useState(null)

    const getAddress=async()=>{
      try {
        const res=await axios.get('/user/getAddress')
        setData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    const openModalUpdate=(item)=>{
      setAddressSelected(item)
      setModalUpdate(true)
    }
    const handleDelete=async(id)=>{
      try {
        const res=await axios.delete('/deleteAddress/'+id)
        toast.success('Xóa thành công')
        getAddress()
      } catch (err) {
        console.log(err)
      }
    }
    const handleUpdate=async(id,name,phone,address,addressDetail)=>{
      try {
        const res=await axios.patch('/user/updateAddress/'+id,{
          name:name,
          phone:phone,
          address:address,
          addressDetail:addressDetail,
          status:true
        })
        toast.success('Cập nhật thành công')
        getAddress()
      } catch (err) {
        if(err.response && err.response.data.errors){
          toast.error('Địa chỉ không đầy đủ, không thể cài mặc định')
        }else{
          console.log(err)
          toast.error('Lỗi server')
        }
      }
    }
    useEffect(()=>{
      getAddress()
    },[])


  return (
    <>
    <ToastContainer/>
      <EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
        <EuiText>Địa chỉ của tôi</EuiText>
        <EuiButton iconType="plus" fill onClick={()=>setModalAdd(true)}>Thêm địa chỉ mới</EuiButton>
      </EuiFlexGroup>
      <EuiHorizontalRule margin='s'/>
      <EuiFlexGroup direction='column'>
        <EuiText>Địa chỉ</EuiText>
        {data?.map(item=>(<EuiFlexItem>
            <EuiFlexGroup justifyContent='spaceBetween'>
                <EuiFlexGroup direction='column' gutterSize='s'>
                    <EuiFlexGroup gutterSize='s'>
                        <EuiText>{item?.name}</EuiText>
                        <hr/>
                        <EuiText>{item?.phone}</EuiText>
                    </EuiFlexGroup>
                    <EuiText size='s' color='subdued'>{item?.addressDetail}</EuiText>
                    <EuiText size='s' color='subdued'>{item?.address}</EuiText>
                    {item?.status&&<EuiText color='red' textAlign='center' style={{border:'1px solid',width:'80px'}}>Mặc định</EuiText>}
                </EuiFlexGroup>
                <EuiFlexItem grow={false}>
                    <EuiFlexGroup direction='column' alignItems='center' gutterSize='s'>
                        <EuiLink onClick={()=>openModalUpdate(item)}>Cập nhật</EuiLink>
                        <EuiLink onClick={()=>handleDelete(item._id)}>Xóa</EuiLink>
                        {!item?.status&&<EuiLink onClick={()=>handleUpdate(item._id,item.name,item.phone,item.address,item.addressDetail)}>Thiết lập mặc định</EuiLink>}
                    </EuiFlexGroup>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiHorizontalRule margin='s'/>
        </EuiFlexItem>))}
      </EuiFlexGroup>
      {modalAdd&&<Add setModalAdd={setModalAdd} getAddress={getAddress}/>}
      {modalUpdate&&<Update setModalUpdate={setModalUpdate} getAddress={getAddress} item={addressSelected}/>}
    </>
  )
}
