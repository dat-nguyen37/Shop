import React, { useContext, useState } from 'react'
import {EuiAvatar, EuiBreadcrumbs, EuiButton, EuiButtonEmpty, EuiFieldSearch, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiHeader, EuiHeaderBreadcrumbs, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPageHeader, EuiPageHeaderContent, EuiPageSidebar, EuiPopover, EuiPopoverFooter, EuiPopoverTitle, EuiSpacer, EuiText, EuiTextBlockTruncate} from '@elastic/eui'
import { css } from '@emotion/react'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../axios'

export default function Header({cart}) {
    const [isPopoverUser,setIsPopoverUSer]=useState(false)
    const [isPopoverCart,setIsPopoverCart]=useState(false)
    const {user,dispatch}=useContext(AuthContext)
    const [valueSearch,setValueSearch]=useState('')

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
            dispatch({type:'LOGOUT'})
        } catch (err) {
            console.log(err)
        }
    }

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
                            <EuiHeaderSectionItem>
                                {/* <EuiButtonEmpty onClick={openPopoverNav} iconType="menu" color='text' iconSize='l'/> */}
                                <EuiLink href="/"><EuiImage src="/assets/logo.png" style={{width:'300px',height:'60px'}}/></EuiLink>
                            </EuiHeaderSectionItem>
                        </EuiHeaderSection>
                        <EuiHeaderSection>
                            <EuiFlexGroup>
                                <EuiHeaderSectionItem>
                                    <EuiFormControlLayout style={{fontSize:'14px'}} fullWidth>
                                        <EuiFieldSearch placeholder='Tìm kiếm sản phẩm' onChange={(e) => setValueSearch(e.target.value)} onKeyDown={handleKeyPress} style={{width:'500px'}}/>
                                    </EuiFormControlLayout>
                                </EuiHeaderSectionItem>
                                <EuiHeaderSectionItem>
                                    <EuiFlexGroup alignItems='center' gutterSize='s'>
                                        <EuiFlexItem grow={false}>
                                            <EuiImage src='/assets/phone-call.webp'/>
                                        </EuiFlexItem>
                                        <EuiFlexItem>
                                            <EuiText color='white'><p>Hỗ trợ khách hàng</p></EuiText>
                                            <EuiText color='white'><p>099999999</p></EuiText>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                </EuiHeaderSectionItem>
                            </EuiFlexGroup>
                        </EuiHeaderSection>
                    <EuiHeaderSection side="right">
                        <EuiFlexGroup gutterSize='m' alignItems='center'>
                            <EuiHeaderSectionItem>
                                <EuiPopover
                                panelPaddingSize='s'
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
                                        {user?(<EuiFlexGroup gutterSize='s' alignItems='center'>
                                            <EuiFlexItem grow={false}>
                                                <EuiAvatar name='EL' color="#68C4A2" size='xl' imageUrl={user?.imageUrl}/>
                                            </EuiFlexItem>
                                            <EuiFlexItem>
                                                <EuiText><b>{user.name}</b></EuiText>
                                                <EuiFlexGroup alignItems='center'>
                                                    <EuiLink href='/profile'>Chỉnh sửa hồ sơ</EuiLink>
                                                    <EuiButtonEmpty onClick={handleLogout}>Đăng xuất</EuiButtonEmpty>
                                                </EuiFlexGroup>
                                            </EuiFlexItem>
                                        </EuiFlexGroup>):(
                                            <EuiFlexGroup gutterSize='s' alignItems='center'>
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
                                <EuiButtonEmpty iconType="apps" iconSize='xl' color=""/>
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
