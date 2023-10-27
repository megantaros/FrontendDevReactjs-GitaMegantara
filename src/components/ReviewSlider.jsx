import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../src/index.css";
import Avatar from "../assets/user-avatar.svg";

const ReviewSlider = (props) => {
  const { data } = props;

  const publishedDate = (params) => {
    const newDate = new Date(params);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.toLocaleString("default", { day: "numeric" });
    const year = newDate.toLocaleString("default", { year: "numeric" });
    return `${month} ${day}, ${year}`;
  };

  const starsRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <input
          key={i}
          type="radio"
          name="rating-1"
          className="mask mask-star bg-primary xl:h-4 lg:w-4 h-3 w-3"
          disabled
        />
      );
    }
    return <div className="rating">{stars}</div>;
  };

  return (
    <Swiper
      modules={[Virtual, Navigation, Pagination]}
      slidesPerView={3}
      spaceBetween={10}
      breakpoints={{
        "@0.25": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        "@0.50": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        "@0.75": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        "@1.00": {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        "@1.50": {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }}
      centeredSlides={false}
      navigation={true}
      pagination={false}
      virtual
    >
      {data?.map((item) => (
        <SwiperSlide
          key={item?.review_id}
          virtualIndex={item?.review_id}
          className="rounded-md my-2"
        >
          <div className="card shadow-md bg-slate-100 rounded-md xl:h-60 lg:h-60 h-52 items-center">
            <div className="card-body p-6">
              <div className="flex flex-row items-center gap-2">
                <div className="h-12 w-12 bg-primary rounded-full overflow-hidden p-3">
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-semibold text-left text-primary xl:text-md lg:text-md text-sm">
                    {item?.author}
                  </h4>
                  <div className="flex flex-row items-center xl:text-sm lg:text-sm text-xs text-base-content gap-2">
                    {starsRating(item?.rating)}
                    <span>• {publishedDate(item?.published_date)}</span>
                  </div>
                </div>
              </div>
              <div className="my-2 xl:text-sm lg:text-sm text-xs text-primary flex flex-col items-start">
                <h2 className="font-semibold mb-2">{item?.title}</h2>
                <p>{item?.summary}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewSlider;
