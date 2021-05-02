import React, { memo, useEffect } from "react";
import Swiper  from "swiper";
import { SwiperOptions } from 'swiper';
import "swiper/css/swiper.min.css";

const slider_list = [
  {
    id: 1,
    picUrl:
      "https://static001.geekbang.org/resource/image/50/ff/50d16dd5d14de7d3d60e59b3fe5e82ff.jpg",
    linkUrl: "#",
  },
  {
    id: 2,
    picUrl:
      "https://static001.geekbang.org/resource/image/18/3c/18fe9b2230d363bdec4ab2ba5c939b3c.png",
    linkUrl: "#",
  },
  {
    id: 3,
    picUrl:
      "https://static001.geekbang.org/resource/image/96/15/96fc5769be076d9ea6aa88f13dc99115.png",
    linkUrl: "#",
  },
  {
    id: 4,
    picUrl:
      "https://static001.geekbang.org/resource/image/20/ea/204d6a93eec84e73c79bb82e7aa52bea.png",
    linkUrl: "#",
  },
  {
    id: 5,
    picUrl:
      "https://static001.geekbang.org/resource/image/7e/0a/7e672bcf2ae2yyd8880c81860b94720a.jpg",
    linkUrl: "#",
  },
];

const swiperParams: SwiperOptions = {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay:{
    delay:5000,
  },
};
const HomeSwiper = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mySwiper = new Swiper(".swiper-container",swiperParams);
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {slider_list.map((slider) => {
          return (
            <div className="swiper-slide" key={slider.id}>
              <a href={slider.linkUrl} className="slider-nav">
                <img
                  src={slider.picUrl}
                  alt={slider.picUrl}
                  width="100%"
                  height="100%"
                />
              </a>
            </div>
          );
        })}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default memo(HomeSwiper);
