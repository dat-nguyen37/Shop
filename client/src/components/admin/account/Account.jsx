import React, { useEffect, useState } from 'react'
import { EuiAvatar, EuiBasicTable, EuiSwitch, EuiText } from '@elastic/eui'
import axios from '../../../axios'
import {toast,ToastContainer} from 'react-toastify'

export default function Account() {

  const [items,setItems]=useState([])
    const columns=[
        {field:'avata',name:'Avatar',
          render:(item)=>(
            <EuiAvatar name="AV" imageUrl={item}/>
          ),
          width:'100px'
        },
        {field:'name',name:'Tên'},
        {field:'phone',name:'Điện thoại'},
        {field:'email',name:'Email'},
        {field:'role',name:'Quyền'},
        {field:'status',name:'Trạng thái',
          render:(item)=>(
            item.role!=='Admin'&&(<EuiSwitch checked={item.status} onChange={onChecked(item._id)}/>)
        ),
          width:'150px'
        },
    ]
    const onChecked=(id)=>(e)=>{
      const status=e.target.checked
      handleUpdate(id,status)
    }
    const handleUpdate=async(id,status)=>{
          try {
              await axios.patch('/user/update/'+id,{status:status})
              toast.success('Cập nhật thành công')
              getUser()
          } catch (err) {
              if(err.response && err.response.data.message){
                  toast.error(err.response.data.message)
              }else(
                  toast.error('Lỗi server')
              )
          }
      }
    const getUser=async()=>{
      try {
        const res=await axios.get('/user/getAll')
        console.log(res.data)
        setItems(
          res.data?.map(u=>(
            {avata:u?.imageUrl,name:u.name,phone:u?.phone,email:u.email,role:u.role,status:u}
          ))
        )
      } catch (err) {
        console.log(err)
      }
    }
    useEffect(()=>{
      getUser()
    },[])

  return (
    <>
    <ToastContainer/>
        <EuiText><strong>Danh sách người dùng</strong></EuiText>
        <EuiBasicTable
            columns={columns}
            items={items}
        />
    </>
  )
}
