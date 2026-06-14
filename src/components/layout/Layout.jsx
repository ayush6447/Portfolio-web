import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Particles from "../ui/Particles";

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen relative overflow-hidden">

            {/* WebGL Particle background — fixed, full viewport */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <Particles
                    particleCount={160}
                    particleSpread={10}
                    speed={0.06}
                    alphaParticles={true}
                    particleBaseSize={80}
                    sizeRandomness={1.2}
                    moveParticlesOnHover={true}
                    particleHoverFactor={0.35}
                    cameraDistance={20}
                    disableRotation={false}
                />
            </div>

            {/* Soft ambient blobs — sit above particles, below content */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300 dark:bg-purple-900 blur-[120px] opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-300 dark:bg-indigo-900 blur-[120px] opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen" />
            </div>

            <Navbar />

            <main className="container mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10">
                {children}
            </main>

            <Footer />
        </div>
    );
};
