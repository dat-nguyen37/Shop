import { EuiButton, EuiButtonIcon, EuiColorPicker, EuiComboBox, EuiFieldNumber, EuiFieldText, EuiFilePicker, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiIcon, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPopover, EuiPopoverTitle, EuiSelect, EuiSpacer, EuiTextArea } from '@elastic/eui'
import React, { useContext, useRef, useState } from 'react'
import {Colors} from '../../../Color'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { imgDb } from '../../../firebase'
import { ToastContainer,toast } from 'react-toastify'
import axios from '../../../axios'
import {ShopContext} from '../../../context/ShopContext'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function AddProduct({setModalAdd,getProduct}) {
    const {shop}=useContext(ShopContext)
    const [popoverSize,setPopoverSize]=useState(false)
    const [name,setName]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [image,setImage]=useState([])
    const [price,setPrice]=useState()
    const [description,setDescription]=useState('')
    const [quantity,setQuantity]=useState(1)
    const [color,setColor]=useState([])
    const [size,setSize]=useState([])
    const [nameSize,setNameSize]=useState('')
    const [sizePrice,setSizePrice]=useState()
    const [errors,setErrors]=useState({})
    const [percent,setPercent]=useState(0)

    const reactQuillRef = useRef(null);
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
                    setPercent(percent)
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

    const handleAdd=async()=>{
        try {
            await axios.post('/product/create',{
                shopId:shop._id,
                categoryId:categoryId,
                name:name,
                price:price,
                image:image,
                quantity:quantity,
                description:description,
                color:color?.map(c=>c.label),
                size:size?.map(s=>(
                    {
                        name:s.label,
                        price:s?.price
                    }
                ))
            })
            getProduct()
            setModalAdd(false)
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
    <EuiModal style={{width:'600px'}} onClose={()=>setModalAdd(false)}>
        <ToastContainer/>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Thêm mới</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <EuiFlexGroup>
            <EuiFlexItem>
                <EuiFormRow label="Tên sản phẩm" fullWidth isInvalid={!!errors.name} error={errors.name}>
                    <EuiFieldText placeholder='Tên sản phẩm' onChange={(e)=>setName(e.target.value)} fullWidth isInvalid={!!errors.name}/>
                </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFormRow label="Giá" fullWidth isInvalid={!!errors.price} error={errors.price}>
                    <EuiFieldNumber placeholder='Giá' min={1} onChange={(e)=>setPrice(e.target.value)} fullWidth isInvalid={!!errors.price} />
                </EuiFormRow>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFormRow label="Danh mục" fullWidth isInvalid={!!errors.categoryId} error={errors.categoryId}>
            <EuiSelect
                onChange={(e)=>setCategoryId(e.target.value)}
                options={[
                    { text: "Chọn danh mục", value: "" },
                    ...shop.subcategories?.map(s=>({
                    text:s.name,
                    value:s._id
                }))]} fullWidth isInvalid={!!errors.categoryId}/>          
        </EuiFormRow>
        <EuiSpacer/>
        <EuiFlexGroup>
            <EuiFlexItem>
                <EuiFormRow label="Số lượng" fullWidth isInvalid={!!errors.quantity} error={errors.quantity}>
                    <EuiFieldNumber placeholder='Số lượng' min={1} onChange={(e)=>setQuantity(e.target.value)} fullWidth isInvalid={!!errors.quantity}/>
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
        <EuiFormRow label="Mô tả" fullWidth>
            <ReactQuill
                ref={reactQuillRef}
                theme="snow"
                placeholder="Start writing..."
                modules={{
                    toolbar: {
                    container: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["code-block"],
                        ["clean"],
                    ],
                    },
                    clipboard: {
                    matchVisual: false,
                    },
                }}
                formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                    "code-block",
                ]}
                value={description}
                onChange={setDescription}
            />
        </EuiFormRow>
        <EuiSpacer/>
        <EuiFormRow label="Ảnh" fullWidth isInvalid={!!errors.image} error={errors.image} >
            <EuiFilePicker onChange={changeFile} multiple fullWidth isInvalid={!!errors.image} isLoading={percent<100}/>
        </EuiFormRow>
        <EuiModalFooter>
            <EuiFlexGroup alignItems='center' justifyContent='flexEnd'>
                <EuiButton onClick={()=>setModalAdd(false)}>Hủy</EuiButton>
                <EuiButton iconType="plusInCircle" fill onClick={handleAdd}>Lưu</EuiButton>
            </EuiFlexGroup>
        </EuiModalFooter>
      </EuiModalBody>
    </EuiModal>
  )
}
