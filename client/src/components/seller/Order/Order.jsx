import { EuiBasicTable, EuiButton, EuiButtonIcon, EuiFieldSearch, EuiFlexGroup, EuiImage, EuiLink, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
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
                    <EuiButtonIcon iconType="trash" color='danger' onClick={()=>Delete(item)}/>
                </EuiFlexGroup>
            )
        },
    ]
    const Delete=async(item)=>{
        try {
            await axios.delete('/order/delete/'+item.id)
            getOrder()
        } catch (err) {
            console.log(err)
        }
    }
    const [searchValue,setSearchValue]=useState("")
    const getOrder=async()=>{
        try {
            const res=await axios.get(`/order/getByShop/${shop._id}?orderId=${searchValue}`)
            setData(res.data?.map(item=>(
                {id:item.id,userId:item.userId,price:item.price,payment:item.paymentStatus,status:item.confimationStatus,action:item}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    const ExportFile=async()=>{
        try {
            const response=await axios.post(`/order/exportFile`,{
                data:data.map(item=>(
                    {"Mã đơn hàng":item.id,"Giá đơn":item.price,"Trạng thái thanh toán":item.paymentStatus}
                ))
            },{
                responseType: 'blob',
              })
              const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              });
          
              // Tạo một URL tạm từ Blob
              const url = window.URL.createObjectURL(blob);
          
              // Tạo thẻ <a> động và kích hoạt tải file
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'DanhSachDonHang.xlsx'); // Tên file tải về
              document.body.appendChild(link);
              link.click();
          
              // Dọn dẹp URL Blob và xóa thẻ <a>
              link.parentNode.removeChild(link);
              window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getOrder()
        console.log(searchValue)
    },[searchValue])
    const [pageIndex,setPageIndex]=useState(0)
    const [pageSize,setPageSize]=useState(10)

    const onChange=({page})=>{
        const {index:pageIndex,size:pageSize}=page
        setPageIndex(pageIndex)
        setPageSize(pageSize)
    }
    const itemOfPage=(data,pageIndex,pageSize)=>{
        let itemOfPages;
        if(!pageIndex && !pageSize){
            itemOfPages=data
        }else{
            itemOfPages=data.slice(pageIndex*pageSize,(pageIndex+1)*pageSize)
        }
        return {itemOfPages}
    }
    const {itemOfPages}=itemOfPage(data,pageIndex,pageSize)

    const paginations={
        pageIndex,
        pageSize,
        totalItemCount:data.length,
        pageSizeOptions:[0,10,20]
    }
  return (
    <EuiPanel style={{height:'calc(100vh - 3rem'}} className="eui-fullHeight eui-yScrollWithShadows">
        <ToastContainer/>
        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
            <EuiText>Danh sách đơn hàng</EuiText>
            <EuiButton iconType="/assets/excel.png" iconSide='right' onClick={ExportFile}>Xuất file</EuiButton>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFieldSearch placeholder='Tìm kiếm theo mã đơn hàng' onChange={e=>setSearchValue(e.target.value)} fullWidth/>
        <EuiSpacer/>
        <EuiBasicTable
        tableLayout='auto'
        columns={columns}
        items={itemOfPages}
        pagination={paginations}
        onChange={onChange}/>
        {modalview&&<ModalView setModalView={setModalView} selectedItem={selectedItem} getOrder={getOrder}/>}
    </EuiPanel>
  )
}
