import React, { useContext, useState } from 'react'
import { EuiButtonEmpty, EuiButtonIcon,EuiFlexGroup,EuiListGroup,EuiListGroupItem,EuiAccordion,EuiHeaderSectionItemButton,EuiIcon,EuiText,EuiPopover,EuiFlexItem,EuiAvatar, EuiFlyout, EuiFlyoutBody, EuiFlyoutFooter, EuiFlyoutHeader, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiPageHeader, EuiPageHeaderContent, EuiPageTemplate, EuiLink, EuiFlexGrid, EuiPanel, EuiStat, EuiImage, EuiHorizontalRule } from '@elastic/eui'
import {Outlet} from 'react-router-dom'
import {AuthContext} from '../../../context/AuthContext'
import axios from '../../../axios'

export default function Dashboard() {
    const [isFlyout,setIsFlyout]=useState(true)
    const [popoverUser,setPopoverUser]=useState(false)
    const {user,dispatch}=useContext(AuthContext)

    const handleLogout=async()=>{
        try {
            await axios.get('/auth/logout')
            dispatch({type:'LOGOUT'})
        } catch (err) {
            console.log(err)
        }
    }
    const flyout=(
        <EuiFlyout side='left' type='push' size='250px' pushAnimation={true} onClose={()=>setIsFlyout(false)}>
            <EuiFlyoutHeader style={{background:'',height:'200px'}}>
                <EuiImage src='/assets/logo.png'/>
            </EuiFlyoutHeader>
            <EuiHorizontalRule margin='none'/>
            <EuiFlyoutBody>
                <EuiFlexGroup direction='column'>
                    <EuiFlexItem>
                        <EuiFlexGroup>
                            <EuiIcon type="visLine"/>
                            <EuiLink color='text' href='/dashboard'>Thống kê</EuiLink>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiAccordion 
                            paddingSize='s'
                            arrowDisplay='none' 
                            buttonContent={<EuiFlexGroup>
                                <EuiIcon type="reporter"/>
                                <EuiLink color='text'>Quản lý</EuiLink>
                            </EuiFlexGroup>}>
                            <EuiListGroup flush style={{paddingInline:'30px'}}>
                                <EuiListGroupItem href='/dashboard/danh_sach_danh_muc' label='Danh mục'/>
                                <EuiListGroupItem href='/dashboard/danh_sach_san_pham' label='Sản phẩm'/>
                                <EuiListGroupItem href='/dashboard/danh_sach_don_hang' label='Đơn hàng'/>
                                <EuiListGroupItem href='/dashboard/danh_sach_cua_hang' label='Cửa hàng'/>
                                <EuiListGroupItem href='/dashboard/danh_sach_nguoi_dung' label='Tài khoản'/>
                                <EuiListGroupItem href='/dashboard/danh_sach_to_cao' label='Tố cáo'/>
                                <EuiListGroupItem href='/dashboard/nhat_ky' label='Nhật ký'/>
                            </EuiListGroup>
                        </EuiAccordion>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiAccordion 
                            paddingSize='s'
                            arrowDisplay='none' 
                            buttonContent={<EuiFlexGroup>
                                <EuiIcon type="pagesSelect"/>
                                <EuiLink color='text'>Page</EuiLink>
                            </EuiFlexGroup>}>
                            <EuiListGroup flush style={{paddingInline:'30px'}}>
                                <EuiListGroupItem href='/dashboard/slide' label='Slide'/>
                                <EuiListGroupItem href='/profile/address' label='Login'/>
                                <EuiListGroupItem href='/profile/password' label='Register'/>
                            </EuiListGroup>
                        </EuiAccordion>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlyoutBody>
            <EuiFlyoutFooter>
                
            </EuiFlyoutFooter>
        </EuiFlyout>
    )
  return (
    <EuiPageTemplate>
        {isFlyout&&flyout}
        <EuiPageHeader>
            <EuiPageHeaderContent>
                <EuiHeader style={{width:'100%',padding:'0 20px'}}>
                    <EuiHeaderSection>
                        <EuiHeaderSectionItem>
                            <EuiButtonIcon iconType="menu" color='text' iconSize='l' onClick={()=>setIsFlyout(!isFlyout)}/>
                        </EuiHeaderSectionItem>
                    </EuiHeaderSection>
                    <EuiHeaderSection side="right">
                        <EuiFlexGroup gutterSize='xs'>
                            <EuiHeaderSectionItem>
                                <EuiHeaderSectionItemButton notification={'2'}>
                                    <EuiIcon type="bell" size='m'/>
                                </EuiHeaderSectionItemButton>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                                <EuiHeaderSectionItemButton notification={'2'}>
                                    <EuiIcon type="email" size='m'/>
                                </EuiHeaderSectionItemButton>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                                <EuiPopover
                                panelStyle={{outline:'none'}}
                                isOpen={popoverUser}
                                closePopover={()=>setPopoverUser(false)}
                                button={
                                    <EuiHeaderSectionItemButton onClick={()=>setPopoverUser(!popoverUser)}>
                                        <EuiAvatar name='EL' color="#68C4A2" size='s'/>
                                    </EuiHeaderSectionItemButton>
                                }>
                                    {user?(<EuiFlexGroup gutterSize='s' alignItems='center'>
                                            <EuiFlexItem grow={false}>
                                                <EuiAvatar name='EL' color="#68C4A2" size='xl' />
                                            </EuiFlexItem>
                                            <EuiFlexItem>
                                                <EuiText><b>{user.name}</b></EuiText>
                                                <EuiFlexGroup alignItems='center'>
                                                    <EuiLink href='/'>Đến website</EuiLink>
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
                            </EuiHeaderSectionItem>
                        </EuiFlexGroup>
                    </EuiHeaderSection>
                </EuiHeader>
            </EuiPageHeaderContent>
        </EuiPageHeader>
        <EuiPageTemplate.Section>
            <Outlet/>
        </EuiPageTemplate.Section>
    </EuiPageTemplate>
  )
}
