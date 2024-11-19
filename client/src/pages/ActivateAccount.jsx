import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios'
import {EuiPageTemplate} from '@elastic/eui'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";



export default function ActivateAccount() {
    const location = useLocation();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [second,setSecond]=useState(3)
    const [alertShown, setAlertShown] = useState(false);

    useEffect(()=>{
        setTimeout(() => {
            setSecond(second-1);
          }, 1000);
        if(second==0){
            navigate('/dang_nhap')
        }
    
    },[second])
    const showAlert = async (icon,title,text) => {
        await MySwal.fire({
          icon: icon,
          title: title,
          text: text,
          timer: second * 1000,
        });
    }
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token && !alertShown) {
          axios
            .get(`/verifyEmail?token=${token}`)
            .then((res) => {
                setAlertShown(true);
                showAlert(
                    'success',
                    'Kích hoạt tài khoản thành công!'
                    `Chúng tôi sẽ chuyển qua trang đăng nhập sau ${second} giây.`,

                );
            })
            .catch((err) => {
              console.error(err);
              setAlertShown(true);
              showAlert(
                'error',
                'Kích hoạt thất bại. Liên kết không hợp lệ hoặc đã hết hạn.',
                `Chúng tôi sẽ chuyển qua trang đăng nhập sau ${second} giây.`,

            );
            });
        } 
      }, [location,second,alertShown]);
  return (
    <EuiPageTemplate style={{backgroundImage:'url("/assets/bg.png")',width:'100vw',height:'100vh',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
    </EuiPageTemplate>

  )
}
