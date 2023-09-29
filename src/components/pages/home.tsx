import Header from "../headers/header";

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
      </>
    );
  }
  