import { EuiAvatar, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormControlLayout, EuiFormRow, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiImage, EuiPageHeader, EuiPageHeaderContent, EuiPageTemplate, EuiPopover, EuiPopoverFooter, EuiPopoverTitle, EuiProgress, EuiSelect, EuiSelectable, EuiSpacer, EuiStep, EuiSteps, EuiSwitch, EuiText } from '@elastic/eui'
import React, { useState } from 'react'

export default function RegisterSeller() {
    const [isPoperUser,setisPopoverUser]=useState(false)
    const [isPoperCategory,setisPopoverCategory]=useState(false)
    const [options,setOptions]=useState([
        {label:'Thời trang nam'},
        {label:'Điện thoại & phụ kiện'},
        {label:'Thiết bị điện tử'},
        {label:'máy tính & laptop'},
        {label:'Đồng hồ'},
        {label:'Giày dép nam'}
    ])
    const selectOption=options.filter(option=>option.checked==='on')



    const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const steps = [
    {
      title: 'Thông tin shop',
      children: 
      <EuiFlexGroup>
        <EuiFlexItem>
            <EuiFormRow label="*Tên Shop">
                <EuiFieldText placeholder='Tên shop'/>
            </EuiFormRow>
            <EuiFormRow label="*Chọn danh mục đăng kí" >
                <EuiPopover
                panelStyle={{outline:'none',width:'400px'}}
                hasArrow={false}
                isOpen={isPoperCategory}
                closePopover={()=>setisPopoverCategory(false)}
                button={
                    <EuiFormControlLayout isDropdown style={{width:'500px'}} onClick={()=>setisPopoverCategory(!isPoperCategory)}>
                        <EuiFieldText placeholder='Danh mục' value={selectOption[0]?.label}/>
                    </EuiFormControlLayout>
                }>
                    <EuiSelectable
                    options={options}
                    onChange={(option)=>setOptions(option)}
                    singleSelection
                    searchable
                    searchProps={{placeholder:'Tìm kiếm danh mục'}}
                    >
                    {(list,search)=>(<>{search}{list}</>)}
                    </EuiSelectable>
                </EuiPopover>
            </EuiFormRow>   
            <EuiFormRow label="*Địa chỉ lấy hàng">
                <EuiFieldText placeholder='Địa chỉ lấy hàng'/>
            </EuiFormRow>
            <EuiFormRow label="*Email">
                <EuiFieldText placeholder='Email'/>
            </EuiFormRow>
            <EuiFormRow label="*Số điện thoại">
                <EuiFieldText placeholder='Số điện thoại'/>
            </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>,
    },
    {
      title: 'Cài đặt vận chuyển',
      children: 
      <EuiFlexGroup direction='column'>
        <EuiFlexItem>
            <EuiText>Phương thức vận chuyển</EuiText>
            <EuiText size='xs'>Kích hoạt phương thức vận chuyển phù hợp</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFormRow label="Hỏa tốc">
                <EuiFieldText value="Hỏa Tốc" 
                append={
                    <EuiFlexGroup alignItems='center' justifyContent='center'>
                        <EuiSwitch label="Kích hoạt" checked={false} compressed/>
                    </EuiFlexGroup>
                }
                />
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFormRow label="Nhanh">
                <EuiFieldText value="Nhanh" 
                append={
                    <EuiFlexGroup alignItems='center' justifyContent='center'>
                        <EuiSwitch label="Kích hoạt" checked={false} compressed/>
                    </EuiFlexGroup>
                }
                />
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFormRow label="Tiết kiệm">
                <EuiFieldText value="Tiết Kiệm" 
                append={
                    <EuiFlexGroup alignItems='center' justifyContent='center'>
                        <EuiSwitch label="Kích hoạt" checked={false} compressed/>
                    </EuiFlexGroup>
                }
                />
            </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>,
    },
    {
      title: 'Hoàn thành',
      children: 
      <EuiText>
        <h2>Hoàn tất quá trình đăng kí người bán</h2>
        <p>Thông tin của bạn đã được gửi đi. Thời gian phản hồi trong khoảng 6-12h từ lúc yêu cầu được gửi đi.</p>
      </EuiText>,
    },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep >0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const getButtonColor = () => {
    return currentStep === totalSteps - 1 ? 'success' : 'primary';
  };
  return (
    <EuiPageTemplate>
        <EuiPageHeader
        style={{position:'fixed',top:0,zIndex:1000,width:'100%',background:'white'}}
        pageTitle={
            <EuiPageHeaderContent>
                <EuiHeader style={{width:'100%'}}>
                    <EuiHeaderSection>
                        <EuiFlexGroup>
                            <EuiHeaderSectionItem>
                                <EuiImage src='/assets/logo.webp' height={45}/>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                                <EuiText>Đăng ký trở thành người bán</EuiText>
                            </EuiHeaderSectionItem>
                        </EuiFlexGroup>
                    </EuiHeaderSection>
                    <EuiHeaderSection side='right'>
                        <EuiFlexGroup responsive={false}>
                            <EuiHeaderSectionItem>
                                <EuiAvatar name='D'/>
                                <EuiPopover button={
                                    <EuiHeaderSectionItemButton>
                                        <EuiPopover
                                        anchorPosition='downLeft'
                                        panelStyle={{outline:'none'}}
                                        isOpen={isPoperUser}
                                        closePopover={()=>setisPopoverUser(false)}
                                        button={
                                            <EuiFlexGroup alignItems='center' responsive={false} gutterSize='s' onClick={()=>setisPopoverUser(!isPoperUser)}>
                                                <EuiFlexItem>
                                                    <EuiText>Dat Nguyen</EuiText>
                                                </EuiFlexItem>
                                                <EuiFlexItem>
                                                    <EuiIcon type="arrowDown"/>
                                                </EuiFlexItem>
                                            </EuiFlexGroup>
                                        }>
                                            <EuiPopoverTitle>
                                                <EuiFlexGroup direction='column' gutterSize='s' alignItems='center'>
                                                    <EuiAvatar name='D' imageUrl=''/>
                                                    <EuiText>Dat nguyen</EuiText>
                                                </EuiFlexGroup>
                                            </EuiPopoverTitle>
                                            <EuiButtonEmpty iconType="exit">Đăng xuất</EuiButtonEmpty>
                                        </EuiPopover>
                                    </EuiHeaderSectionItemButton>
                                }>
                                    
                                </EuiPopover>
                            </EuiHeaderSectionItem>
                        </EuiFlexGroup>
                    </EuiHeaderSection>
                </EuiHeader>
            </EuiPageHeaderContent>
    }
    />
    <EuiPageTemplate.Header alignItems='center'>
        <EuiFlexGroup direction='column'>
            <EuiSteps steps={steps.slice(0, currentStep + 1)} titleSize='xs'/>
            <EuiFlexItem grow={false} style={{alignSelf:'flex-end'}}>
                <EuiFlexGroup>
                    {currentStep>0&&<EuiButton fill onClick={handlePrev}>
                        Quay lại
                    </EuiButton>}
                    <EuiButton fill color={getButtonColor()} onClick={handleNext}>
                        {currentStep === totalSteps - 1 ? 'Hoàn thành' : 'Tiếp tục'}
                    </EuiButton>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate.Header>
    </EuiPageTemplate>
  )
}
