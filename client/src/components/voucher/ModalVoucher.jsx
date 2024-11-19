import { EuiButton, EuiButtonEmpty, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiImage, EuiLink, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiRadio, EuiSpacer, EuiText } from '@elastic/eui'
import React from 'react'

export default function ModalVoucher({setIsModalVoucher}) {
  return (
    <EuiModal style={{width:'500px'}} onClose={()=>setIsModalVoucher(false)}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Chọn Voucher</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiHorizontalRule margin='0'/>
      <EuiModalBody>
        <EuiFlexGroup alignItems='center' responsive={false} style={{background:'#B6C4CB',padding:'10px 5px'}}>
            <EuiFlexItem grow={false}>
                <EuiText>Mã voucher</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFieldText placeholder='Mã voucher'/>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
                <EuiButton>Áp dụng</EuiButton>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFlexGroup direction='column'>
            <EuiFlexItem>
                <EuiFlexGroup responsive={false} style={{border:'1px solid #B6C4CB'}}>
                    <EuiFlexItem grow={false}>
                        <EuiFlexGroup justifyContent='center' alignItems='center' style={{background:'#00bfa5',width:'100px',height:'100px'}}>
                            <EuiImage src='https://theme.hstatic.net/200000796751/1001266995/14/home_coupon_1_img.png?v=38' size='70px'/>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFlexGroup direction='column' justifyContent='center' gutterSize='s'>
                            <EuiText><b>Khuyến mãi tết</b></EuiText>
                            <EuiText>Giảm 15 % khi thanh toán</EuiText>
                            <EuiText color='subdued'>HSD: 1/1/2025</EuiText>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false} style={{display:'flex',justifyContent:'center',padding:'10px'}}>
                        <EuiRadio/>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
      </EuiModalBody>
      <EuiHorizontalRule margin='0'/>
      <EuiModalFooter>
        <EuiFlexGroup justifyContent='flexEnd'>
            <EuiButtonEmpty onClick={()=>setIsModalVoucher(false)}>Trở lại</EuiButtonEmpty>
            <EuiButton fill>Ok</EuiButton>
        </EuiFlexGroup>
      </EuiModalFooter>
    </EuiModal>
  )
}
