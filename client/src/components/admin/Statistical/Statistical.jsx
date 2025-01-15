import React, { useContext, useEffect, useState } from 'react'
import { EuiButtonEmpty, EuiButtonIcon,EuiFlexGroup,EuiListGroup,EuiListGroupItem,EuiAccordion,EuiHeaderSectionItemButton,EuiIcon,EuiText,EuiPopover,EuiFlexItem,EuiAvatar, EuiFlyout, EuiFlyoutBody, EuiFlyoutFooter, EuiFlyoutHeader, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiPageHeader, EuiPageHeaderContent, EuiPageTemplate, EuiLink, EuiFlexGrid, EuiPanel, EuiStat, EuiImage, EuiHorizontalRule, EuiSpacer } from '@elastic/eui'
import {Outlet} from 'react-router-dom'
import {AuthContext} from '../../../context/AuthContext'
import axios from '../../../axios'
import {CartesianAxis, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import Chart from "react-apexcharts"

export default function Dashboard() {
    const {user,dispatch}=useContext(AuthContext)
    const [users,setUsers]=useState([])
    const [shops,setShops]=useState([])
    const [products,setProducts]=useState([])
    const [data, setData] = useState([]);
    const [totalAmount,setTotalAmount]=useState(0)

    const getUser=async()=>{
        try {
            const res=await axios.get("/user/getAll")
            setUsers(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const getShops=async()=>{
        try {
            const res=await axios.get('/shop/getAll')
            setShops(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    
    const getProduct=async()=>{
        try {
            const res=await axios.get(`/product/getAll`)
            setProducts(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getUser()
        getShops()
        getProduct()
    },[])


    const groupDataByYearAndMonth = () => {
        const groupedData = {};
      
        // Hàm lấy năm và tháng từ `createdAt`
        const getYearAndMonth = (date) => {
          const d = new Date(date);
          return { year: d.getFullYear(), month: d.getMonth() + 1 };
        };
      
        // Hàm thêm dữ liệu vào groupedData
        const addToGroup = (year, month, type) => {
          if (!groupedData[year]) groupedData[year] = Array(12).fill(0).map(() => ({ user: 0, shop: 0, product: 0 }));
          groupedData[year][month - 1][type] += 1;
        };
      
        // Gộp users
        users.forEach((user) => {
          const { year, month } = getYearAndMonth(user.createdAt);
          addToGroup(year, month, "user");
        });
      
        // Gộp shops
        shops.forEach((shop) => {
          const { year, month } = getYearAndMonth(shop.createdAt);
          addToGroup(year, month, "shop");
        });
      
        // Gộp products
        products.forEach((product) => {
          const { year, month } = getYearAndMonth(product?.createdAt);
          addToGroup(year, month, "product");
        });
      
        // Chuyển groupedData thành mảng
        const result = Object.entries(groupedData).map(([year, months]) => ({
          year: parseInt(year),
          months,
        }));
      
        setData(result);
      };
      
      useEffect(() => {
        if (users.length && shops.length && products.length) {
            groupDataByYearAndMonth();
        }
      }, [users, shops, products]);
      
      const dataByYear=data.filter(d=>d.year===2024)
      console.log(dataByYear)

      //order
      const [orders,setOrders]=useState([])
      const [chartPaymentMethod, setChartPaymentMethod] = useState({
        series: [],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ["Online","Tiền mặt"],
          title:{
            text:"Biểu đồ phân bố phương thức thanh toán"
          },
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
    const [chartConfimationStatus, setChartConfimationStatus] = useState({
        series: [],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ["Đã hủy","Thành công"],
          title:{
            text:"Biểu đồ trạng thái đơn hàng"
          },
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
    const getorder=async()=>{
        try {
            const res=await axios.get("/order/getAll")
            setOrders(res.data)
            setTotalAmount(res.data.reduce((sum,item)=>{
                return sum+item.price
            },0))
            const onlineCount = res.data.filter(order => order.paymentMethod === "VNpay").length;
            const cashCount = res.data.filter(order => order.paymentMethod === "COD").length;
            setChartPaymentMethod(prev => ({
                ...prev,
                series: [onlineCount, cashCount],
            }));
            let canceledOrders = 0;
            let successfulOrders = 0;

            res.data.forEach(order => {
                order.product.forEach(item => {
                    if (item.confimationStatus === "Đã hủy") {
                        canceledOrders++;
                    } else if (item.confimationStatus === "Đã giao") {
                        successfulOrders++;
                    }
                });
            });
            setChartConfimationStatus(prev => ({
                ...prev,
                series: [canceledOrders, successfulOrders],
            }));
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getorder()
    },[])


  return (
        <EuiPageTemplate.Section grow={false}>
            <EuiFlexGrid columns={4}>
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiStat title={users.length} description="Người dùng" />
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiStat title={shops.length} description="Cửa hàng" />
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiStat title={products.length} description="Sản phẩm" />
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiStat title={totalAmount?.toLocaleString()} description="Doanh thu" />
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGrid>
            <EuiSpacer/>
            <EuiPanel>
                <EuiText><h2>Thống kê</h2></EuiText>
                <EuiSpacer/>
            <LineChart width={730} height={250} data={dataByYear[0]?.months}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="user" stroke="#8884d8" />
                <Line type="monotone" dataKey="shop" stroke="#82ca9d" />
                <Line type="monotone" dataKey="product" stroke="#FF0000" />
            </LineChart>
            </EuiPanel>
            <EuiSpacer/>
            <EuiFlexGroup>
                <EuiFlexItem>
                    <EuiPanel>
                        <Chart options={chartPaymentMethod.options} series={chartPaymentMethod.series} type="pie" width={380} />
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel>
                        <Chart options={chartConfimationStatus.options} series={chartConfimationStatus.series} type="pie" width={380} />
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiPageTemplate.Section>

  )
}
