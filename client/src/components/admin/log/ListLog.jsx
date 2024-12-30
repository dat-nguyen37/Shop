import React, { useEffect, useState } from 'react'
import {EuiBasicTable, EuiFlexGroup, EuiHealth, EuiPanel, EuiSpacer, EuiText} from "@elastic/eui"
import axios from '../../../axios'
import moment from "moment"

export default function ListLog() {
    const columns=[
        {field:"id",name:"Mã",width:"200px"},
        {field:"api",name:"ApiUrl"},
        {field:"status",name:"Trạng thái",
            render:(item)=>(
                <EuiHealth color={
                    item>=500? "danger":
                    item>=400?"warning":
                    item>=300 ? "accent":
                    "success"}>
                    {item}
                </EuiHealth>
            ),
            width:"100px"
        },
        {field:"date",name:"Thời gian",
            render:(item)=>(
                item&&<p>{moment(item).format("DD/MM/YYY hh:mm:ss")}</p>
            ),
            width:"200px"
        },
    ]
    const [data,setData]=useState([])
    const getProduct=async()=>{
        try {
            const res=await axios.get(`/log/getAll`)
            setData(res.data?.map(item=>(
                {id:item._id,api:item.apiUrl,status:item.statusCode,date:item.timestamp}
            )))
        } catch (err) {
            console.log(err)
        }
    }

    const [pageIndex,setPageIndex]=useState(0)
    const [pageSize,setPageSize]=useState(10)

    const onChange=({page,sort})=>{
        const {index:pageIndex,size:pageSize}=page
        setPageIndex(pageIndex)
        setPageSize(pageSize)
    }
    const itemOfPage=(data,pageIndex,pageSize,sortField,sortDirection)=>{

        let itemOfPages;
        if(!pageIndex && !pageSize){
            itemOfPages=data
        }else{
            itemOfPages=data.slice(pageIndex*pageSize,(pageIndex+1)*pageSize)
        }
        return {itemOfPages}
    }
    const {itemOfPages}=itemOfPage(data,pageIndex,pageSize)

    const paginations={
        pageIndex,
        pageSize,
        totalItemCount:data.length,
        pageSizeOptions:[0,10,20]
    }
    useEffect(()=>{
        getProduct()
    },[])

  return (
    <EuiPanel>
        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
            <EuiText><b>Nhật ký</b></EuiText>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiBasicTable
        tableLayout='auto'
        columns={columns}
        items={itemOfPages}
        pagination={paginations}
        onChange={onChange}
        />
    </EuiPanel>
  )
}
