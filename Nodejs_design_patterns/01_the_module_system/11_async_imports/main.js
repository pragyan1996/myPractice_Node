const supported_languages = ['el', 'en', 'es', 'it', 'pl'];
const selectedLanguage = process.argv[2];

if (!supported_languages.includes(selectedLanguage)) {
    console.error('This language is not supported.');
    process.exit(1);
}

const translationModule = `./string_${selectedLanguage}.js`;
import(translationModule)
    .then((strings) => {
        console.log(strings.HELLO);
    })