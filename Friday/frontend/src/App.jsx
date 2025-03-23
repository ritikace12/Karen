import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;

