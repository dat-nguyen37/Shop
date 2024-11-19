import { EuiAvatar, EuiBreadcrumbs, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiCard, EuiFieldNumber, EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiFormRow, EuiIcon, EuiImage, EuiLink, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPageSection, EuiPageTemplate, EuiPagination, EuiPanel, EuiPopover, EuiPopoverFooter, EuiPopoverTitle, EuiSelectable, EuiSpacer, EuiText, EuiTextArea, EuiTitle, useIsWithinBreakpoints } from '@elastic/eui'
import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings';
import Footer from '../components/footer/Footer'

export default function ProductDetail() {
    const mobile=useIsWithinBreakpoints(['xs','s'])
    const tablet=useIsWithinBreakpoints(['m','l'])
    const [rating, setRating] = useState(5);
    const [popoverReport,setPopoverReport]=useState(false)
    const [optionReport, setOptionReport]=useState([
        {label:'Sản phẩm bị cấm buôn bán'},
        {label:'Sản phẩm có dấu hiệu lừa đảo'},
        {label:'Hàng giả, hàng nhái'},
        {label:'Sản phẩm không rõ nguồn gốc xuất xứ'},
        {label:'Hình ảnh sản phẩm không rõ ràng'},
        {label:'Sản phẩm có dấu hiệu tăng đơn ảo'},
    ])

    const openPopoverReport=()=>setPopoverReport(!popoverReport)
    const closePopoverReport=()=>setPopoverReport(false)

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const [isModalComment,setIsModalComment]=useState(false)
  const openModalComment=()=>setIsModalComment(true)
  const closeModalComment=()=>setIsModalComment(false)

  const [activePage,setActivePage]=useState(0)
  const [pageCount,setPageCount]=useState(1)
  const [pageSize,setPageSize]=useState(5)
  const comments=[
    {name:'Dat Nguyen',rating:5,date:'2023-11-28 15:05',des:'Hàng nhẹ nhàng, siêu rẻ. Mua thử. Đi được nhưng k biết được mấy lần. Giá rẻ nhưng k mong gì hơn.'},
    {name:'Dat Nguyen',rating:5,date:'2023-11-28 15:05',des:'Hàng nhẹ nhàng, siêu rẻ. Mua thử. Đi được nhưng k biết được mấy lần. Giá rẻ nhưng k mong gì hơn.'},
    {name:'Dat Nguyen',rating:5,date:'2023-11-28 15:05',des:'Hàng nhẹ nhàng, siêu rẻ. Mua thử. Đi được nhưng k biết được mấy lần. Giá rẻ nhưng k mong gì hơn.'},
    {name:'Dat Nguyen',rating:5,date:'2023-11-28 15:05',des:'Hàng nhẹ nhàng, siêu rẻ. Mua thử. Đi được nhưng k biết được mấy lần. Giá rẻ nhưng k mong gì hơn.'},
    {name:'Dat Nguyen',rating:5,date:'2023-11-28 15:05',des:'Hàng nhẹ nhàng, siêu rẻ. Mua thử. Đi được nhưng k biết được mấy lần. Giá rẻ nhưng k mong gì hơn.'},
    {name:'Dat Nguyen',rating:5,date:'2023-11-28 15:05',des:'Hàng nhẹ nhàng, siêu rẻ. Mua thử. Đi được nhưng k biết được mấy lần. Giá rẻ nhưng k mong gì hơn.'},
    {name:'Dat Nguyen',rating:5,date:'2023-11-28 15:05',des:'Hàng nhẹ nhàng, siêu rẻ. Mua thử. Đi được nhưng k biết được mấy lần. Giá rẻ nhưng k mong gì hơn.'},
    {name:'Dat Nguyen',rating:5,date:'2023-11-28 15:05',des:'Hàng nhẹ nhàng, siêu rẻ. Mua thử. Đi được nhưng k biết được mấy lần. Giá rẻ nhưng k mong gì hơn.'},
    {name:'Dat Nguyen',rating:5,date:'2023-11-28 15:05',des:'Hàng nhẹ nhàng, siêu rẻ. Mua thử. Đi được nhưng k biết được mấy lần. Giá rẻ nhưng k mong gì hơn.'},
  ]

  useEffect(() => {
    const totalPageCount = Math.ceil(comments.length / pageSize);
    setPageCount(totalPageCount);
  }, [comments, pageSize]);
  
  const itemOfPage = comments.slice(activePage * pageSize, (activePage + 1) * pageSize);

  

  return (
    <>
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
        <EuiPageTemplate.Section color='transparent' style={{marginBlock:'-30px'}}>
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
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup justifyContent='spaceBetween'>
                                    <EuiFlexItem >
                                        <EuiFlexGroup gutterSize='s' alignItems='center'>
                                            <EuiText>Chia sẻ:</EuiText>
                                            <EuiButtonIcon iconType="/assets/facebook.png" iconSize='l'/>
                                            <EuiButtonIcon iconType="/assets/youtube.svg" iconSize='l'/>
                                            <EuiButtonIcon iconType="/assets/google.png" iconSize='l'/>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                    <EuiFlexItem >
                                        <EuiButtonEmpty iconType="/assets/heart.png" color=''>Đã thích (100)</EuiButtonEmpty>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem grow={2}>
                        <EuiFlexGroup direction='column' gutterSize='m'>
                            <EuiText><h3>Dây Sạc Tự Ngắt - Dây Cáp Sạc Dữ Liệu Sạc Nhanh 100W Micro USB Type C 3 Trong 1 6A</h3></EuiText>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup gutterSize='s'>
                                    <EuiFlexGroup alignItems='center' responsive={false}>
                                        <EuiFlexItem grow={false}>
                                            <EuiFlexGroup alignItems='center' gutterSize='s'>
                                                <StarRatings 
                                                    rating={rating} 
                                                    starRatedColor="#ffd700" 
                                                    numberOfStars={5} 
                                                    starDimension="15px"
                                                    starSpacing='0'/>
                                                <EuiText>{rating}</EuiText>
                                            </EuiFlexGroup>
                                        </EuiFlexItem>
                                        <EuiText>3,1k Đánh giá</EuiText>
                                        <EuiText>13,5k Đã bán</EuiText>
                                    </EuiFlexGroup>
                                    <EuiPopover
                                    isOpen={popoverReport}
                                    closePopover={closePopoverReport}
                                    panelStyle={{outline:'none'}}
                                    anchorPosition='leftUp'
                                    button={<EuiButtonEmpty onClick={openPopoverReport}>Tố cáo</EuiButtonEmpty>}>
                                        <EuiPopoverTitle paddingSize='s'>
                                            <EuiText>Chọn lý do</EuiText>
                                        </EuiPopoverTitle>
                                            <EuiSelectable
                                                options={optionReport}
                                                singleSelection
                                                onChange={(newOptions) => setOptionReport(newOptions)}
                                                listProps={{ bordered: true }}
                                                style={{width:'300px',height:'200px'}}>
                                                {list => list}
                                            </EuiSelectable>
                                        <EuiPopoverFooter paddingSize='s'>
                                            <EuiFlexGroup justifyContent='flexEnd'>
                                                <EuiButton fill>Gửi tố cáo</EuiButton>
                                            </EuiFlexGroup>
                                        </EuiPopoverFooter>
                                    </EuiPopover>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false} style={{background:'rgba(208,1,27,.08)',padding:'10px'}}>
                                <EuiFlexGroup>
                                    <EuiText color='danger'><h3>₫200.000</h3></EuiText>
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
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup alignItems='center'>
                                    <EuiText>Màu sắc</EuiText>
                                    <EuiFlexGroup gutterSize='s' responsive={false}>
                                        <EuiFlexItem grow={false} style={{border:'2px solid',textAlign:'center',minWidth:'50px'}}><EuiText>Trắng</EuiText></EuiFlexItem>
                                        <EuiFlexItem grow={false} style={{border:'2px solid',textAlign:'center',minWidth:'50px'}}><EuiText>Đen</EuiText></EuiFlexItem>
                                        <EuiFlexItem grow={false} style={{border:'2px solid',textAlign:'center',minWidth:'50px'}}><EuiText>Xanh</EuiText></EuiFlexItem>  
                                        <EuiFlexItem grow={false} style={{border:'2px solid',textAlign:'center',minWidth:'50px'}}><EuiText>Xám</EuiText></EuiFlexItem>
                                    </EuiFlexGroup>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup alignItems='center'>
                                    <EuiText>Kích thước</EuiText>
                                    <EuiFlexGroup gutterSize='s' responsive={false}>
                                        <EuiFlexItem grow={false} style={{border:'2px solid',textAlign:'center',width:'50px'}}><EuiText>39</EuiText></EuiFlexItem>
                                        <EuiFlexItem grow={false} style={{border:'2px solid',textAlign:'center',width:'50px'}}><EuiText>40</EuiText></EuiFlexItem>
                                        <EuiFlexItem grow={false} style={{border:'2px solid',textAlign:'center',width:'50px'}}><EuiText>41</EuiText></EuiFlexItem>  
                                        <EuiFlexItem grow={false} style={{border:'2px solid',textAlign:'center',width:'50px'}}><EuiText>42</EuiText></EuiFlexItem>
                                    </EuiFlexGroup>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup alignItems='center'>
                                    <EuiText>Số lượng</EuiText>
                                    <EuiFormControlLayout style={{width:'100px'}}>
                                        <EuiFieldText
                                        style={{textAlign:'center'}}
                                        value="1"
                                        prepend={
                                            <EuiIcon type="minus" size='m'/>
                                        }
                                        append={
                                            <EuiIcon type="plus" size='m'/>
                                        }
                                        />
                                    </EuiFormControlLayout>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <EuiFlexGroup>
                                    <EuiButton color='primary' fill>Thêm vào giỏ hàng</EuiButton>
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
                        <EuiAvatar name='S' imageUrl='/assets/brand.png' size='xl'/>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiFlexGroup direction='column' gutterSize='s'>
                            <EuiText>BOUTIAUE</EuiText>
                            <EuiText size='s'>Online 1 giờ trước</EuiText>
                            <EuiFlexGroup>
                                <EuiButton iconType="discuss">Chat Ngay</EuiButton>
                                <EuiButton iconType="/assets/shop.png" href='/shop28382'>Xem Shop</EuiButton>
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
                                            <EuiText size='s' color='danger'>58,3k</EuiText>
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
                                            <EuiText size='s' color='danger'>23 tháng trước</EuiText>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <EuiFlexGroup>
                                    <EuiFlexItem grow={1}>
                                        <EuiFlexGroup justifyContent='spaceBetween'>
                                            <EuiText size='s' color='subdued'>Sản phẩm</EuiText>
                                            <EuiText size='s' color='danger'>497</EuiText>
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
                                            <EuiText size='s' color='danger'>30,5k</EuiText>
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
                                    <EuiText size='s' color='blue'>Giày Dép Nam</EuiText>
                                    <EuiIcon type="arrowRight" size='s'/>
                                    <EuiText size='s' color='blue'>Giày Thể Thao/ Sneakers</EuiText>
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
                            <span>Chất lượng sản phẩm được đảm bảo và sẽ được kiểm tra trước khi xuất xưởng.</span>
                            <span>Chúng tôi có kinh nghiệm phong phú và sản phẩm chất lượng cao, tập trung vào chất lượng và giá thấp!mang lại cho bạn trải nghiệm mua sắm tốt nhất!</span>
                            <span>Tham khảo ý kiến cửa hàng cho bất kỳ câu hỏi.</span>
                            <span>Sản phẩm đến từ Trung Quốc và phải mất một thời gian để vận chuyển.</span>
                            <span>Nếu bạn thích sản phẩm của chúng tôi Vui lòng thêm giỏ hàng Cảm ơn rất nhiều.</span>
                            <span> Luôn cập nhật những tin tức mới nhất trong cửa hàng của chúng tôi. Chúng tôi sẽ gửi cho bạn phiếu giảm giá và giảm giá sản phẩm.</span>
                        </EuiText>
                        <EuiImage src='/assets/brand.png'/>
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
                            <EuiText color='danger'><h4>{rating} trên 5</h4></EuiText>
                            <StarRatings 
                                rating={rating} 
                                starRatedColor="#ffd700" 
                                numberOfStars={5} 
                                starDimension="15px"
                                starSpacing='0'/>
                        </EuiFlexItem>
                        <EuiFlexItem >
                                <EuiFlexGroup responsive={false} alignItems='center' wrap={true}>
                                    <EuiFlexItem grow={false} style={{border:'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}}><EuiText>Tất cả</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}}><EuiText>5 sao (6,7k)</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}}><EuiText>4 sao (900)</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}}><EuiText>3 sao (200)</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}}><EuiText>2 sao (100)</EuiText></EuiFlexItem>
                                    <EuiFlexItem grow={false} style={{border:'2px solid #B6C4CB',width:'90px',height:'30px',textAlign:'center'}}><EuiText>1 sao (100)</EuiText></EuiFlexItem>
                                <EuiButton onClick={openModalComment} fill iconType="documentEdit">Đánh giá</EuiButton>
                            </EuiFlexGroup>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiFlexGroup direction='column'>
                        {itemOfPage.map(item=>(<EuiFlexItem style={{borderBlockEnd:'1px solid'}}>
                            <EuiFlexGroup gutterSize='s' responsive={false}>
                                <EuiAvatar name='D' imageUrl=''/>
                                <EuiFlexItem>
                                        <p>{item.name}</p>
                                        <StarRatings 
                                            rating={item.rating} 
                                            starRatedColor="#ffd700" 
                                            numberOfStars={5} 
                                            starDimension="15px"
                                            starSpacing='0'/>
                                        <EuiText size='xs' color='subdued'>{item.date}</EuiText>
                                        <EuiSpacer size='s'/>
                                        <EuiText>{item.des}</EuiText>
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
                    </EuiFlexGroup>
                </EuiFlexGroup>
            </EuiPanel>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
            <EuiFlexGroup direction='column'>
                <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                    <EuiText color='subdued'><h3>Các sản phẩm khác của Shop</h3></EuiText>
                    <EuiLink color='danger'>Xem tất cả <EuiIcon type="arrowRight" size='s'/></EuiLink>
                </EuiFlexGroup>
                <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
                {[1,2,3,4,5,6].map(item=>(
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
            </EuiFlexGroup>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
            <EuiFlexGroup direction='column'>
                <EuiText color='subdued'><h3>Có thể bạn cũng thích</h3></EuiText>
                <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
                {[1,2,3,4,5,6].map(item=>(
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
                <EuiFlexGroup justifyContent='center'>
                    <EuiButton fill>Xem thêm</EuiButton>
                </EuiFlexGroup>
            </EuiFlexGroup>
        </EuiPageTemplate.Section>
        {isModalComment && 
        <EuiModal style={{width:'600px'}} onClose={closeModalComment}>
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
                            <EuiTextArea placeholder='Viết gì đó ...' fullWidth/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiModalBody>
            <EuiModalFooter>
                <EuiFlexGroup justifyContent='flexEnd'>
                    <EuiButtonEmpty onClick={closeModalComment} >Hủy</EuiButtonEmpty>
                    <EuiButton fill>Gửi</EuiButton>
                </EuiFlexGroup>
            </EuiModalFooter>
        </EuiModal>}
    </>
  )
}
