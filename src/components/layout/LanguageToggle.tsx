import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'bn' ? 'en' : 'bn');
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-bold border border-primary/20 hover:bg-primary/5 min-w-[40px]"
        >
            {language === 'bn' ? 'EN' : 'বাং'}
        </Button>
    );
};

export default LanguageToggle;
