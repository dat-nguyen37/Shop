import { EuiButton, EuiButtonEmpty, EuiFlexGroup, EuiForm, EuiFormRow, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiSelect, EuiSpacer, EuiTextArea } from '@elastic/eui'
import React, { useState } from 'react'
import axios from '../../../axios'

export default function ViewReport({setViewReport,fetchReports,selectedReport}) {
    const [status,setStatus]=useState(selectedReport.status)

    const handleUpdate=async()=>{
        try {
            await axios.patch(`/report/update/${selectedReport._id}`,{status})
            fetchReports()
            setViewReport(false)
        } catch (err) {
            console.log(err)
        }
    }
    return (
    <EuiModal onClose={()=>setViewReport(false)}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Chi tiết tố cáo</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <EuiTextArea value={selectedReport.description}/>
        <EuiSpacer/>
        <EuiFormRow label="Trạng thái">
            <EuiSelect
            onChange={(e)=>setStatus(e.target.value)}
            value={status}
            options={[
                {value:"Đang xử lý",text:"Đang xử lý"},
                {value:"Đã giải quyết",text:"Đã giải quyết"},
                {value:"Đã từ chối",text:"Đã từ chối"},
            ]}/>
        </EuiFormRow>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiFlexGroup justifyContent='flexEnd'>
            <EuiButtonEmpty onClick={()=>setViewReport(false)}>Quay lại</EuiButtonEmpty>
            <EuiButton fill onClick={handleUpdate}>Xác nhận</EuiButton>
        </EuiFlexGroup>
      </EuiModalFooter>
    </EuiModal>
  )
}
