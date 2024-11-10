import { EuiButtonIcon, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiImage, EuiListGroup, EuiListGroupItem, EuiPageTemplate, EuiText } from '@elastic/eui'
import React from 'react'

export default function Footer() {
  return (
        <EuiFlexGrid columns={4}>
        <EuiFlexItem>
            <EuiFlexGroup direction='column' alignItems='center'>
                <EuiText><b>TẢI ỨNG DỤNG</b></EuiText>
                <EuiFlexGroup responsive={false}>
                    <EuiFlexItem>
                        <EuiImage src="/assets/group-qr.webp" size="s"/>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFlexGroup direction='column'>
                            <EuiImage src="/assets/android.svg"/>
                            <EuiImage src="/assets/ios.svg"/>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFlexGroup direction='column' gutterSize='s' alignItems='center'>
                <EuiText><b>HỖ TRỢ KHÁCH HÀNG</b></EuiText>
                <EuiListGroup flush gutterSize='none'>
                    <EuiListGroupItem label="Trung tâm trợ giúp"/>
                    <EuiListGroupItem label="An toàn mua bán"/>
                    <EuiListGroupItem label="Liên hệ hỗ trợ"/>
                </EuiListGroup>
            </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFlexGroup gutterSize='s' direction='column' alignItems='center'>
                <EuiText><b>VỀ CHÚNG TÔI</b></EuiText>
                <EuiListGroup flush gutterSize='none'>
                    <EuiListGroupItem label="Giới thiệu"/>
                    <EuiListGroupItem label="Quy chế hoạt động sàn"/>
                    <EuiListGroupItem label="Chính sách bảo mật"/>
                    <EuiListGroupItem label="Giải quyết tranh chấp"/>
                    <EuiListGroupItem label="Tuyển dụng"/>
                    <EuiListGroupItem label="Truyền thông"/>
                    <EuiListGroupItem label="Blog"/>
                </EuiListGroup>
            </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFlexGroup direction='column' alignItems='center' gutterSize='m'>
                <EuiFlexItem grow={false}>
                    <EuiText><b>LIÊN KẾT</b></EuiText>
                    <EuiFlexGroup justifyContent='flexStart'>
                        <EuiButtonIcon iconType="/assets/facebook.png" iconSize='l'/>
                        <EuiButtonIcon iconType="/assets/google.png" iconSize='l'/>
                        <EuiButtonIcon iconType="/assets/youtube.svg" iconSize='l'/>
                    </EuiFlexGroup>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiText><b>Chứng nhận</b></EuiText>
                    <EuiImage src='/assets/certificate.webp'/>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiFlexItem>
    </EuiFlexGrid>
  )
}
