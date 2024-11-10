import React, { useState } from 'react'
import {EuiAvatar, EuiBreadcrumbs, EuiButton, EuiButtonEmpty, EuiFieldSearch, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiHeader, EuiHeaderBreadcrumbs, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPageHeader, EuiPageHeaderContent, EuiPageSidebar, EuiPopover, EuiSpacer, EuiText} from '@elastic/eui'
import { css } from '@emotion/react'

export default function Header() {
    const [isPopoverUser,setIsPopoverUSer]=useState(false)
    const [isPopoverNav,setIsPopoverNav]=useState(false)
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const openPopoverUser=()=>setIsPopoverUSer(!isPopoverUser)
    const closePopoverUser=()=>setIsPopoverUSer(false)

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
                    href:'/dangky_nguoiban',
                    style:{paddingInline:'10px'}
                },
                {
                    text:'Trở thành người bán',
                    href:'/dangky_nguoiban',
                }
            ]}
            pageTitle={
                <EuiHeader style={{width:'100%',height:'70px',background:'#5bbb46'}}>
                        <EuiHeaderSection>
                            <EuiHeaderSectionItem>
                                {/* <EuiButtonEmpty onClick={openPopoverNav} iconType="menu" color='text' iconSize='l'/> */}
                                <EuiImage src="/assets/logo.webp" style={{width:'300px',height:'60px'}}/>
                            </EuiHeaderSectionItem>
                        </EuiHeaderSection>
                        <EuiHeaderSection>
                            <EuiFlexGroup>
                                <EuiHeaderSectionItem>
                                    <EuiFormControlLayout style={{fontSize:'14px'}} fullWidth>
                                        <EuiFieldSearch placeholder='Tìm kiếm sản phẩm' style={{width:'500px'}}/>
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
                        <EuiFlexGroup gutterSize='m'>
                            <EuiHeaderSectionItem>
                                <EuiHeaderSectionItemButton notification={'2'}>
                                    <EuiIcon type="/assets/shopping-cart.png" size='xl' style={{color:'white'}}/>
                                </EuiHeaderSectionItemButton>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                                <EuiHeaderSectionItemButton notification={'2'}>
                                    <EuiIcon type="editorComment" size='xl' color='white'/>
                                </EuiHeaderSectionItemButton>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                                <EuiHeaderSectionItemButton>
                                    <EuiPopover
                                        panelStyle={{outline:'none'}}
                                        isOpen={isPopoverUser}
                                        closePopover={closePopoverUser}
                                        button={<EuiAvatar onClick={openPopoverUser} name='EL' color="#68C4A2" size='m' />}
                                    >
                                        <EuiFlexGroup gutterSize='s'>
                                            <EuiFlexItem grow={false}>
                                                <EuiAvatar name='EL' color="#68C4A2" size='m' />
                                            </EuiFlexItem>
                                            <EuiFlexItem>
                                                <EuiText><p>Dat Nguyen</p></EuiText>
                                                <EuiFlexGroup>
                                                    <EuiLink>Chỉnh sửa hồ sơ</EuiLink>
                                                    <EuiButtonEmpty>Đăng xuất</EuiButtonEmpty>
                                                </EuiFlexGroup>
                                            </EuiFlexItem>
                                        </EuiFlexGroup>
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
