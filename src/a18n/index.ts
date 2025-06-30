import spanish from './es.json';

const LANGUAGES = {
    SPANISH: 'es'
}

function getI18N ({ currentLocale }: { currentLocale: string }) {
    if(currentLocale === LANGUAGES.SPANISH) return spanish;
    return spanish;
}

export { LANGUAGES, getI18N }