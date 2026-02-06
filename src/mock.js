// Mock data for GenZ Design Studio Portfolio

export const artistInfo = {
  name: "Sachet Patel",
  title: "Next-Gen UI/UX Designer",
  tagline: "Architecting Digital Emotions & Interactive Realities",
  bio: "We don't just build apps; we architect digital emotions. Our process is rooted in GenZ psychology and cutting-edge interactive technology. Specializing in high-fidelity visuals and research-driven flows.",
  email: "hello@sachet.design",
  social: {
    behance: "https://behance.net/sachet",
    dribbble: "https://dribbble.com/sachet",
    instagram: "https://instagram.com/sachet",
    linkedin: "https://linkedin.com/in/sachet"
  }
};

export const portfolioCategories = [
  {
    id: "immersive-web",
    name: "Immersive Web",
    description: "Next-gen web experiences with 3D and motion."
  },
  {
    id: "mobile-native",
    name: "Mobile Native",
    description: "High-performance mobile interfaces."
  },
  {
    id: "identity",
    name: "Visual Identity",
    description: "Branding that screams authority."
  }
];

export const portfolioProjects = [
  {
    id: 1,
    title: "NEON CORE",
    category: "immersive-web",
    description: "A futuristic dashboard with glassmorphic elements and real-time data visualization.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    tools: ["THREE.JS", "GSAP", "REACT"]
  },
  {
    id: 2,
    title: "VIRTUAL STUDIO",
    category: "immersive-web",
    description: "Portfolio website for a creative agency featuring advanced scroll interactions.",
    image: "https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg",
    tools: ["FIGMA", "WEBGL", "TAILWIND"]
  },
  {
    id: 3,
    title: "ECHO APP",
    category: "mobile-native",
    description: "A neural-network inspired finance tracker with gesture-based navigation.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    tools: ["SWIFTUI", "PROTOPY", "FIGMA"]
  },
  {
    id: 4,
    title: "VOID SYSTEMS",
    category: "identity",
    description: "A dark-mode design system for a cybersecurity firm focused on typography.",
    image: "https://images.unsplash.com/photo-1602576666092-bf6447a729fc",
    tools: ["FIGMA", "ILLUSTRATOR", "MOTION"]
  }
];

export const skills = [
  { name: "Three.js", category: "Interactive" },
  { name: "R3F", category: "Interactive" },
  { name: "GSAP", category: "Motion" },
  { name: "Framer Motion", category: "Motion" },
  { name: "Figma", category: "Design" },
  { name: "Spline", category: "3D Design" },
  { name: "React", category: "Dev" },
  { name: "Tailwind", category: "Dev" }
];