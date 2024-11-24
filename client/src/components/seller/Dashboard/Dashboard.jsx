import { EuiAvatar, EuiButtonIcon, EuiFlexGroup,EuiPopover,EuiPopoverTitle,EuiButtonEmpty,EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiPageHeader, EuiPageHeaderContent, EuiPageTemplate, EuiSpacer, EuiText, EuiFlyout, EuiPageSidebar, EuiAccordion, EuiListGroup, EuiListGroupItem, EuiLink, EuiPanel, EuiFlexGrid, EuiStat } from '@elastic/eui'
import React, { useState } from 'react'

export default function Dashboard() {
    const [isPoperUser,setisPopoverUser]=useState(false)

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
                                                    <EuiText>Dat Nguyen</EuiText>
                                                </EuiFlexItem>
                                                <EuiFlexItem>
                                                    <EuiIcon type="arrowDown"/>
                                                </EuiFlexItem>
                                            </EuiFlexGroup>
                                        }>
                                            <EuiPopoverTitle>
                                                <EuiFlexGroup direction='column' gutterSize='s' alignItems='center'>
                                                    <EuiAvatar name='D' imageUrl=''/>
                                                    <EuiText>Dat nguyen</EuiText>
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
        <EuiPageTemplate style={{marginTop:'3rem'}}>
            <EuiPageTemplate.Sidebar minWidth='200px' style={{background:'white'}}>
                <EuiFlexGroup direction='column'>
                    <EuiFlexGroup>
                        <EuiIcon type="visLine"/>
                        <EuiLink color='text'>Thống kê</EuiLink>
                    </EuiFlexGroup>
                    <EuiAccordion 
                    paddingSize='s'
                    arrowDisplay='none' 
                    buttonContent={<EuiFlexGroup>
                        <EuiIcon type="reporter"/>
                        <EuiLink color='text'>Quản lý</EuiLink>
                    </EuiFlexGroup>}>
                        <EuiListGroup flush style={{}}>
                            <EuiListGroupItem href='/dashboard/danh_sach_danh_muc' label='Sản phẩm'/>
                            <EuiListGroupItem href='/dashboard/danh_sach_san_pham' label='Đơn hàng'/>
                            <EuiListGroupItem href='/dashboard/danh_sach_don_hang' label='Khuyến mãi'/>
                        </EuiListGroup>
                    </EuiAccordion>
                    <EuiFlexGroup>
                        <EuiIcon type="discuss"/>
                        <EuiLink color='text'>Chat</EuiLink>
                    </EuiFlexGroup>
                    <EuiFlexGroup>
                        <EuiIcon type="bell"/>
                        <EuiLink color='text'>Thông báo</EuiLink>
                    </EuiFlexGroup>
                </EuiFlexGroup>
            </EuiPageTemplate.Sidebar>
            <EuiPageTemplate.Section color='subdued' grow={false}>
                <EuiPanel>
                    <EuiFlexGroup direction='column' gutterSize='s'>
                        <EuiText><h3>Danh sách cần làm</h3></EuiText>
                        <EuiText>Những việc bạn sẽ phải làm</EuiText>
                    </EuiFlexGroup>
                    <EuiSpacer/>
                    <EuiFlexGrid columns={4}>
                        <EuiFlexItem>
                            <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Chờ xác nhận" />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Chờ lấy hàng" />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Chờ xử lý" />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Đơn hàng" />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Sản phẩm bị tạm khóa" />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Sản phẩm hết hàng" />
                        </EuiFlexItem>
                    </EuiFlexGrid>
                </EuiPanel>
            </EuiPageTemplate.Section>
            <EuiPageTemplate.Section color='subdued'>
                <EuiPanel>
                    <EuiText><h3>Phân tích bán hàng</h3></EuiText>
                    <EuiText>Tổng quan dữ liệu của shop đối với đơn hàng đã xác nhận</EuiText>
                </EuiPanel>
            </EuiPageTemplate.Section>
        </EuiPageTemplate>
    </>
  )
}
