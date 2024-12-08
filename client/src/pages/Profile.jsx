import React from 'react'
import { EuiAccordion, EuiAvatar, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiLink, EuiListGroup, EuiListGroupItem, EuiPage, EuiPageSection, EuiPageSidebar, EuiPageTemplate, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import { Outlet, useOutletContext } from 'react-router-dom'

export default function Profile() {
    const result = useOutletContext();
  return (
    <EuiPage>
        <EuiPageTemplate.Sidebar style={{width:'280px'}}>
            <EuiPageSection>
                <EuiFlexGroup gutterSize='s' alignItems='center'>
                    <EuiAvatar name='DN' imageUrl=''/>
                    <EuiFlexItem>
                        <EuiText><b>Dat Nguyen</b></EuiText>
                        <EuiLink><EuiIcon type="pencil"/>&nbsp;Sửa hồ sơ</EuiLink>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer size='xxl'/>
                <EuiFlexGroup direction='column'>
                <EuiAccordion 
                    paddingSize='s'
                    arrowDisplay='none' 
                    buttonContent={<EuiFlexGroup>
                        <EuiIcon type="user"/>
                        <EuiLink>Tài khoản của tôi</EuiLink>
                    </EuiFlexGroup>}>
                    <EuiListGroup flush style={{paddingInline:'30px'}}>
                        <EuiListGroupItem href='/profile' label='Hồ sơ' color='primary'/>
                        <EuiListGroupItem href='/profile/address' label='Địa chỉ' color='primary'/>
                        <EuiListGroupItem href='/profile/password' label='Đổi mật khẩu' color='primary'/>
                        <EuiListGroupItem href='/profile/setting' label='Cài đặt' color='primary'/>
                    </EuiListGroup>
                </EuiAccordion>
                <EuiFlexGroup>
                    <EuiIcon type="article"/>
                    <EuiLink href='/profile/order'>Đơn mua</EuiLink>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiIcon type="bell"/>
                    <EuiLink>Thông báo</EuiLink>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiIcon type="/assets/coupon.png"/>
                    <EuiLink>Kho voucher</EuiLink>
                </EuiFlexGroup>
                </EuiFlexGroup>
            </EuiPageSection>
        </EuiPageTemplate.Sidebar>
        <EuiPageTemplate.Section color='transparent' grow={false}>
            <EuiPanel style={{minHeight:'80vh'}}>
                <Outlet context={result}/>
            </EuiPanel>
        </EuiPageTemplate.Section>
    </EuiPage>
  )
}
