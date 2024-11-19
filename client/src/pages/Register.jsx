import React, { useEffect, useState } from 'react'
import { EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFieldPassword, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiLink, EuiPageTemplate, EuiText } from "@elastic/eui"
import axios from '../axios'
import { validator } from '../Validator';



export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        reEnterPassword:''
      });
      const [errors, setErrors] = useState({
        name: '',
        email: '',
        password:'',
        reEnterPassword:''
      });
      const handleChange = (field) => (e) => {
        setFormData({
          ...formData,
          [field]: e.target.value,
        });
      };
    
    const handleRegister=async()=>{
          const {errors} =validator(formData)
          setErrors(errors);
          if(Object.keys(errors).length===0){
            try {
                await axios.post('/register',formData)
                alert("success")
            } catch (err) {
                console.log(err)
            }
          }
    }

  return (
    <EuiPageTemplate style={{backgroundImage:'url("/assets/bg.png")',width:'100vw',height:'100vh',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <EuiFlexGroup alignItems='center' justifyContent='center' style={{width:'100%',height:'100%'}}>
            <EuiFlexItem grow={false}>
                <EuiFlexGroup direction='column' gutterSize='s'>
                    <EuiText textAlign='center' color='black'><h3>Đăng ký tài khoản mới</h3></EuiText>
                    <EuiFormRow label="Email" fullWidth isInvalid={!!errors.email} error={errors.email}>
                        <EuiFieldText placeholder='info@gmail.com' onChange={handleChange('email')} fullWidth isInvalid={!!errors.email}/>
                    </EuiFormRow>
                    <EuiFormRow label="Tên đăng nhập" fullWidth isInvalid={!!errors.name} error={errors.name}>
                        <EuiFieldText placeholder='Tên đăng nhập' onChange={handleChange('name')} fullWidth isInvalid={!!errors.name}/>
                    </EuiFormRow>
                    <EuiFormRow label="Mật khẩu" fullWidth isInvalid={!!errors.password} error={errors.password}>
                        <EuiFieldPassword type='dual' placeholder='Mật khẩu' onChange={handleChange('password')} fullWidth isInvalid={!!errors.password}/>
                    </EuiFormRow>
                    <EuiFormRow label="Nhập lại mật khẩu" fullWidth isInvalid={!!errors.reEnterPassword} error={errors.reEnterPassword}>
                        <EuiFieldPassword type='dual' placeholder='Nhập lại mật khẩu' onChange={handleChange('reEnterPassword')} fullWidth isInvalid={!!errors.reEnterPassword}/>
                    </EuiFormRow>
                    <EuiButton fill onClick={handleRegister}>Đăng ký</EuiButton>
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
