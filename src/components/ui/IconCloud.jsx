import { useEffect, useState } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

// Your actual tech stack slugs from simpleicons.org
const slugs = [
    "python",
    "tensorflow",
    "scikitlearn",
    "pytorch",
    "react",
    "nextdotjs",
    "tailwindcss",
    "flutter",
    "dart",
    "django",
    "fastapi",
    "nodejs",
    "mongodb",
    "firebase",
    "ethereum",
    "solidity",
    "git",
    "github",
    "docker",
    "linux",
    "typescript",
    "javascript",
    "kaggle",
    "googlecolab",
];

// tagcanvas options — controls the 3D physics & look
const cloudProps = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingTop: "40px",
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "default",
        tooltip: "native",
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.04,
        minSpeed: 0.02,
        dragControl: true,
    },
};

export const IconCloud = () => {
    const [icons, setIcons] = useState(null);
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );

    // Track dark/light mode
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    // Fetch icons on mount
    useEffect(() => {
        fetchSimpleIcons({ slugs }).then(setIcons);
    }, []);

    const renderedIcons = icons
        ? Object.values(icons.simpleIcons).map((icon) =>
              renderSimpleIcon({
                  icon,
                  size: 42,
                  bgHex: isDark ? "#111827" : "#f3f4f6",
                  fallbackHex: isDark ? "#a78bfa" : "#7c3aed",
                  minContrastRatio: 2,
                  aProps: {
                      onClick: (e) => e.preventDefault(),
                  },
              })
          )
        : null;

    return (
        <Cloud {...cloudProps}>
            {renderedIcons ?? (
                <a>Loading...</a>
            )}
        </Cloud>
    );
};
