"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
