"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";



import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const HeroSection = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const imageRef = useRef()

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDemoLogin = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: "dehet67222@nyfhk.com",
        password: "smartspendpassword",
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/dashboard"; // Full page navigation to ensure Header updates
      } else {
        console.error(result);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to login to demo account");
    }
  };

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1
          className="text-4xl md:text-8xl lg:text-[90px] pb-6
                  gradient-title
                  bg-[linear-gradient(90deg,#93BFC7,#ABE7B2,#93BFC7)]
                  bg-[length:200%_100%]
                  [background-position:0%_0%]
                  animate-text-slide"
        >
          Smarter tracking. <br /> Smarter spending.
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track , analyze and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className={`px-8 cursor-pointer bg-gradient-to-br from-[#93BFC7] to-[#ABE7B2] text-white`}>
              Get started
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8" onClick={handleDemoLogin}>
            Demo Login
          </Button>
        </div>
        {/* {banner here} */}
        <div className="hero-image-wrapper py-10">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              priority
              className="rounded-lg shadow-2xl border mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection;