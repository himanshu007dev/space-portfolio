"use client";

import dynamic from "next/dynamic";
const Encryption = dynamic(() => import("@/components/main/Encryption"));
const Hero = dynamic(() => import("@/components/main/Hero"));
const Projects = dynamic(() => import("@/components/main/Projects"));
const Skills = dynamic(() => import("@/components/main/Skills"));

export default function Home() { 
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
      </div>
    </main>
  );
}
