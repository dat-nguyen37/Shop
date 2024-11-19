import React, { useState } from 'react'
import { EuiAvatar, EuiButton, EuiButtonEmpty, EuiCollapsibleNav, EuiCollapsibleNavGroup, EuiFieldNumber, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayoutDelimited, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPageSection, EuiPageTemplate, EuiPopover, EuiSelect, EuiSelectable, EuiText, useIsWithinBreakpoints } from '@elastic/eui'
import Footer from '../components/footer/Footer'
import ProductItem from '../components/productItem/ProductItem'

export default function ShopView() {
  const mobile=useIsWithinBreakpoints(['xs','s'])
  const tablet=useIsWithinBreakpoints(['m','l'])

  const [selectCategory,setSelectedCategory]=useState(null)
  const [popoverCategory,setPopoverCategory]=useState(false)

  return (
    <>
    <EuiPageTemplate.Section grow={false}>
        <EuiFlexGroup gutterSize='m'>
            <EuiFlexItem>
              <div style={{position:'relative'}}>
                <EuiImage src='/assets/shop1.png' allowFullScreen height="150" size='fullWidth'/>
                <div style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></div>
                <EuiFlexGroup direction='column' gutterSize='s' style={{position:'absolute',top:'20%',left:'10%'}}>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <EuiAvatar name='Shop' imageUrl='/assets/logo_shop.webp' size='xl'/>
                    <p>
                      <EuiText color='white'>CL.KingSneaker01</EuiText>
                      <EuiText color='white' size='xs'>Online 14 phút trước</EuiText>
                    </p>
                  </EuiFlexGroup>
                  <EuiFlexGroup justifyContent='spaceBetween'>
                    <EuiLink><EuiText color='white' size='s'>Theo dõi</EuiText></EuiLink>
                    <EuiLink><EuiText color='white' size='s'>Chat</EuiText></EuiLink>
                  </EuiFlexGroup>
                </EuiFlexGroup>
              </div>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFlexGroup direction='column'>
                  <EuiText>Sản phẩm: 117</EuiText>
                  <EuiText>Đang theo: 604</EuiText>
                  <EuiText>Tỉ lệ phản hồi chat: 100% (Trong vài giờ)</EuiText>
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFlexGroup direction='column'>
                  <EuiText>Người theo dõi: 117</EuiText>
                  <EuiText>Đánh giá: 5.0(11k Đánh giá)</EuiText>
                  <EuiText>Tham gia: 24 giờ trước</EuiText>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate.Section>
    <EuiPageTemplate.Section color='transparent'>
      <EuiPageSection paddingSize='s'>
        <EuiFlexGroup direction='column'>
          <EuiText color='subdued'><h3>Sản Phẩm Bán Chạy</h3></EuiText>
          <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
            {[1,2,3,4,5,6].map(item=>(
              <ProductItem/>
              ))}
          </EuiFlexGrid>
        </EuiFlexGroup>
      </EuiPageSection>
      <EuiPageSection paddingSize='s'>
        <EuiFlexGroup direction='column'>
          <EuiFlexGroup alignItems='center' gutterSize='m' style={{background:'rgba(0, 0, 0, .03)',padding:'10px'}}>
            <EuiPopover
            panelPaddingSize='none'
            style={{outline:'none'}}
            isOpen={popoverCategory}
            closePopover={()=>setPopoverCategory(false)}
            button={
              <EuiFlexGroup onClick={()=>setPopoverCategory(!popoverCategory)} alignItems='center' gutterSize='s'>
                <EuiIcon type="list"/>
                <EuiText size='s'>Danh mục</EuiText>
              </EuiFlexGroup>
            }>
              <EuiListGroup>
                {['Nike','Jordan','Convest','Puma'].map(item=>(<EuiListGroupItem label={item}
                  isActive
                  onClick={()=>setSelectedCategory(item)}
                  extraAction={{
                    color:'text',
                    onClick:()=>{},
                    iconType:'check',
                    alwaysShow:selectCategory===item
                  }}/>))}
              </EuiListGroup>
            </EuiPopover>
            <EuiFlexItem>
              <EuiFlexGroup alignItems='center'>
                <EuiText size='s'>Sắp xếp theo</EuiText>
                <EuiSelect 
                  options={[
                    {value:'',label:'Giá'},
                    {value:'',label:'Giá: Thấp đến cao'},
                    {value:'',label:'Cao đến thấp'},
                    {value:'',label:'Mới nhất'},
                    {value:'',label:'Bán chạy'},
                  ]}/>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup alignItems='center'>
                <EuiText size='s'>Khoảng giá</EuiText>
                <EuiFormControlLayoutDelimited
                startControl={<EuiFieldNumber placeholder='0'/>}
                endControl={<EuiFieldNumber placeholder='100'/>}/>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
          
          <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
            {[1,2,3,4,5,6].map(item=>(
              <ProductItem/>
              ))}
            </EuiFlexGrid>
        </EuiFlexGroup>
      </EuiPageSection>
    </EuiPageTemplate.Section>
    </>
  )
}
