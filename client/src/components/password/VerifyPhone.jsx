import React, { useEffect, useState } from 'react'
import { EuiFlexGroup,EuiPanel,EuiButtonIcon,EuiButton,EuiText,EuiFieldPassword, EuiFieldText } from '@elastic/eui'
import { auth } from '../../firebase';
import { ToastContainer,toast } from 'react-toastify';
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';


export default function VerifyPhone({setTab,setIsVerify}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState('');
  const [errors,setErrors]=useState({
    phoneNumber:''
  })

  // const verify=()=>{
  //   window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //     'size': 'invisible',
  //   });
  // }
  // useEffect(()=>{
  //   verify()
  // },[])
  const handleVerify = () => {
		if (phoneNumber === "") return;
    const verify= new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
        });
    verify.render().then(()=>{
      signInWithPhoneNumber(auth, phoneNumber, verify)
        .then((confirmationResult) => {
          toast.success('OTP đã được gửi đi.', {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
          });
          // Lưu confirmationResult để xác minh OTP sau này
          window.confirmationResult = confirmationResult;
        })
          .catch((err) => {
            console.log(err);
          });

    })
	}
  return (
    <EuiPanel style={{maxWidth:'400px'}}>
      <ToastContainer/>
        <EuiFlexGroup direction='column'>
            <EuiFlexGroup gutterSize='s'>
                <EuiButtonIcon iconType="arrowLeft" onClick={()=>setTab('')}/>
                <EuiText>Nhập số điện thoại</EuiText>
            </EuiFlexGroup>
            <EuiFieldText 
                append={<EuiButton onClick={handleVerify}>Gửi mã</EuiButton>}
                placeholder='Nhập số điện thoại' onChange={(e)=>setPhoneNumber(e.target.value)}/>
            <EuiFieldText placeholder='Nhập otp'/>
            <div id="recaptcha-container"></div>
            <EuiButton fill >Xác minh</EuiButton>
        </EuiFlexGroup>
    </EuiPanel>
  )
}
