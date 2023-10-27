const RestaurantItem = (props) => {
  const { data } = props;

  const starsRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <input
          key={i}
          type="radio"
          name="rating-1"
          className="mask mask-star bg-primary h-4 w-4"
          disabled
        />
      );
    }
    return <div className="rating">{stars}</div>;
  };

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2 xl:gap-6 lg:gap-6 md:gap-4 gap-2 xl:py-8 lg:py-8 py-6">
      {data
        ?.filter((item) => item.name !== undefined)
        .map((item) => (
          <div key={item?.location_id} className="card">
            <div className="overflow-hidden w-full rounded-sm h-44">
              <img
                src={item?.photo.images.original.url}
                alt="Image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-1 h-28 items-start justify-center">
              <h4 className="font-semibold xl:text-md lg:text-md text-sm text-primary">
                {item?.name}
              </h4>
              {item?.rating ? starsRating(item.rating) : null}
              <div className="flex justify-between items-center text-base-content text-xs w-full">
                <p>
                  {item?.cuisine[0].name} - {item.price ? item.price : "$0"}
                </p>
                <label className="flex gap-1 items-center uppercase text-xs">
                  <span
                    className={
                      item?.open_now_text?.includes("Closed")
                        ? `badge badge-xs badge-error`
                        : `badge badge-xs badge-success`
                    }
                  ></span>
                  {item?.open_now_text}
                </label>
              </div>
            </div>
            <a
              href={`/detail-restaurant/${item.location_id}`}
              className="btn btn-primary w-full rounded-sm text-xs text-white"
            >
              Learn More
            </a>
          </div>
        ))}
    </div>
  );
};

export default RestaurantItem;
