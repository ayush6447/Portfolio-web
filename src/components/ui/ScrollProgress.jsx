import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const ScrollProgress = () => {
    const [scrollPct, setScrollPct] = useState(0);
    const scaleX = useSpring(scrollPct, { stiffness: 200, damping: 30 });

    useEffect(() => {
        const update = () => {
            const el = document.documentElement;
            const scrolled = el.scrollTop || document.body.scrollTop;
            const total = el.scrollHeight - el.clientHeight;
            setScrollPct(total > 0 ? scrolled / total : 0);
        };
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <motion.div
            style={{ scaleX, transformOrigin: "left" }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-royal-purple z-[100] shadow-[0_0_8px_rgba(124,58,237,0.6)]"
        />
    );
};
