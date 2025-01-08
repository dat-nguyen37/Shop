import { EuiButtonIcon, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from "../../axios"



export default function Slide() {
    const [slides,setSlides]=useState([])
      const getSlides=async()=>{
        try {
          const res=await axios.get("/slide/getByActive")
          setSlides(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      useEffect(()=>{
        getSlides()
      },[])
  return (
    <EuiFlexGroup style={{width:'100%'}}>
        {slides.length&&<Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation,Autoplay]}
      >
        {slides.map(image=>(
            <SwiperSlide key={image._id} style={{textAlign:'center'}}>
                <EuiImage src={image.imageUrl} style={{width:'100%',objectFit:'cover'}}/>
            </SwiperSlide>
        ))}
        </Swiper>}
      </EuiFlexGroup>
  )
}
