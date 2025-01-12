import React, { useEffect, useState } from 'react'
import { EuiAccordion, EuiAvatar, EuiBreadcrumbs, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPage, EuiPageSection, EuiPageSidebar, EuiPageTemplate, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import { Outlet, useOutletContext } from 'react-router-dom'
import axios from '../../axios'


export default function Blogs() {
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
    <EuiPageTemplate.Section>
        <EuiFlexGroup direction='column'>
            {news.length&&news.map(item=>(<EuiFlexGroup key={item._id}>
                <EuiImage src={item.image} width="100" height="100"/>
                <p>
                <EuiLink href={`/blog/chitiet?ma=${item._id}`} color='text'><EuiText>{item.content}</EuiText></EuiLink>
                <EuiText color='subdued' size='s'>{item.content}</EuiText>
                </p>
            </EuiFlexGroup>))}
        </EuiFlexGroup>
    </EuiPageTemplate.Section>
  )
}
