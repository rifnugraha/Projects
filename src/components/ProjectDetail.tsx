"use client";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface DetailProps {
  project: Project;
  onClose: () => void;
  theme: "light" | "dark"; // Menangkap tipe tema dari induk
}

export default function ProjectDetail({
  project,
  onClose,
  theme,
}: DetailProps) {
  const isLight = theme === "light";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 ${
        isLight ? "bg-black/40" : "bg-black/85"
      }`}
    >
      <div className="absolute inset-0" onClick={onClose} />

      {/* FIX TOTAL MODAL DETAIL SINKRON:
          - Light Mode: bg-white (Murni Putih Bersih)
          - Dark Mode: bg-[#262626] (Abu-abu gelap arang agar terpisah dari bg hitam luar)
      */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative w-full max-w-[350px] md:max-w-[840px] h-[80vh] md:h-[520px] border rounded-[40px] flex flex-col md:flex-row p-4 sm:p-6 gap-5 shadow-2xl z-10 overflow-y-auto md:overflow-hidden scrollbar-none transition-colors duration-500 ${
          isLight ? "bg-white border-black/10" : "bg-[#262626] border-white/10"
        }`}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center font-bold z-50 shadow-sm border ${
            isLight
              ? "bg-black/5 text-black border-black/5"
              : "bg-white/10 text-white border-white/5"
          }`}
        >
          ✕
        </button>

        {/* KOLOM FOTO PROYEK */}
        <div
          className={`w-full md:w-[45%] h-auto aspect-[4/3] md:aspect-auto md:h-full flex-shrink-0 rounded-[28px] overflow-hidden shadow-md border ${
            isLight ? "border-black/5" : "border-white/5"
          }`}
        >
          <motion.img
            layoutId={`card-img-${project.id}`}
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* KOLOM KONTEN KANAN / BAWAH */}
        <div className="w-full md:w-[55%] flex-1 md:h-full flex flex-col justify-between">
          {/* FIX AREA DESKRIPSI SOLID:
              - Light Mode: bg-[#f8fafc] (Putih tulang padat) -> Isi teks FULL HITAM
              - Dark Mode: bg-black (Solid Hitam Pekat murni) -> Isi teks FULL PUTIH
          */}
          <div
            className={`flex-1 md:overflow-y-auto rounded-[28px] p-5 flex flex-col gap-3 shadow-inner border ${
              isLight
                ? "bg-[#f8fafc] border-black/5"
                : "bg-black border-white/5"
            }`}
          >
            <span
              className={`text-[9px] font-black tracking-widest uppercase ${
                isLight ? "text-black/40" : "text-white/40"
              }`}
            >
              {project.category}
            </span>

            <h1
              className={`font-black text-2xl sm:text-3xl tracking-wide uppercase leading-tight ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              {project.title}
            </h1>

            <div
              className={`w-12 h-[3px] rounded-full ${isLight ? "bg-black/10" : "bg-white/20"}`}
            />

            <p
              className={`font-normal text-sm leading-relaxed whitespace-pre-line ${
                isLight ? "text-neutral-800" : "text-neutral-200"
              }`}
            >
              {project.description}
            </p>
          </div>

          {/* AREA TOOLS & SOFTWARE */}
          <div
            className={`w-full pt-4 mt-4 border-t flex flex-col gap-2 flex-shrink-0 ${
              isLight ? "border-black/10" : "border-white/10"
            }`}
          >
            <span
              className={`text-[9px] font-black tracking-widest uppercase ${
                isLight ? "text-black/40" : "text-white/40"
              }`}
            >
              Tools Used
            </span>
            <div className="flex items-center gap-3">
              {project.tools &&
                project.tools.map((iconUrl, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-xl p-2 shadow-sm border ${
                      isLight
                        ? "bg-black/[0.02] border-black/10"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <img
                      src={iconUrl}
                      alt="tool"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
