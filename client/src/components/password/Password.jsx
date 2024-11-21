import { EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFieldPassword, EuiFlexGroup, EuiFormRow, EuiImage, EuiPanel, EuiSpacer, EuiStepsHorizontal, EuiText } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import VerifyPassword from './VerifyPassword'
import VerifyEmail from './VerifyEmail'
import VerifyPhone from './VerifyPhone'
import { validator } from '../../Validator'
import {toast,ToastContainer} from 'react-toastify'
import {AuthContext} from '../../context/AuthContext'
import axios from '../../axios'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'


export default function Password() {
    const [currentStep ,setCurrentStep ]=useState('step1')
    const [tab,setTab]=useState("")
    const [isVerify,setIsVerify]=useState(false)
    const {user}=useContext(AuthContext)

    useEffect(()=>{
        if(isVerify){
            setTab('')
            setCurrentStep('step2')
        }
    },[isVerify])
    const handleCancel=()=>{
        setTab('')
        setIsVerify(false)
        setCurrentStep('step1')
    }

      const [data, setData] = useState({
        password:'',
        reEnterPassword:''
      });
      const [errors, setErrors] = useState({
        password:'',
        reEnterPassword:''
      });
      const handleChange = (field) => (e) => {
        setData({
          ...data,
          [field]: e.target.value,
        });
      };
      const handleUpdatePassword=async()=>{
        const {errors}=validator(data)
        setErrors(errors)
        if(Object.keys(errors).length===0){
            try {
                await axios.patch('/update/'+user._id,data)
                setCurrentStep('step3')
            } catch (err) {
                if(err.response && err.response.data.message){
                    toast.error(err.response.data.message,{
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                      })
                }else(
                    toast.error('Lỗi server',{
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                      })
                )
            }
        }
    }
  return (
    <>
    <ToastContainer/>
        <EuiStepsHorizontal
        steps={[{
            title: 'Xác minh',
            status: currentStep==='step1'?'current':'complete',
            onClick: ()=>{}
        },
        {
            title: 'Đổi mật khẩu',
            status: currentStep === 'step2' ? 'current' : currentStep === 'step3' ? 'complete' : 'incomplete',
            onClick: ()=>{}
        },
        {
            title: 'Hoàn thành',
            status: currentStep === 'step3' ? 'complete' : 'incomplete',
            onClick: ()=>{}
        }]}/>
        <EuiSpacer/>
        {tab===''&&currentStep==='step1'&&
            <EuiFlexGroup justifyContent='center'>
                <EuiPanel style={{maxWidth:'400px'}} >
                    <EuiFlexGroup direction='column' gutterSize='s' alignItems='center'>
                        <EuiImage src='/assets/encrypted.png' size='s'/>
                        <EuiText>Để tăng cường bảo mật cho tài khoản của bạn, hãy xác minh thông tin bằng một trong những cách sau.</EuiText>
                        <EuiButtonEmpty onClick={()=>setTab('password')}>Xác minh bằng mật khẩu</EuiButtonEmpty>
                        <EuiButtonEmpty onClick={()=>setTab('email')}>Xác minh bằng email</EuiButtonEmpty>
                        <EuiButtonEmpty onClick={()=>setTab('phone')}>Xác minh bằng số điện thoại</EuiButtonEmpty>
                    </EuiFlexGroup>
                </EuiPanel>
            </EuiFlexGroup>}
            {tab===''&&currentStep==='step2'&&
            <EuiFlexGroup justifyContent='center'>
                <EuiPanel style={{maxWidth:'300px'}}>
                    <EuiFlexGroup direction='column'>
                        <EuiText color='blue'>Xác minh thành công</EuiText>
                        <EuiFormRow isInvalid={!!errors.password} error={errors.password}>
                            <EuiFieldPassword type='dual' placeholder='Nhập mật khẩu mới' onChange={handleChange('password')} isInvalid={!!errors.password}/>
                        </EuiFormRow>
                        <EuiFormRow isInvalid={!!errors.reEnterPassword} error={errors.reEnterPassword}>
                            <EuiFieldPassword type='dual' placeholder='Nhập lại mật khẩu' onChange={handleChange('reEnterPassword')} isInvalid={!!errors.reEnterPassword}/>
                        </EuiFormRow>
                        <EuiFlexGroup>
                            <EuiButton onClick={handleCancel}>Hủy</EuiButton>
                            <EuiButton fill onClick={handleUpdatePassword}>Xác nhận</EuiButton>
                        </EuiFlexGroup>
                    </EuiFlexGroup>
                </EuiPanel>
            </EuiFlexGroup>
            }
            {tab===''&&currentStep==='step3'&&
            <EuiFlexGroup direction='column' alignItems='center' justifyContent='center'>
                <EuiImage src='/assets/encrypted.png' size='s'/>
                <EuiText color='blue'><h3>Đổi mật khẩu thành công</h3></EuiText>
            </EuiFlexGroup>
            }
        <EuiFlexGroup justifyContent='center'>
            {tab==='password'?<VerifyPassword setTab={setTab} setIsVerify={setIsVerify}/>:tab==='email'?<VerifyEmail setTab={setTab} setIsVerify={setIsVerify}/>:tab==='phone'&&<VerifyPhone setTab={setTab} setIsVerify={setIsVerify}/>}
        </EuiFlexGroup>
    </>
  )
}
