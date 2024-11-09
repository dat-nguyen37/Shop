import React from 'react'
import { EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPageSection, EuiPageTemplate, EuiPanel, EuiText} from '@elastic/eui'

export default function Home() {
  return (
    <EuiPageTemplate>
        <EuiPageTemplate.Section>
          <EuiPanel>
            <EuiFlexGroup direction='column'>
              <EuiFlexItem>
                <EuiText>Danh Mục</EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGrid gutterSize='none' style={{gridTemplateColumns:'repeat(6, 1fr)'}}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(item=>(<EuiFlexItem>
                    <EuiFlexGroup direction='column' alignItems='center' gutterSize='none' style={{border:'1px solid #FFF'}}>
                      <EuiImage src='/assets/brand.webp' size='s'/>
                      <EuiText>Thời trang nam</EuiText>
                    </EuiFlexGroup>
                  </EuiFlexItem>))}
                </EuiFlexGrid>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section>
        <EuiPanel paddingSize='s'>
            <EuiFlexGroup direction='column'>
              <EuiFlexItem>
                <EuiText color='danger'>Tìm kiếm hàng đầu</EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGrid gutterSize='s' style={{gridTemplateColumns:'repeat(6, 1fr)'}}>
                  {[1,2,3,4,5,6].map(item=>(
                    <EuiFlexItem>
                      <EuiFlexGroup direction='column' alignItems='center' gutterSize='s'>
                      <EuiFlexItem style={{position:'relative'}}>
                        <EuiImage src='/assets/brand.webp' size='s'/>
                        <EuiText size='xs' textAlign='center' color='white' style={{position:'absolute',bottom:0,background:'black',opacity:0.4,width:'100%'}}>Bán 8k+/ tháng  </EuiText>
                      </EuiFlexItem>
                      <EuiText size='m'>Thời trang nam</EuiText>
                    </EuiFlexGroup>
                  </EuiFlexItem>))}
                </EuiFlexGrid>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section>
        <EuiPanel paddingSize='s'>
            <EuiFlexGroup direction='column'>
              <EuiFlexItem>
                <EuiText textAlign='center' color='danger'>Gợi ý hôm nay</EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGrid gutterSize='s' style={{gridTemplateColumns:'repeat(6, 1fr)'}}>
                  {[1,2,3,4,5,6].map(item=>(
                    <EuiFlexItem>
                      <EuiFlexGroup direction='column' alignItems='center' gutterSize='s'>
                      <EuiFlexItem style={{position:'relative'}}>
                        <EuiImage src='/assets/brand.webp' size='s'/>
                        <EuiText size='xs' textAlign='center' color='white' style={{position:'absolute',bottom:0,background:'black',opacity:0.4,width:'100%'}}>Bán 8k+/ tháng  </EuiText>
                      </EuiFlexItem>
                      <EuiText size='m'>Thời trang nam</EuiText>
                    </EuiFlexGroup>
                  </EuiFlexItem>))}
                </EuiFlexGrid>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiPageTemplate.Section>
    </EuiPageTemplate>
  )
}
