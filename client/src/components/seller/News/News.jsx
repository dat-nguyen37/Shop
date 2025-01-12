import React, { useContext, useEffect, useRef, useState } from 'react';
import { EuiBasicTable, EuiButton, EuiButtonIcon, EuiFlexGroup, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui';
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
        },
        {
            field: 'content',
            name: 'Nội dung',
        },
        {
            field: 'action',
            name: 'Hành động',
            render: () => (
                <EuiFlexGroup>
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
            columns={columns}
            items={items}
            />
            {isModalAddNewVisible&&<AddNew setIsModalAddNewVisible={setIsModalAddNewVisible}/>}
        </EuiPanel>
    );
}
