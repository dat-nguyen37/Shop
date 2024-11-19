import { EuiFlexGroup,EuiPanel,EuiButtonIcon,EuiButton,EuiText,EuiFieldPassword } from '@elastic/eui'
import React from 'react'

export default function VerifyPassword({setTab,setIsVerify}) {
  const handleVerify=()=>{
    setTab(false)
    setIsVerify(true)
  }
  return (
    <EuiPanel style={{maxWidth:'300px'}}>
        <EuiFlexGroup direction='column'>
            <EuiFlexGroup gutterSize='s'>
                <EuiButtonIcon iconType="arrowLeft" onClick={()=>setTab('')}/>
                <EuiText>Nhập mật khẩu</EuiText>
            </EuiFlexGroup>
            <EuiFieldPassword type='dual'/>
            <EuiButton fill onClick={handleVerify}>Xác minh</EuiButton>
        </EuiFlexGroup>
    </EuiPanel>
  )
}
