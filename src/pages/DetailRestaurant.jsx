import { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import "../../src/index.css";
import Loading from "../components/Loading";
import https from "../api/https";

const LazyComponent = lazy(() => import("../components/HeaderDetail"));
const LazyReview = lazy(() => import("../components/ReviewSlider"));

const DetailRestaurant = () => {
  const [data, setData] = useState({
    name: "",
    cuisine: null,
    rating: "",
    description: "",
    photo: null,
    reviews: [],
    published_date: null,
  });

  const { location_id } = useParams();

  const getDetailRestaurant = async (location_id) => {
    try {
      const response = await https().get(`get-details`, {
        params: {
          location_id: location_id,
          currency: "USD",
          lang: "en_US",
        },
      });
      const data = response.data;
      setData({
        name: data?.name,
        cuisine: data?.cuisine?.map((item) => item.name).join(" • "),
        rating: data?.rating,
        description: data?.description,
        photo: data?.photo?.images?.large?.url,
        reviews: data?.reviews,
        published_date: data?.published_date,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetailRestaurant(location_id);
  }, [location_id]);

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <LazyComponent {...data} />
      </Suspense>
      <section className="container py-8">
        <h2 className="text-2xl mb-6 font-semibold">Review</h2>
        <Suspense fallback={<Loading />}>
          <LazyReview data={data?.reviews} />
        </Suspense>
      </section>
    </main>
  );
};
export default DetailRestaurant;
