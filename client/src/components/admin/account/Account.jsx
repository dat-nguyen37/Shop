import React from 'react'
import { EuiBasicTable, EuiText } from '@elastic/eui'

export default function Account() {

    const columns=[
        {field:'avata',name:'Avatar'},
        {field:'name',name:'Tên'},
        {field:'phone',name:'Điện thoại'},
        {field:'email',name:'Email'},
        {field:'status',name:'Trạng thái'},
    ]
    const items=[]
  return (
    <>
        <EuiText><strong>Danh sách người dùng</strong></EuiText>
        <EuiBasicTable
            columns={columns}
            items={items}
        />
    </>
  )
}
