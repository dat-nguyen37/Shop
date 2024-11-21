import { EuiFlexGroup,EuiPanel,EuiButtonIcon,EuiButton,EuiText,EuiFieldPassword, EuiFormRow } from '@elastic/eui'
import React, { useState } from 'react'
import axios from '../../axios'
import {validator} from '../../Validator'
import {toast,ToastContainer} from 'react-toastify'

export default function VerifyPassword({setTab,setIsVerify}) {
  const [data,setData]=useState({
    password:''
  })
  const [errors,setErrors]=useState({
    password:''
  })
  const onChange=(field)=>(e)=>{
    setData({
      ...data,
      [field]:e.target.value})
  }
  const handleVerify=async()=>{
    const {errors}=validator(data)
    setErrors(errors)
    if(Object.keys(errors).length===0){
      try {
        await axios.post('/verifyPassword',data)
        setTab(false)
        setIsVerify(true)
      } catch (err) {
        if(err.response && err.response.data.errors){
          setErrors(err.response.data.errors)
        }else if(err.response && err.response.data.message){
          toast.error(err.response.data.message,{
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          })
        }
        else{
          console.log(err)
          toast.error('Lỗi server',{
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          })
        }
      }
    }
  }
  return (
    <EuiPanel style={{maxWidth:'300px'}}>
      <ToastContainer/>
        <EuiFlexGroup direction='column'>
            <EuiFlexGroup gutterSize='s'>
                <EuiButtonIcon iconType="arrowLeft" onClick={()=>setTab('')}/>
                <EuiText>Nhập mật khẩu</EuiText>
            </EuiFlexGroup>
            <EuiFormRow error={errors.password} isInvalid={!!errors.password}>
              <EuiFieldPassword type='dual' onChange={onChange('password')} isInvalid={!!errors.password}/>
            </EuiFormRow>
            <EuiButton fill onClick={handleVerify}>Xác minh</EuiButton>
        </EuiFlexGroup>
    </EuiPanel>
  )
}
