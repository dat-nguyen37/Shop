import { EuiAvatar, EuiBreadcrumbs, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiCard, EuiContextMenu, EuiFieldNumber, EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiFormRow, EuiIcon, EuiImage, EuiLink, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPageSection, EuiPageTemplate, EuiPagination, EuiPanel, EuiPopover, EuiPopoverFooter, EuiPopoverTitle, EuiSelectable, EuiSpacer, EuiText, EuiTextArea, EuiTitle, useIsWithinBreakpoints } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings';
import Footer from '../components/footer/Footer'
import {useLocation, useOutletContext} from 'react-router-dom'
import axios from '../axios'
import {toast,ToastContainer} from 'react-toastify'
import moment from 'moment';
import ProductItem from '../components/productItem/ProductItem'
import { AuthContext } from '../context/AuthContext';
import Report from '../components/report/Report';

export default function ProductDetail() {
    const mobile=useIsWithinBreakpoints(['xs','s'])
    const tablet=useIsWithinBreakpoints(['m','l'])
    const {user}=useContext(AuthContext)
    const [product,setProduct]=useState(null)
    const [productByShop,setProductByShop]=useState([])
    const [listProduct,setListProduct]=useState([])
    const [shop,setShop]=useState(null)
    const [comments,setComments]=useState([])
    const [rating, setRating] = useState(5);
    const [commentText,setCommentText]=useState('')
    const [modalReport,setModalReport]=useState(false)
    const [isModalComment,setIsModalComment]=useState(false)
    const [price,setPrice]=useState(0)

    const [activePage,setActivePage]=useState(0)
    const [pageCount,setPageCount]=useState(1)
    const [pageSize,setPageSize]=useState(5)

    const changeRating = (newRating) => {
        setRating(newRating);
    };

    // getProduct
    const location=useLocation()
    const [productId,setProductId]=useState(null)
    const [category,setcategory]=useState(null)
    const [like,setIsLike]=useState(false)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const masp = queryParams.get('masp');
        setProductId(masp);
    }, [location.search]);
    const getProduct = async () => {
        try {
            const res = await axios.get('/product/getOne/' + productId);
            setProduct(res.data.product);
            setPrice(res.data.product.price)
            setcategory(res.data.category)
            setIsLike(res.data.product.like.includes(user?._id))
            getShop(res.data.product.shopId)
            getProductByShop(res.data.product.shopId)
        } catch (err) {
            console.log(err);
        }
    };
    const getListProduct = async () => {
        try {
            const res = await axios.get('/product/getByActive');
            setListProduct(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    // shop
    const getShop=async(id)=>{
        try {
          const res=await axios.get('/shop/getOne/'+id)
          setShop(res.data) 
        } catch (err) {
          console.log(err)
        }
      }
      const getProductByShop=async(id)=>{
        try {
          const res=await axios.get('/product/getProductByShop/'+id)
          setProductByShop(res.data) 
          console.log(res.data)
        } catch (err) {
          console.log(err)
        }
      }

      const [selectRating,setSelectRating]=useState('')
    //comment
    const getComment = async () => {
        try {
            const res = await axios.get(`/comment/getAll/${productId}?rating=${selectRating}`);
            setComments(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const totalPageCount = Math.ceil(comments?.length / pageSize);
        setPageCount(totalPageCount);
    }, [comments, pageSize]);
    
    const itemOfPage = comments?.slice(activePage * pageSize, (activePage + 1) * pageSize);

    useEffect(() => {
        if (productId) {
            getProduct()
            getComment()
            getListProduct()
        }
    }, [productId,selectRating]);

    const handleComment=async()=>{
        try {
            await axios.post('/Comment/create',{
                productId:productId,
                commentText:commentText,
                rating:rating
            })
            toast.success('Đánh giá thành công')
            setIsModalComment(false)
            getComment()
            getProduct()
        } catch (err) {
            if(err.response&&err.response.status===401){
                toast.error('Lỗi xác thực')
            }else{
                console.log(err)
                toast.error('Lỗi server')
            }
        }
    }

    const [selectedColor,setSelectedColor]=useState('')
    const [selectedSize,setSelectedSize]=useState('')
    const [quantity,setQuantity]=useState(1)
    const handleSize=(size)=>{
        setSelectedSize(size.name)
        if(size.price){
            setPrice(size.price)
        }
    }
    const handlePrev=()=>{
        if(quantity>1){
            setQuantity(prev=>prev-1)
        }
    }
    const handleNext=()=>{
        if(quantity<10){
            setQuantity(prev=>prev+1)
        }
    }
    const result = useOutletContext();
    const handleAddToCart=async()=>{
        try {
            await axios.post('/cart/create',{
                shopId:shop.shop._id,
                productId:product._id,
                color:selectedColor,
                size:selectedSize,
                price:price,
                quantity:quantity,
                totalAmount:price * quantity
            })
            result.getCartByUser()
            toast.success('Đã thêm vào giỏ hàng')
        } catch (err) {
            if(err.response&&err.response.status===401){
                toast.success('Lỗi xác thực')
            }
            console.log(err)
        }
    }

    //like
    const handleLike=async()=>{
        try {
            const res=await axios.get('/product/like/'+productId)
            getProduct()
            // setIsLike(res.data.like.includes(user?._id))
        } catch (err) {
            if(err.response&&err.response.status===401){
                toast.error("Bạn cần đăng nhập")
            }
            console.log(err)
        }
    }
  

  return (
    <>
    <ToastContainer/>
        <EuiPageTemplate.Header
        breadcrumbs={[
            {
                text:'Trang chủ',
                href:'/'
            },
            {
                text:shop?.category.name,
                href:'/'
            },
            {
                text:category?.subcategories[0].name,
                href:'/'
            },
            {
                text: product?.name,
            },
        ]}
        bottomBorder={false}
        paddingSize='m'/>
        <EuiPageTemplate.Section color='transparent' style={{marginBlock:'-30px'}}>
            <EuiPanel hasShadow={false}>
                <EuiFlexGroup>
                    <EuiFlexItem grow={1}>
                        <EuiFlexGroup direction='column'>
                            <EuiImage src={product?.image} height="300px" style={{border:'1px solid'}}/>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup justifyContent='spaceBetween' alignItems='center' responsive={false}>
                                    <EuiFlexItem >
                                        <EuiFlexGroup gutterSize='s' alignItems='center'>
                                            <EuiText>Chia sẻ:</EuiText>
                                            <EuiButtonIcon iconType="/assets/facebook.png" iconSize='l'/>
                                            <EuiButtonIcon iconType="/assets/youtube.svg" iconSize='l'/>
                                            <EuiButtonIcon iconType="/assets/google.png" iconSize='l'/>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                    <EuiFlexItem >
                                        <EuiButtonEmpty iconType={like?"/assets/heart1.png":"/assets/heart.png"} onClick={handleLike} color=''>{like?'Đã thích':'thích'} ({product?.like?.length})</EuiButtonEmpty>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem grow={2}>
                        <EuiFlexGroup direction='column' gutterSize='m'>
                            <EuiText><h3>{product?.name}</h3></EuiText>
                            <EuiText>Mã sp: {product?._id}</EuiText>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup gutterSize='s' alignItems='center'>
                                    <EuiFlexItem>
                                    <EuiFlexGroup alignItems='center' responsive={false}>
                                            <EuiFlexGroup alignItems='center' gutterSize='s'>
                                                <StarRatings 
                                                    rating={product?.rating}
                                                    starRatedColor="#ffd700" 
                                                    numberOfStars={5} 
                                                    starDimension="15px"
                                                    starSpacing='0'/>
                                                <EuiText>{product?.rating}</EuiText>
                                            </EuiFlexGroup>
                                        <EuiText>{comments?.length} Đánh giá</EuiText>
                                        <EuiText>{product?.quantitySold} Đã bán</EuiText>                                    
                                    </EuiFlexGroup>
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={false}>
                                        <EuiLink onClick={()=>setModalReport(true)}>Tố cáo</EuiLink>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false} style={{background:'rgba(208,1,27,.08)',padding:'10px'}}>
                                <EuiFlexGroup>
                                    <EuiText color='danger'><h3>₫{price?.toLocaleString()}</h3></EuiText>
                                    <EuiText color='subdued'><s>₫304.000</s></EuiText>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup alignItems='center'>
                                    <EuiText>Chính sách Trả hàng</EuiText>
                                    <EuiText><EuiIcon type="package" color='danger'/>Trả hàng 15 ngày</EuiText>
                                    <EuiText>Trả hàng miễn phí</EuiText>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            {product&&product.color.length>0&&<EuiFlexItem grow={false}>
                                <EuiFlexGroup alignItems='center'>
                                    <EuiText>Màu sắc</EuiText>
                                    <EuiFlexGroup gutterSize='s' responsive={false}>
                                        {product.color.map(c=>(
                                            <EuiFlexItem grow={false} onClick={()=>setSelectedColor(c)} style={{border:selectedColor===c?'2px solid red':'2px solid',textAlign:'center',minWidth:'100px',paddingInline:4}}><EuiText>{c}</EuiText></EuiFlexItem>
                                        ))}
                                    </EuiFlexGroup>
                                </EuiFlexGroup>
                            </EuiFlexItem>}
                            {product&&product.size.length>0&&<EuiFlexItem grow={false}>
                                <EuiFlexGroup alignItems='center'>
                                    <EuiText>Kích thước</EuiText>
                                    <EuiFlexGroup gutterSize='s' responsive={false}>
                                        {product.size.map(s=>(
                                            <EuiFlexItem grow={false} onClick={()=>handleSize(s)} style={{border:selectedSize===s.name?'2px solid red':'2px solid',textAlign:'center',minWidt:'100px',paddingInline:4}}><EuiText>{s.name}</EuiText></EuiFlexItem>
                                        ))}
                                    </EuiFlexGroup>
                                </EuiFlexGroup>
                            </EuiFlexItem>}
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup alignItems='center'>
                                    <EuiText>Số lượng</EuiText>
                                    <EuiFormControlLayout style={{width:'120px'}}>
                                        <EuiFieldText
                                        style={{textAlign:'center'}}
                                        value={quantity}
                                        prepend={
                                            <EuiIcon type="minus" size='m' onClick={handlePrev}/>
                                        }
                                        append={
                                            <EuiIcon type="plus" size='m' onClick={handleNext}/>
                                        }
                                        />
                                    </EuiFormControlLayout>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <EuiFlexGroup>
                                    <EuiButton color='primary' fill onClick={handleAddToCart}>Thêm vào giỏ hàng</EuiButton>
                                    <EuiButton color='danger' fill>Mua ngay</EuiButton>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
            <EuiPanel hasShadow={false}>
                <EuiFlexGroup alignItems='center'>
                    <EuiFlexItem grow={false}>
                        <EuiAvatar name='S' imageUrl={shop?.shop?.avatar} size='xl'/>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiFlexGroup direction='column' gutterSize='s'>
                            <EuiText>{shop?.shop?.name}</EuiText>
                            <EuiText size='s'>Online 1 giờ trước</EuiText>
                            <EuiFlexGroup>
                                <EuiButton iconType="discuss">Chat Ngay</EuiButton>
                                <EuiButton iconType="/assets/shop.png" href={`/shop?id=${shop?.shop._id}`}>Xem Shop</EuiButton>
                            </EuiFlexGroup>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFlexGroup direction='column'>
                            <EuiFlexItem>
                                <EuiFlexGroup>
                                    <EuiFlexItem grow={1}>
                                        <EuiFlexGroup justifyContent='spaceBetween'>
                                            <EuiText size='s' color='subdued'>Đánh giá</EuiText>
                                            <EuiText size='s' color='danger'>{shop?.totalComments}</EuiText>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={1}>
                                        <EuiFlexGroup justifyContent='spaceBetween'>
                                            <EuiText size='s' color='subdued'>Tỉ lệ phản hồi</EuiText>
                                            <EuiText size='s' color='danger'>100%</EuiText>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={1}>
                                        <EuiFlexGroup justifyContent='spaceBetween'>
                                            <EuiText size='s' color='subdued'>Tham gia</EuiText>
                                            <EuiText size='s' color='danger'>{moment(shop?.shop.createdAt).format('DD-MM-YYYY')}</EuiText>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <EuiFlexGroup>
                                    <EuiFlexItem grow={1}>
                                        <EuiFlexGroup justifyContent='spaceBetween'>
                                            <EuiText size='s' color='subdued'>Sản phẩm</EuiText>
                                            <EuiText size='s' color='danger'>{shop?.productCount}</EuiText>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={1}>
                                        <EuiFlexGroup justifyContent='spaceBetween'>
                                            <EuiText size='s' color='subdued'>Thời gian phản hồi</EuiText>
                                            <EuiText size='s' color='danger'>trong vài giờ</EuiText>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={1}>
                                        <EuiFlexGroup justifyContent='spaceBetween'>
                                            <EuiText size='s' color='subdued'>Người theo dõi</EuiText>
                                            <EuiText size='s' color='danger'>{shop?.shop.follower | 0}</EuiText>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
            <EuiPanel>
                <EuiFlexGroup direction='column' gutterSize='s'>
                    <EuiText style={{background:'rgba(0,0,0,.02)', padding:10}}>CHI TIẾT SẢN PHẨM</EuiText>
                    <EuiFlexGroup direction='column' gutterSize='s'>
                        <EuiFlexItem>
                            <EuiFlexGroup>
                                <EuiText style={{width:'100px'}} size='s' color='subdued'>Danh Mục</EuiText>
                                <EuiFlexGroup alignItems='center' gutterSize='s'>
                                    <EuiText size='s' color='blue'>Trang chủ</EuiText>
                                    <EuiIcon type="arrowRight" size='s'/>
                                    <EuiText size='s' color='blue'>{shop?.category.name}</EuiText>
                                    <EuiIcon type="arrowRight" size='s'/>
                                    <EuiText size='s' color='blue'>{category?.subcategories[0]?.name}</EuiText>
                                    <EuiIcon type="arrowRight" size='s'/>
                                    <EuiText size='s' color='blue'>{product?.name}</EuiText>
                                </EuiFlexGroup>
                            </EuiFlexGroup>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFlexGroup>
                                <EuiText style={{width:'100px'}} size='s' color='subdued'>Số lượng hàng khuyến mãi</EuiText>
                                <EuiText size='s'>2385</EuiText>
                            </EuiFlexGroup>
                        </EuiFlexItem>  
                        <EuiFlexItem>
                            <EuiFlexGroup>
                                <EuiText style={{width:'100px'}} size='s' color='subdued'>Số sản phẩm còn lại</EuiText>
                                <EuiText size='s'>244170</EuiText>
                            </EuiFlexGroup>
                        </EuiFlexItem> 
                        <EuiFlexItem>
                            <EuiFlexGroup>
                                <EuiText style={{width:'100px'}} size='s' color='subdued'>Chiều rộng phù hợp</EuiText>
                                <EuiText size='s'>Có</EuiText>
                            </EuiFlexGroup>
                        </EuiFlexItem> 
                        <EuiFlexItem>
                            <EuiFlexGroup>
                                <EuiText style={{width:'100px'}} size='s' color='subdued'>Loại Khóa</EuiText>
                                <EuiText size='s'>Khóa kéo</EuiText>
                            </EuiFlexGroup>
                        </EuiFlexItem> 
                        <EuiFlexItem>
                            <EuiFlexGroup>
                                <EuiText style={{width:'100px'}} size='s' color='subdued'>Xuất xứ</EuiText>
                                <EuiText size='s'>Trung Quốc</EuiText>
                            </EuiFlexGroup>
                        </EuiFlexItem> 
                        <EuiFlexItem>
                            <EuiFlexGroup>
                                <EuiText style={{width:'100px'}} size='s' color='subdued'>Gửi từ</EuiText>
                                <EuiText size='s'>Nước ngoài</EuiText>
                            </EuiFlexGroup>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiText style={{background:'rgba(0,0,0,.02)', padding:10}}>MÔ TẢ SẢN PHẨM</EuiText>
                    <EuiFlexGroup direction='column' gutterSize='s'>
                        <EuiText>
                            <span>{product?.description}</span>
                        </EuiText>
                        <EuiImage src={product?.image}/>
                    </EuiFlexGroup>
                </EuiFlexGroup>
            </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
            <EuiPanel>
                <EuiFlexGroup direction='column'>
                    <EuiText>ĐÁNH GIÁ SẢN PHẨM</EuiText>
                    <EuiFlexGroup style={{background:'rgba(208,1,27,.08)',padding:'10px'}}>
                        <EuiFlexItem grow={false}>
                            <EuiText color='danger'><h4>{product?.rating} trên 5</h4></EuiText>
                            <StarRatings 
                                rating={rating} 
                                starRatedColor="#ffd700" 
                                numberOfStars={5} 
                                starDimension="15px"
                                starSpacing='0'/>
                        </EuiFlexItem>
                        <EuiFlexItem >
                                <EuiFlexGroup responsive={false} alignItems='center' wrap={true}>
                                    <EuiFlexItem grow={false} style={{border:selectRating===''?'2px solid red':'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}} onClick={()=>setSelectRating('')}><EuiText>Tất cả</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:selectRating===5?'2px solid red':'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}} onClick={()=>setSelectRating(5)}><EuiText>5 sao</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:selectRating===4?'2px solid red':'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}} onClick={()=>setSelectRating(4)}><EuiText>4 sao</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:selectRating===3?'2px solid red':'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}} onClick={()=>setSelectRating(3)}><EuiText>3 sao</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:selectRating===2?'2px solid red':'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}} onClick={()=>setSelectRating(2)}><EuiText>2 sao</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:selectRating===1?'2px solid red':'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}} onClick={()=>setSelectRating(1)}><EuiText>1 sao</EuiText></EuiFlexItem>
                                <EuiButton onClick={()=>setIsModalComment(true)} fill iconType="documentEdit">Đánh giá</EuiButton>
                            </EuiFlexGroup>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    {comments?(<EuiFlexGroup direction='column'>
                        {itemOfPage?.map(item=>(<EuiFlexItem style={{borderBlockEnd:'1px solid'}}>
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
                </EuiFlexGroup>
            </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
            <EuiFlexGroup direction='column'>
                <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                    <EuiText color='subdued'><h3>Các sản phẩm khác của Shop</h3></EuiText>
                    <EuiLink color='danger'  href={`/shop?id=${shop?.shop._id}`}>Xem tất cả <EuiIcon type="arrowRight" size='s'/></EuiLink>
                </EuiFlexGroup>
                <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
                {productByShop?.slice(0,11).map(product=>(
                    <ProductItem key={product._id} product={product}/>
                  ))}
              </EuiFlexGrid>
            </EuiFlexGroup>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
            <EuiFlexGroup direction='column'>
                <EuiText color='subdued'><h3>Có thể bạn cũng thích</h3></EuiText>
                <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
                {listProduct.map(product=>(
                    <ProductItem key={product._id} product={product}/>
                  ))}
                </EuiFlexGrid>
                <EuiFlexGroup justifyContent='center'>
                    <EuiButton fill>Xem thêm</EuiButton>
                </EuiFlexGroup>
            </EuiFlexGroup>
        </EuiPageTemplate.Section>
        {isModalComment && 
        <EuiModal style={{width:'600px'}} onClose={()=>setIsModalComment(false)}>
            <EuiModalHeader>
                <EuiModalHeaderTitle>Viết đánh giá</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
                <EuiFlexGroup direction='column'>
                    <EuiFlexItem>
                        <EuiFlexGroup alignItems='center'>
                            <EuiText>Chất lượng sản phẩm</EuiText>
                            <StarRatings 
                                    rating={rating} 
                                    starRatedColor="#ffd700" 
                                    numberOfStars={5} 
                                    starDimension="25px"
                                    starSpacing='0'
                                    starHoverColor='#ffd700'
                                    changeRating={changeRating}/>
                            <EuiText>{rating===5 ? 'Tuyệt vời' : rating ===4 ? 'Hài lòng' : rating ===3 ? 'Bình thường' : rating ===2 ? 'Không hài lòng' :'Tệ'}</EuiText>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFormRow label="Để lại đánh giá" fullWidth>
                            <EuiTextArea placeholder='Viết gì đó ...' onChange={(e)=>setCommentText(e.target.value)} fullWidth/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>
            <EuiModalFooter>
                <EuiFlexGroup justifyContent='flexEnd'>
                    <EuiButtonEmpty onClick={()=>setIsModalComment(false)} >Hủy</EuiButtonEmpty>
                    <EuiButton fill onClick={handleComment}>Gửi</EuiButton>
                </EuiFlexGroup>
            </EuiModalFooter>
        </EuiModal>}
        {modalReport&&<Report setModalReport={setModalReport} shopId={shop?.shop._id} productId={productId}/>}
    </>
  )
}
