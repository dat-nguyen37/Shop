import { EuiBasicTable, EuiButton, EuiButtonIcon, EuiFlexGroup, EuiImage, EuiLink, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios'
import {ShopContext} from '../../../context/ShopContext'
import {toast,ToastContainer} from 'react-toastify'
import ModalView from './ModalView'


export default function Order() {
    const {shop}=useContext(ShopContext)
    const [data,setData]=useState([])
    const [modalview,setModalView]=useState(false)
    const [selectedItem,setSelectedItem]=useState(false)


    const handleModal=(item)=>{
        setModalView(true)
        setSelectedItem(item)
    }
    const columns=[
        {field:'id',name:'Mã đơn',
            render:(item)=>(
                <EuiLink>#{item}</EuiLink>
            )
        },
        {field:'userId',name:'Mã khách hàng',
            render:(item)=>(
                <EuiLink>#{item}</EuiLink>
            )
        },
        {field:'price',name:'Giá',
            render:(item)=>(
                <span>{item?.toLocaleString()}</span>
            )
        },
        {field:'payment',name:'Thanh toán',
            render:(item)=>(
                <span>{item}</span>
            )
        },
        {field:'status',name:'Trạng thái',
            render:(item)=>(
                <span>{item}</span>
            )
        },
        {field:'action',name:'Hành động',
            render:(item)=>(
                <EuiFlexGroup gutterSize='s'>
                    <EuiButtonIcon iconType="documentEdit" color='success' onClick={()=>handleModal(item)}/>
                </EuiFlexGroup>
            )
        },
    ]
    const getOrder=async()=>{
        try {
            const res=await axios.get(`/order/getByShop/${shop._id}`)
            setData(res.data?.map(item=>(
                {id:item.id,userId:item.userId,price:item.price,payment:item.paymentStatus,status:item.confimationStatus,action:item}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getOrder()
    },[])
  return (
    <EuiPanel style={{height:'calc(100vh - 3rem'}}>
        <ToastContainer/>
        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
            <EuiText>Danh sách đơn hàng</EuiText>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiBasicTable
        tableLayout='auto'
        columns={columns}
        items={data}/>
        {modalview&&<ModalView setModalView={setModalView} selectedItem={selectedItem} getOrder={getOrder}/>}
    </EuiPanel>
  )
}
