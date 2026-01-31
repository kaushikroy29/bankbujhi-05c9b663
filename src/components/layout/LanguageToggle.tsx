import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const LanguageToggle = () => {
    const [language, setLanguage] = useState<'bn' | 'en'>(() => {
        const saved = localStorage.getItem('bankbujhi-lang');
        return (saved as 'bn' | 'en') || 'bn';
    });

    useEffect(() => {
        localStorage.setItem('bankbujhi-lang', language);
        // In a real app, this would also update i18n instance
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'bn' ? 'en' : 'bn');
        console.log(`Language switched to ${language === 'bn' ? 'English' : 'Bangla'}`);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-bold border border-primary/20 hover:bg-primary/5"
        >
            {language === 'bn' ? 'EN' : 'BN'}
        </Button>
    );
};

export default LanguageToggle;
