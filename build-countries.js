const jsonfile = require('jsonfile');
const availableLocales = require('./node_modules/cldr-core/availableLocales').availableLocales.modern;
const localesArg = process.argv.filter((val, index, array) => val.includes('locales='))[0];
const fileArg = process.argv.filter((val, index, array) => val.includes('file='))[0];

const territories = {};

let requestedLocales = [];
let fileLoc = 'territories.json';

// Default to en if no args are provided
if(localesArg) {
	requestedLocales = localesArg.split('=')[1].split(',');
} else {
	requestedLocales.push('en');
}

if(fileArg) {
	fileLoc = fileArg.split('=')[1];
}

// Check that all requested locales are valid
requestedLocales.forEach(locale => {
	if(availableLocales.includes(locale)) {
		addLocaleToArray(locale);
	} else {
		throw new Error(`The locale ${locale} could not be found. Reminder: locale arguments are CASE SENSITIVE.`);
	}
});

function addLocaleToArray(locale) {
	const json =  require(`./node_modules/cldr-localenames-modern/main/${locale}/territories.json`);
	const allTeritories = json.main[locale].localeDisplayNames.territories;
	
	for(let key in allTeritories) {
		if(allTeritories.hasOwnProperty(key) && isNaN(parseInt(key))) {
			addTerritory(locale, key, allTeritories[key]);
		}
	}

	jsonfile.writeFile(`./${fileLoc}`, territories);
}

function addTerritory(locale, key, name) {
	let prop = 'p';

	if(key.includes('-alt-short')) {
		key = key.replace('-alt-short', '');
		prop = 's';
	} else if(key.includes('-alt-variant')) {
		key = key.replace('-alt-variant', '');
		prop = 'v';
	}

	if(!territories[key]) {
		territories[key] = {};
	}

	if(!territories[key][locale]) {
		territories[key][locale] = {};
	}

	territories[key][locale][prop] = name;
}
