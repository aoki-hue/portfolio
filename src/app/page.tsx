// import Image from "next/image";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About isBg={true} />
      </main>
    </>
  );
};

export default Home;
