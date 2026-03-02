import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import profilePhoto from "../../assets/profilephoto.jpg";

export const Hero = () => {
    return (
        <section id="home" className="min-h-[85vh] flex items-center mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 dark:text-gray-100 tracking-tight">
                        <span className="text-gradient block mb-2">AI/ML</span>
                        & Flutter Developer
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed pt-2">
                        Computer Science student passionate about AI, Data Science, Blockchain and Web3 innovation. Co-Founder at Ayuda building impactful technology-driven solutions.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button variant="primary">
                            <a href="#projects">View Projects</a>
                        </Button>
                        <Button variant="secondary">
                            <a href="#contact">Contact Me</a>
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex justify-center lg:justify-end relative"
                >
                    <div className="absolute inset-0 bg-royal-purple/20 blur-3xl rounded-full scale-150 -z-10"></div>
                    <div className="w-64 h-64 md:w-[400px] md:h-[400px] rounded-full border-4 border-royal-purple/20 p-2 glass-container flex items-center justify-center overflow-hidden shadow-2xl">
                        <img
                            src={profilePhoto}
                            alt="Ayush Kumar Singh"
                            className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
