export const SectionTitle = ({ title }) => {
    return (
        <h2 className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-2 group">
            {title}
            <span className="w-2 h-2 rounded-full bg-royal-purple inline-block transition-transform group-hover:scale-150"></span>
        </h2>
    );
};
