"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetail from "@/components/ProjectDetail";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [deck, setDeck] = useState<Project[]>(projects);
  const isAnimating = useRef(false);

  const handleNextCard = () => {
    if (isAnimating.current || selectedProject) return;
    isAnimating.current = true;

    setDeck((prevDeck) => {
      const nextDeck = [...prevDeck];
      const firstCard = nextDeck.shift();
      if (firstCard) nextDeck.push(firstCard);
      return nextDeck;
    });

    setTimeout(() => {
      isAnimating.current = false;
    }, 600);
  };

  const handlePrevCard = () => {
    if (isAnimating.current || selectedProject) return;
    isAnimating.current = true;

    setDeck((prevDeck) => {
      const nextDeck = [...prevDeck];
      const lastCard = nextDeck.pop();
      if (lastCard) nextDeck.unshift(lastCard);
      return nextDeck;
    });

    setTimeout(() => {
      isAnimating.current = false;
    }, 600);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) return;
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        handleNextCard();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevCard();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const handleWheel = (e: React.WheelEvent) => {
    if (isAnimating.current || selectedProject) return;
    if (e.deltaY < -20) {
      handlePrevCard();
    } else if (e.deltaY > 20) {
      handleNextCard();
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className={`${theme === "dark" ? "dark bg-[#111014]" : "bg-[#8da0a3]"} transition-colors duration-700 min-h-screen relative overflow-hidden flex items-center justify-center select-none`}
    >
      <ThemeToggle
        theme={theme}
        toggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      {/* ARENA UTAMA DECK 3D */}
      <div className="relative w-full max-w-[340px] aspect-[3/4] flex items-center justify-center [perspective:1800px] [transform-style:preserve-3d] mt-[-50px]">
        {deck.map((project, idx) => {
          const isMain = idx === 0;
          const isNgintip = idx === deck.length - 1;

          let translateY = 0;
          let translateX = 0;
          let translateZ = 0;
          let rotateZ = 0;
          let rotateX = 0;
          let opacity = 1;
          let cardBlur = "none";

          let zIndex = isMain ? 50 : isNgintip ? 10 : deck.length - idx;

          if (isMain) {
            translateY = 0;
            translateX = 0;
            translateZ = 150;
            rotateZ = 0;
            rotateX = 0;
            cardBlur = "none";
          } else if (isNgintip) {
            translateY = 520;
            translateX = -20;
            translateZ = -80;
            rotateZ = -12;
            rotateX = 4;
            cardBlur = "blur(1px)";
          } else {
            translateY = idx * -18;
            translateX = idx * 28;
            translateZ = idx * -95;
            rotateZ = idx * 5.5;
            rotateX = -idx * 2;
            opacity = Math.max(1 - idx * 0.22, 0.3);
            cardBlur = `blur(${idx * 2.5}px)`;
          }

          return (
            <motion.div
              key={project.id}
              onClick={() => isMain && setSelectedProject(project)}
              style={{
                zIndex,
                filter: cardBlur,
              }}
              animate={{
                x: translateX,
                y: translateY,
                z: translateZ,
                rotateZ: rotateZ,
                rotateX: rotateX,
                opacity: opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 105,
                damping: 18,
              }}
              className={`absolute w-[340px] h-[470px] origin-center ${
                isMain ? "cursor-pointer" : "pointer-events-none"
              }`}
            >
              <ProjectCard project={project} isActive={isMain} />
            </motion.div>
          );
        })}
      </div>

      {/* REVISI FIX: Swipe for More DIEM MENGAMBANG (Efek mentul dilepas murni) */}
      <AnimatePresence>
        {!selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none z-40 text-center"
          >
            <span className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase drop-shadow-sm">
              explore more
            </span>
            <span className="text-white/20 text-xs font-light">↓</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
