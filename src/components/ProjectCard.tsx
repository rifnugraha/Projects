"use client";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface CardProps {
  project: Project;
  isActive: boolean;
  theme: "light" | "dark";
}

export default function ProjectCard({ project, isActive, theme }: CardProps) {
  const isLight = theme === "light";

  return (
    <div
      className={`w-full h-full p-4 sm:p-5 pb-6 flex flex-col justify-between relative border rounded-[40px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-colors duration-500 ${
        isLight
          ? "bg-[#e2e8f0] border-black/10"
          : "bg-[#262626] border-white/10"
      }`}
    >
      {/* ATAS: Ikon Mini, Petunjuk Aksi, & Judul Proyek */}
      <div className="w-full flex flex-col items-center pt-1 relative z-30 flex-shrink-0">
        <div
          className={`absolute top-0 left-0 w-8 h-8 rounded-full border flex items-center justify-center shadow-sm ${
            isLight
              ? "bg-black/5 border-black/10"
              : "bg-white/10 border-white/20"
          }`}
        >
          <span
            className={`text-[10px] font-black tracking-wider ${isLight ? "text-black" : "text-white"}`}
          >
            {project.iconText}
          </span>
        </div>

        <span
          className={`text-[8px] font-black tracking-[0.25em] uppercase mb-1 transition-all duration-300 mt-9 sm:mt-10 ${
            isActive
              ? isLight
                ? "text-black/40"
                : "text-white/40"
              : "text-transparent"
          }`}
        >
          • click for detail •
        </span>

        <h2
          className={`font-black text-lg sm:text-xl tracking-widest text-center uppercase mb-1 sm:mb-2 w-full px-1 leading-tight ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          {project.title}
        </h2>
      </div>

      {/* REVISI TOTAL: FRAME FOTO & KOTAK DESKRIPSI KACA DISATUKAN 
          Kita buat kontainer foto menjadi 'relative flex-1' agar tingginya otomatis mengisi ruang tengah,
          lalu kotak kacanya kita paksa melayang mutlak ('absolute') menempel di area bawah dalam foto tersebut.
          Dengan begini, kaca dipastikan 100% MEMBIASKAN WARNA FOTO tepat di belakangnya!
      */}
      <div className="w-full flex-1 my-2 relative z-30 rounded-[24px] overflow-hidden shadow-md border border-black/5 dark:border-white/5 bg-black/10">
        {/* Foto Proyek Utama */}
        <motion.img
          layoutId={`card-img-${project.id}`}
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover rounded-[24px]"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* SOLUSI MUTLAK: KOTAK DESKRIPSI LIQUID GLASS ALA iOS 
            Dipasang absolute bottom-2 left-2 right-2 melayang di atas foto murni */}
        <div
          style={{
            WebkitBackdropFilter: "blur(25px) saturate(160%)",
            backdropFilter: "blur(25px) saturate(160%)",
          }}
          className={`absolute bottom-2 left-2 right-2 p-3 rounded-[20px] flex flex-col items-center text-center shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] border transition-all duration-500 ${
            isLight
              ? "bg-white/40 border-white/60 shadow-black/5"
              : "bg-black/40 border-white/10 shadow-black/40"
          }`}
        >
          {/* Badge Kategori */}
          <span
            className={`inline-block text-[7px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase mb-1 shadow-sm border ${
              isLight
                ? "text-black/70 bg-white/50 border-black/5"
                : "text-white/70 bg-white/10 border-white/5"
            }`}
          >
            {project.category}
          </span>

          {/* Teks Deskripsi Singkat */}
          <p
            className={`font-bold text-[10px] sm:text-[11px] leading-relaxed line-clamp-2 m-0 px-0.5 tracking-wide ${
              isLight ? "text-neutral-900" : "text-white"
            }`}
          >
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
