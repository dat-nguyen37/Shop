import React from 'react'
import { EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFieldPassword, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiLink, EuiPageTemplate, EuiText } from "@elastic/eui"

export default function Register() {
  return (
    <EuiPageTemplate style={{backgroundImage:'url("/assets/bg.png")',width:'100vw',height:'100vh',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <EuiFlexGroup alignItems='center' justifyContent='center' style={{width:'100%',height:'100%'}}>
            <EuiFlexItem grow={false}>
                <EuiFlexGroup direction='column' gutterSize='s'>
                    <EuiText textAlign='center' color='black'><h3>Đăng ký tài khoản mới</h3></EuiText>
                    <EuiFormRow label="Email" fullWidth>
                        <EuiFieldText placeholder='info@gmail.com' fullWidth/>
                    </EuiFormRow>
                    <EuiFormRow label="Tên đăng nhập" fullWidth>
                        <EuiFieldText placeholder='Tên đăng nhập' fullWidth/>
                    </EuiFormRow>
                    <EuiFormRow label="Mật khẩu" fullWidth>
                        <EuiFieldPassword type='dual' placeholder='Mật khẩu' fullWidth/>
                    </EuiFormRow>
                    <EuiFormRow label="Nhập lại mật khẩu" fullWidth>
                        <EuiFieldPassword type='dual' placeholder='Nhập lại mật khẩu' fullWidth/>
                    </EuiFormRow>
                    <EuiButton fill>Đăng ký</EuiButton>
                    <EuiFlexGroup justifyContent='center' responsive={false}>
                        <EuiFlexItem>
                            <EuiButton fill iconType="/assets/facebook.png">Facebook</EuiButton>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiButton fill iconType="/assets/google.png">Google</EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiText textAlign='center' color='black'>Đã có tài khoản? <EuiLink href='/dang_nhap'>Đăng nhập</EuiLink></EuiText>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate>
  )
}
