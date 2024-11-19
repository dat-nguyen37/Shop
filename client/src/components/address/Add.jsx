import { EuiButton, EuiButtonEmpty, EuiFieldText, EuiFlexGroup, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiRadio, EuiSpacer } from '@elastic/eui'
import React from 'react'

export default function Add({setModalAdd}) {
  return (
    <EuiModal style={{width:'300px'}} onClose={()=>setModalAdd(false)}>
        <EuiModalHeader>
            <EuiModalHeaderTitle>Địa chỉ mới</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
            <EuiFlexGroup>
                <EuiFieldText placeholder='Họ và tên' fullWidth/>
                <EuiFieldText placeholder='Số điện thoại' fullWidth/>
            </EuiFlexGroup>
            <EuiSpacer/>
            <EuiFieldText placeholder='Tỉnh/thành phố, Quận/Huyện, Phường/Xã' fullWidth/>
            <EuiSpacer/>
            <EuiFieldText placeholder='Địa chỉ cụ thể' fullWidth/>
            <EuiSpacer/>
            <EuiRadio label="Đặt làm địa chỉ mặc định"/>
        </EuiModalBody>
        <EuiModalFooter>
            <EuiButtonEmpty onClick={()=>setModalAdd(false)}>Hủy</EuiButtonEmpty>
            <EuiButton fill>Hoàn thành</EuiButton>
        </EuiModalFooter>
    </EuiModal>
  )
}
