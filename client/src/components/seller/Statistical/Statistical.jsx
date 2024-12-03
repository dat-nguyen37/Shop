import { EuiAvatar, EuiButtonIcon, EuiFlexGroup,EuiPopover,EuiPopoverTitle,EuiButtonEmpty,EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiHeaderSectionItemButton, EuiIcon, EuiPageHeader, EuiPageHeaderContent, EuiPageTemplate, EuiSpacer, EuiText, EuiFlyout, EuiPageSidebar, EuiAccordion, EuiListGroup, EuiListGroupItem, EuiLink, EuiPanel, EuiFlexGrid, EuiStat } from '@elastic/eui'
import React, { useState } from 'react'
import Chart from 'react-apexcharts';


export default function Statistical() {
    const [chartOptions, setChartOptions]=useState({
        series: [{
            name: 'XYZ MOTORS',
            data: [1,2,3,4,5,6,7,8,9,10,11,12]
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
              text: 'Stock Price Movement',
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
                  return (val / 1000000).toFixed(0);
                },
              },
              title: {
                text: 'Price'
              },
            },
            xaxis: {
              type: 'datetime',
            },
            tooltip: {
              shared: false,
              y: {
                formatter: function (val) {
                  return (val / 1000000).toFixed(0)
                }
              }
            }
          },
    })
  return (
    <>
          <EuiPanel>
              <EuiFlexGroup direction='column' gutterSize='s'>
                  <EuiText><h3>Danh sách cần làm</h3></EuiText>
                  <EuiText>Những việc bạn sẽ phải làm</EuiText>
              </EuiFlexGroup>
              <EuiSpacer/>
              <EuiFlexGrid columns={4}>
                  <EuiFlexItem>
                      <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Chờ xác nhận" />
                  </EuiFlexItem>
                  <EuiFlexItem>
                      <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Chờ lấy hàng" />
                  </EuiFlexItem>
                  <EuiFlexItem>
                      <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Chờ xử lý" />
                  </EuiFlexItem>
                  <EuiFlexItem>
                      <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Đơn hàng" />
                  </EuiFlexItem>
                  <EuiFlexItem>
                      <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Sản phẩm bị tạm khóa" />
                  </EuiFlexItem>
                  <EuiFlexItem>
                      <EuiStat title="1" titleColor="primary" titleSize='s' style={{borderRight:'1px solid'}} reverse={true} textAlign='center' description="Sản phẩm hết hàng" />
                  </EuiFlexItem>
              </EuiFlexGrid>
          </EuiPanel>
          <EuiSpacer/>
          <EuiPanel>
              <EuiText><h3>Phân tích bán hàng</h3></EuiText>
              <EuiText>Tổng quan dữ liệu của shop đối với đơn hàng đã xác nhận</EuiText>
              <Chart options={chartOptions} series={chartOptions.series} type="area" height={350} />
          </EuiPanel>
    </>
)
}
