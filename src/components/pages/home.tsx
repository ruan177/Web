import Header from "../headers/header";

export function Home() {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-center">
              <span className="text-4xl font-bold">
                <span className=" font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-indigo-900 via-purple-500 to-rose-500">
                  HackTheLearn
                </span>
              </span>
            </h1>
            <h2 className="text-3xl text-center font-bold mb-6">
              Bem-vindo ao nosso site de compartilhamento de conhecimentos!
            </h2>
            <p className="text-lg text-center">
              Nosso projeto é um site open source onde pessoas podem compartilhar conhecimentos de diversas áreas, com foco especial em computação. Aqui, você encontrará artigos, tutoriais, dicas e muito mais sobre temas relacionados à computação, programação, desenvolvimento web, inteligência artificial e muito mais.
            </p>
          </div>
        </div>
      </>
    );
  }
  