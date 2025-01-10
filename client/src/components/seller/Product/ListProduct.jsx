import {formatDate,Comparators, EuiBasicTable, EuiButton, EuiButtonIcon, EuiFlexGroup, EuiImage, EuiPanel, EuiSpacer, EuiText, EuiFieldSearch } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import AddProduct from './AddProduct'
import axios from '../../../axios'
import EditProduct from './EditProduct'
import {ShopContext} from '../../../context/ShopContext'
import {toast,ToastContainer} from 'react-toastify'


export default function ListProduct() {
    const {shop}=useContext(ShopContext)

    const [modalAdd,setModalAdd]=useState(false)
    const [modalUpdate,setModalUpdate]=useState(false)
    const [data,setData]=useState([])
    const [selectedItem,setSelectedItem]=useState(null)

    const handleUpdate=(item)=>{
        setSelectedItem(item)
        setModalUpdate(true)
    }
    const handleDelete=async(id)=>{
        try {
            await axios.delete('/product/delete/'+id)
            toast.success('Xóa thành công')
            getProduct()
        } catch (err) {
            console.log(err)
            toast.error('Lỗi server!!')
        }
    }
    const columns=[
        {field:'image',name:'Ảnh',
            render:(item)=>(
                <EuiImage src={item} size='50px'/>
            )
        },
        {field:'name',name:'Tên',width:'300px',sortable: true,},
        {field:'price',name:'Giá'},
        {field:'quantity',name:'Số lượng'},
        {field:'rating',name:'Đánh giá'},
        {field:'status',name:'Trạng thái',
            render:(item)=>(
                <EuiText>{item}</EuiText>
            )
        },
        {field:'action',name:'Hành động',
            render:(item)=>(
                <EuiFlexGroup gutterSize='s'>
                    <EuiButtonIcon iconType="eye" href={`/nguoi_ban/san_pham?masp=${item._id}`} color='success'/>
                    {item.status!=="cấm bán"&&<EuiButtonIcon iconType="documentEdit" color='primary' onClick={()=>handleUpdate(item)}/>}
                    <EuiButtonIcon iconType="trash" color='danger' onClick={()=>handleDelete(item._id)}/>
                </EuiFlexGroup>
            )
        },
    ]
    const [searchValue,setSearchValue]=useState("")
    const getProduct=async()=>{
        try {
            const res=await axios.get(`/product/productByElasticSearch?shopId=${shop._id}&search=${searchValue}`)
            console.log(res.data)
            setData(res.data?.map(item=>(
                {image:item.image,name:item.name,price:item.price,quantity:item.quantity,rating:item.rating,status:item.status,action:item}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getProduct()
    },[shop,searchValue])
    const [pageIndex,setPageIndex]=useState(0)
    const [pageSize,setPageSize]=useState(10)
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    const onChange=({page,sort})=>{
        if(page){
            const {index:pageIndex,size:pageSize}=page
            setPageIndex(pageIndex)
            setPageSize(pageSize)
        }
        if (sort) {
            const { field: sortField, direction: sortDirection } = sort;
            setSortField(sortField);
            setSortDirection(sortDirection);
          }
    }
    const itemOfPage=(data,pageIndex,pageSize,sortField,sortDirection)=>{
        let items;
        if (sortField) {
            items = data
                .slice(0)
                .sort(
                Comparators.property(sortField, Comparators.default(sortDirection))
                );
            } else {
            items = data;
        }
        let itemOfPages;
        if(!pageIndex && !pageSize){
            itemOfPages=items
        }else{
            itemOfPages=items.slice(pageIndex*pageSize,(pageIndex+1)*pageSize)
        }
        return {itemOfPages}
    }
    const {itemOfPages}=itemOfPage(data,pageIndex,pageSize,sortField,sortDirection)

    const paginations={
        pageIndex,
        pageSize,
        totalItemCount:data.length,
        pageSizeOptions:[0,10,20]
    }
    const sorting = {
        sort: {
          field: sortField,
          direction: sortDirection,
        },
      };
  return (
    <EuiPanel style={{minHeight:'calc(100vh - 3rem)'}}>
        <ToastContainer/>
        {modalAdd&&<AddProduct setModalAdd={setModalAdd} getProduct={getProduct}/>}
        {modalUpdate&&<EditProduct setModalUpdate={setModalUpdate} getProduct={getProduct} selectedItem={selectedItem}/>}
        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
            <EuiText>Danh sách sản phẩm</EuiText>
            <EuiButton iconType="plusInCircle" fill onClick={()=>setModalAdd(true)}>Thêm mới</EuiButton>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFieldSearch placeholder='Tìm kiếm theo tên sản phẩm' onChange={e=>setSearchValue(e.target.value)} fullWidth/>
        <EuiSpacer/>
        <EuiBasicTable
        tableLayout='auto'
        columns={columns}
        items={itemOfPages}
        pagination={paginations}
        onChange={onChange}
        sorting={sorting}/>
    </EuiPanel>
  )
}
