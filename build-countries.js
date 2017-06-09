const jsonfile = require('jsonfile');
const availableLocales = require('./node_modules/cldr-core/availableLocales').availableLocales.modern;
const fileArg = process.argv.filter((val, index, array) => val.includes('file='))[0];

const territories = {};

let fileLoc = './build/countries';


if(fileArg) {
	fileLoc = fileArg.split('=')[1];
}

availableLocales.forEach(locale => {
	const json =  require(`./node_modules/cldr-localenames-modern/main/${locale}/territories.json`);
	const territory = json.main[locale].localeDisplayNames.territories;

	jsonfile.writeFile(`${fileLoc}/${locale}.json`, mapTerritories(json.main[locale].localeDisplayNames.territories));
});

function mapTerritories(territories) {
	const result = {};

	for (let key in territories) {
		if (territories.hasOwnProperty(key) && isNaN(parseInt(key))) {
			const name = territories[key];
			let prop = 'p';

			if(key.includes('-alt-short')) {
				key = key.replace('-alt-short', '');
				prop = 's';
			} else if(key.includes('-alt-variant')) {
				key = key.replace('-alt-variant', '');
				prop = 'v';
			}

			if(!result[key]) {
				result[key] = {};
			}

			result[key][prop] = name;
		}
	}
	return result;
}
