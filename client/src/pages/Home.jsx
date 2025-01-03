import React, { useEffect, useState } from 'react'
import { EuiButton, EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage, EuiLink, EuiPageSection, EuiPageTemplate, EuiPanel, EuiPopover, EuiText, EuiTextBlockTruncate, useIsWithinBreakpoints} from '@elastic/eui'
import Slide from '../components/slide/Slide'
import Footer from '../components/footer/Footer'
import axios from '../axios'
import ProductItem from '../components/productItem/ProductItem'

export default function Home() {
  const mobile=useIsWithinBreakpoints(['xs','s'])
  const tablet=useIsWithinBreakpoints(['m','l'])
  const [products,setProducts]=useState([])
  const [productByView,setProductByView]=useState([])
  const [categories,setCategories]=useState([])


  const getProducts=async()=>{
    try {
      const res=await axios.get('/product/getByActive')
      setProducts(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const getProductByView=async()=>{
    try {
      const res=await axios.get('/product/getByView')
      setProductByView(res.data)
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
    getProductByView()
  },[])
  return (
    <div>
        <Slide/>
        <EuiPageTemplate.Section color='transparent'>
          <EuiPanel>
            <EuiFlexGroup direction='column'>
              <EuiFlexItem>
                <EuiText>Danh Mục</EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGroup gutterSize='m' responsive={false} className="eui-fullHeight eui-xScrollWithShadows">
                  {categories.map(category=>(<EuiFlexItem>
                    <EuiLink href={`/danh_muc?ma=${category._id}`}>
                      <EuiFlexGroup direction='column' alignItems='center' gutterSize='none'>
                        <EuiImage src={category.image} width="70" height="70" style={{borderRadius:'10px'}}/>
                        <EuiText color='default' size='s' style={{width:'100px',textAlign:'center'}}><b>{category.name}</b></EuiText>
                      </EuiFlexGroup>
                    </EuiLink>
                  </EuiFlexItem>))}
                </EuiFlexGroup>
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
                  {productByView?.map(item=>(
                    <EuiFlexItem key={item._id}>
                      <EuiFlexGroup direction='column' alignItems='center' gutterSize='s'>
                      <EuiFlexItem style={{position:'relative'}}>
                        <EuiLink>
                          <EuiImage src={item.image} 
                          size='m'
                          height="150"
                          caption={
                            <EuiTextBlockTruncate lines={3} style={{color:'black'}}>{item.name}</EuiTextBlockTruncate>
                          }
                          />
                        </EuiLink>
                        <EuiText size='s' textAlign='center' color='white' style={{position:'absolute',bottom:0,background:'black',width:'100%'}}>Đã bán {item.quantitySold}  </EuiText>
                      </EuiFlexItem>
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
                  <ProductItem product={product} key={product._id}/>
                ))}
              </EuiFlexGrid>
            </EuiFlexItem>
            <EuiText textAlign='center'><EuiLink><b>Xem thêm</b></EuiLink></EuiText>
          </EuiFlexGroup>
        </EuiPageTemplate.Section>
        
    </div>
  )
}
