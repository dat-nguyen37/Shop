import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiLink, EuiText } from '@elastic/eui'
import React from 'react'

export default function ProductItem() {
  return (
    <EuiCard
    textAlign='left'
    hasBorder={true}
    image="/assets/brand.png"
    title={
    <EuiLink href='/chi_tiet_san_pham?masp=1'>
    <EuiText size='s' 
    style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        WebkitLineClamp: 2,}}>
        Đai Chống Gù Lưng Nam Nữ , Đai Nâng Ngực Nữ Có Nẹp Chỉnh Cột Sống, Đai Bảo Vệ Vòng 1
    </EuiText>
    </EuiLink>}
    description={
    <EuiFlexGroup direction='column' gutterSize='none'>
        <EuiFlexItem>
            <EuiText color='red'>50.000 đ</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFlexGroup alignItems='center' responsive={false}>
                <EuiFlexGroup gutterSize='s' alignItems='center' responsive={false}>
                <EuiIcon type="starFilled" color='yellow'/>
                <EuiText size='xs'>4.5</EuiText>
                </EuiFlexGroup>
                <EuiText size='xs'>Đã bán 16,5k</EuiText>
            </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFlexGroup gutterSize='none' alignItems='center' responsive={false}>
                <EuiIcon type="mapMarker"/>
                <EuiText size='xs'>Tp. Hồ Chí Minh</EuiText>
            </EuiFlexGroup>
        </EuiFlexItem>
    </EuiFlexGroup>
    }/>
  )
}
