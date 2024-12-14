import React, { useContext, useEffect, useState } from 'react'
import { EuiAvatar, EuiButton, EuiButtonEmpty, EuiCollapsibleNav, EuiCollapsibleNavGroup, EuiFieldNumber, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayoutDelimited, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPageSection, EuiPageTemplate, EuiPagination, EuiPopover, EuiSelect, EuiSelectable, EuiText, useIsWithinBreakpoints } from '@elastic/eui'
import Footer from '../components/footer/Footer'
import ProductItem from '../components/productItem/ProductItem'
import { useLocation } from 'react-router-dom'
import axios from '../axios'
import moment from 'moment'

export default function ShopView() {
  const mobile=useIsWithinBreakpoints(['xs','s'])
  const tablet=useIsWithinBreakpoints(['m','l'])
  

  const location=useLocation()
  const [shopId,setShopId]=useState('')
  const [products,setproducts]=useState([])
  const [bestSelling,setBestSelling]=useState([])
  const [shop,setShop]=useState(null)
  const [sort,setSort]=useState('')
  const [min,setMin]=useState(0)
  const [max,setMax]=useState(99999999)
  const [subcategoryId,setSubcategoryId]=useState('')

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const shopId = queryParams.get('id');
    setShopId(shopId);
}, [location.search]);

  const [pageCount,setPageCount]=useState(10)
  const [activePage,setActivePage]=useState(0)
  const [pageSize,setPageSize]=useState(12)
  const getAllProduct=async()=>{
    try {
      const res=await axios.get(`/product/search?shopId=${shopId}&subcategoryId=${subcategoryId}&sort=${sort}&min=${min}&max=${max}`)
      setproducts(res.data) 
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const totalPageCount = Math.ceil(products?.length / pageSize);
    setPageCount(totalPageCount);
  }, [products, pageSize]);

  const productsOfPage = products?.slice(activePage * pageSize, (activePage + 1) * pageSize);

  const getShop=async()=>{
    try {
      const res=await axios.get('/shop/getOne/'+shopId)
      setShop(res.data) 
    } catch (err) {
      console.log(err)
    }
  }
  const getBestSellingByShop=async()=>{
    try {
      const res=await axios.get('/product/getBestSellingByShop/'+shopId)
      setBestSelling(res.data) 
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
      getAllProduct();
      getShop()
      getBestSellingByShop()
}, [shopId,subcategoryId,sort,min,max]);

  return (
    <>
    {shop?<>
    <EuiPageTemplate.Section grow={false}>
        <EuiFlexGroup gutterSize='m'>
            <EuiFlexItem>
              <div style={{position:'relative'}}>
                <EuiImage src={shop.background} allowFullScreen height="150" size='fullWidth'/>
                <div style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></div>
                <EuiFlexGroup direction='column' gutterSize='s' style={{position:'absolute',top:'20%',left:'10%'}}>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <EuiAvatar name='Shop' imageUrl={shop.avatar} size='xl'/>
                    <p>
                      <EuiText color='white'>{shop?.shop?.name}</EuiText>
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
                  <EuiText>Sản phẩm: {shop?.productCount}</EuiText>
                  <EuiText>Đang theo: 604</EuiText>
                  <EuiText>Tỉ lệ phản hồi chat: 100% (Trong vài giờ)</EuiText>
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFlexGroup direction='column'>
                  <EuiText>Người theo dõi: {shop?.shop.follower | 0}</EuiText>
                  <EuiText>Đánh giá: {shop?.averageRating}({shop?.totalComments} Đánh giá)</EuiText>
                  <EuiText>Tham gia: {moment(shop?.shop.createdAt).format('DD-MM-YYYY')}</EuiText>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate.Section>
    {products?<EuiPageTemplate.Section color='transparent'>
      <EuiPageSection paddingSize='s'>
        <EuiFlexGroup direction='column'>
          <EuiText color='subdued'><h3>Sản Phẩm Bán Chạy</h3></EuiText>
          <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
            {bestSelling.map(product=>(
              <ProductItem key={product._id} product={product} />
              ))}
          </EuiFlexGrid>
        </EuiFlexGroup>
      </EuiPageSection>
      <EuiPageSection paddingSize='s'>
        <EuiFlexGroup direction='column'>
          <EuiFlexGroup alignItems='center' gutterSize='m' style={{background:'rgba(0, 0, 0, .03)',padding:'10px'}}>
            <EuiFlexItem>
              <EuiSelect
                onChange={(e)=>setSubcategoryId(e.target.value)}
                options={[
                    { text: "Chọn danh mục", value: "" },
                    ...shop?.shop.subcategories?.map(s=>({
                    text:s.name,
                    value:s._id
                }))]} fullWidth /> 
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup alignItems='center'>
                <EuiText size='s'>Sắp xếp theo</EuiText>
                <EuiSelect 
                  onChange={(e)=>setSort(e.target.value)}
                  options={[
                    {value:'',label:'Giá'},
                    {value:'asc',label:'Giá: Thấp đến cao'},
                    {value:'desc',label:'Cao đến thấp'},
                    {value:'new',label:'Mới nhất'},
                    {value:'bestSell',label:'Bán chạy'},
                  ]}/>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup alignItems='center'>
                <EuiText size='s'>Khoảng giá</EuiText>
                <EuiFormControlLayoutDelimited
                startControl={<EuiFieldNumber placeholder='0' onChange={(e)=>setMin(e.target.value)}/>}
                endControl={<EuiFieldNumber placeholder='100' onChange={(e)=>setMax(e.target.value)}/>}/>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
          
          {productsOfPage.length>0?<EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
            {productsOfPage.map(product=>(
              <ProductItem key={product._id} product={product}/>
              ))}
            </EuiFlexGrid>:<EuiFlexGroup justifyContent='center'><EuiText>Không tìm thấy sản phẩm</EuiText></EuiFlexGroup>}
            <EuiPagination
              pageCount={pageCount}
              activePage={activePage}
              onPageClick={(activePage) => setActivePage(activePage)}/>
        </EuiFlexGroup>
      </EuiPageSection>
    </EuiPageTemplate.Section>
    :<EuiPageTemplate.Section>
      <EuiFlexGroup justifyContent='center'>
        <EuiText>Không tìm thấy sản phẩm nào</EuiText>
      </EuiFlexGroup>
      </EuiPageTemplate.Section>
      }
    </>:<EuiPageTemplate.Section>
      <EuiFlexGroup justifyContent='center'>
        <EuiText>Không tìm thấy thông tin cửa hàng</EuiText>
      </EuiFlexGroup>
      </EuiPageTemplate.Section>}
    </>
  )
}
