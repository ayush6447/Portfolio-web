import { useRef, useEffect, useState, useCallback } from 'react';

const BorderGlow = ({
    children,
    edgeSensitivity = 30,
    glowColor = '124 58 237',
    backgroundColor = 'transparent',
    borderRadius = 16,
    glowRadius = 40,
    glowIntensity = 1,
    coneSpread = 25,
    animated = false,
    colors = ['#c084fc', '#f472b6', '#38bdf8'],
    className = '',
    style = {},
}) => {
    const containerRef = useRef(null);
    const [glowStyle, setGlowStyle] = useState({});
    const animFrameRef = useRef(null);
    const angleRef = useRef(0);

    // Animated border sweep
    useEffect(() => {
        if (!animated) return;
        const el = containerRef.current;
        if (!el) return;

        const tick = () => {
            angleRef.current = (angleRef.current + 0.8) % 360;
            const gradient = `conic-gradient(from ${angleRef.current}deg, ${colors.join(', ')}, ${colors[0]})`;
            el.style.setProperty('--border-gradient', gradient);
            animFrameRef.current = requestAnimationFrame(tick);
        };
        animFrameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [animated, colors]);

    const handleMouseMove = useCallback((e) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const w = rect.width;
        const h = rect.height;

        // Distance from each edge
        const distTop    = y;
        const distBottom = h - y;
        const distLeft   = x;
        const distRight  = w - x;
        const minDist = Math.min(distTop, distBottom, distLeft, distRight);

        if (minDist > edgeSensitivity + glowRadius) {
            setGlowStyle({});
            return;
        }

        // Which edge is closest?
        const strength = Math.max(0, 1 - minDist / (edgeSensitivity + glowRadius));
        const alpha = strength * glowIntensity;

        // Build radial glow positioned at mouse on the nearest edge
        let gx = x;
        let gy = y;
        if (minDist === distTop)    gy = 0;
        if (minDist === distBottom) gy = h;
        if (minDist === distLeft)   gx = 0;
        if (minDist === distRight)  gx = w;

        const pctX = (gx / w) * 100;
        const pctY = (gy / h) * 100;

        setGlowStyle({
            '--glow-x': `${pctX}%`,
            '--glow-y': `${pctY}%`,
            '--glow-alpha': alpha,
            '--glow-radius': `${glowRadius * 2}px`,
            '--glow-color': glowColor,
        });
    }, [edgeSensitivity, glowRadius, glowIntensity, glowColor]);

    const handleMouseLeave = useCallback(() => {
        setGlowStyle({});
    }, []);

    const hasGlow = Object.keys(glowStyle).length > 0;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative ${className}`}
            style={{
                borderRadius,
                backgroundColor,
                // Animated gradient border
                ...(animated ? {
                    padding: '1.5px',
                    background: `var(--border-gradient, linear-gradient(135deg, ${colors.join(', ')}))`,
                } : {}),
                ...style,
            }}
        >
            {/* Edge glow overlay */}
            {hasGlow && !animated && (
                <div
                    aria-hidden
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius,
                        pointerEvents: 'none',
                        zIndex: 0,
                        background: `radial-gradient(
                            ${glowStyle['--glow-radius']} circle at ${glowStyle['--glow-x']} ${glowStyle['--glow-y']},
                            rgba(${glowStyle['--glow-color']}, ${glowStyle['--glow-alpha']}) 0%,
                            transparent 70%
                        )`,
                    }}
                />
            )}

            {/* Border ring that glows */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius,
                    pointerEvents: 'none',
                    zIndex: 1,
                    border: animated
                        ? 'none'
                        : `1.5px solid rgba(${glowColor}, ${hasGlow ? Math.min(0.9, (glowStyle['--glow-alpha'] || 0) * 1.5) : 0.18})`,
                    transition: 'border-color 0.2s ease',
                    boxShadow: hasGlow && !animated
                        ? `0 0 ${glowRadius / 2}px rgba(${glowColor}, ${(glowStyle['--glow-alpha'] || 0) * 0.4})`
                        : 'none',
                }}
            />

            {/* Inner content wrapper (for animated border — sits on top of gradient bg) */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    borderRadius: animated ? borderRadius - 2 : borderRadius,
                    overflow: 'hidden',
                    ...(animated ? {
                        backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
                    } : {}),
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default BorderGlow;
