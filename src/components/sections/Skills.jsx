import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { Database, Code2, Layout as LayoutIcon, Lightbulb } from "lucide-react";

export const Skills = () => {
    const skillCategories = [
        {
            title: "AI & Data",
            icon: <Database className="w-6 h-6 text-royal-purple mb-4" />,
            skills: ["Machine Learning", "Data Science", "Generative AI", "Blockchain", "Web3"]
        },
        {
            title: "Frontend",
            icon: <LayoutIcon className="w-6 h-6 text-royal-purple mb-4" />,
            skills: ["Flutter", "React", "NextJS", "Tailwind CSS"]
        },
        {
            title: "Backend",
            icon: <Code2 className="w-6 h-6 text-royal-purple mb-4" />,
            skills: ["Django", "NodeJS", "MongoDB"]
        },
        {
            title: "Core Skills",
            icon: <Lightbulb className="w-6 h-6 text-royal-purple mb-4" />,
            skills: ["Data Structures", "Teamwork", "Leadership", "Strategic Thinking"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="min-h-screen pt-24 pb-12">
            <SectionTitle title="Skills." />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {skillCategories.map((category, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                        <Card className="h-full">
                            {category.icon}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">{category.title}</h3>
                            <ul className="space-y-3">
                                {category.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="text-gray-600 dark:text-gray-400 font-medium pb-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
