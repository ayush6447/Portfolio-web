import { motion } from "framer-motion";

export const Card = ({ children, className = "" }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`glass-card p-6 md:p-8 ${className}`}
        >
            {children}
        </motion.div>
    );
};
