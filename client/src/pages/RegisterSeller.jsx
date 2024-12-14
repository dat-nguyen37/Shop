import { EuiAvatar, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormControlLayout, EuiFormRow, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiImage, EuiLink, EuiPageHeader, EuiPageHeaderContent, EuiPageTemplate, EuiPopover, EuiPopoverFooter, EuiPopoverTitle, EuiProgress, EuiSelect, EuiSelectable, EuiSpacer, EuiStep, EuiSteps, EuiSwitch, EuiText } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../axios'
import { AuthContext } from '../context/AuthContext'

export default function RegisterSeller() {
    const [isPoperUser,setisPopoverUser]=useState(false)
    const [isPoperCategory,setisPopoverCategory]=useState(false)
    const [categories,setCategories]=useState([])
    const {user} =useContext(AuthContext)
    const [listShip,setListShip]=useState([])

    useEffect(()=>{
        const getShip=async()=>{
            try {
                const res=await axios.get('/ship/getAll')
                setListShip(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getShip()
    },[])

    useEffect(()=>{
        const getcategories=async()=>{
            try {
                const res=await axios.get('/category/getAll')
                setCategories(res.data.map(item=>(
                    {id:item._id,label:item.name}
                )))
            } catch (err) {
                console.log(err)
            }
        }
        getcategories()
    },[])
    const selectCategory=categories.filter(category=>category.checked==='on')
    const [selectedShip,setSelectShip]=useState([])
    const changeShip=(id)=>(e)=>{
        if (e.target.checked) {
            setSelectShip((prev) => [...prev, id]);
        } else {
            setSelectShip((prev) => prev.filter((shipId) => shipId !== id));
        }
    }


    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 3;

    const [value,setValue]=useState({
        name:'',
        address:'',
        ownerName:'',
        email:'',
        phone:'',

    })
    const [errors,setErrors]=useState({
        name:'',
        categoryId:'',
        address:'',
        ownerName:'',
        email:'',
        phone:'',
        ship:''
    })
    const onChange=(field)=>(e)=>{
        setValue({
            ...value,
            [field]:e.target.value
        })
    }
    const handleRegisterSeller=async()=>{
        try {
            await axios.post('/shop/create',{
                name:value.name,
                categoryId:selectCategory[0]?.id,
                address:value.address,
                ownerName:value.ownerName,
                email:value.email,
                phone:value.phone,
                ship:selectedShip,
            })
            setValue()
            setErrors({})
            setCurrentStep(2)
        } catch (err) {
            if(err.response && err.response.data.errors){
                setErrors(err.response.data.errors)
            }else{
                console.log(err)
            }
        }
    }

    const steps = [
        {
        title: 'Thông tin shop',
        children: 
        <EuiFlexGroup>
            <EuiFlexItem>
                <EuiFormRow label="*Tên Shop" isInvalid={!!errors.name} error={errors.name}>
                    <EuiFieldText placeholder='Tên shop' onChange={onChange('name')}error={errors.name}/>
                </EuiFormRow>
                <EuiFormRow label="*Chọn danh mục đăng kí" isInvalid={!!errors.categoryId} error={errors.categoryId}>
                    <EuiPopover
                    panelStyle={{outline:'none',width:'400px'}}
                    hasArrow={false}
                    isOpen={isPoperCategory}
                    closePopover={()=>setisPopoverCategory(false)}
                    button={
                        <EuiFormControlLayout isDropdown style={{width:'500px'}} onClick={()=>setisPopoverCategory(!isPoperCategory)}>
                            <EuiFieldText placeholder='Danh mục' value={selectCategory[0]?.label} isInvalid={!!errors.categoryId}/>
                        </EuiFormControlLayout>
                    }>
                        <EuiSelectable
                        options={categories}
                        onChange={(category)=>setCategories(category)}
                        singleSelection
                        searchable
                        searchProps={{placeholder:'Tìm kiếm danh mục'}}
                        >
                        {(list,search)=>(<>{search}{list}</>)}
                        </EuiSelectable>
                    </EuiPopover>
                </EuiFormRow>   
                <EuiFormRow label="*Địa chỉ lấy hàng" isInvalid={!!errors.address} error={errors.address}>
                    <EuiFieldText placeholder='Địa chỉ lấy hàng' onChange={onChange('address')} isInvalid={!!errors.address}/>
                </EuiFormRow>
                <EuiFormRow label="*Tên người sở hữu" isInvalid={!!errors.ownerName} error={errors.ownerName}>
                    <EuiFieldText placeholder='Tên người sở hữu' onChange={onChange('ownerName')} isInvalid={!!errors.ownerName}/>
                </EuiFormRow>
                <EuiFormRow label="*Email" isInvalid={!!errors.email} error={errors.email}>
                    <EuiFieldText placeholder='Email' onChange={onChange('email')} isInvalid={!!errors.email}/>
                </EuiFormRow>
                <EuiFormRow label="*Số điện thoại" isInvalid={!!errors.phone} error={errors.phone}>
                    <EuiFieldText placeholder='Số điện thoại' onChange={onChange('phone')} isInvalid={!!errors.phone}/>
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
            {listShip?listShip.map(item=>(<EuiFlexItem>
                <EuiFormRow isInvalid={!!errors.ship} error={errors.ship}>
                    <EuiFieldText value={item.name}
                    append={
                        <EuiFlexGroup alignItems='center' justifyContent='center'>
                            <EuiSwitch label="Kích hoạt" 
                            checked={selectedShip.includes(item._id)} 
                            onChange={changeShip(item._id)} compressed/>
                        </EuiFlexGroup>
                    }
                    />
                </EuiFormRow>
            </EuiFlexItem>)):<EuiText><b>Không tìm thấy phuwong thức vận chuyển</b></EuiText>}
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
                                <EuiLink href='/'><EuiImage src='/assets/logo.png' height={45}/></EuiLink>
                            </EuiHeaderSectionItem>
                            <EuiHeaderSectionItem>
                                <EuiText>Đăng ký trở thành người bán</EuiText>
                            </EuiHeaderSectionItem>
                        </EuiFlexGroup>
                    </EuiHeaderSection>
                    <EuiHeaderSection side='right'>
                        <EuiFlexGroup responsive={false}>
                            <EuiHeaderSectionItem>
                                <EuiAvatar name='D' imageUrl={user?.imageUrl}/>
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
                                                    <EuiText>{user?.name}</EuiText>
                                                </EuiFlexItem>
                                                <EuiFlexItem>
                                                    <EuiIcon type="arrowDown"/>
                                                </EuiFlexItem>
                                            </EuiFlexGroup>
                                        }>
                                            <EuiPopoverTitle>
                                                <EuiFlexGroup direction='column' gutterSize='s' alignItems='center'>
                                                    <EuiAvatar name='D' imageUrl={user?.imageUrl}/>
                                                    <EuiText>{user?.name}</EuiText>
                                                </EuiFlexGroup>
                                            </EuiPopoverTitle>
                                            <EuiFlexGroup>
                                                <EuiButtonEmpty iconType="globe" href='/'>Đến website</EuiButtonEmpty>
                                                <EuiButtonEmpty iconType="exit">Đăng xuất</EuiButtonEmpty>
                                            </EuiFlexGroup>
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
                    {currentStep===1&&<EuiButton fill onClick={handlePrev}>
                        Quay lại
                    </EuiButton>}
                    {currentStep<1&&<EuiButton fill onClick={handleNext}>
                        Tiếp tục
                    </EuiButton>}
                    {currentStep===1&&<EuiButton fill color={getButtonColor()} onClick={handleRegisterSeller}>
                        Gửi yêu cầu
                    </EuiButton>}
                    {currentStep===2&&<EuiButton fill color={getButtonColor()} onClick={()=>setCurrentStep(0)}>
                        Hoàn thành
                    </EuiButton>}
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPageTemplate.Header>
    </EuiPageTemplate>
  )
}
