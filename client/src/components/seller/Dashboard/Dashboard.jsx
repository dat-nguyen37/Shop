import { EuiAvatar, EuiButtonIcon, EuiFlexGroup,EuiPopover,EuiPopoverTitle,EuiButtonEmpty,EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiPageHeader, EuiPageHeaderContent, EuiPageTemplate, EuiSpacer, EuiText, EuiFlyout, EuiPageSidebar, EuiAccordion, EuiListGroup, EuiListGroupItem, EuiLink, EuiPanel, EuiFlexGrid, EuiStat, EuiHorizontalRule } from '@elastic/eui'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {ShopContext} from '../../../context/ShopContext'
import { AuthContext } from '../../../context/AuthContext'
import { io } from 'socket.io-client';
import axios from '../../../axios'
import {format} from 'timeago.js'


export default function Dashboard() {
    const [isPoperUser,setisPopoverUser]=useState(false)
    const {shop}=useContext(ShopContext)
    const {user,dispatch}=useContext(AuthContext)
    const [dots, setDots] = useState('');
    const [notificationPopover,setNotificationPopover]=useState(false)
    const [isSideBar,setisSideBar]=useState(false)

        //notification
        const socket=useRef(io("ws://localhost:5000"))

        const [notifications,setNotifications]=useState([])
        const [newNotification,setNewNotification]=useState(null)
    
        useEffect(()=>{
          // khởi tạo kết nối
           socket.current=io("ws://localhost:5000")
           socket.current.on("getNotification",data=>{
            setNewNotification({
             sender:data.senderId,
             text:data.text,
             createdAt:Date.now()
            })
      })
        },[])
        useEffect(()=>{
            // gửi người dùng đến máy chủ
            socket.current.emit("addUser", shop._id)
        },[shop])
        useEffect(()=>{
                getNotification()
        },[newNotification])
        const getNotification=async()=>{
            try {
                const res=await axios.get('/notification/getByShop/'+shop._id)
                setNotifications(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        useEffect(()=>{
            getNotification()
        },[])
        const Update=async()=>{
            try {
                await axios.patch('/notification/update/'+shop._id)
                getNotification()
            } catch (err) {
                console.log(err)
            }
        }

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
  
      return () => clearInterval(interval);
    }, []);


    const handleLogout=async()=>{
        try {
            await axios.get('/auth/logout')
            dispatch({type:'LOGOUT'})
        } catch (err) {
            console.log(err)
        }
    }

  return (
      <>
      <EuiPageHeader style={{position:'fixed',zIndex:1000,top:0}}>
        <EuiPageHeaderContent>
            <EuiHeader style={{width:'100%'}}>
                <EuiHeaderSection>
                    <EuiFlexGroup>
                        <EuiHeaderSectionItem>
                            <EuiButtonIcon iconType="menu" color='text' iconSize='l' onClick={()=>setisSideBar(!isSideBar)}/>
                        </EuiHeaderSectionItem>
                        <EuiHeaderSectionItem>
                            <EuiText><h3>Kênh người bán</h3></EuiText>
                        </EuiHeaderSectionItem>
                    </EuiFlexGroup>
                </EuiHeaderSection>
                <EuiHeaderSection side='right'>
                    <EuiFlexGroup gutterSize='s'>
                        <EuiHeaderSectionItem>
                            <EuiHeaderSectionItemButton notification={notifications.length}>
                                <EuiPopover
                                panelStyle={{minWidth:'300px'}}
                                isOpen={notificationPopover}
                                closePopover={()=>setNotificationPopover(false)}
                                button={
                                    <EuiIcon type="bell" size='l' onClick={()=>setNotificationPopover(!notificationPopover)}/>
                                }>
                                    <EuiPopoverTitle paddingSize='s'>
                                        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                                            <EuiText>Thông báo</EuiText>
                                            <EuiLink onClick={Update}>Đánh dấu đã học <EuiIcon type="check"/></EuiLink>
                                        </EuiFlexGroup>
                                    </EuiPopoverTitle>
                                    <EuiFlexGroup direction='column' gutterSize='s'>
                                        {notifications.length?notifications?.map(item=>(<EuiFlexItem>
                                            <EuiFlexGroup alignItems='center' gutterSize='s'>
                                                <EuiText>{item?.text}.</EuiText>
                                                <EuiText color='subdued' size='s'>{format(item.createdAt)}</EuiText>
                                            </EuiFlexGroup>
                                            <EuiHorizontalRule margin='none'/>
                                        </EuiFlexItem>)):<EuiText>Không có thông báo mới nào.</EuiText>}
                                    </EuiFlexGroup>
                                </EuiPopover>
                            </EuiHeaderSectionItemButton>
                        </EuiHeaderSectionItem>
                        <EuiHeaderSectionItem>
                            <EuiHeaderSectionItemButton notification={1}>
                                <EuiIcon type="email" size='l'/>
                            </EuiHeaderSectionItemButton>
                        </EuiHeaderSectionItem>
                        <EuiHeaderSectionItem>
                                <EuiAvatar name='D'/>
                                <EuiPopover button={
                                    <EuiHeaderSectionItemButton>
                                        <EuiPopover
                                        anchorPosition='downLeft'
                                        panelStyle={{outline:'none'}}
                                        isOpen={isPoperUser}
                                        closePopover={()=>setisPopoverUser(false)}
                                        button={
                                            <EuiFlexGroup alignItems='center' responsive={false} gutterSize='s' onClick={()=>setisPopoverUser(!isPoperUser)}>
                                                <EuiFlexItem>
                                                    <EuiText>{user?.name}</EuiText>
                                                </EuiFlexItem>
                                                <EuiFlexItem>
                                                    <EuiIcon type="arrowDown"/>
                                                </EuiFlexItem>
                                            </EuiFlexGroup>
                                        }>
                                            <EuiPopoverTitle>
                                                <EuiFlexGroup direction='column' gutterSize='s' alignItems='center'>
                                                    <EuiAvatar name='D' imageUrl=''/>
                                                    <EuiText>{user?.name}</EuiText>
                                                </EuiFlexGroup>
                                            </EuiPopoverTitle>
                                            <EuiButtonEmpty iconType="globe" href='/'>Đến website</EuiButtonEmpty>
                                            <EuiButtonEmpty iconType="exit" onClick={handleLogout}>Đăng xuất</EuiButtonEmpty>
                                        </EuiPopover>
                                    </EuiHeaderSectionItemButton>
                                }>
                                    
                                </EuiPopover>
                            </EuiHeaderSectionItem>
                    </EuiFlexGroup>
                </EuiHeaderSection>
            </EuiHeader>
        </EuiPageHeaderContent>
      </EuiPageHeader>
        {shop?(
        <EuiPageTemplate style={{paddingTop:'3rem'}}>
            {isSideBar&&<EuiPageTemplate.Sidebar minWidth='200px' style={{background:'white'}}>
                <EuiFlexGroup direction='column' style={{position:'fixed'}}>
                    <EuiFlexGroup>
                        <EuiIcon type="visLine"/>
                        <EuiLink color='text' href='/nguoi_ban'>Thống kê</EuiLink>
                    </EuiFlexGroup>
                    <EuiAccordion 
                    paddingSize='s'
                    arrowDisplay='none' 
                    buttonContent={<EuiFlexGroup>
                        <EuiIcon type="reporter"/>
                        <EuiLink color='text'>Quản lý</EuiLink>
                    </EuiFlexGroup>}>
                        <EuiListGroup flush style={{}}>
                            <EuiListGroupItem href='/nguoi_ban/danh_sach_san_pham' label='Sản phẩm'/>
                            <EuiListGroupItem href='/nguoi_ban/danh_sach_don_hang' label='Đơn hàng'/>
                            <EuiListGroupItem href='/nguoi_ban/danh_sach_danh_muc' label='Danh mục'/>
                            <EuiListGroupItem href='/nguoi_ban/danh_sach_don_hang' label='Khuyến mãi'/>
                        </EuiListGroup>
                    </EuiAccordion>
                    <EuiFlexGroup>
                        <EuiIcon type="discuss"/>
                        <EuiLink color='text' href='/nguoi_ban/chat'>Chat</EuiLink>
                    </EuiFlexGroup>
                    <EuiFlexGroup>
                        <EuiIcon type="bell"/>
                        <EuiLink color='text'>Thông báo</EuiLink>
                    </EuiFlexGroup>
                </EuiFlexGroup>
            </EuiPageTemplate.Sidebar>}
            <EuiPageTemplate.Section color='subdued' paddingSize='none'>
                <Outlet/>
            </EuiPageTemplate.Section>
            </EuiPageTemplate>
        ):(
        <EuiPageTemplate style={{paddingTop:'3rem'}}>
            <EuiFlexGroup alignItems='center' justifyContent='center'>
                <EuiText><h2>Loading {dots}</h2></EuiText>
            </EuiFlexGroup>
        </EuiPageTemplate>
        )}
    </>
  )
}
