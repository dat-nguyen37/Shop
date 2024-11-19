import React from 'react'
import { EuiFlexGroup,EuiPanel,EuiButtonIcon,EuiButton,EuiText,EuiFieldPassword, EuiFieldText } from '@elastic/eui'


export default function VerifyEmail({setTab,setIsVerify}) {
  const handleVerify=()=>{
    setTab(false)
    setIsVerify(true)
  }
  return (
    <EuiPanel style={{maxWidth:'400px'}}>
        <EuiFlexGroup direction='column'>
            <EuiFlexGroup gutterSize='s'>
                <EuiButtonIcon iconType="arrowLeft" onClick={()=>setTab('')}/>
                <EuiText>Nhập email</EuiText>
            </EuiFlexGroup>
            <EuiFieldText 
                append={<EuiButton>Gửi mã</EuiButton>}
                placeholder='Nhập email'/>
            <EuiFieldText placeholder='Nhập otp'/>
            <EuiButton fill onClick={handleVerify}>Xác minh</EuiButton>
        </EuiFlexGroup>
    </EuiPanel>
  )
}
