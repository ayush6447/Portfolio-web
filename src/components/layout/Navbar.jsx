import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedThemeToggler } from "../ui/AnimatedThemeToggler";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "#projects" },
        { name: "Experience", path: "#experience" },
        { name: "Skills", path: "#skills" },
        { name: "About", path: "#about" },
        { name: "Contact", path: "#contact" }
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    Ayush<span className="text-royal-purple text-3xl leading-[0]">.</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className={`text-sm font-medium transition-colors hover:text-royal-purple dark:hover:text-royal-purple ${location.hash === link.path || (location.pathname === '/' && link.path === '/') ? "text-royal-purple" : "text-gray-600 dark:text-gray-300"}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Animated theme toggler — circle clip-path transition */}
                    <AnimatedThemeToggler variant="circle" duration={500} />

                    <button
                        className="md:hidden p-2 text-gray-900 dark:text-gray-100"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isMobileMenuOpen ? (
                                <motion.span key="close"
                                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                                    <X size={24} />
                                </motion.span>
                            ) : (
                                <motion.span key="open"
                                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                                    <Menu size={24} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div key="mobile-menu"
                        initial={{ opacity: 0, y: -12, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -12, scaleY: 0.95 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        style={{ transformOrigin: "top" }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 shadow-xl py-4 px-6 flex flex-col gap-1"
                    >
                        {links.map((link, idx) => (
                            <motion.a key={link.name} href={link.path}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.04, duration: 0.18 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-medium py-3 px-2 rounded-lg text-gray-800 dark:text-gray-200 hover:text-royal-purple dark:hover:text-royal-purple hover:bg-royal-purple/5 transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
