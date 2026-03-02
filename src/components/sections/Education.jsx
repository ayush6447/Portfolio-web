import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { GraduationCap } from "lucide-react";

export const Education = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const trunkHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const educationData = [
        {
            institution: "Siksha 'O' Anusandhan University",
            degree: "Bachelor of Technology (B.Tech), Computer Science",
            duration: "2024 – 2028",
            details: "Focus Areas: AI, Machine Learning, Data Science, Blockchain, Web3"
        },
        {
            institution: "DAV Public School, Bistupur, Jamshedpur",
            degree: "Secondary Education",
            duration: "2022 – 2024",
            details: null
        },
        {
            institution: "Delhi Public School, Jamshedpur",
            degree: "Secondary Education",
            duration: "2010 – 2022",
            details: null
        }
    ];

    return (
        <section id="education" className="min-h-screen pt-24 pb-24 relative" ref={containerRef}>
            <SectionTitle title="Education." />

            <div className="relative max-w-5xl mx-auto mt-16 md:mt-24">

                {/* Animated Trunk Line (Center) */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-800 -translate-x-1/2 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-royal-purple shadow-[0_0_15px_rgba(124,58,237,0.7)]"
                        style={{ height: trunkHeight }}
                    />
                </div>

                {/* Desktop Layout */}
                <div className="space-y-0 relative z-10 hidden md:block">
                    {educationData.map((edu, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div key={idx} className="relative flex w-full mb-12">


                                {isEven ? (
                                    <>
                                        <div className="w-1/2 pr-12 flex justify-end relative">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "3rem" }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 0.4, delay: 0.4 }}
                                                className="absolute top-1/2 right-0 h-[2px] bg-royal-purple/50 -translate-y-1/2"
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, x: -50, y: 20 }}
                                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                                className="w-full relative z-10"
                                            >
                                                <Card className="hover:border-royal-purple/30 group overflow-hidden">
                                                    <EduContent edu={edu} />
                                                </Card>
                                            </motion.div>
                                        </div>
                                        <div className="w-1/2" />
                                    </>
                                ) : (
                                    <>
                                        <div className="w-1/2" />
                                        <div className="w-1/2 pl-12 flex justify-start relative">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "3rem" }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 0.4, delay: 0.4 }}
                                                className="absolute top-1/2 left-0 h-[2px] bg-royal-purple/50 -translate-y-1/2"
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, x: 50, y: 20 }}
                                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                                className="w-full relative z-10"
                                            >
                                                <Card className="hover:border-royal-purple/30 group overflow-hidden">
                                                    <EduContent edu={edu} />
                                                </Card>
                                            </motion.div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Layout */}
                <div className="space-y-12 relative z-10 block md:hidden">
                    {educationData.map((edu, idx) => (
                        <div key={idx} className="relative flex w-full">


                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "2rem" }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                className="absolute top-1/2 left-6 h-[2px] bg-royal-purple/50 -translate-y-1/2"
                            />

                            <div className="w-full pl-14">
                                <motion.div
                                    initial={{ opacity: 0, x: 20, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <Card className="hover:border-royal-purple/30 group overflow-hidden">
                                        <EduContent edu={edu} />
                                    </Card>
                                </motion.div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

const EduContent = ({ edu }) => (
    <>
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-royal-purple/5 dark:bg-royal-purple/10 rounded-full blur-2xl group-hover:bg-royal-purple/10 dark:group-hover:bg-royal-purple/20 transition-colors"></div>
        <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 bg-royal-purple/10 dark:bg-royal-purple/20 rounded-xl text-royal-purple shrink-0">
                <GraduationCap className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 tracking-tight">
                    {edu.institution}
                </h3>
                <div className="text-royal-purple font-medium text-lg mb-3">
                    {edu.degree}
                </div>
                <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300 font-medium mb-4">
                    {edu.duration}
                </div>
                {edu.details && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        {edu.details}
                    </p>
                )}
            </div>
        </div>
    </>
);
