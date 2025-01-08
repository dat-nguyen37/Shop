import { EuiFlexGroup, EuiFlexItem, EuiImage, EuiPageSection,EuiText,EuiAvatar,EuiPagination, EuiSpacer, EuiTab, EuiTabs, EuiTitle, EuiButton, EuiButtonIcon } from '@elastic/eui'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation,useNavigate } from 'react-router-dom'
import axios from '../../../axios'
import StarRatings from 'react-star-ratings';

export default function ViewProduct() {
    const location=useLocation()
    const [productId,setProductId]=useState(null)
    const [category,setcategory]=useState(null)
    const [product,setProduct]=useState(null)
    const [comments,setComments]=useState([])
    const [activePage,setActivePage]=useState(0)
    const [pageCount,setPageCount]=useState(1)
    const [pageSize,setPageSize]=useState(5)
    

    const navigate=useNavigate()
    useEffect(() => {
        const queryParams = new URLSearchParams(location?.search);
        const masp = queryParams.get('masp');
        setProductId(masp);
    }, [location?.search]);
    const getProduct = async () => {
        try {
            const res = await axios.get('/product/getOne/' + productId);
            setProduct(res.data.product);
            setcategory(res.data.category)
        } catch (err) {
            console.log(err);
        }
    };

    const getComment = async () => {
        try {
            const res = await axios.get('/comment/getAll/' + productId);
            setComments(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if(productId){
            getProduct()
            getComment()
        }
    }, [productId]);

    useEffect(() => {
            const totalPageCount = Math.ceil(comments?.length / pageSize);
            setPageCount(totalPageCount);
        }, [comments, pageSize]);
        const itemOfPage =comments.length>0 && comments?.slice(activePage * pageSize, (activePage + 1) * pageSize);
        


  return (
    <EuiPageSection>
        <EuiFlexGroup gutterSize='s'>
            <EuiButtonIcon iconType="arrowLeft" onClick={()=>navigate(-1)}/>
            <EuiText>Quay lại</EuiText>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFlexGroup>
            <EuiFlexItem grow={false}>
                <EuiImage src={product?.image} width="200" height="150"/>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFlexGroup direction="column" gutterSize='s'>
                    <EuiTitle><p>{product?.name}</p></EuiTitle>
                    <p><b>Mô tả:</b> {product?.description}</p>
                    <p><b>Giá:</b> {product?.price}</p>
                    <p><b>Thể loại:</b> {category?.name}</p>
                    <p><b>Đánh giá:</b> 
                        <StarRatings 
                        rating={product?.rating} 
                        starRatedColor="#ffd700" 
                        numberOfStars={5} 
                        starDimension="15px"
                        starSpacing='0'/>
                    </p>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiText><h2>Đánh giá</h2></EuiText>
        <EuiSpacer/>
                {itemOfPage.length>0?(<EuiFlexGroup direction='column'>
                        {itemOfPage.map(item=>(<EuiFlexItem style={{borderBlockEnd:'1px solid'}}>
                            <EuiFlexGroup gutterSize='s' responsive={false}>
                                <EuiAvatar name='D' imageUrl={item?.image}/>
                                <EuiFlexItem>
                                        <p>{item.name}</p>
                                        <StarRatings 
                                            rating={item.rating} 
                                            starRatedColor="#ffd700" 
                                            numberOfStars={5} 
                                            starDimension="15px"
                                            starSpacing='0'/>
                                        <EuiText size='xs' color='subdued'>{item.createdAt}</EuiText>
                                        <EuiSpacer size='s'/>
                                        <EuiText>{item.commentText}</EuiText>
                                        <EuiSpacer size='s'/>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiFlexItem>))}
                        <EuiFlexGroup justifyContent='flexEnd'>
                            <EuiPagination
                            pageCount={pageCount}
                            activePage={activePage}
                            onPageClick={(activePage) => setActivePage(activePage)}/>
                        </EuiFlexGroup>
                    </EuiFlexGroup>):(
                        <EuiText>Chưa có đánh giá nào.</EuiText>
                    )}
    </EuiPageSection>
  )
}
