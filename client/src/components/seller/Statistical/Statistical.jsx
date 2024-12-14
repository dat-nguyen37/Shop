import { EuiAvatar, EuiButtonIcon, EuiFlexGroup,EuiPopover,EuiPopoverTitle,EuiButtonEmpty,EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiPageHeader, EuiPageHeaderContent, EuiPageTemplate, EuiSpacer, EuiText, EuiFlyout, EuiPageSidebar, EuiAccordion, EuiListGroup, EuiListGroupItem, EuiLink, EuiPanel, EuiFlexGrid, EuiStat, EuiImage, EuiFilePicker, EuiInlineEditText, EuiButton, EuiSelect, EuiFormRow } from '@elastic/eui'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Chart from 'react-apexcharts';
import { ShopContext } from '../../../context/ShopContext';
import moment from 'moment';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { imgDb } from '../../../firebase';
import axios from '../../../axios'
import {toast,ToastContainer} from 'react-toastify'

export default function Statistical() {
  const {shop,dispatch}=useContext(ShopContext)

  const [data,setData]=useState({
    name:shop.name,
    phone:shop.phone,
    email:shop.email,
    avatar:shop.avatar,
    background:shop.background,
    address:shop.address,
  })


    const avataRef = useRef();
    const handleAvatar=()=>{
      if (avataRef.current?.fileInput) {
        avataRef.current.fileInput.click(); 
      }
    }
    const avataChange=(files)=>{
      const file=Array.from(files)[0]
      try {
          const imgRef = ref(imgDb, `/avata/${file.name}`);
          const uploadTask = uploadBytesResumable(imgRef, file);
          uploadTask.on(
              "state_changed",
              (snapshot) => {
                  const percent=Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              },
              (err) => console.log(err),
              async () => {
                  const url = await getDownloadURL(uploadTask.snapshot.ref);
                  data.avatar=url
              }
          );
      } catch (err) {
          console.error("Error uploading image:", err);
      }
    }

    const backgroundRef = useRef();
    const handleBackground=()=>{
      if (backgroundRef.current?.fileInput) {
        backgroundRef.current.fileInput.click(); 
      }
    }
    const backgroundChange=(files)=>{
      const file=Array.from(files)[0]
      try {
          const imgRef = ref(imgDb, `/avata/${file.name}`);
          const uploadTask = uploadBytesResumable(imgRef, file);
          uploadTask.on(
              "state_changed",
              (snapshot) => {
                  const percent=Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              },
              (err) => console.log(err),
              async () => {
                  const url = await getDownloadURL(uploadTask.snapshot.ref);
                  data.background=url

              }
          );
      } catch (err) {
          console.error("Error uploading image:", err);
      }
    }
    const handleSave=(field,value)=>{
      setData({
          ...data,
          [field]:value
      })
  }
  const updateShop=async()=>{
    try {
        const res=await axios.patch('/shop/update/'+shop._id,data)
       dispatch({type:'SET_SHOP_SUCCESS',payload:res.data})
       toast.success('Cập nhật thành công')
    } catch (err) {
        console.log(err)
       toast.success('Cập nhật thất bại')
    }
}

  const [product,setProduct]=useState([])
  const [order,setOrder]=useState([])
  const getProduct=async()=>{
    try {
      const res=await axios.get("/product/getProductByShop/"+shop._id)
      setProduct(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const getOrder=async()=>{
    try {
      const res=await axios.get("/order/getByShop/"+shop._id)
      setOrder(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const [year,setYear]=useState(2024)
  const [totalAmount,setTotalAmount]=useState(0)
  const [dataStatistical,setDataStatistical]=useState()
  const [bestSelling,setBestSelling]=useState([])

  const getStatistical=async()=>{
    try {
      const res=await axios.get(`/order/statistical?shopId=${shop._id}`)
      setTotalAmount(res.data.totalAmount)
      setDataStatistical(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  
  const getBestSelling=async()=>{
    try {
      const res=await axios.get('/product/getBestSellingByShop/'+shop._id)
      setBestSelling(res.data)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  const [chartOptions, setChartOptions]=useState({
    series: [{
        name: 'Tháng',
        data: []
      }],
      options: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Doanh thu theo tháng',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return `${(val / 1000000).toFixed(0)}`;
            },
          },
          title: {
            text: 'Doanh thu (triệu)'
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            // formatter: function (val) {
            //   const date = new Date(val);
            //   return `${date.getMonth() + 1}/${date.getFullYear()}`; // Hiển thị dạng tháng/năm
            // },
          },
          title: {
            text: 'Tháng',
          },
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return `${(val / 1000000).toFixed(2)} triệu`;
            }
          }
        }
      },
  })
const [donutOptions, setDonutOptions] = useState({   
  series: [],
  options: {
    chart: {
      type: 'donut',
    },
    labels:[],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },


});
const [barOptions, setBarOptions] = useState({
  series: [{
    data: []
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [],
    }
  },


});

  useEffect(()=>{
    getProduct()
    getOrder()
    getBestSelling()
    getStatistical()
  },[])
  useEffect(() => {
    if (!dataStatistical?.data) return;
    const result = dataStatistical.data.filter(data => data.year.toString() === year.toString());

    const series = result[0]?.monthlyRevenue?.map(item => [item.month, item.revenue]) || [];

    setChartOptions(prevOptions => ({
        ...prevOptions,
        series: [{ name: 'Doanh thu', data: series }],
    }));
    setDonutOptions({
      ...donutOptions,
      series: dataStatistical.data.map(item => item.total),
      options: {
        ...donutOptions.options,
        labels: dataStatistical.data.map(item => `Năm ${item.year.toString()}`)
      }
    });
    setBarOptions({
      ...barOptions,
      series: [{name:"Số lượng",data: bestSelling.map(data=>data.quantitySold) }],
      options: {
        ...donutOptions.options,
        xaxis: {categories:bestSelling.map(item => item.name)}
      }
    })
}, [year, dataStatistical,bestSelling]);


  
  return (
    <>
    <ToastContainer/>
    <EuiPanel>
    <EuiFlexGroup gutterSize='m'>
            <EuiFlexItem>
              <div style={{position:'relative',border:'2px solid gray',borderRadius:'10px',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                {data.background?<EuiImage src={data.background} allowFullScreen height="150" size='fullWidth'/>
                :<EuiFlexGroup style={{height:150}} alignItems='center' justifyContent='center' gutterSize='s'>
                  <EuiLink size='s' onClick={handleBackground}>Thêm ảnh nền</EuiLink>
                  <div style={{display:'none'}}>
                    <EuiFilePicker
                    ref={backgroundRef}
                    onChange={backgroundChange}
                    display="default" 
                    style={{}}
                  />
                  </div>
                  </EuiFlexGroup>}
                  {data.background&&<div style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></div>}
                <EuiFlexGroup direction='column' gutterSize='s' style={{position:'absolute',bottom:0}}>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <div style={{position:'relative'}}>
                      <EuiAvatar name='Shop' imageUrl={data.avatar?data.avatar:'/assets/image.png'} color="#FFFFFF" size='xl' style={{border:'2px solid gray'}}/>
                      <EuiAvatar name='Avatar' size='s' imageUrl='/assets/camera.png' onClick={handleAvatar} color="#FFFFFF" style={{position:'absolute',bottom:0,right:0,border:'2px solid gray'}} />
                      <div style={{ display: 'none'}}>
                        <EuiFilePicker
                            ref={avataRef}
                            onChange={avataChange}
                            display="default" 
                          />
                      </div>
                    </div>
                    <p>
                      <EuiText color='white'>{data.name}</EuiText>
                      <EuiText color='white' size='xs'>id: {shop._id}</EuiText>
                    </p>
                  </EuiFlexGroup>
                </EuiFlexGroup>
              </div>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFlexGroup direction='column' gutterSize='s'>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <EuiText>Tên cửa hàng:</EuiText>
                    <EuiInlineEditText defaultValue={data.name} onSave={(newvalue)=>handleSave('name',newvalue)}  inputAriaLabel="Edit name inline"/>
                  </EuiFlexGroup>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <EuiText>Số điện thoại:</EuiText>
                    <EuiInlineEditText defaultValue={data.phone} onSave={(newvalue)=>handleSave('phone',newvalue)}  inputAriaLabel="Edit phone inline"/>
                  </EuiFlexGroup>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <EuiText>Email:</EuiText>
                    <EuiInlineEditText defaultValue={data.email} onSave={(newvalue)=>handleSave('email',newvalue)}  inputAriaLabel="Edit email inline"/>
                  </EuiFlexGroup>
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
            <EuiFlexGroup direction='column' gutterSize='s'>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <EuiText>Địa chỉ:</EuiText>
                    <EuiInlineEditText defaultValue={data.address} onSave={(newvalue)=>handleSave('address',newvalue)}  inputAriaLabel="Edit address inline"/>
                  </EuiFlexGroup>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <EuiText>Ngày hoạt động: {moment(shop.createdAt).format("DD-MM-YYYY")}</EuiText>
                  </EuiFlexGroup>
                  <EuiFlexGroup alignItems='center' gutterSize='s'>
                    <EuiButton fill onClick={updateShop}>Lưu thay đổi</EuiButton>
                  </EuiFlexGroup>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    </EuiPanel>
    <EuiSpacer/>
      <EuiPanel>
          <EuiFlexGroup direction='column' gutterSize='s'>
              <EuiText><h3>Danh sách cần làm</h3></EuiText>
              <EuiText>Những việc bạn sẽ phải làm</EuiText>
          </EuiFlexGroup>
          <EuiSpacer/>
          <EuiFlexGrid columns={4}>
              <EuiFlexItem>
                  <EuiStat title={product.length} titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Sản phẩm" />
              </EuiFlexItem>
              <EuiFlexItem>
                  <EuiStat title={product.filter(p=>p.status==="cấm bán").length} titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Sản phẩm bị tạm khóa" />
              </EuiFlexItem>
              <EuiFlexItem>
                  <EuiStat title={product.filter(p=>p.status==="hết hàng").length} titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Sản phẩm hết hàng" />
              </EuiFlexItem>
              <EuiFlexItem>
                  <EuiStat title={order.length} titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Đơn hàng" />
              </EuiFlexItem>
              <EuiFlexItem>
                  <EuiStat title={order.filter(o=>o.confimationStatus==="Chưa xác nhận").length} titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Chờ xác nhận" />
              </EuiFlexItem>
              <EuiFlexItem>
                  <EuiStat title={order.filter(o=>o.confimationStatus!=="Chưa xác nhận"&&o.confimationStatus!=="Đã giao"&&o.confimationStatus!=="Đã hủy").length} titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Chờ lấy hàng" />
              </EuiFlexItem>
              <EuiFlexItem>
                  <EuiStat title={order.filter(o=>o.confimationStatus==="Đã giao").length} titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Đơn hoàn thành" />
              </EuiFlexItem>
              <EuiFlexItem>
                  <EuiStat title={totalAmount?.toLocaleString()} titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Doanh thu" />
              </EuiFlexItem>
          </EuiFlexGrid>
      </EuiPanel>
      <EuiSpacer/>
      <EuiPanel>
          <EuiText><h3>Phân tích bán hàng</h3></EuiText>
          <EuiText>Tổng quan dữ liệu của shop đối với đơn hàng đã hoàn thành</EuiText>
          <EuiSpacer/>
          <EuiFormRow style={{width:"100px"}}>
            <EuiSelect
              value={year}
              onChange={e=>setYear(e.target.value)}
              options={[
                {value:"2026",label:"2026"},
                {value:"2025",label:"2025"},
                {value:"2024",label:"2024"},
                {value:"2023",label:"2023"},
              ]}/>
          </EuiFormRow>
          <EuiFlexGroup justifyContent='center'>
            <EuiText><b>Doanh thu theo tháng (năm {year})</b></EuiText>
          </EuiFlexGroup>
          <Chart options={chartOptions} series={chartOptions.series} type="area" height={350} />
      </EuiPanel>
      <EuiSpacer/>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel>
              <Chart options={donutOptions.options} series={donutOptions.series} type="donut" />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel>
              <Chart options={barOptions.options} series={barOptions.series} type="bar" height={350} />
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
    </>
)
}
