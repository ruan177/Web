import Header from "../components/headers/header";
import { Element } from 'react-scroll';
import logo from '../assets/logos/coffe.png';

export function Home() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-center py-10 sm:py-6 lg:py-0 border-y border-black xl:border-hidden xl:rounded-xl">
          {/* Hero content */}
          <div className="px-4 sm:px-10 space-y-5 lg:py-6 w-full sm:w-1/2 xl:w-1/2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl max-w-full sm:max-w-xl font-serif">
              <span className="underline decoration-black decoration-4">
                MarkedLearn
              </span>{" "}
              is a place to mark, read, learn and connect.
            </h1>
            <h2 className="font-normal">
              It's easy and free to post your thinking on any topic and connect with
              millions of readers.
            </h2>
          </div>
          {/* Hero image */}
          <img
            className="h-20 sm:h-40 lg:h-80 xl:h-full mx-auto sm:mx-0"
            src={logo}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
