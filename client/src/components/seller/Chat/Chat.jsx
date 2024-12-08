import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axios from '../../../axios'
import moment from 'moment';
import { EuiAbsoluteTab, EuiAvatar, EuiBottomBar, EuiButton, EuiButtonIcon, EuiFieldNumber, EuiFieldSearch, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiPageSection, EuiPageTemplate, EuiPanel, EuiPopover, EuiPopoverTitle, EuiRelativeTab, EuiSpacer, EuiText } from '@elastic/eui';
import { ShopContext } from '../../../context/ShopContext';
import { io } from 'socket.io-client';
import Order from './Order';


export default function Chat() {
    const {shop}=useContext(ShopContext)
    const [messages,setMessages]=useState()
    const [conversations,setConversations]=useState([])
    const [curentChat,setCurentChat]=useState(null)
    const [selectedConversationId,setSelectedConversationId]=useState('')
    const [selectedUserId,setSelectedUserId]=useState('')
    const [newMessage,setNewMessage]=useState('')
    const [arrivalMessages,setArrivalNewMessages]=useState(null)
    const [currentTab,setCurrentTab]=useState('tab1')
    const socket=useRef(io("ws://localhost:5000"))

    useEffect(()=>{
      // khởi tạo kết nối
       socket.current=io("ws://localhost:5000")
       // lắng nghe tin nhắn
       socket.current.on("getMessage",data=>{
             setArrivalNewMessages({
              sender:data.senderId,
              text:data.text,
              createdAt:Date.now()
             })
       })
    },[])
    // cập nhật tin nhắn mới
    useEffect(()=>{
      getConversations()
         if(arrivalMessages &&curentChat?.members.includes(arrivalMessages.sender))
         {getMessage()
          getConversations()
         }
    },[arrivalMessages,curentChat])

    const handleSelected=(conversationId,selectedUserId)=>{
      setSelectedConversationId(conversationId)
      setSelectedUserId(selectedUserId)
    }
    useEffect(()=>{
      // gửi người dùng đến máy chủ
      socket.current.emit("addUser", shop._id)
      // lắng nghe về người dùng trực tuyến và cập nhật trạng thái 
     },[shop])
  
    const sendMessage=async()=>{
      const message={
        conversationId:selectedConversationId,
        sender:shop._id,
        text:newMessage
      }
      const receiverId=curentChat.members.find(member=>member!==shop._id)
      socket.current.emit("sendMessage",{
        senderId:shop._id,
        receiverId,
        text:newMessage
      })
      try {
        const res=await axios.post('/message/create',message)
        getMessage()
        getConversations()
      } catch (err) {
        console.log(err)
      }
    }
  
    const getConversations=async()=>{
      try {
        const res= await axios.get('/conversation/getByShop/'+shop._id)
        setConversations(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    const getMessage=async()=>{
      try {
        const res=await axios.get(`/message/shop/${shop._id}/${selectedConversationId}`)
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    useEffect(()=>{
      getMessage()
    },[selectedConversationId])
    const getCurrentChat=async()=>{
      try {
        const res=await axios.get(`conversation/find/${shop._id}/${selectedUserId}`)
        setCurentChat(res.data)
      } catch (err) {
        console.logg(err)
      }
    }
    useEffect(()=>{
      getConversations()
      if(selectedConversationId&&selectedUserId){
        getMessage()
        getCurrentChat()
        getOrder()
      }
    },[selectedConversationId,selectedUserId])
  
    const scoll=useRef()
    useEffect(()=>{
      scoll.current?.scrollIntoView({behavior:"smooth"})
   },[messages])

   const [orders,setOrders]=useState([])
   const getOrder=async()=>{
    try {
      const res=await axios.get(`/order/getByShopAndUser/${selectedUserId}/${shop._id}`)
      setOrders(res.data)
    } catch (err) {
      console.log(err)
    }
   }


  return (
    <EuiFlexGroup responsive={false} gutterSize='s' style={{height:'calc(100vh - 3rem)'}}>
        <EuiFlexItem grow={false} style={{background:'white',padding:'8px'}}>
        {conversations.length&&<EuiFlexGroup direction='column' gutterSize='s'>
           <EuiFieldSearch placeholder='Tìm kiếm' style={{outline:'none'}}/>
            <EuiSpacer size='s'/>
            <EuiFlexGroup direction='column' gutterSize='s' className="eui-fullHeight eui-yScrollWithShadows">
            {conversations.map(conversation=>(
                <EuiFlexItem grow={false} onClick={()=>handleSelected(conversation.conversationId,conversation.user._id)}>
                <EuiFlexGroup gutterSize='s' alignItems='center' responsive={false}>
                <EuiAvatar name='A' size='s'/>
                <EuiFlexItem>
                    <EuiText size='s'>{conversation.user.name}</EuiText>
                    <EuiText color='subdued' size='xs'>{conversation.latestMessage.sender===shop._id&&'bạn:'}&nbsp;{conversation.latestMessage.text}</EuiText>
                </EuiFlexItem>
                <EuiText size='xs' color='subdued'>{moment(conversation.latestMessage.createdAt).format("DD/MM")}</EuiText>
                </EuiFlexGroup>
            </EuiFlexItem>))}
            </EuiFlexGroup>
           </EuiFlexGroup>}
        </EuiFlexItem>
        {messages?(
        <EuiFlexGroup gutterSize='s' style={{padding:'8px'}}>
            <EuiFlexItem style={{background:'white'}}>
                    <EuiPageHeader paddingSize='none'>
                        <EuiHeader style={{width:'100%',height:'40px'}}>
                        <EuiHeaderSection>
                            <EuiFlexGroup alignItems='center' gutterSize='s'>
                            <EuiHeaderSectionItem>
                            <EuiText>{messages?.user?.name}</EuiText>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                            <EuiIcon type='arrowDown' size='s'/>
                            </EuiHeaderSectionItem>
                            </EuiFlexGroup>
                        </EuiHeaderSection>
                        </EuiHeader>
                    </EuiPageHeader>
                    <EuiFlexGroup direction='column' gutterSize='s' justifyContent='spaceBetween'>
                    <EuiFlexItem style={{maxHeight:'380px'}} className="eui-fullHeight eui-yScrollWithShadows">
                        <EuiFlexGroup direction='column' style={{padding:'5px'}} gutterSize='s'>
                        {messages?.messages?.map(message=>(<EuiFlexItem grow={false} style={{alignItems:shop._id===message.sender?'flex-end':'flex-start'}}>
                            <EuiText style={{background:'#0099FF',padding:'5px',borderRadius:'10px',maxWidth:'200px'}}>{message.text}</EuiText>
                        </EuiFlexItem>))}
                        <div ref={scoll} />
                        </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false} style={{height:'50px',background:'white'}}>
                        <EuiFlexGroup alignItems='center' gutterSize='s' responsive={false}>
                        <EuiFieldText placeholder='Viết gì đó ...' onChange={(e)=>setNewMessage(e.target.value)} style={{outline:'none'}}/>
                        <EuiButtonIcon iconType="/assets/send-message.png" iconSize='m' onClick={sendMessage}/>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
            {currentTab==='tab1'&&
            <EuiFlexItem>
              <EuiPageHeader>
                <EuiHeader style={{width:'100%'}}>
                  <EuiHeaderSection>
                    <EuiFlexGroup alignItems='center'>
                      <EuiHeaderSectionItem>
                        <EuiAvatar name='A' imageUrl={messages.user.image}/>
                      </EuiHeaderSectionItem>
                      <EuiHeaderSectionItem>
                        <EuiFlexGroup direction='column' gutterSize='none'>
                          <EuiText>{messages.user.name}</EuiText>
                          <EuiText size='xs' color='subdued'>{messages.user.phone ? messages.user.phone:messages.user.email}</EuiText>
                        </EuiFlexGroup>
                      </EuiHeaderSectionItem>
                    </EuiFlexGroup>
                  </EuiHeaderSection> 
                  <EuiHeaderSection side='right'>
                    <EuiLink onClick={()=>setCurrentTab('tab2')}>Xem chi tiết</EuiLink>
                  </EuiHeaderSection>
                </EuiHeader>
              </EuiPageHeader>
              <EuiSpacer size='s'/>
              <EuiPanel grow={false}>
                <EuiFlexGroup gutterSize='s' alignItems='center'>
                  <EuiIcon type="copyClipboard"/>
                  <EuiText>Đơn hàng ({orders.length})</EuiText>
                </EuiFlexGroup>
                <EuiSpacer/>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiButton iconType="plus" fill onClick={()=>setCurrentTab('tab3')}>Tạo đơn hàng</EuiButton>  
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPanel>
            </EuiFlexItem>}
            {currentTab==='tab2'&&
            <EuiFlexItem>
              <EuiPageHeader>
                <EuiPageHeaderSection>
                  <EuiFlexGroup alignItems='center'>
                    <EuiButtonIcon iconType="arrowLeft" display='fill' iconSize='l' size='m' onClick={()=>setCurrentTab('tab1')}/>
                    <EuiText><h3>Thông tin khách hàng</h3></EuiText>
                  </EuiFlexGroup>
                </EuiPageHeaderSection>
              </EuiPageHeader>
              <EuiSpacer size='s'/>
              <EuiPanel grow={false}>
                <EuiText><h4>Chi tiết liên hệ</h4></EuiText>
                <EuiHorizontalRule/>
                <EuiFlexGroup>
                  <EuiFlexGroup>
                    <EuiIcon type="user"/>
                    <EuiText>Họ và tên:</EuiText>
                  </EuiFlexGroup>
                  <EuiText>{messages?.user.name}</EuiText>
                </EuiFlexGroup>
                <EuiSpacer/>
                <EuiFlexGroup>
                  <EuiFlexGroup>
                    <EuiIcon type="/assets/phone.png" color='red'/>
                    <EuiText>Số điện thoại:</EuiText>
                  </EuiFlexGroup>
                  <EuiText>{messages?.user.phone}</EuiText>
                </EuiFlexGroup>
                <EuiSpacer/>
                <EuiFlexGroup>
                  <EuiFlexGroup>
                    <EuiIcon type="email"/>
                    <EuiText>Email:</EuiText>
                  </EuiFlexGroup>
                  <EuiText>{messages?.user.email}</EuiText>
                </EuiFlexGroup>
              </EuiPanel>
            </EuiFlexItem>}
            {currentTab==='tab3'&&
            <Order setCurrentTab={setCurrentTab} user={messages.user}/>}
        </EuiFlexGroup>
        
    ):(<EuiFlexGroup style={{background:'white'}} justifyContent='center' alignItems='center'>
            <EuiIcon type="discuss" size='xxl'/>
            <EuiText>Chọn 1 hội thoại từ danh sách bên trái</EuiText>
        </EuiFlexGroup>)}
    </EuiFlexGroup>
  )
}
