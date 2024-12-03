import { EuiBasicTable, EuiBottomBar, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiCheckbox, EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiFormRow, EuiHeader, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPageTemplate, EuiPanel, EuiPopover, EuiPopoverFooter, EuiRadioGroup, EuiSpacer, EuiText, EuiTextArea, EuiTextBlockTruncate, EuiTextTruncate, useIsWithinBreakpoints } from '@elastic/eui'
import React, { useEffect, useState } from 'react'
import ModalVoucher from '../components/voucher/ModalVoucher'
import { useLocation } from "react-router-dom";
import axios from '../axios'
import Update from '../components/address/Update';

export default function Payment() {
    const mobile=useIsWithinBreakpoints(['xs','s'])
    const tablet=useIsWithinBreakpoints(['m','l'])
    const [modalUpdate,setModalUpdate]=useState(false)
    const [modalShip,setModalShip]=useState(false)
    const [addressSelected,setAddressSelected]=useState(null)
    
    const [isModalAddress,setIsModalAddress]=useState(false)
    const [isModalVoucher,setIsModalVoucher]=useState(false)

    //address
    const [selectedAddress, setSelectedAddress] = useState('');
    const [address,setAddress]=useState('')

    const [addressOptions,setAddressOptions]=useState([])
    const handleUpdateAddress=(option)=>{
        setAddressSelected(option)
        setModalUpdate(true)
    }
    const findAddress=async()=>{
            try {
                const res=await axios.get('/user/getAddressOne/'+selectedAddress)
                setAddress(res.data)
            } catch (err) {
                console.log(err)
            }
    }
    const handleAddress=()=>{
        if(selectedAddress){
            findAddress()
            setIsModalAddress(false)
        }

    }
    const getAddress=async()=>{
        try {
            const res=await axios.get('/user/getAddress')
            setAddressOptions(res.data)
            const activeAddress = res.data.find(dc => dc.status === true);
            if (activeAddress) {
                setAddress(activeAddress);
                setSelectedAddress(activeAddress._id);
            }
        } catch (err) {
            console.log(err)
        }
    }
        const onAddressChange = (id) => {
        setSelectedAddress(id);
      };

      useEffect(()=>{
        getAddress()
      },[])


    const [paymentMethod, setPaymentMethod] = useState('COD');
    const onChange = (optionId) => {
        setPaymentMethod(optionId);
    };
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
                <EuiLink color='text' href={`/chi_tiet_san_pham?masp=${item?.id}`}><EuiTextBlockTruncate lines={2}>{item?.name}</EuiTextBlockTruncate></EuiLink>
            )
        },
        {
            field:'category',
            name:'',
            render:(item)=>(
                <EuiText size='s'>Loại:&nbsp;{item?.color},{item?.size}</EuiText>
            ),
            width:'200px'
        },
        {field:'price',name:'Đơn giá',width:'120px',
            render:(item)=>(
                <span>{item?.toLocaleString()}</span>
            )
        },
        {
            field:'quantity',
            name:'Số lượng',
            width:'120px'
        },
        {field:'totalAmount',name:'Thành tiền',width:'120px',
            render:(item)=>(
                <span>{item?.toLocaleString()}</span>
            )
        },

    ]
    //ship
    const [ships,setShips]=useState([])
    const [selectedShip,setSelectedShip]=useState('')
    const getShips=async()=>{
        try {
            const res=await axios.get('/ship/getAll')
            const result=res.data
            if(result){
                setShips(result)
                setSelectedShip(result[0])
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getShips()
    },[])

    //order
    const [items,setItems]=useState([])
    const [price,setprice]=useState(0)
    const location = useLocation();
    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const selectedItems = JSON.parse(decodeURIComponent(queryParams.get("items")));
        setItems(selectedItems.map(cart=>(
            {id:cart.cartId,cart:cart,image:cart?.product?.image,name:cart.product,category:cart,price:cart.price,quantity:cart.quantity,totalAmount:cart.totalAmount,action:cart}
        )))
        if(selectedItems){
            setprice(selectedItems.reduce((sum,item)=>{
                return sum+item.totalAmount
            },0))
        }
    },[])
  return (
    <>
        <EuiPageTemplate.Header
            paddingSize='s'
            style={{background:'white'}}
            pageTitle={
                <EuiText color='red'><h3>Thanh toán</h3></EuiText>
            }
        />
        <EuiPageTemplate.Section color='transparent'>
            <EuiFlexGroup direction='column'>
                <EuiPanel hasShadow={false}>
                    <EuiFlexGroup alignItems='center' gutterSize='s'>
                        <EuiIcon type='visMapCoordinate' color='red' size='l'/>
                        <EuiText color='danger'>Địa chỉ nhận hàng</EuiText>
                    </EuiFlexGroup>
                    <EuiSpacer/>
                    <EuiFlexGroup alignItems='center'>
                        <EuiText><strong>{address.name} + {address.phone}</strong></EuiText>
                        <EuiText>{address.addressDetail} {address.address}</EuiText>
                        <EuiLink onClick={()=>setIsModalAddress(true)}>Thay đổi</EuiLink>
                    </EuiFlexGroup>
                </EuiPanel>
                <EuiPanel hasShadow={false}>
                    <EuiFlexGroup direction='column'>
                        <EuiBasicTable
                        tableLayout='auto'
                        columns={columns}
                        items={items}/>
                        <EuiFlexGroup>
                            <EuiFlexItem>
                                <EuiFlexGroup direction='column'>
                                    <EuiFormRow label="Lời nhắn:" fullWidth>
                                        <EuiTextArea rows={2} placeholder='Lưu ý cho người bán...' fullWidth/>
                                    </EuiFormRow>
                                    <EuiFlexItem grow={false}>
                                        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                                            <EuiText>Phương thức vận chuyển: &nbsp;{selectedShip.name}</EuiText>
                                            <EuiLink onClick={()=>setModalShip(true)}>Thay đổi</EuiLink>
                                            <EuiText>₫{(selectedShip.price)?.toLocaleString()}</EuiText>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                    <EuiFlexItem>
                                        <EuiFlexGroup direction='column'>
                                            <EuiText>Phương thức thanh toán:</EuiText>
                                            <EuiRadioGroup
                                                idSelected={paymentMethod}
                                                onChange={(id) => onChange(id)}
                                                options={[
                                                    {id:'COD',label:'Thanh toán tiền mặt khi giao hàng (COD)'},
                                                    {id:'VNpay',label:'Thanh toán online qua cổng VNPay (ATM/Visa/MasterCard/JCB/QR Pay trên Internet Banking)'},
                                                ]}/>
                                        </EuiFlexGroup>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <hr/>
                            <EuiFlexItem>
                                <EuiFlexGroup direction='column' gutterSize='none'>
                                    <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='xl' responsive={false}>
                                        <EuiFlexItem grow={false}>
                                            <EuiFlexGroup alignItems='center' gutterSize='s'>
                                                <EuiIcon type="/assets/coupon.png" size='l'/>
                                                <EuiText size='s'>Voucher</EuiText>
                                            </EuiFlexGroup>
                                        </EuiFlexItem>
                                        <EuiFlexItem grow={false}>
                                            <EuiLink onClick={()=>setIsModalVoucher(true)}>Chọn hoặc nhập mã</EuiLink>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                    <EuiHorizontalRule margin='xs'/>
                                    <EuiFlexGroup direction='column' alignItems='flexEnd'>
                                        <EuiFlexGroup justifyContent='spaceBetween'>
                                            <EuiText>Tổng tiền hàng</EuiText>
                                            <EuiText color='red'>{price?.toLocaleString()}đ</EuiText>
                                        </EuiFlexGroup>
                                       <EuiFlexGroup>
                                            <EuiText>Tổng chi phí vận chuyển</EuiText>
                                            <EuiText color='red'>{(selectedShip.price)?.toLocaleString()}đ</EuiText>
                                        </EuiFlexGroup>
                                        <EuiFlexGroup>
                                            <EuiText>Khuyến mãi</EuiText>
                                            <EuiText color='red'>- 0đ</EuiText>
                                        </EuiFlexGroup>
                                        <EuiFlexGroup>
                                            <EuiText>Tổng thanh toán</EuiText>
                                            <EuiText color='red'>20016000đ</EuiText>
                                        </EuiFlexGroup>
                                    </EuiFlexGroup>
                                    <EuiHorizontalRule margin='xs'/>
                                    <EuiFlexGroup justifyContent='flexEnd'>
                                        <EuiButton fill color='primary'>Đặt hàng</EuiButton>
                                    </EuiFlexGroup>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlexGroup>
                </EuiPanel>
            </EuiFlexGroup>
        </EuiPageTemplate.Section>
        {isModalAddress &&
            <EuiModal onClose={()=>setIsModalAddress(false)}>
                <EuiModalHeader>
                    <EuiModalHeaderTitle size='s'>Địa Chỉ Của Tôi</EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiHorizontalRule margin='none'/>
                <EuiModalBody>
                    <EuiFlexGroup>
                        <EuiFlexGroup>
                            <EuiRadioGroup
                            options={addressOptions.map(option=>({
                                id:option._id,
                                label:(
                                    <EuiFlexGroup style={{marginBottom:'10px'}} alignItems='flexStart'>
                                        <EuiFlexGroup direction='column' gutterSize='s'>
                                            <EuiFlexGroup gutterSize='s'>
                                                <EuiText>{option.name}</EuiText>
                                                <hr/>
                                                <EuiText>{option.phone}</EuiText>
                                            </EuiFlexGroup>
                                            <EuiText size='s'>{option.address}</EuiText>
                                            <EuiText size='s'>{option.addressDetail}</EuiText>
                                            {option.status&&<EuiText color='red'>Mặc định</EuiText>}
                                        </EuiFlexGroup>
                                        <EuiLink onClick={()=>handleUpdateAddress(option)}>Cập nhật</EuiLink>
                                    </EuiFlexGroup>
                                )
                            }))}
                            idSelected={selectedAddress}
                            onChange={(id) => onAddressChange(id)}/>
                        </EuiFlexGroup>
                    </EuiFlexGroup>
                </EuiModalBody>
                <EuiHorizontalRule margin='none'/>
                <EuiModalFooter>
                    <EuiFlexGroup justifyContent='flexEnd'>
                        <EuiButtonEmpty onClick={()=>setIsModalAddress(false)}>Hủy</EuiButtonEmpty>
                        <EuiButton fill onClick={handleAddress}>Xác nhận</EuiButton>
                    </EuiFlexGroup>
                </EuiModalFooter>
            </EuiModal>}
        {isModalVoucher&&<ModalVoucher setIsModalVoucher={setIsModalVoucher}/>}
        {modalUpdate&&<Update setModalUpdate={setModalUpdate} getAddress={getAddress} item={addressSelected}/>}
        {modalShip&&<EuiModal style={{width:'500px'}} onClose={()=>setModalShip(false)}>
            <EuiModalBody>
                <EuiText><h3>Chọn phương thức vận chuyển</h3></EuiText>
                <EuiSpacer size='s'/>
                <EuiText color="subdued">PHƯƠNG THỨC VẬN CHUYỂN ĐÃ ĐƯỢC LIÊN KẾT</EuiText>
                <EuiSpacer size='s'/>
                <EuiListGroup flush>
                    {ships.map(ship=>(<EuiListGroupItem style={{width:'450px',background:'#fafafa'}} label={
                        <EuiFlexGroup direction='column' gutterSize='s'>
                            <EuiText>{ship.name} ₫{(ship.price)?.toLocaleString()}</EuiText>
                            <EuiText size='xs'>Đảm bảo nhận hàng từ {new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "long" })} - 
                            {new Date(new Date().setDate(new Date().getDate() + 3)).toLocaleDateString("vi-VN", { day: "2-digit", month: "long" })}</EuiText>
                        </EuiFlexGroup>
                    }
                    onClick={()=>setSelectedShip(ship)}
                    extraAction={{
                        color: 'text',
                        onClick: ()=>setSelectedShip(ship),
                        iconType: selectedShip.name===ship.name?'check':'',
                        iconSize: 'l',
                        'aria-label': ship.name,
                        alwaysShow: selectedShip.name===ship.name,
                    }}/>))}
                </EuiListGroup>
            </EuiModalBody>
        </EuiModal>}
        </>
  )
}
