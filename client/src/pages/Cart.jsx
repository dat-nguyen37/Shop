import { EuiBasicTable, EuiBottomBar, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiCheckbox, EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiPageTemplate, EuiPanel, EuiPopover, EuiPopoverFooter, EuiSpacer, EuiText, EuiTextBlockTruncate, EuiTextTruncate, useIsWithinBreakpoints } from '@elastic/eui'
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/productItem/ProductItem'
import axios from '../axios'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const mobile=useIsWithinBreakpoints(['xs','s'])
    const tablet=useIsWithinBreakpoints(['m','l'])

    const columns=[
        {
            field:'image',
            name:'',
            render:(item)=>(
                <EuiImage src={item} size="50px"/>
            ),
            width:'50px'
        },
        {
            field:'name',
            name:'Sản phẩm',
            render:(item)=>(
                <EuiLink color='text' href={`/chi_tiet_san_pham?masp=${item._id}`}><EuiTextBlockTruncate lines={2}>{item.name}</EuiTextBlockTruncate></EuiLink>
            ),
        },
        {
            field:'category',
            name:'',
            width:'200px',
            render:(item)=>{
                return (
                item.product?.color?.length > 0 || item.product?.size?.length > 0 ?
                (<EuiFlexGroup direction='column' gutterSize='none'>
                    <EuiText><b>Phân loại hàng</b></EuiText>
                    <EuiText size='xs'>{item.color}, {item.size}</EuiText>
                </EuiFlexGroup>):('')
            )}
        },
        {field:'price',name:'Đơn giá',width:'120px'},
        {
            field:'quantity',
            name:'Số lượng',
            width:'140px'
        },
        {field:'totalAmount',name:'Số tiền',width:'120px'},
        {
            field:'action',
            name:'Thao tác',
            render:(item)=>(
                <EuiIcon type="trash" color='red' onClick={()=>handleDelete(item.cartId)}/>
            ),
            width:'100px'
        },
    ]

    const [items,setItems]=useState([])

    const handleDelete=async(id)=>{
        try {
            await axios.delete('/cart/delete/'+id)
            getCart()
            toast.success('Xóa thành công')
        } catch (err) {
            console.log(err)
        }
    }
    const getCart=async()=>{
        try {
            const res=await axios.get('/cart/getByUser')
            setItems(res.data?.map(cart=>(
                {id:cart.cartId,cart:cart,image:cart?.product?.image,name:cart.product,category:cart,price:cart.price,quantity:cart.quantity,totalAmount:cart.totalAmount,action:cart}
            )))
            console.log(items)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getCart()
    },[])

    

    const [selectedItems, setSelectedItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const onSelectionChange = (selectedItems) => {
        setSelectedItems(selectedItems);
        setTotalAmount(selectedItems.reduce((sum,item)=>{
            return sum+item.totalAmount
        },0))
    };

    const selection= {
        selectable:(item)=>item.name!=="",
        selectableMessage:(selectable)=>
            !selectable ? 'Không thể chọn' : undefined,
        onSelectionChange,
    }
    const navigate = useNavigate();
    const Payment=()=>{
        if(selectedItems.length>0){
            const filteredItems = selectedItems.map(item => ({
                cartId: item?.cartId,
                product: {
                    id:item?.name._id,
                    image: encodeURIComponent(item?.image), 
                    name: item?.name?.name
                },
                price: item?.price,
                quantity: item?.quantity,
                totalAmount: item?.totalAmount
            }));
            const selectedItemsString = encodeURIComponent(JSON.stringify(filteredItems));
            navigate(`/payment?items=${selectedItemsString}`);
        }else{
            toast.error('Chọn ít nhất 1 sả phẩm để thanh toán')
        }
    }
  return (
    <>
    <ToastContainer/>
        <EuiPageTemplate.Header
            paddingSize='s'
            style={{background:'white'}}
            pageTitle={
                <EuiText color='red'><h3>Giỏ hàng</h3></EuiText>
            }
        />
        <EuiPageTemplate.Section color='transparent'>
            <EuiFlexGroup direction='column'>
            <EuiPanel hasShadow={false}>
                <EuiFlexGroup direction='column'>
                    <EuiBasicTable
                    tableLayout='auto'
                    columns={columns}
                    items={items}
                    itemId='id'
                    selection={selection}
                    />
                </EuiFlexGroup>
            </EuiPanel>
            <EuiPanel hasShadow={false} style={{position: 'sticky',bottom: 0,background: 'white',zIndex: 10}}>
                        <EuiFlexGroup alignItems='center' justifyContent='flexEnd'>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup alignItems='center'>
                                    <EuiText>Tổng thanh toán ({selectedItems.length} sản phẩm):</EuiText>
                                    <EuiText color='red'>₫ {totalAmount.toLocaleString()}</EuiText>
                                    <EuiButton fill color='primary' onClick={Payment}>Mua hàng</EuiButton>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                    </EuiFlexGroup>
            </EuiPanel>
            </EuiFlexGroup>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section color='transparent'>
            <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                <EuiText>Có thể bạn cũng thích</EuiText>
                <EuiLink color='danger'>Xem tất cả <EuiIcon type="arrowRight" size='s'/></EuiLink>
            </EuiFlexGroup>
            <EuiSpacer/>
            <EuiFlexGrid style={{gridTemplateColumns: mobile?'repeat(2,1fr)': tablet?'repeat(4,1fr)':'repeat(6,1fr)'}}>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(item=>(
              <ProductItem/>
              ))}
            </EuiFlexGrid>
        </EuiPageTemplate.Section>
    </>
  )
}
