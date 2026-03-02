import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { CheckCircle2 } from "lucide-react";

export const Experience = () => {
    const experiences = [
        {
            id: "ayuda",
            company: "Ayuda",
            role: "Co-Founder",
            date: "Jan 2025 – Present",
            points: [
                "Leading a non-profit focused on empowering underserved communities",
                "Building sustainable education and resource systems",
                "Driving tech-based solutions for social impact"
            ]
        },
        {
            id: "gdg",
            company: "Google Developer Group on Campus ITER",
            role: "Core Media Team Member",
            date: "Sept 2025 – Present",
            previousRole: "Design Team Member (Mar 2025 – Sept 2025)",
            points: [
                "Managing and executing high-impact technical events",
                "Creating engaging media content to grow community participation",
                "Overseeing community operations and outreach"
            ]
        },
        {
            id: "photo",
            company: "SOA Photography Club",
            role: "Cinematographer",
            date: "Mar 2025 – Aug 2025",
            points: [
                "Filmed and produced high-quality cinematic content for university events",
                "Collaborated with creative teams to plan and execute visual storytelling",
                "Managed camera equipment and post-production workflows"
            ]
        }
    ];

    const [activeTab, setActiveTab] = useState(experiences[0].id);

    return (
        <section id="experience" className="min-h-screen pt-24 pb-12">
            <SectionTitle title="Experience." />

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-12">
                {/* Left Tabs List */}
                <div className="flex overflow-x-auto md:flex-col gap-2 md:w-1/3 border-b md:border-b-0 md:border-l-2 border-gray-200 pb-4 md:pb-0 hide-scrollbar shrink-0 relative">
                    {experiences.map((exp) => (
                        <button
                            key={exp.id}
                            onClick={() => setActiveTab(exp.id)}
                            className={`text-left px-6 py-4 rounded-r-xl transition-all whitespace-nowrap md:whitespace-normal font-medium text-lg relative ${activeTab === exp.id
                                ? "text-royal-purple bg-royal-purple/5 dark:bg-royal-purple/10"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                }`}
                        >
                            {/* Active Tab Indicator (Vertical) */}
                            {activeTab === exp.id && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute left-[-2px] md:left-[-2px] bottom-0 md:bottom-auto md:w-1 h-1 md:h-full bg-royal-purple rounded-full w-full"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {exp.company}
                        </button>
                    ))}
                </div>

                {/* Right Content Area */}
                <div className="md:w-2/3 min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {experiences.map((exp) => (
                            activeTab === exp.id && (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        {exp.role} <span className="text-royal-purple">@ {exp.company}</span>
                                    </h3>

                                    <div className="text-gray-500 dark:text-gray-400 font-medium">
                                        {exp.date}
                                    </div>

                                    {exp.previousRole && (
                                        <div className="text-sm text-gray-400 dark:text-gray-500 italic mb-4">
                                            Previously: {exp.previousRole}
                                        </div>
                                    )}

                                    <ul className="mt-6 space-y-4">
                                        {exp.points.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-royal-purple shrink-0 mt-0.5" />
                                                <span className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
