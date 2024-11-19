import { EuiButton, EuiFlexGroup, EuiHorizontalRule, EuiSpacer, EuiText } from '@elastic/eui'
import React from 'react'

export default function Setting() {
  return (
    <>
        <EuiText><h3>Cài đặt</h3></EuiText>
        <EuiHorizontalRule/>
        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
            <EuiText>Yêu cầu xóa tài khoản</EuiText>
            <EuiButton fill color='danger'>Xóa bỏ</EuiButton>
        </EuiFlexGroup>
    </>
  )
}
