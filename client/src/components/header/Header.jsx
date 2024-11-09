import React, { useState } from 'react'
import {EuiAvatar, EuiBreadcrumbs, EuiButton, EuiButtonEmpty, EuiFieldSearch, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiHeaderBreadcrumbs, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPageHeader, EuiPageHeaderContent, EuiPageSidebar, EuiPopover, EuiSpacer, EuiText} from '@elastic/eui'
import { css } from '@emotion/react'

export default function Header() {
    const [isPopoverUser,setIsPopoverUSer]=useState(false)
    const [isPopoverNav,setIsPopoverNav]=useState(false)
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const openPopoverUser=()=>setIsPopoverUSer(!isPopoverUser)
    const closePopoverUser=()=>setIsPopoverUSer(false)
    const openPopoverNav=()=>setIsPopoverNav(!isPopoverNav)
    const closePopoverNav=()=>setIsPopoverNav(false)
    const categories = [
        { id: 1, name: 'Danh mục 1', subcategories: ['Danh mục con 1-1', 'Danh mục con 1-2', 'Danh mục con 1-3'] },
        { id: 2, name: 'Danh mục 2', subcategories: ['Danh mục con 2-1', 'Danh mục con 2-2', 'Danh mục con 2-3'] },
        { id: 3, name: 'Danh mục 3', subcategories: ['Danh mục con 3-1', 'Danh mục con 3-2', 'Danh mục con 3-3'] },
      ];

  return (
    <div>
        <EuiPageHeader 
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
                <EuiHeader style={{width:'100%',height:'100px',background:'#5bbb46'}}>
                        <EuiHeaderSection>
                            <EuiHeaderSectionItem>
                                {/* <EuiButtonEmpty onClick={openPopoverNav} iconType="menu" color='text' iconSize='l'/> */}
                                <EuiImage src="/assets/logo.webp" style={{width:'300px',height:'80px'}}/>
                            </EuiHeaderSectionItem>
                        </EuiHeaderSection>
                        <EuiHeaderSection>
                            <EuiFlexGroup>
                                <EuiHeaderSectionItem>
                                    <EuiFieldSearch placeholder='Tìm kiếm sản phẩm' style={{width:'500px'}}/>
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
            <EuiFlexGroup alignItems='center' style={{height:'40px',background:'#5bbb46',paddingInline:'5rem',color:'white'}}>
                <EuiFlexItem grow={false}>
                    <EuiPopover
                    hasArrow={false}
                    panelPaddingSize="none"
                    panelStyle={{outline:'none'}}
                    isOpen={isPopoverNav}
                    closePopover={closePopoverNav}
                        button={
                        <EuiButtonEmpty onMouseEnter={openPopoverNav} iconType="menu" color='white' iconSize='l'>
                            <EuiText>Danh sách sản phẩm</EuiText>
                        </EuiButtonEmpty>
                    }
                    >
                        <EuiFlexGroup direction='column' gutterSize='none'>
                        {categories.map(category => (
                            <EuiPopover
                            panelPaddingSize="s"
                            panelStyle={{outline:'none',marginLeft:'16px'}}
                            key={category.id}
                            button={
                                <EuiButtonEmpty
                                onMouseEnter={() => setHoveredCategory(category.id)}
                                >
                                {category.name}
                                </EuiButtonEmpty>
                            }
                            isOpen={hoveredCategory === category.id}
                            closePopover={() => setHoveredCategory(null)}
                            anchorPosition="rightUp"
                            >
                                <EuiText>
                                    <ul>
                                    {category.subcategories.map((sub, index) => (
                                        <li key={index}>{sub}</li>
                                    ))}
                                    </ul>
                                </EuiText>
                            </EuiPopover>
                        ))}
                        </EuiFlexGroup>
                    </EuiPopover>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiText>Chứng Nhận Hữu Cơ</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiText>Bán Sỉ/ Xuất Khẩu</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiText>Tự hào là doanh nghiệp do phụ nữ làm chủ</EuiText>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiPageHeader>
    </div>
  )
}
