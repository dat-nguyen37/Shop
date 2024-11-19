import { EuiAvatar, EuiButton, EuiFieldText, EuiFilePicker, EuiFlexGroup, EuiFlexItem, EuiFormControlLayout, EuiFormRow, EuiHorizontalRule, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import React from 'react'

export default function Acount() {
  return (
    <>
        <EuiText>Hồ sơ của tôi</EuiText>
        <EuiText size='xs'>Quản lý thông tin hồ sơ để bảo mật tài khoản</EuiText>
        <EuiHorizontalRule margin='s'/>
        <EuiFlexGroup>
            <EuiFlexGroup direction='column'>
                <EuiFlexGroup alignItems='center' gutterSize='none'>
                    <EuiText style={{width:'120px'}}>Tên đăng nhập</EuiText>
                    <EuiFieldText/>
                </EuiFlexGroup>
                <EuiFlexGroup alignItems='center' gutterSize='none'>
                    <EuiText style={{width:'120px'}}>Tên</EuiText>
                    <EuiFieldText/>
                </EuiFlexGroup>
                <EuiFlexGroup alignItems='center' gutterSize='none'>
                    <EuiText style={{width:'120px'}}>Email</EuiText>
                    <EuiFieldText/>
                </EuiFlexGroup>
                <EuiFlexGroup alignItems='center' gutterSize='none'>
                    <EuiText style={{width:'120px'}}>Số điện thoại</EuiText>
                    <EuiFieldText/>
                </EuiFlexGroup>
            </EuiFlexGroup>
            <EuiFlexGroup direction='column' alignItems='center'>
                <EuiAvatar name='DN' size='xl'/>
                <EuiFilePicker isLoading/>
            </EuiFlexGroup>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiFlexGroup>
            <EuiButton fill>Lưu</EuiButton>
        </EuiFlexGroup>
    </>
  )
}
