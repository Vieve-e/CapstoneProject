

const LoadingState = () => {
  return (
    <div className="w-full h-[18vh] flex flex-row items-center justify-start pt-8">
      <div className="loading loading-bars loading-md"></div>
      <p className="text-black-400 mt-4 font-light font-inria serif">Loading...</p>
    </div>
  );
};

export default LoadingState;