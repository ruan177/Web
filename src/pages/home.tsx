import Header from "../components/headers/header";
import { Element } from 'react-scroll';
import logo from '../assets/logos/coffe.png';

export function Home() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-center">

            <span className=" font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-indigo-900 via-purple-500 to-rose-500">
              Infinity Oportunities
            </span>

          </h1>
          <h2 className="text-3xl text-center font-bold mb-6">
            Welcome!
          </h2>
          <p className="text-lg text-center">
            A great place to share some knowledge
          </p>
        </div>
      </div>

      <Element name="about">
        <div className="flex justify-between items-center bg-[#ffc017] py-10 lg:py-0 border-y border-black xl:border-hidden xl:rounded-xl">
          {/* Hero content */}
          <div className="px-10 space-y-5 lg:py-6">
            <h1 className="text-6xl md:text-7xl max-w-xl font-serif w-11/12 sm:w-9/12">
              <span className="underline decoration-black decoration-4">
                CoffeCode
              </span>{" "}
              is a place to write, read and connect.
            </h1>
            <h2 className="w-9/12 font-normal">
              It's easy and free to post your thinking on any topic and connect with
              millions of readers.
            </h2>
            <button className="border border-black bg-white px-4 py-2 rounded-full font-medium active:scale-90 transition duration-100">
              Start Writing
            </button>
          </div>
          {/* Hero image */}
          <img
            className="hidden sm:inline-flex h-40 lg:h-80 xl:h-full"
            src={logo}
            alt=""
          />
        </div>
      </Element>
    </>
  );
}
