import NavBar from "./Navbar";
import SearchBar from "./SearchBar";
import backgroundImage from "../assets/background.png";
import "../index.css";

const Header = () => {
  return (
    <div className="holder">
      <header className="bg-theme-adaptive border-b-0">
      <NavBar isDetailPage={false} />
      <div className="relative h-[90vh] sm:h-[80vh]">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={backgroundImage}
            alt="Hero Background"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-inria serif text-black mb-4">
                Bringing you a step further to your quest for knowledge
              </h1>
              <p className="text-lg sm:text-xl font-inria serif text-black">
                Your favourite book search engine❤️
              </p>
               </div>
            </div>
        </div>
      </header>
      <SearchBar />
    </div>
  );
};

export default Header;
