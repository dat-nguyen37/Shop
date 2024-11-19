import { EuiBasicTable, EuiBottomBar, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiCheckbox, EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiPageTemplate, EuiPanel, EuiPopover, EuiPopoverFooter, EuiSpacer, EuiText, useIsWithinBreakpoints } from '@elastic/eui'
import React, { useState } from 'react'
import ProductItem from '../components/productItem/ProductItem'

export default function Cart() {
    const [isPopoverCategory,setIsPopoverCategory]=useState(false)
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
                <EuiFlexGroup direction='column' gutterSize='none'>
                    <EuiPopover
                    panelStyle={{outline:'none',width:'300px'}}
                    isOpen={isPopoverCategory}
                    closePopover={()=>setIsPopoverCategory(false)}
                    button={
                            <EuiFlexGroup onClick={()=>setIsPopoverCategory(!isPopoverCategory)} alignItems='center' gutterSize='s'>
                                <EuiText>Phân loại hàng</EuiText>
                                <EuiIcon type="arrowDown" size='s'/>
                            </EuiFlexGroup>
                    }>
                        <EuiFlexGroup>
                            <EuiFlexItem>
                                <EuiFlexGroup gutterSize='s'>
                                    <EuiText>Màu sắc:</EuiText>
                                    <EuiFlexGroup wrap gutterSize='s'>
                                        <EuiText textAlign='center' style={{width:'60px',border:'2px solid'}}>Trắng</EuiText>
                                        <EuiText textAlign='center' style={{width:'60px',border:'2px solid'}}>Đen</EuiText>
                                        <EuiText textAlign='center' style={{width:'60px',border:'2px solid'}}   >Xám</EuiText>                
                                    </EuiFlexGroup>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                        <EuiPopoverFooter>
                            <EuiFlexGroup justifyContent='flexEnd'>
                                <EuiButtonEmpty onClick={()=>setIsPopoverCategory(false)}>Trở lại</EuiButtonEmpty>
                                <EuiButton fill>Xác nhận</EuiButton>
                            </EuiFlexGroup>
                        </EuiPopoverFooter>
                    </EuiPopover>
                    <EuiText size='s'>{item}</EuiText>
                </EuiFlexGroup>
            )
        },
        {field:'price',name:'Đơn giá',width:'120px'},
        {
            field:'quantity',
            name:'Số lượng',
            render:(item)=>(
                <EuiFormControlLayout style={{width:'100px'}}>
                    <EuiFieldText
                    style={{textAlign:'center'}}
                    value={item}
                    prepend={
                        <EuiIcon type="minus" size='m'/>
                    }
                    append={
                        <EuiIcon type="plus" size='m'/>
                    }
                    />
                </EuiFormControlLayout>
            ),
            width:'140px'
        },
        {field:'totalAmount',name:'Số tiền',width:'120px'},
        {
            field:'action',
            name:'Thao tác',
            render:()=>(
                <EuiIcon type="trash" color='red'/>
            ),
            width:'100px'
        },
    ]
    const items=[
        {id:'1',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
        {id:'2',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
        {id:'3',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
        {id:'4',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
        {id:'5',image:'/assets/brand.png',name:'Áo khoác gió',category:'Trắng',price:20000000,quantity:1,totalAmount:20000000},
    ]

    const [selectedItems, setSelectedItems] = useState([]);
    const onSelectionChange = (selectedItems) => {
        setSelectedItems(selectedItems);
    };

    const selection= {
        selectable:(item)=>item.name!=="",
        selectableMessage:(selectable)=>
            !selectable ? 'Không thể chọn' : undefined,
        onSelectionChange,
    }
  return (
    <>
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
                <EuiFlexGroup>
                    <EuiBasicTable
                    columns={columns}
                    items={items}
                    itemId="id"
                    selection={selection}/>
                </EuiFlexGroup>
            </EuiPanel>
            <EuiPanel hasShadow={false} style={{position: 'sticky',bottom: 0,background: 'white',zIndex: 10}}>
                        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                            <EuiFlexItem grow={false}>
                                <EuiCheckbox label="Chọn tất cả (2)"/>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup alignItems='center'>
                                    <EuiText>Tổng thanh toán (1 sản phẩm):</EuiText>
                                    <EuiText color='red'>₫ 20000000</EuiText>
                                    <EuiButton fill color='primary' href='/payment'>Mua hàng</EuiButton>
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
