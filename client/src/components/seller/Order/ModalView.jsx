import { EuiButton, EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiSelect, EuiSpacer, EuiTextArea } from '@elastic/eui'
import React, { useState } from 'react'
import axios from '../../../axios'
import {toast,ToastContainer} from 'react-toastify'

export default function ModalView({setModalView,selectedItem,getOrder}) {
    const [data,setData]=useState({
        id:selectedItem.id,
        productId: selectedItem.productId,
        size:selectedItem.size,
        color:selectedItem.color,
        quantity: selectedItem.quantity,
        price: selectedItem.price,
        confimationStatus: selectedItem.confimationStatus,
        name: selectedItem.name,
        phone: selectedItem.phone,
        address: selectedItem.address,
        description: selectedItem.description,
        paymentStatus: selectedItem.paymentStatus,
    })

    const onChange=(field)=>(e)=>{
        setData({
            ...data,[field]:e.target.value
        })
        console.log(data)
    }

    const handleUpdate=async()=>{
        try {
            await axios.patch(`/order/update?orderItemId=${data.id}`,{
                confimationStatus:data.confimationStatus,
                name:data.name,
                phone:data.phone,
                address:data.address,
                paymentStatus:data.paymentStatus,
                description:data.description,
            })
            toast.success('Cập nhật thành công')
            getOrder()
            setModalView(false)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <>
    <ToastContainer/>
    <EuiModal onClose={()=>setModalView(false)}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Cập nhật đơn hàng</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <EuiFlexGrid columns={2} gutterSize='s'>
            <EuiFlexItem>
                <EuiFormRow label="Mã đơn hàng">
                    <EuiFieldText defaultValue={data.id} disabled/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem >
                <EuiFormRow label="Mã sản phẩm">
                    <EuiFieldText defaultValue={data.productId} disabled/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem >
                <EuiFormRow label="Phân loại hàng">
                    <EuiFieldText defaultValue={data.size +','+ data.color} disabled/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem >
                <EuiFormRow label="Số lượng">
                    <EuiFieldText defaultValue={data.quantity} disabled/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem >
                <EuiFormRow label="Giá">
                    <EuiFieldText defaultValue={data.price} disabled/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Tên khách hàng">
                    <EuiFieldText defaultValue={data.name} onChange={onChange('name')}/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Số điện thoại">
                    <EuiFieldText defaultValue={data.phone} onChange={onChange('phone')}/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Địa chỉ">
                    <EuiFieldText defaultValue={data.address} onChange={onChange('address')}/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Thanh toán">
                    <EuiSelect
                    defaultValue={data.paymentStatus}
                    onChange={onChange('paymentStatus')}
                    options={[
                        {value:'Chưa thanh toán',text:'Chưa thanh toán'},
                        {value:'Đã thanh toán',text:'Đã thanh toán'},
                    ]}/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Trạng thái">
                <EuiSelect 
                    onChange={onChange('confimationStatus')}
                    defaultValue={data.confimationStatus}
                    options={[
                        {value:'Chưa xác nhận',text:'Chưa xác nhận'},
                        {value:'Đã xác nhận',text:'Đã xác nhận'},
                        {value:'Đang giao',text:'Đang giao'},
                        {value:'Đã giao',text:'Đã giao'},
                        {value:'Đã hủy',text:'Đã hủy'},
                    ]}/>
                </EuiFormRow>
            </EuiFlexItem>
        </EuiFlexGrid>
        <EuiSpacer size='s'/>
            <EuiFlexItem>
                <EuiFormRow label="Ghi chú">
                    <EuiTextArea rows={3} defaultValue={data.description} onChange={onChange('description')}/>
                </EuiFormRow>
            </EuiFlexItem>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiFlexGroup justifyContent='flexEnd'>
            <EuiButton fill onClick={handleUpdate}>Lưu thay đổi</EuiButton>
        </EuiFlexGroup>
      </EuiModalFooter>
    </EuiModal>
    </>
  )
}
