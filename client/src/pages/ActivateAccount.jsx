import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios'
import {EuiModal, EuiModalHeader, EuiPageTemplate,EuiModalBody,EuiText,EuiOverlayMask, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiIcon, EuiImage, EuiLoadingSpinner} from '@elastic/eui'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";



export default function ActivateAccount() {
    const location = useLocation();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [second,setSecond]=useState(3)
    const [isSuccess,setIsSuccess]=useState(false)
    const [dots, setDots] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
  
      return () => clearInterval(interval);
    }, []);
    useEffect(()=>{
        setTimeout(() => {
            setSecond(second-1);
          }, 1000);
        if(second==0){
            navigate('/dang_nhap')
        }
    
    },[second])
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
          axios
            .get(`/auth/verifyEmail?token=${token}`)
            .then((res) => {
              setIsModalVisible(true)
              setIsSuccess(true)
            })
            .catch((err) => {
              console.error(err);
              setIsModalVisible(true)
              setIsSuccess(false)
            });
        } 
      }, [location]);
  return (
    <EuiPageTemplate style={{backgroundImage:'url("/assets/bg.png")',width:'100vw',height:'100vh',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
      <EuiFlexGroup justifyContent='center' alignItems='center' style={{width:'100%',height:'100%'}}>
      {isModalVisible && (
          <EuiPanel style={{maxWidth:'500px'}}>
            <EuiFlexGroup direction='column' alignItems='center'>
              <EuiText><h3>{isSuccess?'KÍCH HOẠT TÀI KHOẢN THÀNH CÔNG':'KÍCH HOẠT TÀI KHOẢN THẤT BẠI'}</h3></EuiText>
              <EuiText><h4>{!isSuccess&&'LIÊN KẾT KHÔNG HỢP LỆ HOẶC ĐÃ HÊT HẠN'}</h4></EuiText>
              <EuiImage src="/assets/success.png" size='m'/>
                <EuiText>Đang chuyển hướng đến trang đăng nhập {dots}</EuiText>
            </EuiFlexGroup>
          </EuiPanel>
        )}
        </EuiFlexGroup>
    </EuiPageTemplate>

  )
}
