import React, { useEffect, useState } from 'react'
import { EuiAccordion, EuiAvatar, EuiBreadcrumbs, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPage, EuiPageSection, EuiPageSidebar, EuiPageTemplate, EuiPanel, EuiSpacer, EuiText, EuiTextBlockTruncate } from '@elastic/eui'
import { Outlet, useOutletContext } from 'react-router-dom'
import axios from '../../axios'
import moment from 'moment'


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
            {news.length&&news.map(item=>(
                <EuiFlexItem key={item._id} grow={false}>
                     <EuiFlexGroup>
                        <EuiImage src={item.image} width="100" height="100"/>
                        <p>
                        <EuiLink href={`/blog/chi_tiet?ma=${item._id}`} color='text'><EuiText><b>{item.title}</b></EuiText></EuiLink>
                        <EuiSpacer size='s'/>
                        <EuiText size='xs' color='subdued'>{moment(item.createdAt).format("DD-MM-YYYY")}</EuiText>
                        <EuiSpacer size='s'/>
                        <EuiTextBlockTruncate lines={2}>{item.content}</EuiTextBlockTruncate>
                        </p>
                    </EuiFlexGroup>
                </EuiFlexItem>
           ))}
        </EuiFlexGroup>
    </EuiPageTemplate.Section>
  )
}
