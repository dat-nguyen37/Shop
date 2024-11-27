import React, { useEffect, useState } from 'react'
import { EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage, EuiLink, EuiPageSection, EuiPageTemplate, EuiPanel, EuiText, useIsWithinBreakpoints} from '@elastic/eui'
import Slide from '../components/slide/Slide'
import Footer from '../components/footer/Footer'
import axios from '../axios'
import ProductItem from '../components/productItem/ProductItem'

export default function Home() {
  const mobile=useIsWithinBreakpoints(['xs','s'])
  const tablet=useIsWithinBreakpoints(['m','l'])
  const [products,setProducts]=useState([])
  const [categories,setCategories]=useState([])


  const getProducts=async()=>{
    try {
      const res=await axios.get('/product/getAll')
      setProducts(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const getCategories=async()=>{
    try {
      const res=await axios.get('/category/getAll')
      setCategories(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getProducts()
    getCategories()
  },[])
  return (
    <>
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
                  {categories.map(category=>(<EuiFlexItem>
                    <EuiFlexGroup direction='column' alignItems='center' gutterSize='none' style={{border:'1px solid #FFF'}}>
                      <EuiImage src={category.image} size='s'/>
                      <EuiText>{category.name}</EuiText>
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
                {products.map(product=>(
                  <ProductItem product={product}/>
                ))}
              </EuiFlexGrid>
            </EuiFlexItem>
            <EuiText textAlign='center'><EuiLink><b>Xem thêm</b></EuiLink></EuiText>
          </EuiFlexGroup>
        </EuiPageTemplate.Section>
    </>
  )
}
