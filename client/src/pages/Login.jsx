import React, { useContext, useState } from 'react'
import { EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFieldPassword, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiLink, EuiPageTemplate, EuiSpacer, EuiText } from "@elastic/eui"
import {validator} from '../Validator'
import axios from '../axios'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export default function Login() {
    const {error,loading,dispatch}=useContext(AuthContext)
    const [errors,setErrors]=useState({
        email:'',
        password:''
    })
    const [data,setData]=useState({
        email:'',
        password:''
    })
    const handleChange=(field)=>(e)=>{
        setData({
            ...data,
            [field]:e.target.value
        })
    }

    const navigate=useNavigate()
    const handleLogin=async()=>{
        const {errors} =validator(data)
        setErrors(errors)
        if(Object.keys(errors).length===0){
            dispatch({type:'LOGIN_START'})
            try {
                const res=await axios.post('/auth/login',data)
                dispatch({type:'LOGIN_SUCCESS',payload:res.data})
                Swal.fire({
                    icon: 'success',           
                    title: 'Đăng nhập thành công', 
                    confirmButtonText: 'Đồng ý',  
                    customClass: {
                      icon: 'swal-icon-success', 
                    }
                  });
                  if(res.data.role==="Admin"){
                    navigate('/dashboard')
                  }else{
                      navigate('/')
                  }
            } catch (err) {
                dispatch({type:'LOGIN_FAILURE'})
                if(err.response && err.response.data.errors){
                    setErrors(err.response.data.errors)
                }else if(err.response && err.response.data.message){
                    Swal.fire({
                        icon: 'errors',           
                        title: err.response.data.message, 
                        confirmButtonText: 'Đồng ý',  
                        customClass: {
                          icon: 'swal-icon-success', 
                        }
                      });
                }else{
                    Swal.fire({
                        icon: 'errors',           
                        title: 'Lỗi server!', 
                        confirmButtonText: 'Đồng ý',  
                        customClass: {
                          icon: 'swal-icon-success', 
                        }
                      });
                }
            }
        }
    }

    const google=()=>{
        window.open("https://shop-oyck.onrender.com/auth/google", "_self")
     }
     
  return (
    <EuiPageTemplate style={{backgroundImage:'url("/assets/bg.png")',width:'100vw',height:'100vh',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <EuiFlexGroup alignItems='center' justifyContent='center' style={{width:'100%',height:'100%'}}>
            <EuiFlexItem grow={false}>
                <EuiFlexGroup direction='column' gutterSize='s'>
                    <EuiText textAlign='center' color='black'><h3>Đăng nhập</h3></EuiText>
                    <EuiFormRow label="Email" fullWidth isInvalid={!!errors.email} error={errors.email}>
                        <EuiFieldText placeholder='info@gmail.com' onChange={handleChange('email')} isInvalid={!!errors.email} fullWidth/>
                    </EuiFormRow>
                    <EuiFormRow label="Mật khẩu" fullWidth isInvalid={!!errors.password} error={errors.password}>
                        <EuiFieldPassword type='dual' placeholder='Mật khẩu' onChange={handleChange('password')} isInvalid={!!errors.password} fullWidth/>
                    </EuiFormRow>
                    <EuiButton fill onClick={handleLogin} isLoading={loading}>Đăng nhập</EuiButton>
                    <EuiSpacer size='s'/>
                    <EuiFlexGroup justifyContent='center' responsive={false}>
                        <EuiFlexItem>
                            <EuiButton fill iconType="/assets/google.png" onClick={google}>Google</EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiText textAlign='center' color='black'>Chưa có tài khoản? <EuiLink href='/dang_ky'>Đăng ký</EuiLink></EuiText>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate>
  )
}
