import { HTTPReq} from './helpers/HTTPReq';
import { Autosuggest, AutosuggestOptions, AutosuggestResult } from './Autosuggest';
import { findStringInStringArray } from './helpers/findStringInStringArray';
import { dynamicSort, dynamicSortMultiple } from './helpers/dynamicSorting';
import { emboldenMatch } from './helpers/emboldenMatch';

enum CountrySelectorValue {
	key,
	primary,
}

interface CountrySelectorOptions extends AutosuggestOptions {
	value?: CountrySelectorValue;
	valueLocale?: string;
	displayLocale?: string;
	showMatch?: boolean;
	boldMatch?: boolean;
	maxSuggestions?: number;
}

interface CountryResult {
	territory: string;
	locale: string;
	key: string;
	localeScore: number;
	score: number;
	name: string;
}

export class CountrySelector {

	// Options
	private options: CountrySelectorOptions = {
		value: CountrySelectorValue.key,
		valueLocale: document.documentElement.lang || navigator.language || 'en',
		displayLocale: document.documentElement.lang || navigator.language || 'en',
		showMatch: true,
		boldMatch: true,
		maxSuggestions: 10
	};

	// UI Controller
	private autosuggest: Autosuggest;

	// Data
	private territories: object = {};

	// State
	private _locales: string[] = [];
	private query: string;
	private queryParts: string[];
	private queryPartsLength: number;
	private results: any[];

	constructor(target: HTMLInputElement, options?: CountrySelectorOptions) {
		this.options = { ...this.options, ...options };
		
		this.autosuggest = new Autosuggest(target, this.suggestCountries.bind(this), this.options);
		this.mapTerritories();
	}

	get locales(): string[] {
		if (!this._locales.length) {
			if (navigator.language) {
				this._locales.push(navigator.language);
			}

			if (document.documentElement.lang) {
				this._locales.push(document.documentElement.lang);
			}

			if (this.options.displayLocale) {
				this._locales.push(this.options.displayLocale);
			}

			if (this.options.valueLocale) {
				this._locales.push(this.options.valueLocale);
			}

			this._locales = [... new Set(this._locales)];
		}

		return this._locales;
	}

	get currentDisplayLocale(): string {
		return this.options.displayLocale;
	}

	public setDisplayLocale(locale: string): void {
		this.options.displayLocale = locale;

		this.addLocale(locale);
	}

	private addLocale(locale: string): void {
		if (!this._locales.includes(locale)) {
			this._locales.push(locale);
			this.getLocale(locale);
		}
	}

	private mapTerritories() {
		this.locales.forEach(this.getLocale.bind(this));
	}

	private getLocale(locale: string): void {
		HTTPReq(`./countries/${locale}.json`).then(result => this.mapLocale(locale, JSON.parse(result)));
	}

	private mapLocale(locale: string, territories: any) {
		for (let key in territories) {
			if (territories.hasOwnProperty(key)) {
				const names = territories[key];

				if (!(<any>this.territories)[key]) {
					(<any>this.territories)[key] = {};
				}

				if (!(<any>this.territories)[key][locale]) {
					(<any>this.territories)[key][locale] = territories[key];
				}
			}
		}
	}

	private suggestCountries(query: string): Promise<AutosuggestResult[]> {
		this.query = query;
		this.queryParts = this.query.split(' ');
		this.queryPartsLength = this.queryParts.length;

		return new Promise((resolve, reject) => {
			let suggestions: AutosuggestResult[] = [];

			resolve(this.findCountries());
		});
	}

	private findCountries(): AutosuggestResult[] {
		let matches: CountryResult[] = [];
		for (let key in this.territories) {
			if (this.territories.hasOwnProperty(key)) {
				const result = this.checkTerritory((<any>this.territories)[key]);

				if (result.match) {
					matches.push({
						territory: key,
						locale: result.locale,
						localeScore: result.localeScore,
						key: result.key,
						score: result.score,
						name: (<any>this.territories)[key][this.options.displayLocale].p
					});
				}
			}
		}

		return this.processMatches(matches);
	}

	private checkTerritory(territory: any) {
		let localeMatches = [];

		for (let key in territory) {
			if (territory.hasOwnProperty(key)) {
				const result = this.checkLocale(territory[key]);

				if (result.match) {
					localeMatches.push({
						locale: key,
						key: result.key,
						score: result.score
					});
				}
			}
		}

		const match = !!localeMatches.length;
		let localeScore = 1;
		let preferedResult;
		
		if (match) {
			preferedResult = localeMatches.filter(localeMatch => localeMatch.locale === this.options.displayLocale)[0];

			if (!preferedResult) {
				preferedResult = localeMatches.sort(dynamicSort('score'))[0];
			} else {
				localeScore = 0;
			}
		}

		return {
			match,
			locale: preferedResult ? preferedResult.locale : null,
			key: preferedResult ? preferedResult.key : null,
			score: preferedResult ? preferedResult.score : null,
			localeScore
		}
	}

	private checkLocale(locale: any) {
		let matches: any = [];

		for (let key in locale) {
			if (locale.hasOwnProperty(key)) {
				const nameResult = this.checkName(locale[key].toLowerCase());

				if (nameResult.match) {
					matches.push({
						key,
						score: nameResult.score
					});
				}			
			}
		}

		const match = !!matches.length;

		if (match) {
			matches = matches.sort(dynamicSort('score'));
		} 

		return {
			match,
			key: match ? matches[0].key : null,
			score: match ? matches[0].score : null
		}
	}

	private checkName(name: string) {
		const nameParts = name.split(' ');

		let previousArrayIndex = -1;
		let scores: number[] = [];
		
		this.queryParts.forEach(queryPart => {
			const result = findStringInStringArray(queryPart, nameParts);
			
			if (result.arrayIndex > previousArrayIndex && (scores.length === 0 || result.stringIndex === 0)) {
					scores.push(result.arrayIndex + result.stringIndex);
			}
		});

		return {
			match: scores.length >= this.queryPartsLength,
			score: Math.min.apply(Math, scores)
		}
	}

	private processMatches(matches: CountryResult[]): AutosuggestResult[] {

		return matches
			.sort(dynamicSortMultiple('localeScore', 'score', 'name'))
			.slice(0, this.options.maxSuggestions)
			.map(match => {
				return {
					value: this.getValue(match),
					displayValue: this.getDisplayValue(match),
					suggestionHTML: this.getSuggestionHTML(match)
				}
			});
	}

	private getValue(match: CountryResult): string {
		switch (this.options.value) {
			case CountrySelectorValue.primary:
				return (<any>this.territories)[match.territory][this.options.valueLocale].p;
			default:
				return match.key;
		}
	}

	private getDisplayValue(match: CountryResult): string {
		return (<any>this.territories)[match.territory][this.options.displayLocale].p;
	}

	private getSuggestionHTML(match: CountryResult): string {
		let primaryName = this.getDisplayValue(match);
		let secondaryName = (<any>this.territories)[match.territory][match.locale][match.key];

		const differentNames = primaryName !== secondaryName;

		if (this.options.boldMatch) {
			if (differentNames) {
				secondaryName = emboldenMatch(secondaryName, this.query);
			} else {
				primaryName = emboldenMatch(primaryName, this.query);
			}	
		}

		let html = primaryName;

		if (differentNames) {
			html += ` <small>(${secondaryName})</small>`;
		}

		return html;
	}
}
