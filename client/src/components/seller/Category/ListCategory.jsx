import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios'
import { EuiBasicTable, EuiText,EuiImage, EuiFlexGroup, EuiButtonIcon, EuiButton, EuiAvatar, EuiPanel, EuiLink } from "@elastic/eui"
import {toast,ToastContainer} from "react-toastify"
import {ShopContext} from '../../../context/ShopContext'
// import EditCategory from './EditCategory'
import AddCategory from './Addcategory'

export default function ListCategory() {
    const {shop,dispatch} =useContext(ShopContext)
    const [modalAdd,setModalAdd]=useState(false)

    const Delete=async(id)=>{
        try {
            const res=await axios.patch(`/shop/deleteSubcategories/${shop._id}/${id}`)
            dispatch({type:'SET_SHOP_SUCCESS',payload:res.data})
            toast.success('Xóa thành công')
        } catch (err) {
                console.log(err)
                toast.error('Lỗi server!')
            }
    }
    const columns=[
        {field:'id',name:'Mã',
            render:(item)=>(
                <EuiLink>{item}</EuiLink>
            )
        },
        {field:'name',name:'Tên danh mục'},
        {field:'action',name:'Hành động',
            render:(item)=>(
                <EuiFlexGroup gutterSize='s'>
                    <EuiButtonIcon iconType="trash" color='danger' onClick={()=>Delete(item._id)}/>
                </EuiFlexGroup>
            )
        },
    ]
    const [items,setItems]=useState([])
    useEffect(()=>{
        if (shop?.subcategories?.length) {
            const mappedItems = shop.subcategories.map(item => ({
                id: item._id,
                name: item.name,
                action: item,
            }));
            setItems(mappedItems);
        } else {
            setItems([]);
        }
    },[shop])

  return (
    <EuiPanel style={{height:'calc(100vh - 3rem'}} className="eui-fullHeight eui-yScrollWithShadows">
    <ToastContainer/>
    <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
      <EuiText><strong>Danh sách danh mục</strong></EuiText>
      <EuiButton iconType="plusInCircle" fill onClick={()=>setModalAdd(true)}>Thêm mới</EuiButton>
    </EuiFlexGroup>
      <EuiBasicTable
      columns={columns}
      items={items}/>
      {modalAdd&&<AddCategory setModalAdd={setModalAdd}/>}
    </EuiPanel>
  )
}
