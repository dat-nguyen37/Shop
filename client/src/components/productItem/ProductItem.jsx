import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage, EuiLink, EuiText } from '@elastic/eui'
import React from 'react'

export default function ProductItem({product}) {
  return (
    <EuiCard
    textAlign='left'
    hasBorder={true}
    image={<EuiImage src={product?.image} alt={product?.name} height="200px" style={{width:'100%'}}/>}
    title={
    <EuiLink href={`/chi_tiet_san_pham?masp=${product?._id}`}>
    <EuiText size='s' 
    style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        WebkitLineClamp: 2,}}>
        {product?.name}
    </EuiText>
    </EuiLink>}
    description={
    <EuiFlexGroup direction='column' gutterSize='none'>
        <EuiFlexItem>
            <EuiText color='red'>{product?.price} đ</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFlexGroup alignItems='center' responsive={false}>
                <EuiFlexGroup gutterSize='s' alignItems='center' responsive={false}>
                <EuiIcon type="starFilled" color='yellow'/>
                <EuiText size='xs'>{product?.rating}</EuiText>
                </EuiFlexGroup>
                <EuiText size='xs'>Đã bán {product?.quantitySold}</EuiText>
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
