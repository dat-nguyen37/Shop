import React, { useEffect, useState } from 'react'
import { EuiAbsoluteTab, EuiAvatar, EuiBottomBar, EuiButton, EuiButtonIcon, EuiFieldNumber, EuiFieldSearch, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiPageSection, EuiPageTemplate, EuiPanel, EuiPopover, EuiPopoverTitle, EuiRadioGroup, EuiRelativeTab, EuiSpacer, EuiText, EuiTextArea } from '@elastic/eui';
import ModalProduct from './ModalProduct';
import axios from '../../../axios'
import {toast,ToastContainer} from 'react-toastify'

export default function Order({setCurrentTab,user}) {
    const [listOrder,setListOrder]=useState([])
    const [modalProduct,setModalProduct]=useState(false)
    const [name,setName]=useState(user?.name)
    const [phone,setPhone]=useState(user?.phone)
    const [address,setAddress]=useState('')
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState(0)
    const [shipPrice,setShipPrice]=useState(0)
    const [discountPrice,setDiscountPrice]=useState(0)
    const [totalAmount,setTotalAmount]=useState(0)
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const onChange = (optionId) => {
        setPaymentMethod(optionId);
    };

    useEffect(()=>{
        if(listOrder.length){
            const price=listOrder.reduce((sum,item)=>{
                return sum+item.price
            },0)
            setPrice(price)
        }
    },[listOrder])
    useEffect(()=>{
        const total=price+Number(shipPrice)-discountPrice
        setTotalAmount(total)
    },[price,shipPrice,discountPrice])

    const handleOrder=async()=>{
        try {
            await axios.post('/order/create',{
                userId:user.id,
                product:listOrder.map(item=>(
                    {
                        productId:item.id,
                        productName:item.productName,
                        shopId:item.shopId,
                        image:item.image,
                        size:item.size,
                        color:item.color,
                        quantity:item.quantity,
                        price:item.price,
                        confimationStatus:'Đã xác nhận',
                    }
                )),
                price:totalAmount,
                name:name,
                phone:phone,
                address:address,
                description:description
            })
            toast.success('Tạo đơn hàng thành công')
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <EuiFlexItem style={{height:'calc(100vh - 4rem)'}} className="eui-fullHeight eui-yScrollWithShadows">
        <ToastContainer/>
              <EuiPageHeader>
                <EuiPageHeaderSection>
                  <EuiFlexGroup alignItems='center'>
                    <EuiButtonIcon iconType="arrowLeft" display='fill' iconSize='l' size='m' onClick={()=>setCurrentTab('tab1')}/>
                    <EuiText><h3>Tạo đơn hàng</h3></EuiText>
                  </EuiFlexGroup>
                </EuiPageHeaderSection>
              </EuiPageHeader>
              <EuiSpacer size='s'/>
              <EuiPanel grow={false}>
                <EuiText><h4>Tạo địa chỉ giao hàng</h4></EuiText>
                <EuiHorizontalRule/>
                <EuiFlexGroup gutterSize='s'>
                  <EuiFieldText placeholder='Họ và tên' defaultValue={name} onChange={e=>setName(e.target.value)}/>
                  <EuiFieldNumber placeholder='Số điện thoại' defaultValue={phone} onChange={e=>setPhone(e.target.value)}/>
                </EuiFlexGroup>
                <EuiSpacer size='s'/>
                  <EuiFieldText placeholder='Địa chỉ' onChange={e=>setAddress(e.target.value)}/>
              </EuiPanel>
              <EuiSpacer size='s'/>
              <EuiPanel>
                <EuiText><h4>Sản phẩm</h4></EuiText>
                <EuiHorizontalRule margin='s'/>
                {listOrder.length?<EuiFlexGroup direction='column' gutterSize='s'>
                    {listOrder.map(order=>(<EuiFlexItem>
                        <EuiFlexGroup>
                            <EuiLink href={`/chi_tiet_san_pham?masp=${order.id}`}>#{order.id}</EuiLink>
                            <EuiText>SL:{order.quantity}</EuiText>
                        </EuiFlexGroup>
                    </EuiFlexItem>))}
                </EuiFlexGroup>:
                <EuiFlexGroup direction='column' alignItems='center' gutterSize='s'>
                    <EuiImage src="/assets/add-to-cart.png" size='s'/>
                    <EuiText size='xs'>Vui lòng chọn sản phẩm vào đơn hàng!</EuiText>
                    <EuiLink onClick={()=>setModalProduct(true)}>Chọn sản phẩm</EuiLink>
                    </EuiFlexGroup>}
              </EuiPanel>
              <EuiSpacer size='s'/>
              <EuiPanel>
                <EuiText><h4>Thanh Toán</h4></EuiText>
                <EuiHorizontalRule margin='s'/>
                <EuiFlexGroup direction='column' gutterSize='s'>
                    <EuiFlexGroup justifyContent='spaceBetween'>
                        <EuiText>Tổng tiền hàng</EuiText>
                        <EuiText>{price.toLocaleString()}đ</EuiText>
                    </EuiFlexGroup>
                    <EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
                        <EuiText>Phụ thu</EuiText>
                        <EuiFlexItem grow={false}>
                            <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='none'>
                                <EuiFieldNumber style={{width:'100px',height:'30px',outline:'none',border:'none',background:'white'}} defaultValue={shipPrice} onChange={(e)=>setShipPrice(e.target.value)}/>
                                <EuiText>đ</EuiText>
                            </EuiFlexGroup>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
                        <EuiText>Giảm giá</EuiText>
                        <EuiFlexItem grow={false}>
                            <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='none'>
                                <EuiFieldNumber style={{width:'100px',height:'30px',outline:'none',border:'none',background:'white'}} defaultValue={discountPrice} onChange={(e)=>setDiscountPrice(e.target.value)}/>
                                <EuiText>đ</EuiText>
                            </EuiFlexGroup>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiFlexGroup justifyContent='spaceBetween'>
                        <EuiText>Thu khách hàng</EuiText>
                        <EuiText>{totalAmount}đ</EuiText>
                    </EuiFlexGroup>
                </EuiFlexGroup>
              </EuiPanel>
              <EuiSpacer size='s'/>
              <EuiPanel>
                <EuiText><h4>Phương thức thanh toán</h4></EuiText>
                <EuiHorizontalRule margin='s'/>
                <EuiRadioGroup
                    idSelected={paymentMethod}
                    onChange={(id) => onChange(id)}
                    options={[
                        {id:'COD',label:'Thanh toán tiền mặt khi giao hàng (COD)'},
                        {id:'VNpay',label:'Thanh toán online qua cổng VNPay (ATM/Visa/MasterCard/JCB/QR Pay trên Internet Banking)'},
                    ]}/>
              </EuiPanel>
              <EuiSpacer size='s'/>
              <EuiPanel>
                <EuiTextArea placeholder='Ghi chú đơn hàng' rows={3} onChange={(e)=>setDescription(e.target.value)} fullWidth/>
              </EuiPanel>
              <EuiSpacer size='s'/>
              <EuiPanel style={{position:'sticky',bottom:0,zIndex:1000}}>
                <EuiFlexGroup justifyContent='flexEnd'>
                    <EuiButton iconType="checkInCircleFilled" fill onClick={handleOrder}>Tạo đơn hàng</EuiButton>
                </EuiFlexGroup>
              </EuiPanel>
              {modalProduct&&<ModalProduct setModalProduct={setModalProduct} setListOrder={setListOrder}/>}
            </EuiFlexItem>
  )
}
