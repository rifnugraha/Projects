"use client";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface CardProps {
  project: Project;
  isActive: boolean;
}

export default function ProjectCard({ project, isActive }: CardProps) {
  return (
    /* PERBAIKAN BINGKAI: 
       - Memastikan kontainer utama menggunakan flex-col dengan justify-between agar konten atas, tengah, bawah terbagi rata secara presisi.
       - pb-6 (ditambahkan padding bawah lebih tebal) agar bingkai box deskripsi tidak akan pernah menempel atau jebol menabrak lengkungan border luar kartu.
    */
    <div className="w-full h-full p-4 sm:p-5 pb-6 sm:pb-6 flex flex-col justify-between relative bg-white/[0.02] dark:bg-neutral-900/40 border border-white/10 dark:border-white/15 rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] isolate">
      {/* LAPISAN OVERLAY: Cahaya Otomatis dari Foto */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 overflow-hidden rounded-[40px] mix-blend-screen">
          <img
            src={project.imageUrl}
            alt="glow-overlay"
            className="w-[180px] h-[220px] object-cover rounded-full blur-[55px] opacity-40 scale-125 select-none"
          />
        </div>
      )}

      {/* Specular Gloss Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-white/[0.01] to-transparent pointer-events-none z-35" />

      {/* ATAS: Ikon, Petunjuk Klik, & Judul Proyek */}
      <div className="w-full flex flex-col items-center pt-1 relative z-30 flex-shrink-0">
        <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 flex items-center justify-center shadow-md backdrop-blur-md">
          <span className="text-white text-[10px] font-black tracking-wider">
            {project.iconText}
          </span>
        </div>

        <span
          className={`text-[8px] font-black tracking-[0.25em] uppercase mb-1 transition-all duration-300 mt-9 sm:mt-10 ${
            isActive ? "text-white/40" : "text-white/0"
          }`}
        >
          • click for detail •
        </span>

        <h2 className="text-white font-black text-lg sm:text-xl tracking-widest text-center uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] mb-1 sm:mb-2 w-full px-1 leading-tight">
          {project.title}
        </h2>
      </div>

      {/* TENGAH: Foto Utama 
          FIX RESPONSIF: h-[190px] di HP kecil, h-[240px] di layar standar (sm:)
          Ini kuncinya agar foto bisa mengalah memberikan ruang untuk bingkai deskripsi di bawahnya supaya tidak terpotong!
      */}
      <div className="w-full flex justify-center my-2 relative z-30 flex-shrink-0">
        <div className="w-full h-[190px] sm:h-[240px] aspect-[3/4] relative rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.65)] border border-white/10 flex-shrink-0">
          <motion.img
            layoutId={`card-img-${project.id}`}
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover rounded-[24px] flex-shrink-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* BAWAH: Panel Kaca Deskripsi Teks 
          FIX BINGKAI: w-full m-0 dikunci rapi di dalam sistem tata letak flexbox
      */}
      <div className="w-full p-3 rounded-[22px] bg-white/[0.03] dark:bg-black/50 border border-white/5 backdrop-blur-2xl flex flex-col items-center text-center relative z-30 flex-shrink-0 shadow-xl box-border">
        <span className="inline-block text-[8px] font-black tracking-widest text-white/70 bg-white/10 border border-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full uppercase mb-1.5">
          {project.category}
        </span>
        <p className="text-white font-normal text-[11px] leading-relaxed line-clamp-2 m-0 px-1 drop-shadow-sm">
          {project.description}
        </p>
      </div>
    </div>
  );
}
