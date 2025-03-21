import React from "react";
import {} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface ContainerProps {
  data: {
    title: string;
    content: string;
  }[];
}

const HomeBunner: React.FC<ContainerProps> = ({ data }) => {
  return (
    <div className="banner-section">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="banner-swiper"
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="slide-content">
              <h1>{item.title}</h1>
              <p>{item.content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBunner;
