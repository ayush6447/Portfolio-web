import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300 dark:bg-purple-900 gap-4 blur-[120px] opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-300 dark:bg-indigo-900 blur-[120px] opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"></div>
            </div>

            <Navbar />

            <main className="container mx-auto px-6 md:px-12 pt-32 pb-24">
                {children}
            </main>

            <Footer />
        </div>
    );
};
