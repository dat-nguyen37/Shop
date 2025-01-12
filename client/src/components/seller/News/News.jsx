import React, { useContext, useEffect, useRef, useState } from 'react';
import { EuiBasicTable, EuiButton, EuiButtonIcon, EuiFlexGroup, EuiImage, EuiPanel, EuiSpacer, EuiText, EuiTextBlockTruncate, EuiTextTruncate } from '@elastic/eui';
import AddNew from './AddNew';
import axios from '../../../axios';
import {ShopContext} from '../../../context/ShopContext'


export default function News() {
    const {shop}=useContext(ShopContext)
    const [isModalAddNewVisible, setIsModalAddNewVisible] = useState(false);
    const [items, setItems] = useState([])

    const columns = [
        {
            field: 'image',
            name: 'Ảnh',
            render:(item)=>(
                <EuiImage src={item} width="50" height="50" />
            )
        },
        {
            field: 'title',
            name: 'Tiêu đề',
        },
        {
            field: 'action',
            name: 'Hành động',
            render: () => (
                <EuiFlexGroup responsive={false} gutterSize='s'>
                    <EuiButtonIcon iconType="indexEdit"/>
                    <EuiButtonIcon iconType="trash" color='danger'/>
                </EuiFlexGroup>
            )
        },
    ]
    const getNews=async()=>{
        try {
            const res=await axios.get(`/new/getByUser/${shop._id}`)
            setItems(res.data?.map(item=>(
                {image:item.image,title:item.title,action:item._id}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getNews()
    },[shop])
    const [pageIndex,setPageIndex]=useState(0)
    const [pageSize,setPageSize]=useState(10)

    const onChange=({page})=>{
        if(page){
            const {index:pageIndex,size:pageSize}=page
            setPageIndex(pageIndex)
            setPageSize(pageSize)
        }
    }
    const itemOfPage=(items,pageIndex,pageSize)=>{
        
        let itemOfPages;
        if(!pageIndex && !pageSize){
            itemOfPages=items
        }else{
            itemOfPages=items.slice(pageIndex*pageSize,(pageIndex+1)*pageSize)
        }
        return {itemOfPages}
    }
    const {itemOfPages}=itemOfPage(items,pageIndex,pageSize)

    const paginations={
        pageIndex,
        pageSize,
        totalItemCount:items.length,
        pageSizeOptions:[0,10,20]
    }
    

    return (
        <EuiPanel style={{height:'calc(100vh - 3rem'}}>
            <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                <EuiText><h3>Danh sách bài viết</h3></EuiText>
                <EuiButton onClick={()=>setIsModalAddNewVisible(true)} fill>Thêm bài viết</EuiButton>
            </EuiFlexGroup>
            <EuiSpacer/>
            <EuiBasicTable
            tableLayout='auto'
            columns={columns}
            items={itemOfPages}
            pagination={paginations}
            onChange={onChange}
            />
            {isModalAddNewVisible&&<AddNew setIsModalAddNewVisible={setIsModalAddNewVisible}/>}
        </EuiPanel>
    );
}
