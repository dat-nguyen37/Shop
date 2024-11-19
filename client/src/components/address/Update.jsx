import { EuiButton, EuiButtonEmpty, EuiFieldText, EuiFlexGroup, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiRadio, EuiSpacer } from '@elastic/eui'
import React from 'react'

export default function Update({setModalUpdate}) {
  return (
    <EuiModal style={{width:'300px'}} onClose={()=>setModalUpdate(false)}>
        <EuiModalHeader>
            <EuiModalHeaderTitle>Cập nhật địa chỉ</EuiModalHeaderTitle>
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
            <EuiButtonEmpty onClick={()=>setModalUpdate(false)}>Hủy</EuiButtonEmpty>
            <EuiButton fill>Hoàn thành</EuiButton>
        </EuiModalFooter>
    </EuiModal>
  )
}
