import en from './locales/en.json';
import cat from './locales/cat.json';
import es from './locales/es.json';

class Language {
    REGen = new RegExp("^/en");
    REGcat = new RegExp("^/cat");
    REGes = new RegExp("^/es");

    getCurrentLanguageURL(url){
        if(this.REGen.test(url)) return "en";
        else if(this.REGcat.test(url)) return "cat";
        else if(this.REGes.test(url)) return "es";
        else {
            var lan = navigator.language || navigator.userLanguage || "en";
            if(lan === 'en') return "en";
            else if (lan === 'es') return "es";
            else return "en";
        }
    }

    getCurrentFromURL(url){
        if(this.REGen.test(url)) return en;
        else if(this.REGcat.test(url)) return cat;
        else if(this.REGes.test(url)) return es;
        else {
            var lan = navigator.language || navigator.userLanguage || "en";
            if(lan === 'en') return en;
            else if (lan === 'es') return es;
            else return en;
        }
    }
}

export default new Language();