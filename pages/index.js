"use client";
import { AboutSwipp } from "@/components/AboutSwipp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PhoneMockup } from "@/components/PhoneMockup";
import { ThreeContainer } from "@/components/ThreeContainer";

export default function Home() {
  return (
    <div>
      <Header />
      <PhoneMockup />
      <ThreeContainer />
      <AboutSwipp />
      <Footer />
    </div>
  );
}
