import { EuiAvatar, EuiButtonIcon, EuiFlexGroup,EuiPopover,EuiPopoverTitle,EuiButtonEmpty,EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiPageHeader, EuiPageHeaderContent, EuiPageTemplate, EuiSpacer, EuiText, EuiFlyout, EuiPageSidebar, EuiAccordion, EuiListGroup, EuiListGroupItem, EuiLink, EuiPanel, EuiFlexGrid, EuiStat } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {ShopContext} from '../../../context/ShopContext'
import { AuthContext } from '../../../context/AuthContext'


export default function Dashboard() {
    const [isPoperUser,setisPopoverUser]=useState(false)
    const {shop}=useContext(ShopContext)
    const {user}=useContext(AuthContext)
    const [dots, setDots] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
  
      return () => clearInterval(interval);
    }, []);

  return (
      <>
      <EuiPageHeader style={{position:'fixed',zIndex:1000,top:0}}>
        <EuiPageHeaderContent>
            <EuiHeader style={{width:'100%'}}>
                <EuiHeaderSection>
                    <EuiFlexGroup>
                        <EuiHeaderSectionItem>
                            <EuiButtonIcon iconType="menu" color='text' iconSize='l'/>
                        </EuiHeaderSectionItem>
                        <EuiHeaderSectionItem>
                            <EuiText><h3>Kênh người bán</h3></EuiText>
                        </EuiHeaderSectionItem>
                    </EuiFlexGroup>
                </EuiHeaderSection>
                <EuiHeaderSection side='right'>
                    <EuiFlexGroup gutterSize='s'>
                        <EuiHeaderSectionItem>
                            <EuiHeaderSectionItemButton notification={1}>
                                <EuiIcon type="bell" size='l'/>
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
                                            <EuiButtonEmpty iconType="exit">Đăng xuất</EuiButtonEmpty>
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
            <EuiPageTemplate.Sidebar minWidth='200px' style={{background:'white'}}>
                <EuiFlexGroup direction='column'>
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
            </EuiPageTemplate.Sidebar>
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
