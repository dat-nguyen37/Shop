import { EuiButton, EuiButtonIcon, EuiComboBox, EuiFieldText, EuiFilePicker, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPopover, EuiSpacer } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import { toast,ToastContainer } from 'react-toastify'
import axios from '../../../axios'
import {ShopContext} from '../../../context/ShopContext'


export default function AddCategory({setModalAdd,}) {
    const {shop,dispatch} =useContext(ShopContext)
    const [name,setName]=useState()
    const [listSubcategories,setlistSubcategories]=useState([])
    const [subcategories,setSubcategories]=useState(shop.subcategories?.map(item=>({id:item._id,label:item.name})))
    const [nameSubcategory,setNameSubcategory]=useState('')
    const [popover,setPopover]=useState(false)

    const [errors,setErrors]=useState({
        name:''
    })
    const addSubcategories=async()=>{
        try {
            await axios.post('/category/addSubcategories/'+shop.categoryId,{
                subcategory:nameSubcategory
        })
        getCategory()
        } catch (err) {
            console.log(err)
        }
    }
    const onChangeSubcategory=(category)=>{
        setSubcategories(category)
    }

    const updateShop=async()=>{
        try {
            const res=await axios.patch('/shop/update/'+shop._id,{
                subcategories:subcategories?.map(item=>(
                    {_id:item.id,name:item.label}
                ))
            })
           dispatch({type:'SET_SHOP_SUCCESS',payload:res.data})
           toast.success('Cập nhật thành công')
        } catch (err) {
            console.log(err)
           toast.success('Cập nhật thất bại')
        }
    }
    const getCategory=async()=>{
        try {
            const res=await axios.get('/category/getSubcategories/'+shop.categoryId)
            setlistSubcategories(res.data?.map(c=>(
                {id:c._id,label:c.name,action:c}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getCategory()
    },[])

  return (
    <EuiModal onClose={()=>setModalAdd(false)}>
        <ToastContainer/>
        <EuiModalHeader>
            <EuiModalHeaderTitle>Thêm mới</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
            <EuiFormRow label="Tên danh mục" fullWidth>
                <EuiFlexGroup gutterSize='s'>
                <EuiFlexItem>
                    <EuiComboBox
                        options={listSubcategories}
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
                            <EuiFormRow label="Thêm danh mục khác">
                                <EuiFieldText placeholder='Nhập tên' onChange={(e)=>setNameSubcategory(e.target.value)}/>
                            </EuiFormRow>
                            <EuiButton iconType="plusInCircle" fill onClick={addSubcategories}>Thêm</EuiButton>
                    </EuiPopover>
                </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFormRow>
        </EuiModalBody>
        <EuiModalFooter>
            <EuiFlexGroup justifyContent='flexEnd'>
                <EuiButton onClick={()=>setModalAdd(false)}>Hủy</EuiButton>
                <EuiButton fill onClick={updateShop}>Lưu</EuiButton>
            </EuiFlexGroup>
        </EuiModalFooter>
    </EuiModal>
  )
}
