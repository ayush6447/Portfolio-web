import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { Award } from "lucide-react";

export const Certifications = () => {
    const certs = [
        {
            title: "Career Essentials in Generative AI",
            issuer: "Microsoft & LinkedIn",
        },
        {
            title: "Tata Data Visualization Job Simulation",
            issuer: "Forage",
        },
        {
            title: "AWS APAC Solutions Architecture Job Simulation",
            issuer: "Forage",
        },
        {
            title: "IEEE Ideathon",
            issuer: "Runner-up",
        },
        {
            title: "Elysium Volunteer Certificate",
            issuer: "Community Service",
        }
    ];

    return (
        <section id="certifications" className="min-h-screen pt-24 pb-12">
            <SectionTitle title="Certifications & Awards." />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certs.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                        <Card className="h-full flex flex-col justify-between border hover:border-royal-purple/30 group">
                            <div>
                                <Award className="w-8 h-8 text-royal-purple/50 mb-4 group-hover:text-royal-purple transition-colors" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-snug">{cert.title}</h3>
                            </div>
                            <div className="mt-6 text-gray-500 dark:text-gray-400 font-medium">
                                {cert.issuer}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
