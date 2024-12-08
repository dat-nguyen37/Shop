import { EuiButtonIcon, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';




export default function Slide() {
    const banners = [
        { id: 1, title: "Sự kiện Khuyến mãi 11/11", imageUrl: "/assets/slider/slide1.webp" },
        { id: 2, title: "Black Friday Sale", imageUrl: "/assets/slider/slide2.webp" },
        { id: 3, title: "Giáng sinh Rộn ràng", imageUrl: "/assets/slider/slide3.webp" },
        { id: 4, title: "Giáng sinh Rộn ràng", imageUrl: "/assets/slider/slide4.jpg" },
      ];
  return (
    <EuiFlexGroup style={{width:'100%'}}>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation,Autoplay]}
      >
        {banners.map(image=>(
            <SwiperSlide key={image.id} style={{textAlign:'center'}}>
                <EuiImage src={image.imageUrl} style={{width:'100%',objectFit:'cover'}}/>
            </SwiperSlide>
        ))}
      </Swiper>
      </EuiFlexGroup>
  )
}
