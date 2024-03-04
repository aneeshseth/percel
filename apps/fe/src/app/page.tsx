"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  Menu,
  MenuItem,
  HoveredLink,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";
import "./page.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function TypewriterEffectDemo() {
  const targetRef = useRef(null);

  const words = [
    {
      text: "one-click",
      className:
        "md:text-5xl lg:text-7xl font-bold inter-var text-red-500 dark:text-red-500 text-center",
    },
    {
      text: "deployment",
      className:
         "lg:text-7xl  text-white font-bold inter-var  text-white dark:text-white text-center",
    },
    {
      text: "for",
      className:
       "lg:text-7xl font-bold inter-var text-red-500 text-center",
    },
    {
      text: "React.js",
      className:
        "lg:text-7xl font-bold inter-var text-blue-500 text-center",
    }
  ];
  const users = [
    {
      name: "Manu Arora",
      designation: "Founder, Algochurn",
      image: "https://picsum.photos/id/10/300/300",
      badge: "Mentor",
    },
  ];
  const projects = [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
  ];
  const projects2 = [
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
  ];

  return (
    <div className="fadeInUp-animation">
      <div className="bg-black">
        <div className="flex items-center mt-14 bg-black">
          <Navbar currRef={targetRef} className="bg-black" />
        </div>
      </div>
      <ContainerScroll
        users={users}
        titleComponent={
          <div className="-mt-20">
            <TypewriterEffect words={words} className="text-4xl -mt-16" />
          </div>
        }
      />
    </div>
  );
}

function Navbar({ className, currRef }: { className?: string; currRef?: any }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  return (
    <div className="ml-5 mr-5 text-white">
      <div
        className={cn(
          "fixed top-10 inset-x-0 max-w-md mx-auto z-50 rounded-full",
          className
        )}
      >
        <Menu setActive={setActive}>
          <div className="flex gap-3">
            <Button
              className="bg-white text-xl hover:bg-white"
              onClick={() => {
                router.push("/docs");
              }}
            >
              <MenuItem
                setActive={setActive}
                active={active}
                item="deploy"
              ></MenuItem>
            </Button>
          </div>
        </Menu>
      </div>
    </div>
  );
}
