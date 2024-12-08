import { EuiButton, EuiFieldSearch, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiIcon, EuiImage, EuiSpacer, EuiTab, EuiTabs, EuiText } from '@elastic/eui'
import React, { Fragment, useEffect, useMemo, useState } from 'react'

import TabContent from './TabContent';

export default function Order() {
  const [selectedTabId, setSelectedTabId] = useState(1);

  const tabs = [
    { id: 1, name: 'Tất cả', content: <TabContent status="all"/> },
    { id: 2, name: 'Chờ thanh toán', content: <TabContent status="pending" /> },
    { id: 3, name: 'Vận chuyển', content: <TabContent status="shipping" /> },
    { id: 4, name: 'Chờ giao hàng', content: <TabContent status="delivering" /> },
    { id: 5, name: 'Hoàn thành', content: <TabContent status="completed" /> },
    { id: 6, name: 'Đã hủy', content: <TabContent status="canceled" /> },
  ];


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
