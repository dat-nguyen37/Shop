import React, { useContext, useEffect, useState } from 'react'
import {EuiAvatar, EuiBreadcrumbs, EuiButton, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiPanel, EuiSpacer, EuiText} from '@elastic/eui'
import axios from '../../../axios'
import {ShopContext} from '../../../context/ShopContext'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../../../context/AuthContext'

export default function HomeSeller() {
  const [data,setdata]=useState([])
  const {user}=useContext(AuthContext)
  const {dispatch}=useContext(ShopContext)
  const navigate=useNavigate()
  const getShops=async()=>{
    try {
        const res=await axios.get('/shop/getByUser')
        setdata(res.data)
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
    }
    useEffect(()=>{
        getShops()
    },[])
    const handleClick=async(shop)=>{
      await dispatch({type:'SET_SHOP_SUCCESS',payload:shop})
      navigate('/nguoi_ban')
    }
  return (
    <EuiFlexGroup justifyContent='center' alignItems='flexStart'>
      <EuiPanel grow={false} style={{minWidth:'800px'}}>
        <EuiBreadcrumbs
        breadcrumbs={[
          {
              text:'Trang chủ',
              href:'/',
              style:{paddingInline:'10px'}
          },
          {
              text:'Quản lý',
          }
      ]}/>
      <EuiSpacer/>
      <EuiFlexGroup alignItems='center' gutterSize='s' responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiAvatar name='A' imageUrl='' size='l'/>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText><h4>{user?.name}</h4></EuiText>
          <EuiLink href='/dangky_nguoiban'><EuiIcon type="plus"/>Tạo cửa hàng</EuiLink>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiHorizontalRule margin='s'/>
      <EuiText>Danh sách cửa hàng đã đăng kí</EuiText>
      <EuiSpacer/>
      <EuiFlexGrid columns={2}>
         {data?( data.map(shop=>(<EuiFlexItem>
              <div style={{position:'relative'}}>
                <EuiImage src={shop.background} allowFullScreen height="150" size='fullWidth'/>
                <div style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></div>
                <EuiFlexGroup direction='column' gutterSize='s' style={{position:'absolute',top:'20%',left:'10%'}}>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <EuiAvatar name='Shop' imageUrl={shop.avatar} size='xl'/>
                    <p>
                      <EuiText color='white'><h3>Shop:{shop.name}</h3></EuiText>
                      <EuiText color='white'>Mã:{shop._id}</EuiText>
                    </p>
                  </EuiFlexGroup>
                </EuiFlexGroup>
                {shop.isActivated?
                <EuiLink onClick={()=>handleClick(shop)} style={{position:'absolute',bottom:0, right:10}}><EuiText color='white'>Truy cập</EuiText></EuiLink>
                :<EuiText style={{position:'absolute',bottom:0, right:10}}>Chưa mở</EuiText>
              }
              </div>
          </EuiFlexItem>))):(
            <EuiText>Bạn chưa có cửa hàng nào</EuiText>
          )}
        </EuiFlexGrid>
      </EuiPanel>
    </EuiFlexGroup>
  )
}
