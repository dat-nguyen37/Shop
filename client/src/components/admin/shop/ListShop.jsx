import { EuiAvatar, EuiBasicTable, EuiImage, EuiSpacer, EuiSwitch, EuiText } from '@elastic/eui'
import React, { useEffect, useState } from 'react'
import axios from '../../../axios'
import moment from 'moment'

export default function ListShop() {

    const updateShop=async(status,id)=>{
        try {
            await axios.patch('/shop/update/'+id,{isActivated:status})
            getShops()
        } catch (err) {
            console.log(err)
        }
    }
    const onChecked=(id)=>(e)=>{
        const status=e.target.checked
        updateShop(status,id)
    }
    const columns=[
        {field:'image',name:'Ảnh cửa hàng',
            render:(item)=>(
                <EuiImage src={item} width="70px" height="50px"/>
            )
        },
        {field:'shop',name:'Tên cửa hàng'},
        {field:'owner',name:'Chủ cửa hàng'},
        {field:'status',name:'Trạng thái',
            render:(item)=>(
                <span>{item?'Đang hoạt động':'Không hoạt động'}</span>
            )
        },
        {field:'dateStart',name:'Ngày đăng kí',
            render:(item)=>(
                <span>{item?moment(item).format('DD/MM/YYYY'):''}</span>
            )
        },
        {field:'activate',name:'Kích hoạt',
            render:(item)=>(
                <EuiSwitch checked={item.isActivated} onChange={onChecked(item._id)}/>
            )
        },
    ]
    const [items,setItems]=useState([])
    const getShops=async()=>{
        try {
            const res=await axios.get('/shop/getAll')
            setItems(res.data?.map(s=>(
                {image:s?.avatar,shop:s?.name,owner:s?.ownerName,status:s?.isActivated,dateStart:s?.createdAt,activate:s}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getShops()
    },[])
  return (
    <>
        <EuiText><strong>Danh sách cửa hàng</strong></EuiText>
        <EuiSpacer/>
        <EuiBasicTable
            columns={columns}
            items={items}
        />
    </>
  )
}
