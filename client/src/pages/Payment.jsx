import { EuiBasicTable, EuiBottomBar, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiCheckbox, EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiFormRow, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPageTemplate, EuiPanel, EuiPopover, EuiPopoverFooter, EuiRadioGroup, EuiSpacer, EuiText, EuiTextArea, useIsWithinBreakpoints } from '@elastic/eui'
import React, { useState } from 'react'
import ModalVoucher from '../components/voucher/ModalVoucher'

export default function Payment() {
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
                <EuiText>{item}</EuiText>
            )
        },
        {
            field:'category',
            name:'',
            render:(item)=>(
                <EuiText size='s'>Loại:&nbsp;{item}</EuiText>
            )
        },
        {field:'price',name:'Đơn giá'},
        {
            field:'quantity',
            name:'Số lượng',
        },
        {field:'totalAmount',name:'Thành tiền'},

    ]
    const items=[
        {id:'1',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
        {id:'2',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
        {id:'3',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
        {id:'4',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
        {id:'5',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
    ]
    const [isModalAddress,setIsModalAddress]=useState(false)
    const [isModalVoucher,setIsModalVoucher]=useState(false)
    const [selectedAddress, setSelectedAddress] = useState('address1');

    const addressOptions=[
        { 
            id: 'address1', 
            name: 'Nguyen Tuan Dat', 
            phone: '(+84) 977 334 343', 
            fullAddress: 'Xã Long Điền Tây, Huyện Đông Hải, Bạc Liêu' 
          },
          { 
            id: 'address2', 
            name: 'Cao Viet Hoang', 
            phone: '(+84) 977 334 343', 
            fullAddress: 'Xã Long Điền Tây, Huyện Đông Hải, Bạc Liêu' 
          },
          { 
            id: 'address3', 
            name: 'Nguyen Huu Chien', 
            phone: '(+84) 977 334 343', 
            fullAddress: 'Xã Long Điền Tây, Huyện Đông Hải, Bạc Liêu' 
          },
    ]
    const onAddressChange = (id) => {
        setSelectedAddress(id);
      };

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const onChange = (optionId) => {
        setPaymentMethod(optionId);
    };
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
                        <EuiText><strong>nguyễn tuấn đạt (+84) 966544325</strong></EuiText>
                        <EuiText>Ngõ 51 Tương Mai, Phường Tương Mai, Quận Hoàng Mai, Hà Nội</EuiText>
                        <EuiLink onClick={()=>setIsModalAddress(true)}>Thay đổi</EuiLink>
                    </EuiFlexGroup>
                </EuiPanel>
                <EuiPanel hasShadow={false}>
                    <EuiFlexGroup direction='column'>
                        <EuiBasicTable
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
                                            <EuiText>Phương thức vận chuyển: &nbsp;Nhanh</EuiText>
                                            <EuiLink>Thay đổi</EuiLink>
                                            <EuiText>₫16.500</EuiText>
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
                                            <EuiText color='red'>20000000đ</EuiText>
                                        </EuiFlexGroup>
                                       <EuiFlexGroup>
                                            <EuiText>Tổng chi phí vận chuyển</EuiText>
                                            <EuiText color='red'>+16000đ</EuiText>
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
                                id:option.id,
                                label:(
                                    <EuiFlexGroup style={{marginBottom:'10px'}} alignItems='flexStart'>
                                        <EuiFlexGroup direction='column' gutterSize='s'>
                                            <EuiFlexGroup gutterSize='s'>
                                                <EuiText>{option.name}</EuiText>
                                                <hr/>
                                                <EuiText>{option.phone}</EuiText>
                                            </EuiFlexGroup>
                                            <EuiText size='s'>{option.fullAddress}</EuiText>
                                            <EuiText color='red'>Mặc định</EuiText>
                                        </EuiFlexGroup>
                                        <EuiLink>Cập nhật</EuiLink>
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
                        <EuiButton fill>Xác nhận</EuiButton>
                    </EuiFlexGroup>
                </EuiModalFooter>
            </EuiModal>}
        {isModalVoucher&&<ModalVoucher setIsModalVoucher={setIsModalVoucher}/>}
    </>
  )
}
