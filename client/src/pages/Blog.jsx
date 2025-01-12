import React, { useEffect, useState } from 'react'
import { EuiAccordion, EuiAvatar, EuiBreadcrumbs, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPage, EuiPageSection, EuiPageSidebar, EuiPageTemplate, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import { Outlet, useOutletContext } from 'react-router-dom'
import axios from '../axios'

export default function Blog() {
    const [news,setNews]=useState([])
    const getNews=async()=>{
        try {
          const res=await axios.get('/new/getAll')
          setNews(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      useEffect(()=>{
        getNews()
      },[])
  return (
    <EuiPageTemplate.Section contentProps={{style:{paddingBlockStart:0}}}>
        <EuiBreadcrumbs
        breadcrumbs={[
            {
                text:"Trang chủ",
                href:"/"
            },
            {
                text:"Tin tức",
                href:"/tin_tuc"
            },
            {
                text:"4 nguyên tắc thiết kế cửa sổ bếp hợp phong thủy, hút tài lộc",
            },
        ]}/>
        <EuiFlexGroup>
            <EuiFlexItem grow={1} style={{border:'1px solid black'}}>
                <h3>Bài viết mới nhất</h3>
                <EuiHorizontalRule size='half'/>
                <EuiFlexGroup direction='column'>
                    {news.length&&news.slice(0,6).map(item=>(<EuiFlexGroup key={item._id}>
                        <EuiImage src={item.image} width="100" height="100"/>
                        <EuiLink href={`/blog/chitiet?ma=${item._id}`} color='text'><EuiText>{item.content}</EuiText></EuiLink>
                    </EuiFlexGroup>))}
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem grow={3}>
                <Outlet/>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate.Section>
  )
}
