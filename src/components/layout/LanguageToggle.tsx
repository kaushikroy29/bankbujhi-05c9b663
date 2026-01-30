import { Button } from "@/components/ui/button";
import { useState } from "react";

const LanguageToggle = () => {
    const [language, setLanguage] = useState<'bn' | 'en'>('bn');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'bn' ? 'en' : 'bn');
        // In a real implementation, this would trigger a context update or i18n change
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
