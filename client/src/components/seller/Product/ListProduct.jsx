import { EuiBasicTable, EuiButton, EuiButtonIcon, EuiFlexGroup, EuiImage, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import AddProduct from './AddProduct'
import axios from '../../../axios'
import EditProduct from './EditProduct'
import {ShopContext} from '../../../context/ShopContext'
import {toast,ToastContainer} from 'react-toastify'


export default function ListProduct() {
    const {shop}=useContext(ShopContext)

    const [modalAdd,setModalAdd]=useState(false)
    const [modalUpdate,setModalUpdate]=useState(false)
    const [data,setData]=useState([])
    const [selectedItem,setSelectedItem]=useState(null)

    const handleUpdate=(item)=>{
        setSelectedItem(item)
        setModalUpdate(true)
    }
    const handleDelete=async(id)=>{
        try {
            await axios.delete('/product/delete/'+id)
            toast.success('Xóa thành công')
            getProduct()
        } catch (err) {
            console.log(err)
            toast.error('Lỗi server!!')
        }
    }
    const columns=[
        {field:'image',name:'Ảnh',
            render:(item)=>(
                <EuiImage src={item} size='50px'/>
            )
        },
        {field:'name',name:'Tên',width:'300px'},
        {field:'price',name:'Giá'},
        {field:'quantity',name:'Số lượng'},
        {field:'rating',name:'Đánh giá'},
        {field:'status',name:'Trạng thái',
            render:(item)=>(
                <EuiText>{item?'Đang bán':'Cấm bán'}</EuiText>
            )
        },
        {field:'action',name:'Hành động',
            render:(item)=>(
                <EuiFlexGroup gutterSize='s'>
                    <EuiButtonIcon iconType="eye" color='success'/>
                    <EuiButtonIcon iconType="documentEdit" color='primary' onClick={()=>handleUpdate(item)}/>
                    <EuiButtonIcon iconType="trash" color='danger' onClick={()=>handleDelete(item._id)}/>
                </EuiFlexGroup>
            )
        },
    ]
    const getProduct=async()=>{
        try {
            const res=await axios.get('/product/getProductByShop/'+shop._id)
            setData(res.data?.map(item=>(
                {image:item.image,name:item.name,price:item.price,quantity:item.quantity,rating:item.rating,status:item.IsActivate,action:item}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getProduct()
    },[])
  return (
    <EuiPanel>
        <ToastContainer/>
        {modalAdd&&<AddProduct setModalAdd={setModalAdd} getProduct={getProduct}/>}
        {modalUpdate&&<EditProduct setModalUpdate={setModalUpdate} getProduct={getProduct} selectedItem={selectedItem}/>}
        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
            <EuiText>Danh sách sản phẩm</EuiText>
            <EuiButton iconType="plusInCircle" fill onClick={()=>setModalAdd(true)}>Thêm mới</EuiButton>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiBasicTable
        tableLayout='auto'
        columns={columns}
        items={data}/>
    </EuiPanel>
  )
}
