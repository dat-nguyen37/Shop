import React, { useEffect, useState } from 'react'
import { EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFieldPassword, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiLink, EuiPageTemplate, EuiText } from "@elastic/eui"
import axios from '../axios'
import { validator } from '../Validator';
import Swal from "sweetalert2";


export default function Register() {
    const [isLoading,setIsLoading]=useState(false)
    const [formData, setFormData] = useState({
        email: '',
        name: '',
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
            setIsLoading(true)
            try {
                await axios.post('/auth/register',formData)
                setIsLoading(false)
                Swal.fire({
                  icon: 'success',           
                  title: 'Đăng ký thành công!', 
                  text: `Chúng tôi đã gửi email kích hoạt đến ${formData.email} của bạn.Bạn vui lòng truy cập vào hòm thư để kích hoạt.`, 
                  confirmButtonText: 'Đồng ý',  
                  customClass: {
                    icon: 'swal-icon-success', 
                  }
                });
            } catch (err) {
              setIsLoading(false)
              if(err.response && err.response.data.errors){
                setErrors(err.response.data.errors);
              }
              else{
                Swal.fire({
                  icon: 'error',           
                  title: 'Đăng ký thất bại!', 
                  text: `Bạn vui lòng thử lại hoặc liên hệ admin để được hỗ trợ`, 
                  confirmButtonText: 'Đồng ý',  
                  customClass: {
                    icon: 'swal-icon-success', 
                  }
                });
              }
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
                    <EuiButton fill isLoading={isLoading} onClick={handleRegister}>Đăng ký</EuiButton>
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
