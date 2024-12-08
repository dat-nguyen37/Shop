import { EuiAccordion, EuiButton, EuiFieldNumber, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayoutDelimited, EuiIcon, EuiLink, EuiListGroup, EuiListGroupItem, EuiPageSection, EuiPageTemplate, EuiPagination, EuiRadioGroup, EuiSelect, EuiSpacer, EuiText, useIsWithinBreakpoints } from '@elastic/eui'
import React, { useEffect, useState } from 'react'
import axios from '../axios'
import StarRatings from 'react-star-ratings';
import ProductItem from '../components/productItem/ProductItem'
import {useLocation} from 'react-router-dom'

export default function BoxCategory() {
    const mobile=useIsWithinBreakpoints(['xs','s'])
    const tablet=useIsWithinBreakpoints(['m','l'])
    const [category,setCategory]=useState('')
    const [ships,setShips]=useState([])
    const [selectedShip,setSelectedShip]=useState('')
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
        getShips()
    },[])
    const location=useLocation()
    const [selectedCategory,setSelectedCategory]=useState('')
    const [subcategoryId,setSubcategoryId]=useState('')
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const ma = queryParams.get('ma');
        setSelectedCategory(ma);
        getCategories(ma)
    }, []);
    const getCategories=async(id)=>{
        try {
            const res=await axios.get('/category/getOne/'+id)
            setCategory(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const getProducts=async()=>{
        try {
            const res=await axios.get(`/product/search?categoryId=${selectedCategory}&subcategoryId=${subcategoryId}&min=${min}&max=${max}&shipId=${selectedShip}&rating=${selectedRating}&sort=${sort}`)
            setProducts(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getProducts()
    },[selectedCategory,subcategoryId,min,max,selectedShip,selectedRating,sort])
  return (
    <EuiPageTemplate>
        <EuiPageTemplate.Sidebar style={{minWidth:'200px'}} paddingSize='s'>
            <EuiFlexGroup direction='column' gutterSize='m'>
                <EuiFlexItem>
                    <EuiFlexGroup alignItems='center' gutterSize='s'>
                        <EuiIcon type="list" size='l'/>
                        <EuiText><h4>{category.name}</h4></EuiText>
                    </EuiFlexGroup>
                    <EuiListGroup>
                        {category.subcategories&&category.subcategories.map(category=>(
                            <EuiListGroupItem label={category.name}
                            onClick={()=>setSubcategoryId(category._id)}
                            extraAction={{
                                color: 'text',
                                iconType: subcategoryId === category._id ? 'check' : '',
                                iconSize: 'l',
                                'aria-label': category.name,
                                alwaysShow: subcategoryId === category._id,
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
          <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': 'repeat(4,1fr)'}}>
            {itemOfPage.map(product=>(
              <ProductItem key={product._id} product={product}/>
              ))}
            </EuiFlexGrid>
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
