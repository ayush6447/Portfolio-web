import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Mail, Linkedin, Send, Github, Code } from "lucide-react";

export const Contact = () => {
    return (
        <section id="contact" className="min-h-screen pt-24 pb-12">
            <SectionTitle title="Contact." />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Let's build something great together.</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-10">
                        I'm currently looking for new opportunities, internships, and collaborations.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-6">
                        <a
                            href="mailto:akr6447@gmail.com"
                            className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-royal-purple dark:hover:text-royal-purple transition-colors text-lg font-medium"
                        >
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                                <Mail className="w-5 h-5" />
                            </div>
                            akr6447@gmail.com
                        </a>

                        <a
                            href="https://linkedin.com/in/ayushkumarjsr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-royal-purple dark:hover:text-royal-purple transition-colors text-lg font-medium"
                        >
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                                <Linkedin className="w-5 h-5" />
                            </div>
                            linkedin.com/in/ayushkumarjsr
                        </a>

                        <a
                            href="https://github.com/Ayush6447"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-royal-purple dark:hover:text-royal-purple transition-colors text-lg font-medium"
                        >
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                                <Github className="w-5 h-5" />
                            </div>
                            github.com/Ayush6447
                        </a>

                        <a
                            href="https://codolio.com/profile/akr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-royal-purple dark:hover:text-royal-purple transition-colors text-lg font-medium"
                        >
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                                <Code className="w-5 h-5" />
                            </div>
                            codolio.com/profile/akr
                        </a>
                    </div>
                </motion.div>

                {/* Minimal Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="!p-8 lg:!p-10">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-royal-purple/20 focus:border-royal-purple transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-royal-purple/20 focus:border-royal-purple transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-royal-purple/20 focus:border-royal-purple transition-all resize-none"
                                    placeholder="Hello Ayush..."
                                />
                            </div>
                            <Button type="submit" variant="primary" className="w-full flex justify-center items-center gap-2">
                                Send Message <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </Card>
                </motion.div>

            </div>
        </section>
    );
};
