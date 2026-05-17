export interface Project {
  id: string;
  title: string;
  category: string;
  iconText: string;
  description: string;
  imageUrl: string;
  tools: string[]; // Slot otomatis untuk logo aplikasi/software yang kamu pakai
}

export const projects: Project[] = [
  {
    id: "project-one",
    title: "URBAN COMPLEX",
    category: "3D DESIGN & EDITING",
    iconText: "UX",
    description:
      "Project visualisasi desain interaktif dengan konsep modern minimalis. Berfokus pada optimalisasi komposisi warna dan sudut estetika kamera ala lifestyle photography untuk menciptakan pengalaman UI yang bersih dan mewah.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    tools: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", // Logo Figma
      "https://img.icons8.com/color/48/canva.png", // Logo Canva
    ],
  },
  {
    id: "project-two",
    title: "CREATIVE MOTION",
    category: "CONTENT CREATION",
    iconText: "CC",
    description:
      "Eksperimen konten visual kreatif yang menggabungkan transisi sinematik, efek penataan warna yang presisi, dan ritme dinamis untuk kebutuhan media sosial modern.",
    imageUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    tools: [
      "https://img.icons8.com/color/48/adobe-premiere-pro.png", // Logo Premiere
      "https://img.icons8.com/color/48/canva.png",
    ],
  },
  {
    id: "project-three",
    title: "MINIMALIST INTERIOR",
    category: "3D RENDERING",
    iconText: "3D",
    description:
      "Desain renovasi kamar tidur dengan konsep clean, modern, dan minimalis. Memaksimalkan pencahayaan natural dan fungsionalitas ruang.",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    tools: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    ],
  },
  {
    id: "project-four",
    title: "TACTICAL STRATEGY",
    category: "GAMEPLAY ANALYSIS",
    iconText: "GA",
    description:
      "Analisis taktis mendalam mengenai strategi penyerangan base game, komparasi atribut skill pemain, serta kalkulasi kalkulatif untuk efisiensi eksekusi.",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    tools: ["https://img.icons8.com/color/48/canva.png"],
  },
  {
    id: "project-five",
    title: "BRANDING IDENTITY",
    category: "VISUAL DESIGN",
    iconText: "ID",
    description:
      "Pengembangan identitas visual brand modern, mulai dari pembuatan logo grid, pemilihan palet warna proporsional, hingga implementasi mock-up aset digital.",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop",
    tools: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
      "https://img.icons8.com/color/48/adobe-premiere-pro.png",
    ],
  },
];
