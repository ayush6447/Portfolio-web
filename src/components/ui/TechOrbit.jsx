import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// SVG icon paths — monochrome, all white/gray on dark, dark on light
const TECH_ICONS = {
    React: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </svg>
    ),
    Python: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.9 2C9 2 7.2 3.2 7.2 5v2.3h5v.8H5.3C3.4 8.1 2 9.6 2 12s1.4 3.9 3.3 4.2l.5.1v2.2C5.8 20.8 7.6 22 10.5 22h1.6c2.9 0 4.7-1.2 4.7-3.5v-2.2h-5v-.8h6.9c1.9-.3 3.3-1.8 3.3-4.2s-1.4-3.9-3.3-4.2H17V5c0-1.8-1.8-3-4.7-3zm-1.3 1.8c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm2.6 14.6c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/>
        </svg>
    ),
    TensorFlow: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zM12.46 0l10.248 5.856.015 5.31-6.168-3.564v14.02L12.46 24V0z"/>
        </svg>
    ),
    Flutter: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
        </svg>
    ),
    "Next.js": (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C6.07.56 2.25 3.867.863 8.218c-.347 1.099-.52 2.252-.52 3.402 0 5.8 4.295 10.639 10.007 11.343l.365.04h.29l.365-.04C16.726 22.26 21 17.418 21 11.62c0-1.15-.173-2.303-.52-3.402C19.099 3.867 15.29.56 10.931.04A19.76 19.76 0 0 0 10.567.007C10.52.001 10.386 0 10.21 0h1.362zM10 4.5l7 12H3l7-12z"/>
        </svg>
    ),
    MongoDB: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218z"/>
        </svg>
    ),
    Django: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203V0zm0 9.143a3.894 3.894 0 0 0-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v11.49c0 3.97-.293 5.882-1.146 7.53-.802 1.6-1.86 2.61-4.041 3.72l-3.644-1.733c2.18-1.02 3.236-1.95 3.92-3.35.74-1.422.97-3.1.97-7.47V6.06h3.94zM17.373 0h3.941v4.005h-3.94V0z"/>
        </svg>
    ),
    NodeJS: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0 l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072 c-0.081-0.047-0.189-0.047-0.271,0L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235 l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115 c0.139,0,0.255,0.112,0.255,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L1.28,18.675 c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0 l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078 C12.643,23.916,12.324,24,11.998,24z"/>
        </svg>
    ),
    Blockchain: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="7" width="5" height="4" rx="1"/>
            <rect x="9" y="7" width="5" height="4" rx="1"/>
            <rect x="16" y="7" width="6" height="4" rx="1"/>
            <rect x="5.5" y="13" width="5" height="4" rx="1"/>
            <rect x="12.5" y="13" width="5" height="4" rx="1"/>
            <line x1="4.5" y1="11" x2="4.5" y2="13"/>
            <line x1="11.5" y1="11" x2="11.5" y2="13"/>
            <line x1="11.5" y1="11" x2="8" y2="13"/>
            <line x1="4.5" y1="11" x2="8" y2="13"/>
            <line x1="19" y1="11" x2="15" y2="13"/>
            <line x1="11.5" y1="11" x2="15" y2="13"/>
        </svg>
    ),
    Tailwind: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8 c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8 c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z"/>
        </svg>
    ),
    FastAPI: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z"/>
        </svg>
    ),
    "Web3": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="12" cy="12" r="10"/>
            <ellipse cx="12" cy="12" rx="4" ry="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M4 6.5c2.5 1 5 1.5 8 1.5s5.5-.5 8-1.5"/>
            <path d="M4 17.5c2.5-1 5-1.5 8-1.5s5.5.5 8 1.5"/>
        </svg>
    ),
};

// Orbit rings config: radius, speed, items
const RINGS = [
    {
        r: 90,
        duration: 22,
        items: ["React", "Python", "Flutter", "Blockchain"],
    },
    {
        r: 148,
        duration: 38,
        direction: -1,
        items: ["TensorFlow", "Next.js", "Django", "NodeJS", "Tailwind", "FastAPI"],
    },
    {
        r: 205,
        duration: 55,
        items: ["MongoDB", "Web3"],
    },
];

const OrbitRing = ({ r, duration, direction = 1, items }) => {
    const count = items.length;

    return (
        <g>
            {/* Ring circle */}
            <circle
                cx="0" cy="0" r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-300 dark:text-gray-700"
                strokeDasharray="4 6"
            />
            {items.map((name, i) => {
                const angle = (i / count) * 360;
                const degreesPerSec = (direction * 360) / duration;
                return (
                    <motion.g
                        key={name}
                        style={{ rotate: angle }}
                        animate={{ rotate: angle + direction * 360 }}
                        transition={{ duration, ease: "linear", repeat: Infinity }}
                    >
                        {/* Position at radius */}
                        <motion.g
                            style={{ x: r, y: 0 }}
                            // Counter-rotate so icon stays upright
                            animate={{ rotate: -(angle + direction * 360) }}
                            transition={{ duration, ease: "linear", repeat: Infinity }}
                        >
                            {/* Icon bg circle */}
                            <circle r="18" className="fill-white dark:fill-gray-900 stroke-gray-200 dark:stroke-gray-700" strokeWidth="0.8" />
                            {/* Icon */}
                            <foreignObject x="-11" y="-11" width="22" height="22">
                                <div
                                    xmlns="http://www.w3.org/1999/xhtml"
                                    style={{ width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    className="text-gray-700 dark:text-gray-300"
                                >
                                    {TECH_ICONS[name]}
                                </div>
                            </foreignObject>
                        </motion.g>
                    </motion.g>
                );
            })}
        </g>
    );
};

export const TechOrbit = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: "-100px" });
    const SIZE = 480; // viewBox size

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center w-full"
        >
            <svg
                viewBox={`${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`}
                width="100%"
                style={{ maxWidth: SIZE, aspectRatio: "1" }}
                className="overflow-visible"
            >
                {/* Subtle radial glow at center */}
                <defs>
                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="0" cy="0" r={RINGS[RINGS.length - 1].r + 30} fill="url(#centerGlow)" />

                {/* Orbit rings */}
                {RINGS.map((ring, i) => (
                    <OrbitRing key={i} {...ring} />
                ))}

                {/* Center badge */}
                <circle cx="0" cy="0" r="52" className="fill-white dark:fill-gray-900 stroke-gray-200 dark:stroke-gray-700" strokeWidth="1" />
                <circle cx="0" cy="0" r="48" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 5" />
                <text
                    x="0" y="-8"
                    textAnchor="middle"
                    className="fill-gray-900 dark:fill-gray-100"
                    style={{ fontSize: "10px", fontWeight: 700, fontFamily: "Inter, sans-serif", letterSpacing: "0.05em" }}
                >
                    TECH
                </text>
                <text
                    x="0" y="8"
                    textAnchor="middle"
                    fill="#7c3aed"
                    style={{ fontSize: "10px", fontWeight: 700, fontFamily: "Inter, sans-serif", letterSpacing: "0.05em" }}
                >
                    STACK
                </text>
            </svg>
        </motion.div>
    );
};
