import React, { useEffect, useState } from 'react'
import { EuiAccordion, EuiAvatar, EuiBreadcrumbs, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiIcon, EuiImage, EuiLink, EuiListGroup, EuiListGroupItem, EuiPage, EuiPageSection, EuiPageSidebar, EuiPageTemplate, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import axios from '../axios'

export default function Blog() {
    const [news,setNews]=useState([])
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
                href:"/blog"
            },
            ...(blog ? [{ text: blog.title }] : [])
        ]}/>
        <EuiSpacer/>
        <EuiFlexGroup>
            <EuiFlexItem grow={1} style={{border:'1px solid #e3e5ec',padding:"10px"}}>
                <EuiText textAlign='center'><h3>Bài viết mới nhất</h3></EuiText>
                <EuiHorizontalRule size='half' margin='xs' style={{height:'2px'}}/>
                <EuiSpacer/>
                <EuiFlexGroup direction='column'>
                    {news.length&&news.slice(0,6).map(item=>(
                    <EuiFlexItem key={item._id} grow={false}>
                        <EuiFlexGroup>
                            <EuiImage src={item.image} width="50" height="50"/>
                            <EuiLink href={`/blog/chi_tiet?ma=${item._id}`} color='text'><EuiText><b>{item.title}</b></EuiText></EuiLink>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                ))}
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem grow={3}>
                <Outlet/>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate.Section>
  )
}
