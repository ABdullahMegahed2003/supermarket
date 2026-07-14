"use client";

import Categories from "@/components/Categories/Categories";
import HeroSection from "@/components/HeroSection/HeroSection";
import Nav from "@/components/NavBar/Nav";
import Products from "@/components/Products/Products";
import About from "@/components/About/About";
import Contact from "@/components/contact/Contact";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePageClient() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Nav />
      <section>
        <HeroSection />
      </section>

      <Categories />
      <Products />
      <About />
      <Contact />
      {show && (
        <ArrowUp
          className="fixed bottom-[10%] right-[5%] bg-green-400 rounded-2xl"
          onClick={scrollToTop}
        />
      )}
    </div>
  );
}
