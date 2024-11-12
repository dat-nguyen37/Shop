import React from 'react'
import { EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage, EuiLink, EuiPageSection, EuiPageTemplate, EuiPanel, EuiText, useIsWithinBreakpoints} from '@elastic/eui'
import Slide from '../components/slide/Slide'
import Footer from '../components/footer/Footer'

export default function Home() {
  const mobile=useIsWithinBreakpoints(['xs','s'])
  const tablet=useIsWithinBreakpoints(['m','l'])
  return (
    <EuiPageTemplate style={{marginTop:'90px'}}>
      <EuiPageTemplate.Section color='transparent'>
        <Slide/>
      </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
          <EuiPanel hasShadow={false}>
            <EuiFlexGroup direction='column'>
              <EuiFlexItem>
                <EuiText>Danh Mục</EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGrid gutterSize='none' style={{gridTemplateColumns: mobile?'repeat(4,1fr)':'repeat(6,1fr)'}}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(item=>(<EuiFlexItem>
                    <EuiFlexGroup direction='column' alignItems='center' gutterSize='none' style={{border:'1px solid #FFF'}}>
                      <EuiImage src='/assets/brand.png' size='s'/>
                      <EuiText>Thời trang nam</EuiText>
                    </EuiFlexGroup>
                  </EuiFlexItem>))}
                </EuiFlexGrid>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
        <EuiPanel paddingSize='s' hasShadow={false}>
            <EuiFlexGroup direction='column'>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent='spaceBetween'>
                  <EuiText color='danger'>TÌM KIẾM HÀNG ĐẦU</EuiText>
                  <EuiLink color='danger'>Xem Tất Cả <EuiIcon type="arrowRight"/></EuiLink>
                </EuiFlexGroup>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGrid gutterSize='s' style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
                  {[1,2,3,4,5,6].map(item=>(
                    <EuiFlexItem>
                      <EuiFlexGroup direction='column' alignItems='center' gutterSize='s'>
                      <EuiFlexItem style={{position:'relative'}}>
                        <EuiImage src='/assets/brand.png' size='m'/>
                        <EuiText size='s' textAlign='center' color='white' style={{position:'absolute',bottom:0,background:'black',opacity:0.4,width:'100%'}}>Bán 8k+/ tháng  </EuiText>
                      </EuiFlexItem>
                      <EuiText size='m'>Thời trang nam</EuiText>
                    </EuiFlexGroup>
                  </EuiFlexItem>))}
                </EuiFlexGrid>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
          <EuiFlexGroup direction='column'>
            <EuiFlexItem>
              <EuiPanel hasShadow={false} style={{borderBottom:'2px solid red'}}>
                <EuiText textAlign='center' color='danger'>GỢI Ý HÔM NAY</EuiText>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(item=>(
                  <EuiCard
                  textAlign='left'
                  hasBorder={true}
                  image="/assets/brand.png"
                  title={
                  <EuiLink href='/chi_tiet_san_pham?masp=1'>
                    <EuiText size='s' 
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      WebkitLineClamp: 2,}}>
                      Đai Chống Gù Lưng Nam Nữ , Đai Nâng Ngực Nữ Có Nẹp Chỉnh Cột Sống, Đai Bảo Vệ Vòng 1
                    </EuiText>
                  </EuiLink>}
                  description={
                    <EuiFlexGroup direction='column' gutterSize='none'>
                      <EuiFlexItem>
                        <EuiText color='red'>50.000 đ</EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <EuiFlexGroup alignItems='center' responsive={false}>
                          <EuiFlexGroup gutterSize='s' alignItems='center' responsive={false}>
                            <EuiIcon type="starFilled" color='yellow'/>
                            <EuiText size='xs'>4.5</EuiText>
                          </EuiFlexGroup>
                          <EuiText size='xs'>Đã bán 16,5k</EuiText>
                        </EuiFlexGroup>
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <EuiFlexGroup gutterSize='none' alignItems='center' responsive={false}>
                          <EuiIcon type="mapMarker"/>
                          <EuiText size='xs'>Tp. Hồ Chí Minh</EuiText>
                        </EuiFlexGroup>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  }/>))}
              </EuiFlexGrid>
            </EuiFlexItem>
            <EuiText textAlign='center'><EuiLink><b>Xem thêm</b></EuiLink></EuiText>
          </EuiFlexGroup>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='plain'>
          <Footer/>
        </EuiPageTemplate.Section>
    </EuiPageTemplate>
  )
}
