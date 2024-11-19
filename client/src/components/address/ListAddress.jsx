import { EuiButton, EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiLink, EuiPanel, EuiText } from '@elastic/eui'
import React, { useState } from 'react'
import Add from './Add'
import Update from './Update'

export default function ListAddress() {
    const [modalAdd,setModalAdd]=useState(false)
    const [modalUpdate,setModalUpdate]=useState(false)


  return (
    <>
      <EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
        <EuiText>Địa chỉ của tôi</EuiText>
        <EuiButton iconType="plus" fill onClick={()=>setModalAdd(true)}>Thêm địa chỉ mới</EuiButton>
      </EuiFlexGroup>
      <EuiHorizontalRule margin='s'/>
      <EuiFlexGroup direction='column'>
        <EuiText>Địa chỉ</EuiText>
        {[1,2,3,4].map(item=>(<EuiFlexItem>
            <EuiFlexGroup justifyContent='spaceBetween'>
                <EuiFlexGroup direction='column' gutterSize='s'>
                    <EuiFlexGroup gutterSize='s'>
                        <EuiText>nguyễn tuấn đạt</EuiText>
                        <hr/>
                        <EuiText>(+84) 966 544 325</EuiText>
                    </EuiFlexGroup>
                    <EuiText size='s' color='subdued'>Ngõ 51 Tương Mai</EuiText>
                    <EuiText size='s' color='subdued'>Phường Tương Mai, Quận Hoàng Mai, Hà Nội</EuiText>
                    <EuiText color='red' textAlign='center' style={{border:'1px solid',width:'80px'}}>Mặc định</EuiText>
                </EuiFlexGroup>
                <EuiFlexItem grow={false}>
                    <EuiFlexGroup direction='column' gutterSize='s'>
                        <EuiLink onClick={()=>setModalUpdate(true)}>Cập nhật</EuiLink>
                        <EuiLink>Xóa</EuiLink>
                        <EuiLink>Thiết lập mặc định</EuiLink>
                    </EuiFlexGroup>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiHorizontalRule margin='s'/>
        </EuiFlexItem>))}
      </EuiFlexGroup>
      {modalAdd&&<Add setModalAdd={setModalAdd}/>}
      {modalUpdate&&<Update setModalUpdate={setModalUpdate}/>}
    </>
  )
}
