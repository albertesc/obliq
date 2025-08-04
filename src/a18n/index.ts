import spanish from './es.json';
import english from './en.json';

const LANGUAGES = {
    ENGLISH: 'en',
    SPANISH: 'es'
}

function getI18N ({ currentLocale }: { currentLocale: string }) {
    if(currentLocale === LANGUAGES.ENGLISH) return english;
    if(currentLocale === LANGUAGES.SPANISH) return spanish;
    return english;
}

export { LANGUAGES, getI18N }