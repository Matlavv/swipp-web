"use client";
import { AboutSwipp } from "@/components/AboutSwipp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PhoneMockup } from "@/components/PhoneMockup";
import ServiceList from "@/components/ServicesList";
import TheyTrustUs from "@/components/TheyTrustUs";

export default function Home() {
  return (
    <div>
      <Header />
      <PhoneMockup />
      <ServiceList />
      <AboutSwipp />
      <TheyTrustUs />
      <Footer />
    </div>
  );
}
