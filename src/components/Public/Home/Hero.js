function Hero() {
  return (
    <>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto flex flex-col py-6 sm:py-12">
          <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-500 font-extrabold leading-tight">
              The Freedom to Create the
              <span className="text-indigo-500">Websites</span> You Want
            </h1>
            <p className="mt-5 sm:mt-10 text-gray-600 font-normal text-lg sm:text-lg">
              A professional website drives sales. Create a beautiful website to
              impress and engage new customers – and establish your business
              online.
            </p>
          </div>
          <div className="flex">
            <button className="focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-4 sm:px-10 py-2 sm:py-4 text-sm">
              Get Started
            </button>
            <button className="ml-4 focus:outline-none bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">
              Live Demo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
