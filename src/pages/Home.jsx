import { Suspense, lazy, useEffect, useState } from "react";
import "../../src/index.css";
import http from "../api/https";
import Loading from "../components/Loading";

const LazyComponent = lazy(() => import("../components/RestaurantItem"));

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);

  const getRestaurants = async () => {
    await http()
      .get(`list`, {
        params: {
          currency: "USD",
          lang: "en_US",
          location_id: 293918,
          limit: 28,
          offset: 0,
        },
      })
      .then((res) => {
        setData(
          res.data.data.filter((item) => item.name !== undefined).slice(0, 8)
        );
        setSelectOptions(
          res.data.data.filter((item) => item.name !== undefined).slice(0, 8)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoad = async () => {
    setIsLoading(true);
    await http()
      .get(`list`, {
        params: {
          currency: "USD",
          lang: "en_US",
          location_id: 293918,
          limit: 28,
          offset: data.length,
        },
      })
      .then((res) => {
        const newData = res.data.data.filter((item) => item.name !== undefined);
        setData(data.concat(newData));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const options = selectOptions.filter((item) => item.price !== undefined);

  options.sort((a, b) => {
    const getPriceMin = (str) => {
      const match = str.match(/\$(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const priceA = getPriceMin(a.price);
    const priceB = getPriceMin(b.price);

    return priceA - priceB;
  });

  const sortedOptions = options.map((item) => (
    <option key={item.location_id} value={item.price}>
      {item.price}
    </option>
  ));

  const handleFilter = async (e) => {
    const { name, value } = e.target;
    if (name === "open_now") {
      setChecked(!checked);
      setIsLoading(true);
      await http()
        .get(`list`, {
          params: {
            currency: "USD",
            lang: "en_US",
            location_id: 293918,
            limit: 28,
            offset: 0,
            open_now: !checked,
          },
        })
        .then((res) => {
          setData(
            res.data.data.filter((item) => item.name !== undefined).slice(0, 8)
          );
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (name === "price") {
      setData(selectOptions.filter((item) => item.price === value).slice(0, 8));
    } else if (name === "category") {
      setData(selectOptions.filter((item) => item.cuisine[0].name === value));
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <main className="min-h-screen">
      <header className="container">
        <h1 className="xl:text-4xl lg:text-4xl md:text-3xl text-3xl font-semibold">
          Restaurants Apps
        </h1>
        <p className="text-sm text-gray-800">
          Find your favorite restaurant here.
        </p>
      </header>

      <nav className="border-t-2 border-b-2 py-2 my-8">
        <div className="container flex xl:flex-row lg:flex-row md:flex-row flex-col xl:text-md lg:text-md md:text-sm text-sm xl:gap-0 lg:gap-0 md:gap-0 gap-2">
          <div className="flex flex-1 items-center xl:gap-8 lg:gap-6 md:gap-4 gap-2 xl:justify-start lg:justify-start md:justify-start justify-between">
            <h6 className="font-semibold">Filter By:</h6>
            <label className="cursor-pointer label gap-2 py-3 border-b-2 border-base-content">
              <input type="checkbox" onChange={handleFilter} name="open_now" />
              <span className="font-semibold leading-6">Open Now</span>
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : null}
            </label>
            <div className="form-control border-b-2 border-base-content border-t-0 border-l-0 border-r-0">
              <select
                className="cursor-pointer select rounded-none py-1"
                name="price"
                onChange={handleFilter}
              >
                <option disabled selected>
                  Price
                </option>
                {sortedOptions}
              </select>
            </div>
            <div className="form-control">
              <select
                className="cursor-pointer select border-b-2 border-base-content border-t-0 border-l-0 border-r-0 rounded-none"
                onChange={handleFilter}
                name="category"
              >
                <option disabled selected>
                  Categories
                </option>
                {selectOptions.map((item) => (
                  <option key={item.location_id} value={item.cuisine[0].name}>
                    {item.cuisine[0].name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => getRestaurants()}
            className="btn btn-outline btn-ghost border font-semibold px-10 text-xs rounded-sm"
          >
            Clear All
          </button>
        </div>
      </nav>

      <section className="container">
        <h2 className="text-2xl font-semibold">All Restaurants</h2>
        <Suspense fallback={<Loading />}>
          <LazyComponent data={data} />
        </Suspense>
        <div className="flex justify-center">
          <button
            className="btn btn-primary btn-outline rounded-sm mb-10 xl:px-40 lg:px-40 md:px-32 px-28 text-xs"
            onClick={() => handleLoad()}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
