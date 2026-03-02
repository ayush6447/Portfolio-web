import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";

export const About = () => {
    return (
        <section id="about" className="min-h-screen pt-24 pb-12">
            <SectionTitle title="About Me." />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Left Column - Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative pl-6"
                >
                    {/* Vertical Purple Accent Bar */}
                    <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-royal-purple rounded-full"></div>

                    <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        <p>
                            I am a B.Tech Computer Science student at Siksha 'O' Anusandhan University (2024–2028),
                            driven by a passion for creating impactful technology.
                        </p>
                        <p>
                            My core interests lie in <strong className="text-gray-900 dark:text-gray-100 font-semibold">AI, Machine Learning, Data Science, Blockchain, and Web3</strong>.
                            I thrive on building systems that solve real-world problems and pushing the boundaries of what's possible.
                        </p>
                        <p>
                            Beyond coding, I am a professional chess player. The strategic thinking, foresight, and decision-making
                            skills I've honed on the board translate directly into my approach to software architecture and problem-solving.
                        </p>
                        <p>
                            I pride myself on strong teamwork and communication skills, always open to new internships and collaborative opportunities.
                        </p>
                    </div>
                </motion.div>

                {/* Right Column - Currently Building Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="border-t-4 border-t-royal-purple">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                            Currently Building
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-purple opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-royal-purple"></span>
                            </span>
                        </h3>

                        <ul className="space-y-4">
                            {[
                                "AI/ML Systems",
                                "Flutter Applications",
                                "Blockchain Integrations",
                                "Community Impact Projects (Ayuda)"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium bg-gray-50/50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                                    <div className="w-2 h-2 rounded-full bg-royal-purple"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </motion.div>

            </div>
        </section>
    );
};
