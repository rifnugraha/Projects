"use client";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface DetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: DetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 select-none"
    >
      {/* Tombol Close Global Luar */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* KOREKSI FIX: layoutId di sasis luar ini DIHAPUS agar tidak bentrok berebut ID 
          dengan antrean kartu di page.tsx. Kita ganti dengan animasi biasa.
      */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative w-full max-w-[840px] h-[520px] bg-neutral-900/90 dark:bg-black/95 border border-white/10 rounded-[40px] overflow-hidden flex flex-col md:flex-row p-6 gap-6 shadow-2xl z-10"
      >
        {/* Tombol Close Pojok Atas */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold hover:bg-white/20 transition-all z-50 shadow-md"
        >
          ✕
        </button>

        {/* KOLOM KIRI: FOTO UTAMA (DIKUNCI / FIXED STICKY) */}
        <div className="w-full md:w-[45%] h-full flex-shrink-0 flex items-center justify-center relative rounded-[28px] overflow-hidden border border-white/10 shadow-lg bg-black/40">
          {/* layoutId tetap kita kunci di sini agar transisi foto terbang ala Netflix tetap aktif otomatis */}
          <motion.img
            layoutId={`card-img-${project.id}`}
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover rounded-[28px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* KOLOM KANAN: KONTEN PENJELASAN (SCROLLABLE) */}
        <div className="w-full md:w-[55%] h-full flex flex-col justify-between overflow-hidden pr-1">
          {/* Area Teks Atas + Deskripsi (Scrollable Area) */}
          <div className="flex-1 overflow-y-auto pr-3 flex flex-col gap-3 pt-2 scrollbar-thin scrollbar-thumb-white/10">
            {/* Badge Kategori */}
            <div>
              <span className="inline-block text-[10px] font-black tracking-widest text-white/70 bg-white/10 border border-white/10 px-3 py-1 rounded-full uppercase shadow-sm">
                {project.category}
              </span>
            </div>

            {/* Judul Proyek */}
            <h1 className="text-white font-black text-3xl tracking-wide uppercase leading-tight drop-shadow-md">
              {project.title}
            </h1>

            {/* Garis Pembatas Estetik */}
            <div className="w-12 h-[3px] bg-white/20 rounded-full my-1" />

            {/* Deskripsi Penjelasan Panjang */}
            <p className="text-white/80 font-normal text-sm leading-relaxed tracking-wide pr-1 whitespace-pre-line drop-shadow-sm">
              {project.description}
            </p>
          </div>

          {/* Area Bawah: Deretan Ikon Aplikasi (Flex-Shrink-0 / Tetap Mengunci di Bawah) */}
          <div className="w-full pt-4 mt-4 border-t border-white/10 flex flex-col gap-2 flex-shrink-0">
            <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
              Tools & Software Used
            </span>

            {/* Loop render ikon aplikasi secara otomatis */}
            <div className="flex items-center gap-3.5 py-1">
              {project.tools &&
                project.tools.map((iconUrl, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 p-2 flex items-center justify-center shadow-md backdrop-blur-md hover:scale-110 hover:border-white/20 transition-all duration-300"
                  >
                    <img
                      src={iconUrl}
                      alt="tool-icon"
                      className="w-full h-full object-contain filter drop-shadow-sm select-none"
                      draggable="false"
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
