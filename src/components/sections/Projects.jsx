import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Github, ExternalLink } from "lucide-react";

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
                        <Card className="flex flex-col h-full bg-white/60 dark:bg-gray-900/60">
                            <div className="mb-4 inline-block px-3 py-1 bg-royal-purple/10 text-royal-purple rounded-full text-xs font-bold tracking-wide">
                                {project.tag}
                            </div>

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
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
