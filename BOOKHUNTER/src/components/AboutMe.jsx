import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

const AboutMe = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col-reverse min-h-screen">
      <NavBar isDetailPage={true} />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16 sm:px-6 lg:px-8 max-w-7xl">
        <article className="flex flex-col-reverse lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-12 mb-12 max-w-6xl mx-auto">
          <header className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 hover:text-gray-500">
              Vieve Aronu
            </h1>
            <h2 className="text-lg sm:text-xl mb-6 hover:text-gray-500">
              Frontend Developer
            </h2>
          </header>

          <section className="space-y-4 sm:space-y-6 mb-8">
            <p>Hello there! Welcome to my digital garden,I am Vieve Aronu,
               a passionate up and coming Frontend Engineer. 
            </p>
            <p>I am passionate about crafting beautiful and optimised web experiences
                My go-to tools are React and Tailwind, which enable me to bring my 
                visions to life. I also have experience in HTML, CSS and Javascript.
            </p>
            <p>As a continuous learner, I am currently learning bubble and flutter
                as well as the ever evolving techverse. I have a keen interest in
                learning how technology can be used to help advance life.
            </p>
            <p>You can find me unwinding with a good book or a captivating movie,
                when I am not immersed in code, debugging or working on mini projets</p>
            <p>I am always excited to meet fellow tech enthusiasts and learn from 
                their experiences. Please feel free to reach out and connect with me.
            </p>
          </section>

          <footer>
            <h2 className="mb-4 text-xl hover:text-gray-500">Connect with me:</h2>
            <nav className="flex justify-start space-x-4">
              <a
                href="https://github.com/Vieve-e"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
                aria-label="GitHub Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="17" 
                height="17"
                viewBox="0 0 24 24" 
                fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/genevieve-aronu-ba45a989"
                className="hover:text-gray-400"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="17" 
                height="17" 
                viewBox="0 0 24 24" 
                fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://x.com/Mz_MariaC"
                className="hover:text-gray-400"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="17" 
                height="17" 
                viewBox="0 0 24 24" 
                fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </nav>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default AboutMe;