import React, { useEffect, useState } from 'react'
import { EuiBasicTable, EuiButtonIcon, EuiFlexGroup, EuiLink, EuiSpacer, EuiText } from "@elastic/eui"
import axios from '../../../axios'
import ViewReport from './ViewReport'

export default function Report() {
    const [reports,setReports]=useState([])
    const [viewReport,setViewReport]=useState(false)
    const [selectedReport,setSelectedReport]=useState(null)
    const handleViewReport=(item)=>{
        setSelectedReport(item)
        setViewReport(true)
    }

    const fetchReports=async()=>{
        try {
            const res=await axios.get("/report/getAll")
            setReports(res.data.map(report=>({
                id:report._id,
                productId:report.productId,
                reason:report.reason,
                status:report.status,
                action:report
            })))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchReports()
    }, [])
    const handleDelete=async(id)=>{
        try {
            await axios.delete(`/report/delete/${id}`)
            fetchReports()
        } catch (err) {
            console.log(err)
        }
    }
    const reportColumns=[
        {field:"id",name:"Mã tố cáo"},
        {field:"productId",name:"Mã sản phẩm",
            render:(item)=>(
                <EuiLink>{item}</EuiLink>
            )
        },
        {field:"reason",name:"Lý do"},
        {field:"status",name:"Trạng thái"},
        {field:"action",name:"Hành động",
            render:(item)=>(
                <EuiFlexGroup gutterSize='s'>
                    <EuiButtonIcon iconType="eye" onClick={()=>handleViewReport(item)}/>
                    <EuiButtonIcon iconType="trash" color='danger' onClick={()=>handleDelete(item._id)}/>
                </EuiFlexGroup>
            )
        }
    ]
  return (
    <>
        <EuiText><b>Danh sách tố cáo</b></EuiText>
        <EuiSpacer/>
        <EuiBasicTable
        columns={reportColumns}
        items={reports}/>
        {viewReport&&<ViewReport setViewReport={setViewReport} fetchReports={fetchReports} selectedReport={selectedReport}/>}
    </>
  )
}
