import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Check initial theme
        if (document.documentElement.classList.contains('dark')) {
            setIsDark(true);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

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
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
                    </button>

                    <button
                        className="md:hidden p-2 text-gray-900 dark:text-gray-100"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 shadow-xl py-4 px-6 flex flex-col gap-4">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium py-2 text-gray-800 dark:text-gray-200 hover:text-royal-purple dark:hover:text-royal-purple"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};
