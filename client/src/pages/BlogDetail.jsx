import React, { useEffect, useState } from 'react'
import { EuiAccordion, EuiAvatar, EuiBreadcrumbs, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPage, EuiPageSection, EuiPageSidebar, EuiPageTemplate, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import axios from '../axios'

export default function BlogDetail() {
    const [blogId,setBlogId]=useState(null)
    const location=useLocation()
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const ma = queryParams.get('ma');
        setBlogId(ma);
    }, [location.search]);

    const [blog,setBlog]=useState('')
    const getBlog=async()=>{
        try {
            const res=await axios.get(`/new/getOne/${blogId}`)
            setBlog(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getBlog()
    },[blogId])

  return (
    <EuiPageTemplate.Section>
        <EuiFlexGroup direction='column'>
            <EuiText><h3>{blog.title}</h3></EuiText>
            <EuiImage src={blog.image}/>
            <EuiText>{blog.detail}</EuiText>
        </EuiFlexGroup>
    </EuiPageTemplate.Section>
  )
}
