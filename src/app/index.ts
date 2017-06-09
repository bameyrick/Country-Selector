import { CountrySelector } from './CountrySelector';
import { LocaleDropdown } from './LocaleDropdown';

const countrySelector = new CountrySelector(<HTMLInputElement>document.getElementById('country-selector'), {
	inputValidClass: 'FormControl--valid',
	inputInvalidClass: 'FormControl--invalid',
	displayLocale: 'en-GB'
});

const localeDropdown = new LocaleDropdown(<HTMLSelectElement>document.getElementById('display-locale'), countrySelector);
