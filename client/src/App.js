import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import RegisterSeller from './pages/RegisterSeller';
import Home from './pages/Home';
import Header from './components/header/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/footer/Footer';
import ShopView from './pages/ShopView';
import { EuiAbsoluteTab, EuiAvatar, EuiBottomBar, EuiButton, EuiButtonIcon, EuiFieldSearch, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPageBody, EuiPageHeader, EuiPageSection, EuiPageTemplate, EuiPanel, EuiPopover, EuiPopoverTitle, EuiProvider, EuiRelativeTab, EuiSpacer, EuiText } from '@elastic/eui';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Acount from './components/account/Acount';
import ListAddress from './components/address/ListAddress';
import Setting from './components/setting/Setting';
import Password from './components/password/Password';
import Order from './components/order/Order';
import ActivateAccount from './pages/ActivateAccount';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import {Navigate} from 'react-router-dom'
import DashboardAdmin from './components/admin/Dashboard/Dashboard';
import ListShop from './components/admin/shop/ListShop';
import Account from './components/admin/account/Account';
import DashboardSeller from './components/seller/Dashboard/Dashboard';
import ListCategory from './components/admin/category/ListCategory';
import ListSubCategory from './components/seller/Category/ListCategory';
import Statistical from './components/seller/Statistical/Statistical';
import ListProduct from './components/seller/Product/ListProduct';
import HomeSeller from './components/seller/Home/HomeSeller';
import ProductManagement from './components/admin/product/ProductManagement';
import BoxCategory from './pages/BoxCategory';
import Search from './pages/Search';
import axios from './axios'
import moment from 'moment';
import Chat from './components/seller/Chat/Chat';
import OrderByShop from './components/seller/Order/Order';
import Swal from 'sweetalert2'
import { io } from 'socket.io-client';
import ListLog from './components/admin/log/ListLog';
import Slide from './components/admin/slide/Slide';
import StatisticalAdmin from './components/admin/Statistical/Statistical';
import Report from './components/admin/report/Report';
import ViewProduct from './components/seller/Product/ViewProduct';
import { DarkModeContext } from './context/DarkModeContext';
import News from './components/seller/News/News';
import Blog from './pages/Blog';
import Blogs from './components/blog/Blogs';
import BlogDetail from './pages/BlogDetail';


