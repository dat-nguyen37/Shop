import React, { useEffect, useState } from 'react'
import axios from '../../../axios'
import { EuiBasicTable, EuiText,EuiImage, EuiFlexGroup, EuiButtonIcon, EuiButton, EuiAvatar } from "@elastic/eui"
import {toast,ToastContainer} from "react-toastify"
import EditCategory from './EditCategory'
import AddCategory from './AddCategory'

export default function ListCategory() {
    const [selectedItem,setSelectItem]=useState(null)
    const [modalUpdate,setModalUpdate]=useState(false)
    const [modalAdd,setModalAdd]=useState(false)
    const handleUpdate=(item)=>{
        setSelectItem(item)
        setModalUpdate(true)
    }
    const Delete=async(id)=>{
        try {
            await axios.delete('/category/delete/'+id)
            toast.success('Xóa thành công')
            getCategory()
        } catch (err) {
            if(err.response&&err.response.data.errors){
                toast.error(err.response.data.errors)
            }else{
                console.log(err)
                toast.error('Lỗi server!')
            }
        }
    }
    const columns=[
        {field:'logo',name:'Ảnh',
            render:(item)=>(
                <EuiImage src={item} size='50px'/>
            )
        },
        {field:'name',name:'Tên danh mục'},
        {field:'action',name:'Hành động',
            render:(item)=>(
                <EuiFlexGroup gutterSize='s'>
                    <EuiButtonIcon iconType="documentEdit" onClick={()=>handleUpdate(item)}/>
                    <EuiButtonIcon iconType="trash" color='danger' onClick={()=>Delete(item._id)}/>
                </EuiFlexGroup>
            )
        },
    ]
    const [items,setItems]=useState([])
    const getCategory=async()=>{
        try {
            const res=await axios.get('/category/getAll')
            setItems(res.data?.map(c=>(
                {logo:c?.image,name:c.name,action:c}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getCategory()
    },[])
  return (
    <>
    <ToastContainer/>
    <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
      <EuiText><strong>Danh sách danh mục</strong></EuiText>
      <EuiButton iconType="plusInCircle" fill onClick={()=>setModalAdd(true)}>Thêm mới</EuiButton>
    </EuiFlexGroup>
      <EuiBasicTable
      columns={columns}
      items={items}/>
      {modalUpdate&&<EditCategory setModalUpdate={setModalUpdate} getCategory={getCategory} selectedItem={selectedItem}/>}
      {modalAdd&&<AddCategory setModalAdd={setModalAdd} getCategory={getCategory}/>}
    </>
  )
}
