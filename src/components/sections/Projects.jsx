import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import BorderGlow from "../ui/BorderGlow";
import { Github, ExternalLink } from "lucide-react";

// Maps tech keywords to gradient color pairs [from, to]
const techGradients = {
    "Machine Learning":   ["#7c3aed", "#4f46e5"],
    "Deep Learning":      ["#7c3aed", "#4f46e5"],
    "TensorFlow":         ["#f59e0b", "#ef4444"],
    "React.js":           ["#38bdf8", "#6366f1"],
    "FastAPI":            ["#10b981", "#06b6d4"],
    "Python":             ["#3b82f6", "#8b5cf6"],
    "MediaPipe":          ["#06b6d4", "#10b981"],
    "Blockchain":         ["#f59e0b", "#f97316"],
    "Ethereum":           ["#8b5cf6", "#6366f1"],
    "Solidity":           ["#6366f1", "#8b5cf6"],
    "FAISS":              ["#ec4899", "#8b5cf6"],
    "Web3.js":            ["#f97316", "#f59e0b"],
    "default":            ["#7c3aed", "#6366f1"],
};

const getBannerGradient = (techStack) => {
    for (const tech of techStack) {
        const match = Object.keys(techGradients).find(
            (k) => k !== "default" && tech.toLowerCase().includes(k.toLowerCase())
        );
        if (match) return techGradients[match];
    }
    return techGradients["default"];
};

const ProjectBanner = ({ techStack, tag }) => {
    const [from, to] = getBannerGradient(techStack);
    return (
        <div
            className="w-full h-36 rounded-xl mb-6 relative overflow-hidden flex items-end p-4"
            style={{ background: `linear-gradient(135deg, ${from}cc, ${to}cc)` }}
        >
            {/* Subtle grid texture */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />
            {/* Floating blobs */}
            <div className="absolute top-2 right-4 w-20 h-20 rounded-full opacity-20"
                style={{ background: `radial-gradient(circle, white, transparent)` }} />
            <div className="absolute bottom-0 left-8 w-14 h-14 rounded-full opacity-15"
                style={{ background: `radial-gradient(circle, white, transparent)` }} />
            {/* Tag pill */}
            <span className="relative z-10 px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold tracking-wide border border-white/30">
                {tag}
            </span>
        </div>
    );
};

export const Projects = () => {
    const projects = [
        {
            title: "Vox — Real-time Dual-Hand Sign Language Learning Platform",
            tag: "AI / Computer Vision / EdTech",
            description: "Real-time dual-hand gesture recognition platform that converts 42 MediaPipe landmarks into instant text and speech using a TensorFlow LSTM model (94% accuracy, 150ms latency). Includes structured learning paths, practice mode, real-time feedback, and progress tracking.",
            techStack: ["React.js", "Machine Learning", "Deep Learning", "FastAPI", "Python", "MediaPipe", "TensorFlow"],
            githubUrl: "https://github.com/ayush6447/Vox",
            demoUrl: null
        },
        {
            title: "Title Integrity System",
            tag: "AI + Blockchain + Governance Tech",
            description: "Enterprise-grade Title Similarity & Compliance Validation System built for Synchronize 4.0 Hackathon to assist India's Press Registrar General (PRGI). Combines deterministic rule engine, RapidFuzz typo detection, phonetic matching, multilingual sentence-transformer embeddings indexed via FAISS, and Ethereum smart contract logging for transparency.",
            techStack: ["Blockchain", "Deep Learning", "Machine Learning", "React.js", "Ethereum", "FAISS", "FastAPI", "Solidity", "Web3.js"],
            githubUrl: "https://github.com/ayush6447/Synchronize4.0",
            demoUrl: null
        }
    ];

    return (
        <section id="projects" className="min-h-screen pt-24 pb-12">
            <SectionTitle title="Projects." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        className="flex"
                    >
                        <BorderGlow
                            glowColor="124 58 237"
                            borderRadius={20}
                            glowRadius={60}
                            glowIntensity={0.9}
                            edgeSensitivity={40}
                            colors={['#c084fc', '#f472b6', '#38bdf8']}
                            className="w-full h-full"
                        >
                        <Card className="flex flex-col h-full bg-white/60 dark:bg-gray-900/60 !p-6">
                            {/* Gradient banner */}
                            <ProjectBanner techStack={project.techStack} tag={project.tag} />

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-snug">
                                {project.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow leading-relaxed">
                                {project.description}
                            </p>

                            <div className="mb-8">
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, techIdx) => (
                                        <span
                                            key={techIdx}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-auto">
                                {project.githubUrl && (
                                    <Button variant="primary" className="flex items-center gap-2 group cursor-pointer border border-transparent">
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            GitHub
                                        </a>
                                    </Button>
                                )}
                                {project.demoUrl && (
                                    <Button variant="outline" className="flex items-center gap-2 group cursor-pointer">
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </Card>
                        </BorderGlow>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
