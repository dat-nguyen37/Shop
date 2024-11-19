import { EuiButton, EuiFieldSearch, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiIcon, EuiImage, EuiSpacer, EuiTab, EuiTabs, EuiText } from '@elastic/eui'
import React, { Fragment, useMemo, useState } from 'react'

export default function Order() {
    const tabs = [
        {
          id: '1',
          name: 'Tất cả',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiFieldSearch placeholder='Bạn có thể tìm kiếm theo ID đơn hàng hoặc tên sản phẩm' fullWidth/>
              <EuiSpacer />
              <EuiFlexGroup direction='column'>
                {[1,2,3].map(item=>(<EuiFlexItem grow={false}>
                  <EuiFlexGroup>
                    <EuiFlexGroup alignItems='center' gutterSize='s'>
                      <EuiText><b>PTstore.man</b></EuiText>
                      <EuiButton iconType="editorComment" color='danger' fill style={{minWidth:'20px',height:'20px'}}>Chat</EuiButton>
                      <EuiButton iconType="/assets/shop.png" color='subdued' fill style={{minWidth:'20px',height:'20px'}}>Xem Shop</EuiButton>
                    </EuiFlexGroup>
                    <EuiText color='red'>Đã hủy</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup gutterSize='s'>
                    <EuiImage src='/assets/brand.png' size="80px"/>
                    <EuiFlexItem>
                      <EuiText>Dây Sạc Tự Ngắt - Dây Cáp Sạc Dữ Liệu Sạc Nhanh 100W Micro USB Type C 3 Trong 1 6A</EuiText>
                      <EuiText color='subdued' size='s'>Phân loại hàng: Xám,L(55-65kg)</EuiText>
                      <EuiText >x1</EuiText>
                    </EuiFlexItem>
                    <EuiText color='red'>₫129.000</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup direction='column' alignItems='flexEnd'>
                    <EuiText>Thành tiền:&nbsp;<b style={{color:'red'}}>₫134.000</b></EuiText>
                    <EuiFlexGroup gutterSize='s'>
                      <EuiButton color='danger' fill>Mua lại</EuiButton>
                      <EuiButton>Liên hệ người bán</EuiButton>
                      <EuiButton>Xem đánh giá shop</EuiButton>
                    </EuiFlexGroup>
                  </EuiFlexGroup>
                  <EuiHorizontalRule/>
                </EuiFlexItem>))}
              </EuiFlexGroup>
            </Fragment>
          ),
        },
        {
          id: '2',
          name: 'Chờ thanh toán',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiFieldSearch placeholder='Bạn có thể tìm kiếm theo ID đơn hàng hoặc tên sản phẩm' fullWidth/>
              <EuiSpacer />
              <EuiFlexGroup direction='column'>
                {[1,2,3].map(item=>(<EuiFlexItem grow={false}>
                  <EuiFlexGroup>
                    <EuiFlexGroup alignItems='center' gutterSize='s'>
                      <EuiText><b>PTstore.man</b></EuiText>
                      <EuiButton iconType="editorComment" color='danger' fill style={{minWidth:'20px',height:'20px'}}>Chat</EuiButton>
                      <EuiButton iconType="/assets/shop.png" color='subdued' fill style={{minWidth:'20px',height:'20px'}}>Xem Shop</EuiButton>
                    </EuiFlexGroup>
                    <EuiText color='red'>Chờ thanh toán</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup gutterSize='s'>
                    <EuiImage src='/assets/brand.png' size="80px"/>
                    <EuiFlexItem>
                      <EuiText>Dây Sạc Tự Ngắt - Dây Cáp Sạc Dữ Liệu Sạc Nhanh 100W Micro USB Type C 3 Trong 1 6A</EuiText>
                      <EuiText color='subdued' size='s'>Phân loại hàng: Xám,L(55-65kg)</EuiText>
                      <EuiText >x1</EuiText>
                    </EuiFlexItem>
                    <EuiText color='red'>₫129.000</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup direction='column' alignItems='flexEnd'>
                    <EuiText>Thành tiền:&nbsp;<b style={{color:'red'}}>₫134.000</b></EuiText>
                    <EuiFlexGroup gutterSize='s'>
                      <EuiButton color='danger' fill>Mua lại</EuiButton>
                      <EuiButton>Liên hệ người bán</EuiButton>
                      <EuiButton>Xem đánh giá shop</EuiButton>
                    </EuiFlexGroup>
                  </EuiFlexGroup>
                  <EuiHorizontalRule/>
                </EuiFlexItem>))}
              </EuiFlexGroup>
            </Fragment>
          ),
        },
      {
          id: '3',
          name: 'Vận chuyển',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiFieldSearch placeholder='Bạn có thể tìm kiếm theo ID đơn hàng hoặc tên sản phẩm' fullWidth/>
              <EuiSpacer />
              <EuiFlexGroup direction='column'>
                {[1,2,3].map(item=>(<EuiFlexItem grow={false}>
                  <EuiFlexGroup>
                    <EuiFlexGroup alignItems='center' gutterSize='s'>
                      <EuiText><b>PTstore.man</b></EuiText>
                      <EuiButton iconType="editorComment" color='danger' fill style={{minWidth:'20px',height:'20px'}}>Chat</EuiButton>
                      <EuiButton iconType="/assets/shop.png" color='subdued' fill style={{minWidth:'20px',height:'20px'}}>Xem Shop</EuiButton>
                    </EuiFlexGroup>
                    <EuiText color='red'>Đang chuẩn bị đơn hàng</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup gutterSize='s'>
                    <EuiImage src='/assets/brand.png' size="80px"/>
                    <EuiFlexItem>
                      <EuiText>Dây Sạc Tự Ngắt - Dây Cáp Sạc Dữ Liệu Sạc Nhanh 100W Micro USB Type C 3 Trong 1 6A</EuiText>
                      <EuiText color='subdued' size='s'>Phân loại hàng: Xám,L(55-65kg)</EuiText>
                      <EuiText >x1</EuiText>
                    </EuiFlexItem>
                    <EuiText color='red'>₫129.000</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup direction='column' alignItems='flexEnd'>
                    <EuiText>Thành tiền:&nbsp;<b style={{color:'red'}}>₫134.000</b></EuiText>
                    <EuiFlexGroup gutterSize='s'>
                      <EuiButton color='danger' fill>Mua lại</EuiButton>
                      <EuiButton>Liên hệ người bán</EuiButton>
                      <EuiButton>Xem đánh giá shop</EuiButton>
                    </EuiFlexGroup>
                  </EuiFlexGroup>
                  <EuiHorizontalRule/>
                </EuiFlexItem>))}
              </EuiFlexGroup>
            </Fragment>
          ),
        },
      {
          id: '4',
          name: 'Chờ giao hàng',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiFieldSearch placeholder='Bạn có thể tìm kiếm theo ID đơn hàng hoặc tên sản phẩm' fullWidth/>
              <EuiSpacer />
              <EuiFlexGroup direction='column'>
                {[1,2,3].map(item=>(<EuiFlexItem grow={false}>
                  <EuiFlexGroup>
                    <EuiFlexGroup alignItems='center' gutterSize='s'>
                      <EuiText><b>PTstore.man</b></EuiText>
                      <EuiButton iconType="editorComment" color='danger' fill style={{minWidth:'20px',height:'20px'}}>Chat</EuiButton>
                      <EuiButton iconType="/assets/shop.png" color='subdued' fill style={{minWidth:'20px',height:'20px'}}>Xem Shop</EuiButton>
                    </EuiFlexGroup>
                    <EuiText color='red'>Đang vận chuyển</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup gutterSize='s'>
                    <EuiImage src='/assets/brand.png' size="80px"/>
                    <EuiFlexItem>
                      <EuiText>Dây Sạc Tự Ngắt - Dây Cáp Sạc Dữ Liệu Sạc Nhanh 100W Micro USB Type C 3 Trong 1 6A</EuiText>
                      <EuiText color='subdued' size='s'>Phân loại hàng: Xám,L(55-65kg)</EuiText>
                      <EuiText >x1</EuiText>
                    </EuiFlexItem>
                    <EuiText color='red'>₫129.000</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup direction='column' alignItems='flexEnd'>
                    <EuiText>Thành tiền:&nbsp;<b style={{color:'red'}}>₫134.000</b></EuiText>
                    <EuiFlexGroup gutterSize='s'>
                      <EuiButton color='danger' fill>Mua lại</EuiButton>
                      <EuiButton>Liên hệ người bán</EuiButton>
                      <EuiButton>Xem đánh giá shop</EuiButton>
                    </EuiFlexGroup>
                  </EuiFlexGroup>
                  <EuiHorizontalRule/>
                </EuiFlexItem>))}
              </EuiFlexGroup>
            </Fragment>
          ),
        },
      {
          id: '5',
          name: 'Hoàn thành',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiFieldSearch placeholder='Bạn có thể tìm kiếm theo ID đơn hàng hoặc tên sản phẩm' fullWidth/>
              <EuiSpacer />
              <EuiFlexGroup direction='column'>
                {[1,2,3].map(item=>(<EuiFlexItem grow={false}>
                  <EuiFlexGroup>
                    <EuiFlexGroup alignItems='center' gutterSize='s'>
                      <EuiText><b>PTstore.man</b></EuiText>
                      <EuiButton iconType="editorComment" color='danger' fill style={{minWidth:'20px',height:'20px'}}>Chat</EuiButton>
                      <EuiButton iconType="/assets/shop.png" color='subdued' fill style={{minWidth:'20px',height:'20px'}}>Xem Shop</EuiButton>
                    </EuiFlexGroup>
                      <EuiText color='blue'>Giao hàng thành công</EuiText> 
                      <EuiText color='red'>Hoàn thành</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup gutterSize='s'>
                    <EuiImage src='/assets/brand.png' size="80px"/>
                    <EuiFlexItem>
                      <EuiText>Dây Sạc Tự Ngắt - Dây Cáp Sạc Dữ Liệu Sạc Nhanh 100W Micro USB Type C 3 Trong 1 6A</EuiText>
                      <EuiText color='subdued' size='s'>Phân loại hàng: Xám,L(55-65kg)</EuiText>
                      <EuiText >x1</EuiText>
                    </EuiFlexItem>
                    <EuiText color='red'>₫129.000</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup direction='column' alignItems='flexEnd'>
                    <EuiText>Thành tiền:&nbsp;<b style={{color:'red'}}>₫134.000</b></EuiText>
                    <EuiFlexGroup gutterSize='s'>
                      <EuiButton color='danger' fill>Mua lại</EuiButton>
                      <EuiButton>Liên hệ người bán</EuiButton>
                      <EuiButton>Xem đánh giá shop</EuiButton>
                    </EuiFlexGroup>
                  </EuiFlexGroup>
                  <EuiHorizontalRule/>
                </EuiFlexItem>))}
              </EuiFlexGroup>
            </Fragment>
          ),
        },
      {
          id: '6',
          name: 'Đã hủy',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiFieldSearch placeholder='Bạn có thể tìm kiếm theo ID đơn hàng hoặc tên sản phẩm' fullWidth/>
              <EuiSpacer />
              <EuiFlexGroup direction='column'>
                {[1,2,3].map(item=>(<EuiFlexItem grow={false}>
                  <EuiFlexGroup>
                    <EuiFlexGroup alignItems='center' gutterSize='s'>
                      <EuiText><b>PTstore.man</b></EuiText>
                      <EuiButton iconType="editorComment" color='danger' fill style={{minWidth:'20px',height:'20px'}}>Chat</EuiButton>
                      <EuiButton iconType="/assets/shop.png" color='subdued' fill style={{minWidth:'20px',height:'20px'}}>Xem Shop</EuiButton>
                    </EuiFlexGroup>
                      <EuiText color='red'>Đã hủy</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup gutterSize='s'>
                    <EuiImage src='/assets/brand.png' size="80px"/>
                    <EuiFlexItem>
                      <EuiText>Dây Sạc Tự Ngắt - Dây Cáp Sạc Dữ Liệu Sạc Nhanh 100W Micro USB Type C 3 Trong 1 6A</EuiText>
                      <EuiText color='subdued' size='s'>Phân loại hàng: Xám,L(55-65kg)</EuiText>
                      <EuiText >x1</EuiText>
                    </EuiFlexItem>
                    <EuiText color='red'>₫129.000</EuiText>
                  </EuiFlexGroup>
                  <EuiHorizontalRule margin='s'/>
                  <EuiFlexGroup direction='column' alignItems='flexEnd'>
                    <EuiText>Thành tiền:&nbsp;<b style={{color:'red'}}>₫134.000</b></EuiText>
                    <EuiFlexGroup gutterSize='s'>
                      <EuiButton color='danger' fill>Mua lại</EuiButton>
                      <EuiButton>Liên hệ người bán</EuiButton>
                      <EuiButton>Xem đánh giá shop</EuiButton>
                    </EuiFlexGroup>
                  </EuiFlexGroup>
                  <EuiHorizontalRule/>
                </EuiFlexItem>))}
              </EuiFlexGroup>
            </Fragment>
          ),
        },]
        const [selectedTabId, setSelectedTabId] = useState('1');
        const selectedTabContent = useMemo(() => {
            return tabs.find((obj) => obj.id === selectedTabId)?.content;
        }, [selectedTabId]);

        const onSelectedTabChanged = (id) => {
            setSelectedTabId(id);
        };
  return (
    <>
        <EuiTabs style={{display:'flex',justifyContent:'space-between'}}>
        {tabs.map((tab, index) => (
        <EuiTab
        style={{flex:1,justifyContent:'center'}}
            key={index}
            href={tab.href}
            onClick={() => onSelectedTabChanged(tab.id)}
            isSelected={tab.id === selectedTabId}
            prepend={tab.prepend}
            append={tab.append}
        >
            {tab.name}
        </EuiTab>
        ))}
        </EuiTabs>
        {selectedTabContent}
    </>
  )
}
