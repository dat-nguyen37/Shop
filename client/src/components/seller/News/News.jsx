import React, { useContext, useEffect, useRef, useState } from 'react';
import { EuiBasicTable, EuiButton, EuiButtonIcon, EuiFlexGroup, EuiPanel, EuiSpacer, EuiText, EuiTextBlockTruncate, EuiTextTruncate } from '@elastic/eui';
import AddNew from './AddNew';
import axios from '../../../axios';
import {ShopContext} from '../../../context/ShopContext'


export default function News() {
    const {shop}=useContext(ShopContext)
    const [isModalAddNewVisible, setIsModalAddNewVisible] = useState(false);
    const [items, setItems] = useState([])

    const columns = [
        {
            field: 'title',
            name: 'Tiêu đề',
            width:"200px"
        },
        {
            field: 'content',
            name: 'Nội dung',
            render:(item)=>(
                <EuiTextBlockTruncate lines={2}>{item}</EuiTextBlockTruncate>
            )
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
                {title:item.title,content:item.content,action:item._id}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getNews()
    },[shop])
    

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
            items={items}
            />
            {isModalAddNewVisible&&<AddNew setIsModalAddNewVisible={setIsModalAddNewVisible}/>}
        </EuiPanel>
    );
}
