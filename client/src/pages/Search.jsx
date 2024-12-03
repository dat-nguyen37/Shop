import { EuiAccordion, EuiButton, EuiFieldNumber, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayoutDelimited, EuiIcon, EuiLink, EuiListGroup, EuiListGroupItem, EuiPageSection, EuiPageTemplate, EuiPagination, EuiRadioGroup, EuiSelect, EuiSpacer, EuiText, useIsWithinBreakpoints } from '@elastic/eui'
import React, { useEffect, useState } from 'react'
import axios from '../axios'
import StarRatings from 'react-star-ratings';
import ProductItem from '../components/productItem/ProductItem'
import {useLocation} from 'react-router-dom'

export default function Search() {
    const mobile=useIsWithinBreakpoints(['xs','s'])
    const tablet=useIsWithinBreakpoints(['m','l'])
    const [categories,setCategories]=useState([])
    const [selectedCategory,setSelectedCategory]=useState("")
    const [ships,setShips]=useState([])
    const [selectedShip,setSelectedShip]=useState("")
    const [selectedRating,setSelectedRating]=useState()
    const [min,setMin]=useState(0)
    const [max,setMax]=useState(999999999)
    const [sort,setSort]=useState("")
    const [products,setProducts]=useState([])
    const [activePage,setActivePage]=useState(0)
    const [pageCount,setPageCount]=useState(1)
    const [pageSize,setPageSize]=useState(20)
    useEffect(() => {
        const totalPageCount = Math.ceil(products?.length / pageSize);
        setPageCount(totalPageCount);
    }, [products, pageSize]);
    
    const itemOfPage = products?.slice(activePage * pageSize, (activePage + 1) * pageSize);

    const getCategories=async()=>{
        try {
            const res=await axios.get('/category/getAll')
            setCategories(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getShips=async()=>{
        try {
            const res=await axios.get('/ship/getAll')
            setShips(res.data?.map(item=>(
                {id:item._id,label:item.name}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    const onChangeShip=(id)=>{
        setSelectedShip(id)
    }
    useEffect(()=>{
        getCategories()
        getShips()
    },[])
    const location=useLocation()
    const [q,setQ]=useState("")
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const q = queryParams.get('key');
        setQ(q);
    }, []);
    const getProducts=async()=>{
        try {
            const res=await axios.get(`/product/search?q=${q}&categoryId=${selectedCategory}&min=${min}&max=${max}&shipId=${selectedShip}&rating=${selectedRating}&sort=${sort}`)
            setProducts(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getProducts()
    },[q,selectedCategory,min,max,selectedShip,selectedRating,sort])
  return (
    <EuiPageTemplate>
        <EuiPageTemplate.Sidebar style={{minWidth:'200px'}} paddingSize='s'>
            <EuiFlexGroup direction='column' gutterSize='m'>
                <EuiFlexItem>
                    <EuiText><h4>Tất cả danh mục</h4></EuiText>
                    <EuiListGroup>
                        {categories&&categories.map(category=>(
                            <EuiListGroupItem label={category.name}
                            onClick={()=>setSelectedCategory(category._id)}
                            extraAction={{
                                color: 'text',
                                onClick: ()=>setSelectedCategory(category._id),
                                iconType: selectedCategory === category._id ? 'check' : '',
                                iconSize: 'l',
                                'aria-label': category.name,
                                alwaysShow: selectedCategory === category._id,
                            }}/>))}
                    </EuiListGroup>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiText><h4>Đơn vị vận chuyển</h4></EuiText>
                    <EuiSpacer size='s'/>
                        <EuiRadioGroup
                        style={{paddingInline:'16px'}}
                            idSelected={selectedShip}
                            onChange={(id) => onChangeShip(id)}
                            options={ships}/>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiText><h4>Khoảng giá</h4></EuiText>
                    <EuiSpacer size='s'/>
                    <EuiFormControlLayoutDelimited
                    fullWidth
                    startControl={
                        <EuiFieldNumber placeholder='0' style={{outline:'none'}} onChange={(e)=>setMin(e.target.value)}/>
                    }
                    endControl={
                        <EuiFieldNumber placeholder='9999999' style={{outline:'none'}} onChange={(e)=>setMax(e.target.value)}/>
                    }/>
                    <EuiSpacer size='s'/>
                    <EuiButton color='danger' fill>Áp dụng</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiText><h4>Đánh giá</h4></EuiText>
                    <EuiListGroup gutterSize='none'>
                    {[5,4,3,2,1].map(item=>(
                    <EuiListGroupItem label={
                        <EuiFlexGroup alignItems='center' gutterSize='s'>
                            <StarRatings 
                            rating={item} 
                            starRatedColor="#ffd700" 
                            numberOfStars={5} 
                            starDimension="15px"
                            starSpacing='0'/>
                            <EuiText>{item<5 && 'trở lên'}</EuiText>
                        </EuiFlexGroup>
                    }
                        onClick={()=>setSelectedRating(item)}
                        extraAction={{
                            color: 'text',
                            onClick: ()=>setSelectedRating(item),
                            iconType: selectedRating===item ? 'check' : '',
                            iconSize: 'm',
                            'aria-label': item,
                            alwaysShow: selectedRating===item,
                        }}/>))}
                    </EuiListGroup>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiPageTemplate.Sidebar>
      <EuiPageTemplate.Section>
      <EuiPageSection paddingSize='s'>
        <EuiFlexGroup direction='column'>
          <EuiText><b>Kết quả tìm kiếm cho từ khóa :</b>{q}</EuiText>
          <EuiFlexGroup alignItems='center' gutterSize='m' style={{background:'rgba(0, 0, 0, .03)',padding:'10px'}}>
            <EuiFlexItem>
             <EuiFlexGroup>
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
             </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
          {itemOfPage.length>0?(<EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': 'repeat(4,1fr)'}}>
            {itemOfPage.map(product=>(
              <ProductItem key={product._id} product={product}/>
              ))}
            </EuiFlexGrid>):(<EuiFlexGroup justifyContent='center'><EuiText>Không tìm thấy sản phẩm</EuiText></EuiFlexGroup>)}
            <EuiFlexGroup justifyContent="spaceAround">
            <EuiFlexItem grow={false}>
                <EuiPagination
                aria-label="Centered pagination example"
                pageCount={pageCount}
                activePage={activePage}
                onPageClick={(activePage) => setActivePage(activePage)}
                />
            </EuiFlexItem>
            </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiPageSection>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  )
}
