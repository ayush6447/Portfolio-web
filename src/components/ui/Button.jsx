import { mergeClasses } from "../../utils/cn"; // we'll create a quick cx utility or just use template literals

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
    const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-95";

    const variants = {
        primary: "bg-gray-900 dark:bg-royal-purple text-white hover:bg-gray-800 dark:hover:bg-royal-purple/90 shadow-lg hover:shadow-xl",
        secondary: "bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-800 shadow-md hover:shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-700",
        outline: "border-2 border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
