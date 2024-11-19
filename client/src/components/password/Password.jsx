import { EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFieldPassword, EuiFlexGroup, EuiImage, EuiPanel, EuiSpacer, EuiStepsHorizontal, EuiText } from '@elastic/eui'
import React, { useEffect, useState } from 'react'
import VerifyPassword from './VerifyPassword'
import VerifyEmail from './VerifyEmail'
import VerifyPhone from './VerifyPhone'

export default function Password() {
    const [currentStep ,setCurrentStep ]=useState('step1')
    const [tab,setTab]=useState("")
    const [isVerify,setIsVerify]=useState(false)

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
  return (
    <>
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
                        <EuiFieldPassword type='dual' placeholder='Nhập mật khẩu mới'/>
                        <EuiFieldPassword type='dual' placeholder='Nhập lại mật khẩu'/>
                        <EuiFlexGroup>
                            <EuiButton onClick={handleCancel}>Hủy</EuiButton>
                            <EuiButton fill onClick={()=>setCurrentStep('step3')}>Xác nhận</EuiButton>
                        </EuiFlexGroup>
                    </EuiFlexGroup>
                </EuiPanel>
            </EuiFlexGroup>
            }
            {tab===''&&currentStep==='step3'&&
            <EuiFlexGroup direction='column' alignItems='center' justifyContent='center'>
                <EuiImage src='/assets/encrypted.png' size='s'/>
                <EuiText color='blue'>Đổi mật khẩu thành công</EuiText>
            </EuiFlexGroup>
            }
        <EuiFlexGroup justifyContent='center'>
            {tab==='password'?<VerifyPassword setTab={setTab} setIsVerify={setIsVerify}/>:tab==='email'?<VerifyEmail setTab={setTab} setIsVerify={setIsVerify}/>:tab==='phone'&&<VerifyPhone setTab={setTab} setIsVerify={setIsVerify}/>}
        </EuiFlexGroup>
    </>
  )
}
