import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import axios from '../../axios'
import { EuiButton, EuiFieldSearch, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiIcon, EuiImage, EuiSpacer, EuiTab, EuiTabs, EuiText } from '@elastic/eui'
import { useOutletContext } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function TabContent({status}) {
    const [listOrder,setListOrder]=useState([])
    const {user}=useContext(AuthContext)
    const [searchValue,setSearchValue]=useState('')
    const result = useOutletContext();
  useEffect(()=>{
    const getOrderByUser=async()=>{
      try {
        const res=await axios.get(`/order/getOrderByUser?params=${status}&value=${searchValue}`)
        const data=res.data
        setListOrder(data)
      } catch (err) {
        console.log(err)
      }
    }
    getOrderByUser()
  },[status,searchValue])
  const getConversation=async(id)=>{
    try {
      return await axios.get(`/conversation/find/${id}/${user._id}`)
    } catch (err) {
      console.log(err)
    }
  }
  const createConversation=async(id)=>{
    try {
      return await axios.post('/conversation/create',{
        senderId:user._id,
        receiverId:id
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleChat=async(id)=>{
    const conversation=await getConversation(id)
    console.log(conversation)
    if(conversation.data){
      result.setSelectedConversationId(conversation.data._id)
      result.setSelectedShopId(id)
      result.setPopover(prev=>!prev)
    }else{
      const conversation=await createConversation(id)
      result.setSelectedConversationId(conversation.data._id)
      result.setSelectedShopId(id)
      result.setPopover(prev=>!prev)
    }
  }
  return (
    <Fragment>
        <EuiSpacer />
        <EuiFieldSearch placeholder='Bạn có thể tìm kiếm theo ID đơn hàng hoặc tên sản phẩm' fullWidth onChange={(e)=>setSearchValue(e.target.value)}/>
        <EuiSpacer />
        <EuiFlexGroup direction='column'>
        {listOrder.length?listOrder?.map(item=>(<EuiFlexItem grow={false} key={item.id}>
            <EuiFlexGroup>
            <EuiFlexGroup alignItems='center' gutterSize='s'>
                <EuiText><b>{item.shopName}</b></EuiText>
                <EuiButton iconType="editorComment" color='danger' onClick={()=>handleChat(item.shopId)} fill style={{minWidth:'20px',height:'20px'}}>Chat</EuiButton>
                <EuiButton iconType="/assets/shop.png" color='subdued' fill style={{minWidth:'20px',height:'20px'}} href={`/shop?id=${item.shopId}`}>Xem Shop</EuiButton>
            </EuiFlexGroup>
                {status!=="all"?<>
                    {status==="pending"&&<EuiText color='red'><b>Chờ thanh toán</b></EuiText>}
                    {status==="shipping"&&<EuiText color='red'><b>Đang chuẩn bị đơn hàng</b></EuiText>}
                    {status==="delivering"&&<EuiText color='red'>Đang vận chuyển</EuiText>}
                    {status==="completed"&&<EuiText color='blue'><b>Giao hàng thành công</b></EuiText>}
                    {status==="completed"&&<EuiText color='red'><b>Hoàn thành</b></EuiText>}
                    {status==="canceled"&&<EuiText color='red'>Đã hủy</EuiText>}
                </>:
                <>
                    <EuiText color='red'><b>{item.paymentStatus === "Đã giao"?"Hoàn thành":item.paymentStatus === "Đã hủy"?"Đã hủy":"Chưa giao"}</b></EuiText>
                </>}
            </EuiFlexGroup>
            <EuiHorizontalRule margin='s'/>
            <EuiFlexGroup gutterSize='s'>
            <EuiImage src={item.image} size="80px"/>
            <EuiFlexItem>
                <EuiText>{item.productName}</EuiText>
                <EuiText color='subdued' size='s'>Phân loại hàng: {item.size},{item.color}</EuiText>
                <EuiText >x{item.quantity}</EuiText>
            </EuiFlexItem>
            <EuiText color='red'>₫{item.price?.toLocaleString()}</EuiText>
            </EuiFlexGroup>
            <EuiHorizontalRule margin='s'/>
            <EuiFlexGroup direction='column' alignItems='flexEnd'>
            <EuiText>Thành tiền:&nbsp;<b style={{color:'red'}}>₫{item.price?.toLocaleString()}</b></EuiText>
            <EuiFlexGroup gutterSize='s'>
                {item.confimationStatus==="Đã giao"?
                    <EuiButton color='danger' fill>Mua lại</EuiButton>
                    :<EuiButton color='danger' fill>Hủy</EuiButton>
                }
                <EuiButton onClick={() => handleChat(item.shopId)}>Liên hệ người bán</EuiButton>
                <EuiButton href={`/chi_tiet_san_pham?masp=${item.productId}`}>Xem đánh giá shop</EuiButton>
            </EuiFlexGroup>
            </EuiFlexGroup>
            <EuiHorizontalRule/>
        </EuiFlexItem>)):(
          <EuiFlexGroup>
            <EuiText>Không tìm thấy dữ liệu</EuiText>
          </EuiFlexGroup>
          )}
        </EuiFlexGroup>
    </Fragment>
  )
}
