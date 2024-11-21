import React, { useState } from 'react'
import { EuiFlexGroup,EuiPanel,EuiButtonIcon,EuiButton,EuiText,EuiFieldPassword, EuiFieldText, EuiFormRow } from '@elastic/eui'
import axios from '../../axios'
import {toast,ToastContainer} from 'react-toastify'

export default function VerifyEmail({setTab,setIsVerify}) {
  const [data,setData]=useState({
    email:'',
    otp:''
  })
  const [loading,setLoading]=useState(false)
  const [errors,setErrors]=useState({
    email:'',
    otp:''
  })

  const handleChange=(field)=>(e)=>{
    setData({
      ...data,
      [field]:e.target.value
    })
  }

  const sendOtp=async()=>{
      setLoading(true)
      try {
        await axios.post('/sendOTP',data)
        setLoading(false)
        setErrors({})
        toast.success('Otp đã được gửi đi. Vui lòng kiểm tra hòm thư của bạn',{
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        })
      } catch (err) {
        setLoading(false)
        if(err.response && err.response.data.errors){
          setErrors(err.response.data.errors)
        }else{
          toast.error('Lỗi server',{
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          })
        }
      }
  }
  const handleVerify=async()=>{
      try {
        await axios.post('/verifyOTP',data)
        setErrors({})
        setTab(false)
        setIsVerify(true)
      } catch (err) {
        if(err.response && err.response.data.errors)
        {
          setErrors(err.response.data.errors)
        }else{
          toast.error('Lỗi server',{
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          })
        }
      }
  }
  return (
    <EuiPanel style={{maxWidth:'400px'}}>
      <ToastContainer/>
        <EuiFlexGroup direction='column'>
            <EuiFlexGroup gutterSize='s'>
                <EuiButtonIcon iconType="arrowLeft" onClick={()=>setTab('')}/>
                <EuiText>Nhập email</EuiText>
            </EuiFlexGroup>
                <EuiFormRow isInvalid={!!errors.email} error={errors.email}>
                  <EuiFieldText 
                      append={<EuiButton onClick={sendOtp} isLoading={loading}>Gửi mã</EuiButton>}
                      placeholder='Nhập email' onChange={handleChange('email')} isInvalid={!!errors.email}/>
                </EuiFormRow>
                <EuiFormRow isInvalid={!!errors.otp} error={errors.otp}>
                  <EuiFieldText placeholder='Nhập otp' isInvalid={!!errors.otp} onChange={handleChange('otp')}/>
                </EuiFormRow>
            <EuiButton fill onClick={handleVerify}>Xác minh</EuiButton>
        </EuiFlexGroup>
    </EuiPanel>
  )
}
