import React, { useContext, useState } from 'react'
import {EuiAvatar, EuiBreadcrumbs, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFieldSearch, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiHeader, EuiHeaderBreadcrumbs, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiHideFor, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPageHeader, EuiPageHeaderContent, EuiPageSidebar, EuiPopover, EuiPopoverFooter, EuiPopoverTitle, EuiShowFor, EuiSpacer, EuiText, EuiTextBlockTruncate} from '@elastic/eui'
import { css } from '@emotion/react'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../axios'
import { DarkModeContext } from '../../context/DarkModeContext'

export default function Header({cart}) {
    const [isPopoverUser,setIsPopoverUSer]=useState(false)
    const [isPopoverCart,setIsPopoverCart]=useState(false)
    const [isPopoverSearch,setIsPopoverSearch]=useState(false)
    const {user,dispatch:authDispatch }=useContext(AuthContext)
    const [valueSearch,setValueSearch]=useState('')
    const { color,dispatch:darkModeDispatch  } = useContext(DarkModeContext);
    

    const openPopoverUser=()=>setIsPopoverUSer(!isPopoverUser)
    const closePopoverUser=()=>setIsPopoverUSer(false)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && valueSearch.trim()) {
          window.location.href = `/search?key=${encodeURIComponent(valueSearch)}`;
        }
      };
    const handleLogout=async()=>{
        try {
            await axios.get('/auth/logout')
            authDispatch({type:'LOGOUT'})
        } catch (err) {
            console.log(err)
        }
    }
    const toggleTheme = () => {
        if (color === 'dark') {
          darkModeDispatch({ type: 'STATE_LIGHT' });
        } else {
          darkModeDispatch({ type: 'STATE_DARK' });
        }
      };

  return (
    <div>
        <EuiPageHeader
        style={{position:'fixed',top:0,zIndex:1000,width:'100%',background:'white'}}
        css={css`
            .euiSpacer {
                    display: none;
                }`}
            breadcrumbs={[
                {   
                    text:'Kênh người bán',
                    href:'/cua_hang_cua_toi',
                    style:{paddingInline:'10px'}
                },
                {
                    text:'Trở thành người bán',
                    href:'/dangky_nguoiban',
                }
            ]}
            pageTitle={
                <EuiHeader style={{width:'100%',height:'70px',background:'#804040'}}>
                        <EuiHeaderSection>
                            <EuiHideFor sizes={["xs"]}>
                                <EuiHeaderSectionItem>
                                    <EuiLink href="/"><EuiImage src="/assets/logo.png" style={{width:'300px',height:'60px'}}/></EuiLink>
                                </EuiHeaderSectionItem>
                            </EuiHideFor>
                                <EuiHideFor sizes={["xs","s","m"]}>
                                    <EuiHeaderSectionItem>
                                        <EuiFormControlLayout style={{fontSize:'14px'}} fullWidth>
                                            <EuiFieldSearch placeholder='Tìm kiếm sản phẩm' onChange={(e) => setValueSearch(e.target.value)} onKeyDown={handleKeyPress} style={{width:"500px",backgroundColor:"white"}}/>
                                        </EuiFormControlLayout>
                                        <EuiButtonIcon iconType="search" size='m' display="fill" href={`/search?key=${encodeURIComponent(valueSearch)}`}/>
                                    </EuiHeaderSectionItem>
                                </EuiHideFor>
                        </EuiHeaderSection>
                    <EuiHeaderSection side="right">
                        <EuiFlexGroup gutterSize='m' alignItems='center' responsive={false}>
                            <EuiShowFor sizes={["xs","s","m"]}>
                                <EuiHeaderSectionItem>
                                    <EuiPopover
                                    hasArrow={false}
                                    isOpen={isPopoverSearch}
                                    closePopover={()=>setIsPopoverSearch(false)}
                                    button={
                                        <EuiHeaderSectionItemButton onClick={()=>setIsPopoverSearch(!isPopoverSearch)}>
                                            <EuiIcon type="search" size='l' style={{color:'white'}}/>
                                        </EuiHeaderSectionItemButton>
                                    }>
                                        <EuiFlexGroup responsive={false} gutterSize='s'>
                                            <EuiFormControlLayout style={{fontSize:'14px'}} fullWidth>
                                                <EuiFieldSearch placeholder='Tìm kiếm sản phẩm' onChange={(e) => setValueSearch(e.target.value)} onKeyDown={handleKeyPress} />
                                                </EuiFormControlLayout>
                                            <EuiButtonIcon iconType="search" size='m' display="fill" href={`/search?key=${encodeURIComponent(valueSearch)}`}/>
                                        </EuiFlexGroup>
                                    </EuiPopover>
                                </EuiHeaderSectionItem>
                            </EuiShowFor>
                            <EuiHeaderSectionItem >
                                <EuiPopover
                                panelPaddingSize='s'
                                anchorPosition='downRight'
                                panelStyle={{outline:'none',width:'300px'}}
                                isOpen={isPopoverCart}
                                closePopover={()=>setIsPopoverCart(false)}
                                button={
                                    <EuiHeaderSectionItemButton notification={cart.length} onClick={()=>setIsPopoverCart(!isPopoverCart)}>
                                        <EuiIcon type="/assets/shopping-cart.png" size='xl' style={{color:'white'}}/>
                                    </EuiHeaderSectionItemButton>
                                }>
                                    <EuiPopoverTitle>
                                        <EuiText>Sản phẩm mới thêm</EuiText>
                                    </EuiPopoverTitle>
                                    {user?<EuiFlexGroup direction='column'>
                                        {cart.length?(cart.map(item=>(<EuiFlexItem key={item.cartId}>
                                            <EuiFlexGroup gutterSize='s'>
                                                <EuiImage src={item.product.image} size='50px'/>
                                                <EuiFlexItem>
                                                    <EuiTextBlockTruncate lines={2}>{item.product.name}</EuiTextBlockTruncate>
                                                    <EuiText>x{item.quantity} &nbsp;&nbsp;&nbsp;<strong style={{color:'red'}}>{(item.price).toLocaleString()}đ</strong></EuiText>
                                                </EuiFlexItem>
                                            </EuiFlexGroup>
                                        </EuiFlexItem>))):(<EuiText>Giỏ hàng trống</EuiText>)}
                                    </EuiFlexGroup>:<EuiText>Bạn chưa đăng nhập</EuiText>}
                                    <EuiPopoverFooter>
                                        <EuiFlexGroup justifyContent='flexEnd'>
                                            <EuiButton fill href='/cart'>Xem giỏ hàng</EuiButton>
                                        </EuiFlexGroup>
                                    </EuiPopoverFooter>
                                </EuiPopover>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                                <EuiHeaderSectionItemButton notification={'2'}>
                                    <EuiIcon type="bell" size='l' color='white'/>
                                </EuiHeaderSectionItemButton>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                                <EuiHeaderSectionItemButton>
                                    <EuiPopover
                                        panelStyle={{outline:'none'}}
                                        isOpen={isPopoverUser}
                                        closePopover={closePopoverUser}
                                        button={<EuiAvatar onClick={openPopoverUser} name='EL' color="#68C4A2" size='m' imageUrl={user?.imageUrl}/>}
                                    >
                                        {user?(<EuiFlexGroup gutterSize='s' alignItems='center' responsive={false}>
                                            <EuiFlexItem grow={false}>
                                                <EuiAvatar name='EL' color="#68C4A2" size='xl' imageUrl={user?.imageUrl}/>
                                            </EuiFlexItem>
                                            <EuiFlexItem>
                                                <EuiFlexGroup justifyContent='spaceBetween'>
                                                    <EuiText><b>{user.name}</b></EuiText>
                                                    {user.role==="Admin"&&<EuiLink href='/dashboard'><b>Dashboard</b></EuiLink>}
                                                </EuiFlexGroup>
                                                <EuiFlexGroup alignItems='center'>
                                                    <EuiLink href='/profile'>Chỉnh sửa hồ sơ</EuiLink>
                                                    <EuiButtonEmpty onClick={handleLogout}>Đăng xuất</EuiButtonEmpty>
                                                </EuiFlexGroup>
                                            </EuiFlexItem>
                                        </EuiFlexGroup>):(
                                            <EuiFlexGroup gutterSize='s' alignItems='center' responsive={false}>
                                                <EuiFlexItem grow={false}>
                                                    <EuiAvatar name='EL' color="#68C4A2" size='m' />
                                                </EuiFlexItem>
                                                <EuiLink href='/dang_nhap'>Đăng nhập</EuiLink>
                                                <EuiLink href='/dang_ky'>Đăng ký</EuiLink>
                                            </EuiFlexGroup>
                                        )}
                                    </EuiPopover>
                                </EuiHeaderSectionItemButton>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                                <EuiButtonEmpty onClick={toggleTheme} iconType={color==="light"?"./assets/sleep-mode.png":"./assets/day-mode.png"} iconSize='xl' color=""/>
                            </EuiHeaderSectionItem>
                        </EuiFlexGroup>
                    </EuiHeaderSection>
                </EuiHeader>
            }
        >
        </EuiPageHeader>
    </div>
  )
}
