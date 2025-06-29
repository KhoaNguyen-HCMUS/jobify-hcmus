import LogoTagline from "../../components/logoTagline";
export default function Error403Page() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-linear-(--gradient-primary)">
      <div className="backdrop-blur-sm rounded-[57px] shadow-xl flex flex-col lg:flex-row items-center max-w-5xl w-full p-8 lg:p-12 gap-12 bg-highlight-20 mx-auto">
        <div className="flex-1 w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold mt-4 text-primary mb-8 ml-8">
            ERROR 404: <br /> FORBIDDEN
          </h1>

          <p className="text-primary mt-4 mb-8 ml-8">
            You are not authorized to view this resource.
          </p>

          <div className="flex justify-center gap-6">
            <button
              type="submit"
              className="bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-4 cursor-pointer"
            >
              <a href="/contact-support">Contact Support</a>
            </button>
            <button
              type="submit"
              className="bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-4 cursor-pointer"
            >
              <a href="/">Go to homepage</a>
            </button>
          </div>
        </div>
        <LogoTagline />
      </div>
    </div>
  );
}
