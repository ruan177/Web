import Header from "../components/headers/header";
import { Element } from 'react-scroll';
import logo from '../assets/logos/coffe.png';

export function Home() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen bg-gray-100">
       <div className="flex justify-between items-center  py-10 lg:py-0 border-y border-black xl:border-hidden xl:rounded-xl">
          {/* Hero content */}
          <div className="px-10 space-y-5 lg:py-6">
            <h1 className="text-6xl md:text-7xl max-w-xl font-serif w-11/12 sm:w-9/12">
              <span className="underline decoration-black decoration-4">
                MarkedLearn
              </span>{" "}
              is a place to mark, read, learn and connect.
            </h1>
            <h2 className="w-9/12 font-normal">
              It's easy and free to post your thinking on any topic and connect with
              millions of readers.
            </h2>
        
          </div>
          {/* Hero image */}
          <img
            className="hidden sm:inline-flex h-40 lg:h-80 xl:h-full"
            src={logo}
            alt=""
          />
        </div>
        </div>
      
    </>
  );
}
