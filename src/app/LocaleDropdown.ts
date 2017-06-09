const availableLocales = require('../../node_modules/cldr-core/availableLocales.json').availableLocales.modern;
import { CountrySelector } from './CountrySelector';

export class LocaleDropdown {

	private control: HTMLSelectElement;
	private countrySelector: CountrySelector;

	constructor(control: HTMLSelectElement, countrySelector: CountrySelector) {
		this.control = control;
		this.countrySelector = countrySelector;

		this.init();
	}

	private init(): void {
		let html = '';

		availableLocales.forEach((locale: string) => {
			html += `<option value=${locale}>${locale}</option>`;
		});

		this.control.innerHTML = html;

		this.control.value = this.countrySelector.currentDisplayLocale;

		this.control.addEventListener('change', this.handleChange.bind(this));
	}

	private handleChange(): void {
		this.countrySelector.setDisplayLocale(this.control.value);
	}
}
