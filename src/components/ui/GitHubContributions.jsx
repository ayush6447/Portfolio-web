import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

// Fetches from a public CORS-friendly proxy for GitHub contribution data
const PROXY = "https://github-contributions-api.jogruber.de/v4/";

const getColor = (count, isDark) => {
    if (count === 0) return isDark ? "#1f2937" : "#e5e7eb"; // gray-800 / gray-200
    if (count < 3)  return "#6d28d9";  // lighter purple
    if (count < 6)  return "#7c3aed";  // royal-purple
    if (count < 10) return "#8b5cf6";
    return "#a78bfa";                  // bright purple
};

export const GitHubContributions = ({ username }) => {
    const [weeks, setWeeks] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${PROXY}${username}?y=last`);
                if (!res.ok) throw new Error("Failed");
                const data = await res.json();
                // data.contributions is an array of { date, count, level }
                // Group into weeks
                const flat = data.contributions; // sorted oldest → newest
                const grouped = [];
                for (let i = 0; i < flat.length; i += 7) {
                    grouped.push(flat.slice(i, i + 7));
                }
                setWeeks(grouped);
                setTotal(flat.reduce((sum, d) => sum + d.count, 0));
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [username]);

    const monthLabels = (() => {
        if (!weeks.length) return [];
        const labels = [];
        let lastMonth = -1;
        weeks.forEach((week, wi) => {
            const d = new Date(week[0]?.date);
            const m = d.getMonth();
            if (m !== lastMonth) {
                labels.push({ index: wi, label: d.toLocaleString("default", { month: "short" }) });
                lastMonth = m;
            }
        });
        return labels;
    })();

    return (
        <div className="glass-card p-6 md:p-8 rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-royal-purple" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        GitHub Activity
                    </h3>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-royal-purple hover:underline font-medium"
                    >
                        @{username}
                    </a>
                </div>
                {!loading && !error && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {total.toLocaleString()} contributions in the last year
                    </span>
                )}
            </div>

            {loading && (
                <div className="flex items-center justify-center h-24 text-gray-400 dark:text-gray-500 text-sm">
                    Loading contributions…
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center h-24 text-gray-400 dark:text-gray-500 text-sm">
                    Could not load contributions — check your network or username.
                </div>
            )}

            {!loading && !error && (
                <div className="overflow-x-auto">
                    {/* Month labels */}
                    <div className="flex mb-1" style={{ paddingLeft: "20px" }}>
                        {weeks.map((_, wi) => {
                            const found = monthLabels.find((m) => m.index === wi);
                            return (
                                <div
                                    key={wi}
                                    className="text-[10px] text-gray-400 dark:text-gray-500"
                                    style={{ width: "13px", flexShrink: 0 }}
                                >
                                    {found ? found.label : ""}
                                </div>
                            );
                        })}
                    </div>

                    {/* Grid: 7 rows (days) × N cols (weeks) */}
                    <div className="flex gap-0.5">
                        {/* Day-of-week labels */}
                        <div className="flex flex-col gap-0.5 mr-1">
                            {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                                <div
                                    key={i}
                                    className="text-[9px] text-gray-400 dark:text-gray-500 leading-none flex items-center"
                                    style={{ height: "11px", width: "18px" }}
                                >
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Contribution cells */}
                        {weeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-0.5">
                                {Array.from({ length: 7 }).map((_, di) => {
                                    const day = week[di];
                                    const count = day?.count ?? 0;
                                    return (
                                        <motion.div
                                            key={di}
                                            title={day ? `${day.date}: ${count} contribution${count !== 1 ? "s" : ""}` : ""}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.2, delay: wi * 0.003 }}
                                            style={{
                                                width: "11px",
                                                height: "11px",
                                                borderRadius: "2px",
                                                backgroundColor: getColor(count, isDark),
                                                flexShrink: 0,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-1.5 mt-4 justify-end">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mr-1">Less</span>
                        {[0, 2, 5, 8, 12].map((n) => (
                            <div
                                key={n}
                                style={{
                                    width: "11px",
                                    height: "11px",
                                    borderRadius: "2px",
                                    backgroundColor: getColor(n, isDark),
                                    flexShrink: 0,
                                }}
                            />
                        ))}
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-1">More</span>
                    </div>
                </div>
            )}
        </div>
    );
};
