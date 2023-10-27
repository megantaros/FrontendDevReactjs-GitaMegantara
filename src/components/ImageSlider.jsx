import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../src/index.css";

const ImageSlider = (props) => {
  const { data } = props;
  return (
    <Swiper
      className="h-24 w-full"
      modules={[Virtual, Navigation, Pagination]}
      slidesPerView={2}
      spaceBetween={10}
      breakpoints={{
        "@0.25": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        "@0.50": {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        "@0.75": {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        "@1.00": {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        "@1.50": {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }}
      centeredSlides={false}
      navigation={false}
      pagination={false}
      virtual
    >
      {data?.map((item, index) => (
        <SwiperSlide
          key={item?.id}
          virtualIndex={index}
          className="rounded-md text-center flex justify-center items-center bg-white"
        >
          <img
            onClick={() => window.open(item?.image_url, "_blank")}
            src={item?.image_url}
            alt={item?.title}
            className="object-cover w-full h-full rounded-lg block cursor-pointer"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
