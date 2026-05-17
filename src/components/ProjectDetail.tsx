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
      className="fixed inset-0 bg-black/85 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-4 select-none"
    >
      {/* Tap di luar modal untuk close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* SIFAT STRUKTUR UTAMA RESPONSIF:
          - HP/Mobile (Bawaan): max-w-[360px] h-[80vh] flex-col overflow-y-auto (Bentuk tegak ke bawah, bisa di-scroll full)
          - Laptop/PC (md:): md:max-w-[840px] md:h-[520px] md:flex-row md:overflow-hidden (Balik menyamping, dikunci mati)
      */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 130, damping: 22 }}
        className="relative w-full max-w-[350px] md:max-w-[840px] h-[80vh] md:h-[520px] bg-neutral-900/90 dark:bg-black/95 border border-white/10 rounded-[35px] sm:rounded-[40px] flex flex-col md:flex-row p-4 sm:p-6 gap-5 shadow-2xl z-10 overflow-y-auto md:overflow-hidden scrollbar-none"
      >
        {/* Tombol Close Pojok Atas */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold hover:bg-white/20 transition-all z-50 shadow-md"
        >
          ✕
        </button>

        {/* 1. LAYER FOTO: 
            - Di HP: Berada di posisi paling atas, mengunci proporsi aspect-[4/3] biar pas dipandang mata
            - Di Laptop: Kembali ke posisi kiri, h-full tegak proporsional 45% lebar sasis
        */}
        <div className="w-full md:w-[45%] h-auto aspect-[4/3] md:aspect-auto md:h-full flex-shrink-0 flex items-center justify-center relative rounded-[22px] sm:rounded-[28px] overflow-hidden border border-white/10 shadow-lg bg-black/40">
          <motion.img
            layoutId={`card-img-${project.id}`}
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover rounded-[22px] sm:rounded-[28px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* 2. LAYER KONTEN TEKS & TOOLS:
            - Di HP: Mengalir mulus di bawah foto mengikuti scroll container utama
            - Di Laptop: Mengunci area kanan, memiliki scroll bar mandiri di dalamnya
        */}
        <div className="w-full md:w-[55%] flex-1 md:h-full flex flex-col justify-between md:overflow-hidden">
          {/* Pembungkus Deskripsi Teks */}
          <div className="flex-1 md:overflow-y-auto md:pr-3 flex flex-col gap-3 pt-1">
            {/* Badge Kategori */}
            <div>
              <span className="inline-block text-[9px] font-black tracking-widest text-white/70 bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full uppercase shadow-sm">
                {project.category}
              </span>
            </div>

            {/* Judul Proyek */}
            <h1 className="text-white font-black text-2xl sm:text-3xl tracking-wide uppercase leading-tight drop-shadow-md">
              {project.title}
            </h1>

            {/* Garis Pembatas Aksentasi */}
            <div className="w-12 h-[3px] bg-white/20 rounded-full my-0.5" />

            {/* Deskripsi Cerita Panjang */}
            <p className="text-white/80 font-normal text-sm leading-relaxed tracking-wide whitespace-pre-line drop-shadow-sm pr-1">
              {project.description}
            </p>
          </div>

          {/* 3. LAYER IKON APLIKASI (SOFTWARE TOOLS):
              - Di HP: Berada di paling bawah isi konten setelah kamu scroll mentok teks deskripsinya
              - Di Laptop: Mengunci paten di dasar kolom kanan
          */}
          <div className="w-full pt-4 mt-5 border-t border-white/10 flex flex-col gap-2 flex-shrink-0 pb-1">
            <span className="text-[9px] font-black tracking-widest text-white/40 uppercase">
              Tools & Software Used
            </span>

            <div className="flex items-center gap-3.5 py-0.5">
              {project.tools &&
                project.tools.map((iconUrl, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-white/10 p-2 flex items-center justify-center shadow-md backdrop-blur-md active:scale-95 transition-all duration-200"
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
