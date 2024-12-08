import { EuiButton, EuiFieldNumber, EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiModal, EuiModalBody, EuiModalHeader, EuiModalHeaderTitle, EuiSelect, EuiSelectable, EuiText } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios'
import { ShopContext } from '../../../context/ShopContext'

export default function ModalProduct({setModalProduct,setListOrder}) {
    const [listProduct,setListProduct]=useState([])
    const {shop}=useContext(ShopContext)
    const [productId,setProductId]=useState('')
    const [productName,setProductName]=useState('')
    const [size,setSize]=useState('')
    const [color,setColor]=useState('')
    const [quantity,setQuantity]=useState(1)
    const [price,setPrice]=useState(0)
    const [image,setImage]=useState('')


    const selectedProduct=listProduct.find(p=>p.checked==='on')
    const onChangeSize=(name,price)=>{
        setSize(name)
        if(price){
            setPrice(price)
        }
    }

    useEffect(()=>{
        if(selectedProduct){
            setPrice(selectedProduct.price)
            setProductId(selectedProduct.id)
            setImage(selectedProduct.image)
            setProductName(selectedProduct.label)
        }
    },[selectedProduct])

    const handleOrder=()=>{
        setListOrder(prev=>[
            ...prev,{id:productId,productName:productName,image:image,shopId:shop._id,size:size,color:color,quantity:quantity,price:price*quantity}
        ])
    }

    const getAllProduct=async()=>{
        try {
          const res=await axios.get(`/product/getProductByShop/${shop._id}`)
          setListProduct(res.data.map(product=>(
            {id:product._id,image:product.image,label:product.name,size:product.size,color:product.color,price:product.price}
          ))) 
        } catch (err) {
          console.log(err)
        }
      }
      useEffect(()=>{
        getAllProduct()
      },[shop])
  return (
    <EuiModal onClose={()=>setModalProduct(false)}>
        <EuiModalHeader>
            <EuiFlexGrid columns={2} col gutterSize='s'>
                    <EuiFlexItem>
                        <EuiFormRow label="Mã sp">
                            <EuiFieldText value={productId} onChange={(e)=>setProductId(e.target.value)}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFormRow label="Số lượng">
                            <EuiFieldNumber defaultValue={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                    {selectedProduct?.size.length&&<EuiFlexItem>
                        <EuiFormRow label="Size">
                            <EuiSelect
                            options={[
                                { text: "Chọn kích thước", value: "" },
                                ...selectedProduct?.size.map(s=>({
                                text:s.name,
                                value:JSON.stringify({ value: s.name, price: s.price })
                            }))]}
                            onChange={(e) => {
                                const selectedOption = JSON.parse(e.target.value);
                                onChangeSize(selectedOption.value, selectedOption.price);
                            }}/>
                        </EuiFormRow>
                    </EuiFlexItem>}
                    {selectedProduct?.color.length&&<EuiFlexItem>
                        <EuiFormRow label="Color">
                        <EuiSelect
                            options={[
                                { text: "Chọn màu sắc", value: "" },
                                ...selectedProduct?.color.map(s => ({
                                    text: s,
                                    value: s
                                }))
                            ]}
                            onChange={(e)=>setColor(e.target.value)}/>
                        </EuiFormRow>
                    </EuiFlexItem>}
                    <EuiFlexItem>
                        <EuiFormRow label="Giá">
                            <EuiFieldNumber value={price}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiButton fill onClick={handleOrder}>Xác nhận</EuiButton>
            </EuiFlexGrid>
        </EuiModalHeader>
        <EuiModalBody>
            <EuiSelectable
            options={listProduct}
            onChange={newOptions => setListProduct(newOptions)}
            singleSelection
            searchable
            searchProps={{placeholder:"Chọn sản phẩm"}}>
                {(list,search) =>(
                    <>
                    {search}
                    {list}
                    </>
                )}
            </EuiSelectable>
        </EuiModalBody>
    </EuiModal>
  )
}
