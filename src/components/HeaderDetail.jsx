const HeaderDetail = ({ ...data }) => {
  const starRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <input
          key={i}
          type="radio"
          name="rating-1"
          className="mask mask-star bg-success h-6 w-6"
          disabled
        />
      );
    }
    return <div className="rating gap-1 mb-4">{stars}</div>;
  };

  return (
    <header className="relative overflow-hidden h-[80vh]">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center">
        <div className="container">
          <h1 className="xl:text-4xl lg:text-4xl md:text-3xl text-3xl font-semibold text-white mb-4 p-0">
            {data?.name}
          </h1>
          <p className="xl:text-sm lg:text-sm md:text-xs text-xs m-0 p-0 text-base-content my-2">
            {data?.cuisine}
          </p>
          {starRating(data?.rating)}
          <p className="text-base-content xl:leading-7 lg:leading-7 xl:text-sm lg:text-sm md:text-xs text-xs text-justify">
            {data?.description}
          </p>
        </div>
      </div>
      <img
        src={data?.photo}
        alt="Header Image"
        className="object-cover w-full h-full"
      />
    </header>
  );
};

export default HeaderDetail;
