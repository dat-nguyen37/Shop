import { EuiButton, EuiContextMenu, EuiModal, EuiModalBody, EuiTextArea } from '@elastic/eui'
import React, { useState } from 'react'
import axios from '../../axios'
import { toast,ToastContainer } from 'react-toastify'

export default function Report({setModalReport,shopId,productId}) {
    const [description,setDescription]=useState("")


    const handleReport=async(reason)=>{
        try {
            await axios.post("/report/create",{
                shopId:shopId,
                productId:productId,
                reason:reason,
                description:description
            })
            setModalReport(false)
            toast.success('Gửi yêu cầu thành công')
        } catch (error) {
            if(error.response&&error.response.status===401){
                toast.error('Bạn cần đăng nhập')
            }
            console.log(error)
        }
    }


    const reasons = [
        'Sản phẩm có dấu hiệu lừa đảo',
        'Hàng giả, hàng nhái',
        'Sản phẩm không rõ nguồn gốc, xuất xứ',
        'Hình ảnh sản phẩm không rõ ràng',
        'Khác',
      ];
      const panels = [
        {
          id: 0,
          title: 'Chọn lý do',
          items: reasons.map((reason, index) => ({
            name: reason,
            panel: index + 1,
          })),
        },
        ...reasons.map((reason, index) => ({
          id: index + 1,
          title: reason,
          content: (
            <>
              <EuiTextArea placeholder={`Nhập lý do: ${reason}`} onChange={(e)=>setDescription(e.target.value)}/>
              <EuiButton fill color="danger" onClick={()=>handleReport(reason)}>Gửi tố cáo</EuiButton>
            </>
          ),
        })),
      ];
  return (
    <EuiModal onClose={()=>setModalReport(false)}>
        <EuiModalBody className='customMenu'>
            <EuiContextMenu initialPanelId={0} panels={panels}/>
        </EuiModalBody>
    </EuiModal>
  )
}
