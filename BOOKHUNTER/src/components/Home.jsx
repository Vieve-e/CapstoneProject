
import NavBar from "./Navbar";
import Footer from "./Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm sm:text-xl md:text-xl font-normal text-black max-w-xl font-inria serif">
          Hello there! Welcome to BookHunter. This is a webpage I created to show my love for books.
          I understand how challenging it can be to find and organize books on a local device. 
          Reading is a powerful tool for knowledge and growth, as the adage states: 
          “If you want to hide knowledge from a man, put it in a book.”
        </p>
        <p className="font-inria serif">
            BookHunter aims to encourage a culture of reading by providing an easy way to search for and organize eBooks. 
            By making books more accessible and convenient, this project promotes knowledge and intellectual growth in a fast-paced, digital world.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Home;