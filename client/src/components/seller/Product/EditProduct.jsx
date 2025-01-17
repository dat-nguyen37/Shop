import { EuiButton, EuiButtonIcon, EuiColorPicker, EuiComboBox, EuiFieldNumber, EuiFieldText, EuiFilePicker, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiIcon, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPopover, EuiPopoverTitle, EuiSelect, EuiSpacer, EuiTextArea } from '@elastic/eui'
import React, { useContext, useState } from 'react'
import {Colors} from '../../../Color'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { imgDb } from '../../../firebase'
import { ToastContainer,toast } from 'react-toastify'
import axios from '../../../axios'
import {ShopContext} from '../../../context/ShopContext'



export default function EditProduct({setModalUpdate,getProduct,selectedItem}) {
    const {shop}=useContext(ShopContext)
    const [popoverSize,setPopoverSize]=useState(false)
    const [name,setName]=useState(selectedItem.name)
    const [image,setImage]=useState(selectedItem.image)
    const [price,setPrice]=useState(selectedItem.price)
    const [description,setDescription]=useState(selectedItem.description)
    const [quantity,setQuantity]=useState(selectedItem.quantity)
    const [color,setColor]=useState(selectedItem.color?.map(c=>({label:c})))
    const [size,setSize]=useState(selectedItem.size?.map(c=>({label:c.name,price:c.price})))
    const [nameSize,setNameSize]=useState('')
    const [sizePrice,setSizePrice]=useState()
    const [categoryId,setCategoryId]=useState(selectedItem.categoryId)
    const [status,setStatus]=useState(selectedItem.status)
    const [errors,setErrors]=useState({})


    const addSize=()=>{
        setSize((prevSizes) => [
            ...prevSizes,
            { label: nameSize, price: sizePrice },
          ]);
          setNameSize('')
          setSizePrice()
    }
    const onChangeSize=(size)=>{
        setSize(size)
    }
    const onChangeColor = (color) => {
        setColor(color);
      };
    const changeFile=async(files)=>{
        const file=Array.from(files)[0]
        try {
            const imgRef=ref(imgDb,`/product/${file.name}`)
            const uploadTask=uploadBytesResumable(imgRef,file)
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const percent=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                },
                (err)=>console.log(err),
                async()=>{
                    const url=await getDownloadURL(uploadTask.snapshot.ref)
                    setImage(url)
                }
            )
        } catch (err) {
            console.log("Error uploading image:",err)
            toast.error('Lỗi server')
        }

    }

    const handleUpdate=async()=>{
        try {
            await axios.patch('/product/update/'+selectedItem._id,{
                shopId:shop._id,
                categoryId:categoryId,
                name:name,
                price:price,
                image:image,
                quantity:quantity,
                description:description,
                color:color.map(c=>c.label),
                size:size.map(s=>(
                    {
                        name:s.label,
                        price:s?.price
                    }
                )),
                status:status
            })
            getProduct()
            setModalUpdate(false)
        } catch (err) {
            if(err.response&&err.response.data.errors){
                setErrors(err.response.data.errors)
            }else{
                console.log(err)
                toast.error('Lỗi server')
            }
        }
    }
  return (
    <EuiModal style={{width:'600px'}} onClose={()=>setModalUpdate(false)}>
        <ToastContainer/>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Cập nhật</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <EuiFlexGroup>
            <EuiFlexItem>
                <EuiFormRow label="Tên sản phẩm" fullWidth isInvalid={!!errors.name} error={errors.name}>
                    <EuiFieldText placeholder='Tên sản phẩm' value={name} onChange={(e)=>setName(e.target.value)} fullWidth isInvalid={!!errors.name}/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Giá" fullWidth isInvalid={!!errors.price} error={errors.price}>
                    <EuiFieldNumber placeholder='Giá' min={1} value={price} onChange={(e)=>setPrice(e.target.value)} fullWidth isInvalid={!!errors.price} />
                </EuiFormRow>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFlexGroup>
            <EuiFlexItem>
                <EuiFormRow label="Số lượng" fullWidth>
                    <EuiFieldNumber placeholder='Số lượng' min={1} value={quantity} onChange={(e)=>setQuantity(e.target.value)} fullWidth/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Màu sắc" fullWidth>
                    <EuiComboBox
                    options={Colors}
                    selectedOptions={color}
                    onChange={onChangeColor} fullWidth/>
                </EuiFormRow>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFlexGroup alignItems='flexEnd' responsive={false}>
            <EuiFlexItem>
                <EuiFormRow label="Kích thước" fullWidth>
                    <EuiComboBox
                        options={size}
                        selectedOptions={size}
                        onChange={onChangeSize}
                        noSuggestions
                        placeholder='Thêm kích thước' fullWidth/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
                <EuiPopover
                isOpen={popoverSize}
                closePopover={()=>setPopoverSize(false)}
                hasArrow={false}
                anchorPosition='upRight'
                button={<EuiButtonIcon iconType="plus" display='fill' size='m' onClick={() => setPopoverSize(true)}/>}
                >
                        <EuiFieldText placeholder='Nhập tên size' onChange={(e)=>setNameSize(e.target.value)}/>
                        <EuiFieldNumber placeholder='Nhập giá' onChange={(e)=>setSizePrice(e.target.value)}/>
                        <EuiButton iconType="plusInCircle" fill onClick={addSize}>Thêm</EuiButton>
                </EuiPopover>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFlexGroup>
            <EuiFlexItem>
                <EuiFormRow label="Danh mục" fullWidth isInvalid={!!errors.categoryId} error={errors.categoryId}>
                    <EuiSelect
                    onChange={(e)=>setCategoryId(e.target.value)}
                    value={categoryId}
                    options={[
                        { text: "Chọn danh mục", value: "" },
                        ...shop.subcategories?.map(s=>({
                        text:s.name,
                        value:s._id
                    }))]} fullWidth isInvalid={!!errors.categoryId}/>          
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Trạng thái" fullWidth>
                    <EuiSelect
                    value={status}
                    options={[
                        {value:"",label:"Chọn trạng thái"},
                        {value:"có sẵn",label:"có sẵn"},
                        {value:"hết hàng",label:"hết hàng"},
                    ]}
                    onChange={e=>setStatus(e.target.value)} fullWidth/>
                </EuiFormRow>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFlexGroup>
            <EuiFlexItem>
                <EuiFormRow label="Mô tả" fullWidth>
                    <EuiTextArea rows={5} placeholder='Viết gì đó...' value={description} onChange={(e)=>setDescription(e.target.value)} fullWidth/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Ảnh" fullWidth isInvalid={!!errors.image} error={errors.image}>
                    <EuiFilePicker onChange={changeFile} multiple fullWidth isInvalid={!!errors.image}/>
                </EuiFormRow>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiModalFooter>
            <EuiFlexGroup alignItems='center' justifyContent='flexEnd'>
                <EuiButton onClick={()=>setModalUpdate(false)}>Hủy</EuiButton>
                <EuiButton iconType="plusInCircle" fill onClick={handleUpdate}>Lưu</EuiButton>
            </EuiFlexGroup>
        </EuiModalFooter>
      </EuiModalBody>
    </EuiModal>
  )
}