function App() {
  const {user,dispatch}=useContext(AuthContext)

  const getLogin=async()=>{
    try {
      const res=await axios.get('/auth/login/success')
      console.log(res.data)
      dispatch({type:'LOGIN_SUCCESS',payload:res.data})
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getLogin()
  },[])

    const { color } = useContext(DarkModeContext);
  
  return (
  <EuiProvider colorMode={color}>
      <Routes>
        <Route path="/dangky_nguoiban" element={user?<RegisterSeller />:<Navigate to="/dang_nhap"/>} />
        <Route path="/dang_ky" element={<Register />} />
        <Route path="/dang_nhap" element={<Login />} />
        <Route path="/kich_hoat" element={<ActivateAccount />} />
        <Route path="/dashboard" element={user&&user.role==="Admin"?<DashboardAdmin />:<Navigate to="/dang_nhap"/>}>
          <Route index element={<StatisticalAdmin />}/>
          <Route path="danh_sach_cua_hang" element={<ListShop />}/>
          <Route path="danh_sach_nguoi_dung" element={<Account />}/>
          <Route path="danh_sach_danh_muc" element={<ListCategory />}/>
          <Route path="danh_sach_san_pham" element={<ProductManagement />}/>
          <Route path="danh_sach_to_cao" element={<Report />}/>
          <Route path="nhat_ky" element={<ListLog />}/>
          <Route path="slide" element={<Slide />}/>
        </Route>
        <Route path="/nguoi_ban" element={user?<DashboardSeller />:<Navigate to="/dang_nhap"/>}>
          <Route index element={<Statistical />}/>
          <Route path="danh_sach_san_pham" element={<ListProduct />}/>
          <Route path="san_pham" element={<ViewProduct />}/>
          <Route path="danh_sach_don_hang" element={<OrderByShop />}/>
          <Route path="danh_sach_danh_muc" element={<ListSubCategory />}/>
          <Route path="danh_sach_bai_viet" element={<News/>}/>
          <Route path="chat" element={<Chat />}/>
        </Route>
        <Route path="/" element={<Nested />} >
          <Route path="/" element={<Home />} />
          <Route path="/danh_muc" element={<BoxCategory />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cua_hang_cua_toi" element={user?<HomeSeller />:<Navigate to="/dang_nhap"/>} />
          <Route path="/chi_tiet_san_pham" element={<ProductDetail />} />
          <Route path="/shop" element={<ShopView />} />
          <Route path="/cart" element={user?<Cart />:<Navigate to="/dang_nhap"/>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={user?<Profile />:<Navigate to="/dang_nhap"/>}>
            <Route index element={user?<Acount />:<Navigate to="/dang_nhap"/>} />
            <Route path="address" element={<ListAddress />} />
            <Route path="setting" element={<Setting />} />
            <Route path="password" element={<Password />} />
            <Route path="order" element={<Order />} />
          </Route>
          <Route path="/blog" element={<Blog />}>
            <Route index element={<Blogs />} />
            <Route path="chi_tiet" element={<BlogDetail />} />
          </Route>
        </Route>
      </Routes>
      </EuiProvider>
  );
}

const Nested=()=>{
  const [popover,setPopover]=useState(false)
  const [popoverShop,setPopoverShop]=useState(false)
  const {user}=useContext(AuthContext)
  const [messages,setMessages]=useState()
  const [conversations,setConversations]=useState([])
  const [curentChat,setCurentChat]=useState(null)
  const [selectedConversationId,setSelectedConversationId]=useState('')
  const [selectedShopId,setSelectedShopId]=useState('')
  const [newMessage,setNewMessage]=useState('')
  const [arrivalMessages,setArrivalNewMessages]=useState(null)
  const socket = useRef(null);

  useEffect(()=>{
    // khởi tạo kết nối
     socket.current=io("wss://shop-oyck.onrender.com", {
      transports: ["websocket"],
      reconnection: true,        // Tự động kết nối lại
      reconnectionAttempts: 5,   // Số lần thử kết nối lại
      reconnectionDelay: 1000,
  })
     // lắng nghe tin nhắn
     socket.current.on("getMessage",data=>{
           setArrivalNewMessages({
            sender:data.senderId,
            text:data.text,
            createdAt:Date.now()
           })
           
     })
  },[])
  useEffect(()=>{
    // if(arrivalMessages &&curentChat?.members.includes(arrivalMessages.sender))
    // { 
      console.log(arrivalMessages,curentChat)
      getMessage()
      getConversations()
    // }
},[arrivalMessages,curentChat])

const handleSelected=(conversationId,selectedShopId)=>{
  setSelectedConversationId(conversationId)
  setSelectedShopId(selectedShopId)
}
useEffect(()=>{
 // gửi người dùng đến máy chủ
 socket.current.emit("addUser", user?._id)
 socket.current.on("getUser",(users)=>{
  console.log(users)
})

  },[user])

  const sendMessage=async()=>{
    const message={
      conversationId:selectedConversationId,
      sender:user?._id,
      text:newMessage
    }
    const receiverId=curentChat.members.find(member=>member!==user._id)
    socket.current.emit("sendMessage",{
      senderId:user._id,
      receiverId,
      text:newMessage
    })
    try {
      await axios.post('/message/create',message)
      getMessage()
      getConversations()
    } catch (err) {
      console.log(err)
    }
  }

  const getConversations=async()=>{
    try {
      const res= await axios.get('/conversation/getByUser')
      setConversations(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const getMessage=async()=>{
    try {
      const res=await axios.get(`/message/user/${user?._id}/${selectedConversationId}`)
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const getCurrentChat=async()=>{
    try {
      const res=await axios.get(`/conversation/find/${selectedShopId}/${user?._id}`)
      setCurentChat(res.data)
    } catch (err) {
      console.logg(err)
    }
  }
  useEffect(()=>{
    getConversations()
    if(selectedConversationId&&selectedShopId){
      getMessage()
      getCurrentChat()
    }
  },[selectedConversationId,selectedShopId])

  const scoll=useRef()
  useEffect(()=>{
    scoll.current?.scrollIntoView({behavior:"smooth"})
 },[messages])

 // cart
 const [cart,setCart]=useState([])
 const getCartByUser=async()=>{
  try {
    const res=await axios.get('/cart/getByUser')
    setCart(res.data)
} catch (err) {
    console.log(err)
}
 }
 useEffect(()=>{
  getCartByUser()
 },[user])
  return (<div style={{position:'relative'}}>
    <Header cart={cart}/>
    <EuiPageTemplate style={{marginTop:'100px'}}>
      <Outlet context={{setPopover,setSelectedConversationId,setSelectedShopId,getCartByUser}}/>
    </EuiPageTemplate>
    <Footer/>
    <EuiPanel style={{position:'fixed',right:'20px',bottom:'5px',zIndex:100}}>
          {!popover&&<EuiLink onClick={()=>setPopover(true)} color='danger'><EuiIcon type="discuss"/>&nbsp;<b>Chat</b></EuiLink>}
        {popover&&<EuiFlexGroup direction='column' gutterSize='s' style={{background:'white',width:"500px",padding:"5px"}}>
              <EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
                <EuiText style={{color:"black"}}>Chat</EuiText>
                <EuiButtonIcon iconType="arrowDown" display='fill' color='text' onClick={()=>setPopover(false)}/>
              </EuiFlexGroup>
            <EuiHorizontalRule margin='none'/>
            {user?(
              conversations.length?<EuiFlexGroup style={{height:'330px'}} responsive={false} gutterSize='s'>
              <EuiFlexItem grow={false} style={{width:'180px'}}>
                  <EuiFieldSearch placeholder='Tìm kiếm' style={{outline:'none',backgroundColor:"white",color:'black'}}/>
                  <EuiSpacer size='s'/>
                  <EuiFlexGroup direction='column' gutterSize='s' className="eui-fullHeight eui-yScrollWithShadows">
                    {conversations.map(conversation=>(
                      <EuiFlexItem grow={false} key={conversation.shop.id} onClick={()=>handleSelected(conversation.conversationId,conversation.shop._id)}>
                      <EuiFlexGroup gutterSize='s' alignItems='center' responsive={false}>
                        <EuiAvatar name='A' size='s' imageUrl={conversation.shop.avatar}/>
                        <EuiFlexItem>
                          <EuiText size='s' style={{color:"black"}}>{conversation.shop.name}</EuiText>
                          <EuiText color='subdued' size='xs'>{conversation?.latestMessage?.sender===user._id&&'bạn:'}&nbsp;{conversation.latestMessage?.text}</EuiText>
                        </EuiFlexItem>
                        <EuiText size='xs' color='subdued'>{moment(conversation?.latestMessage?.createdAt).format("DD/MM")}</EuiText>
                      </EuiFlexGroup>
                    </EuiFlexItem>))}
                  </EuiFlexGroup>
              </EuiFlexItem>
              <hr/>
              {messages?(
                <EuiFlexItem style={{background:'#fafafa'}}>
                <EuiPageHeader paddingSize='none'>
                      <EuiPopover
                      isOpen={popoverShop}
                      closePopover={()=>setPopoverShop(false)}
                      button={
                        <EuiHeader style={{width:'100%',height:'40px'}}>
                          <EuiHeaderSection onClick={()=>setPopoverShop(!popoverShop)}>
                            <EuiFlexGroup alignItems='center' gutterSize='s'>
                              <EuiHeaderSectionItem>
                                <EuiText>{messages?.shop?.name}</EuiText>
                              </EuiHeaderSectionItem>
                              <EuiHeaderSectionItem>
                                <EuiIcon type='arrowDown' size='s'/>
                              </EuiHeaderSectionItem>
                            </EuiFlexGroup>
                          </EuiHeaderSection>
                      </EuiHeader>
                      }>
                        <EuiPopoverTitle>{messages?.shop?.name}</EuiPopoverTitle>
                        <EuiListGroup gutterSize='none'>
                          <EuiListGroupItem label={<EuiLink href={`/shop?id=${messages?.shop.id}`}>Xem thông tin cá nhân</EuiLink>} iconType="arrowRight"/>
                        </EuiListGroup>
                      </EuiPopover>
                        
                </EuiPageHeader>
                  <EuiFlexGroup direction='column' gutterSize='s' justifyContent='spaceBetween'>
                    <EuiFlexItem style={{maxHeight:'250px'}} className="eui-fullHeight eui-yScrollWithShadows">
                      {messages?.messages.length?<EuiFlexGroup direction='column' style={{padding:'5px'}} gutterSize='s'>
                        {messages?.messages?.map(message=>(<EuiFlexItem grow={false} style={{alignItems:user._id===message.sender?'flex-end':'flex-start'}}>
                          <EuiText style={{background:'#0099FF',padding:'5px',borderRadius:'10px',maxWidth:'200px'}}>{message.text}</EuiText>
                        </EuiFlexItem>))}
                        <div ref={scoll} />
                      </EuiFlexGroup>
                      :<EuiFlexGroup style={{background:'white'}} justifyContent='center' alignItems='center'>
                          <EuiText>Bắt đầu trò chuyện</EuiText>
                      </EuiFlexGroup>}
                    </EuiFlexItem>
                    <EuiFlexItem grow={false} style={{background:'white'}}>
                      <EuiFlexGroup alignItems='center' gutterSize='s' responsive={false}>
                        <EuiFieldText placeholder='Viết gì đó ...' onChange={(e)=>setNewMessage(e.target.value)} style={{outline:'none',}}/>
                        <EuiButtonIcon iconType="/assets/send-message.png" iconSize='m' onClick={sendMessage}/>
                      </EuiFlexGroup>
                    </EuiFlexItem>
                  </EuiFlexGroup>
              </EuiFlexItem>):(
                <EuiFlexGroup style={{background:'white'}} justifyContent='center' alignItems='center'>
                  <EuiIcon type="discuss" size='l'/>
                  <EuiText>Chọn 1 hội thoại từ danh sách bên trái</EuiText>
              </EuiFlexGroup>
              )}
            </EuiFlexGroup>
            :<EuiFlexGroup justifyContent='center' alignItems='center' style={{height:'330px'}} responsive={false} gutterSize='s'>
              <EuiText>Bạn không có cuộc trò chuyện nào</EuiText>
            </EuiFlexGroup>)
            :(<EuiFlexGroup justifyContent='center' alignItems='center' style={{height:'330px'}} responsive={false} gutterSize='s'>
              <EuiText>Bạn chưa đăng nhập</EuiText>
            </EuiFlexGroup>)}
        </EuiFlexGroup>}
    </EuiPanel>
  </div>)
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
