import DecryptedText from './DecryptedText';

export const SectionTitle = ({ title }) => {
    return (
        <h2 className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-2 group">
            <DecryptedText
                text={title}
                animateOn="view"
                sequential={true}
                revealDirection="start"
                speed={35}
                className="text-gray-900 dark:text-gray-100"
                encryptedClassName="text-royal-purple/50"
                parentClassName=""
            />
            <span className="w-2 h-2 rounded-full bg-royal-purple inline-block transition-transform group-hover:scale-150"></span>
        </h2>
    );
};
