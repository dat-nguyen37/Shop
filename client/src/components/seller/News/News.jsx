import React, { useRef, useState } from 'react';
import { EuiBasicTable, EuiButton, EuiButtonIcon, EuiFlexGroup, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui';
import AddNew from './AddNew';

export default function News() {
    const [isModalAddNewVisible, setIsModalAddNewVisible] = useState(false);

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
    const items = [
    ]

    return (
        <EuiPanel style={{height:'calc(100vh - 3rem'}}>
            <EuiFlexGroup>
                <EuiText><h3>Danh sách bài viết</h3></EuiText>
                <EuiButton onClick={()=>setIsModalAddNewVisible(true)}>Thêm bài viết</EuiButton>
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
