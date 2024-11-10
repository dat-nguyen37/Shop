import { EuiButton, EuiButtonEmpty, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPageTemplate, EuiPanel, EuiPopover, EuiPopoverTitle, EuiText } from '@elastic/eui'
import React, { useState } from 'react'
import StarRatings from 'react-star-ratings';
import Footer from '../components/footer/Footer'

export default function ProductDetail() {
    const [rating, setRating] = useState(5);

  const changeRating = (newRating) => {
    setRating(newRating);
  };
  return (
    <EuiPageTemplate style={{marginTop:'90px'}}>
        <EuiPageTemplate.Header
        breadcrumbs={[
            {
                text:'Trang chủ',
                href:'/'
            },
            {
                text:'Điện thoại & phụ kiện',
                href:'/'
            },
            {
                text:'Dây Sạc Tự Ngắt - Dây Cáp Sạc Dữ Liệu Sạc Nhanh 100W Micro USB Type C 3 Trong 1 6A',
            },
        ]}
        bottomBorder={false}
        paddingSize='m'/>
        <EuiPageTemplate.Section color='transparent' style={{marginBlock:'-40px'}}>
            <EuiPanel hasShadow={false}>
                <EuiFlexGroup>
                    <EuiFlexItem grow={1}>
                        <EuiFlexGroup direction='column'>
                            <EuiImage src='/assets/brand.png' style={{border:'1px solid'}}/>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup>
                                    <EuiImage src='/assets/brand.png' size='50px' style={{border:'1px solid'}}/>
                                    <EuiImage src='/assets/brand.png' size='50px' style={{border:'1px solid'}}/>
                                    <EuiImage src='/assets/brand.png' size='50px' style={{border:'1px solid'}}/>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem grow={2}>
                        <EuiFlexGroup direction='column'>
                            <EuiText><h3>Dây Sạc Tự Ngắt - Dây Cáp Sạc Dữ Liệu Sạc Nhanh 100W Micro USB Type C 3 Trong 1 6A</h3></EuiText>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup>
                                    <EuiFlexGroup>
                                        <EuiFlexItem grow={false}>
                                            <EuiFlexGroup alignItems='center' gutterSize='s'>
                                                <StarRatings 
                                                    rating={rating} 
                                                    starRatedColor="#ffd700" 
                                                    numberOfStars={5} 
                                                    starDimension="15px"
                                                    starSpacing='0'
                                                    starHoverColor='#ffd700'
                                                    changeRating={changeRating}/>
                                                <EuiText>{rating}</EuiText>
                                            </EuiFlexGroup>
                                        </EuiFlexItem>
                                        <EuiText>3,1k Đánh giá</EuiText>
                                        <EuiText>13,5k Đã bán</EuiText>
                                    </EuiFlexGroup>
                                    <EuiPopover
                                    isOpen={true}
                                    panelStyle={{outline:'none'}}
                                    anchorPosition='leftUp'
                                    button={<EuiButtonEmpty>Tố cáo</EuiButtonEmpty>}>
                                        <EuiPopoverTitle paddingSize='s'>
                                            <EuiText>Chọn lý do</EuiText>
                                        </EuiPopoverTitle>
                                        <EuiFlexGroup>
                                            
                                        </EuiFlexGroup>
                                    </EuiPopover>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='plain' grow={false}>
            <Footer/>
        </EuiPageTemplate.Section>
    </EuiPageTemplate>
  )
}
