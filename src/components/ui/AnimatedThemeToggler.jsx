import { useRef, useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const clipPaths = {
    circle:    (x, y, r) => `circle(${r}px at ${x}px ${y}px)`,
    square:    (x, y, r) => `inset(${y - r}px ${window.innerWidth - x - r}px ${window.innerHeight - y - r}px ${x - r}px round 4px)`,
    diamond:   (x, y, r) => `polygon(${x}px ${y - r}px, ${x + r}px ${y}px, ${x}px ${y + r}px, ${x - r}px ${y}px)`,
    star:      (x, y, r) => {
        const pts = [];
        for (let i = 0; i < 10; i++) {
            const ang = (Math.PI / 5) * i - Math.PI / 2;
            const rad = i % 2 === 0 ? r : r * 0.45;
            pts.push(`${x + rad * Math.cos(ang)}px ${y + rad * Math.sin(ang)}px`);
        }
        return `polygon(${pts.join(', ')})`;
    },
    hexagon:   (x, y, r) => {
        const pts = [];
        for (let i = 0; i < 6; i++) {
            const ang = (Math.PI / 3) * i - Math.PI / 6;
            pts.push(`${x + r * Math.cos(ang)}px ${y + r * Math.sin(ang)}px`);
        }
        return `polygon(${pts.join(', ')})`;
    },
    triangle:  (x, y, r) =>
        `polygon(${x}px ${y - r}px, ${x + r * 0.866}px ${y + r * 0.5}px, ${x - r * 0.866}px ${y + r * 0.5}px)`,
};

export const AnimatedThemeToggler = ({
    variant = 'circle',
    duration = 500,
    fromCenter = false,
}) => {
    const [isDark, setIsDark] = useState(
        () => document.documentElement.classList.contains('dark')
    );
    const btnRef = useRef(null);

    // Sync with external class changes (e.g. from old Navbar toggle)
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const toggle = async () => {
        const nextDark = !isDark;

        // Fallback: no View Transitions support
        if (!document.startViewTransition) {
            document.documentElement.classList.toggle('dark', nextDark);
            setIsDark(nextDark);
            return;
        }

        // Origin point
        let ox, oy;
        if (fromCenter) {
            ox = window.innerWidth / 2;
            oy = window.innerHeight / 2;
        } else {
            const rect = btnRef.current?.getBoundingClientRect();
            ox = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
            oy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
        }

        const maxR = Math.hypot(
            Math.max(ox, window.innerWidth - ox),
            Math.max(oy, window.innerHeight - oy)
        );

        const clipFn = clipPaths[variant] ?? clipPaths.circle;

        const transition = document.startViewTransition(() => {
            document.documentElement.classList.toggle('dark', nextDark);
            setIsDark(nextDark);
        });

        await transition.ready;

        const keyframes = [
            { clipPath: clipFn(ox, oy, 0) },
            { clipPath: clipFn(ox, oy, maxR) },
        ];

        // New view expands from origin
        document.documentElement.animate(keyframes, {
            duration,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
        });
    };

    return (
        <button
            ref={btnRef}
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
            {isDark
                ? <Sun size={20} className="text-yellow-400" />
                : <Moon size={20} className="text-gray-700" />
            }
        </button>
    );
};
