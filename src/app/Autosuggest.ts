import { KEYCODE } from './helpers/keyCodes';
import { debounce } from './helpers/debounce';

export interface AutosuggestOptions {
	baseClass?: string;
	wrapperClass?: string;
	resultItemClass?: string;
	resultItemActiveClass?: string;
	inputValidClass?: string;
	inputInvalidClass?: string;
	noResultsClass?: string;
}

export interface AutosuggestResult {
	value: string;
	displayValue: string;
	suggestionHTML: string;
}

interface AutosuggestSuggestion {
	value: string;
	displayValue: string;
	elem: HTMLElement;
}

export class Autosuggest {

	// Options
	private options: AutosuggestOptions = {
		baseClass: 'Autosuggest',
	};

	// Config
	private suggestionFunction: Function;
	private _wrapperClass: string;
	private _itemClassName: string;
	private _higlightendItemClassName: string;
	private _validClassName: string;
	private _invalidClassName: string;
	private _noResultsClass: string;

	// Elements
	private input: HTMLInputElement;
	private autosuggestWrapper: HTMLElement;
	private autosuggestInput: HTMLInputElement;
	private _resultsElement: HTMLElement;

	// State
	private deleting = false;
	private ctrlKey = false;
	private settingResult = false;
	private query: string;
	private previousQuery: string;
	private results: AutosuggestSuggestion[] = [];
	private highlightedIndex = 0;

	private _typingStopped: Function;
	
	constructor(input: HTMLInputElement, suggestionFunction: Function, options?: AutosuggestOptions) {
		this.input = input;
		this.suggestionFunction = suggestionFunction;
		this.options = { ...this.options, ...options };
		
		this.addAutosuggestInput();
	}

	private addAutosuggestInput(): void {
		if (!this.autosuggestInput) {
			this.autosuggestWrapper = document.createElement('div');
			this.autosuggestWrapper.className = this.wrapperClass;
			this.autosuggestInput = <HTMLInputElement>this.input.cloneNode();
		
			if (this.input.id) {
				this.autosuggestInput.id = this.autosuggestInput.id + '-dummy';
			}

			if (this.input.name) {
				this.autosuggestInput.name = this.autosuggestInput.name + '-dummy';
			}

			this.autosuggestInput.addEventListener('focus', this.handleFocus.bind(this));
			this.autosuggestInput.addEventListener('blur', this.handleBlur.bind(this));
			this.autosuggestInput.addEventListener('change', this.getSuggestions.bind(this));
			this.autosuggestInput.addEventListener('keydown', this.handleKeydown.bind(this));
			this.autosuggestInput.addEventListener('keyup', this.handleKeyup.bind(this));
			

			this.input.type = 'hidden';
			this.autosuggestWrapper.appendChild(this.autosuggestInput);
			this.input.parentNode.insertBefore(this.autosuggestWrapper, this.input.nextSibling);

			if (this.input.autofocus) {
				setTimeout(() => {
					this.autosuggestInput.focus();			
				}, 1);
			}
		}
	}

	get resultsElement(): HTMLElement {
		if (!this._resultsElement) {
			const ul = document.createElement('ul');
			ul.className = `${this.options.baseClass}__results`;

			this._resultsElement = ul;
			this.autosuggestInput.parentNode.insertBefore(ul, this.autosuggestInput.nextSibling);
		}

		return this._resultsElement;
	}

	private handleKeydown(e: KeyboardEvent): void {

		switch (e.keyCode) {
			case KEYCODE.UP:
				e.preventDefault();
				this.navigateResults(-1);
				break;
			case KEYCODE.DOWN:
				e.preventDefault();
				this.navigateResults(1);
				break;
			case KEYCODE.ENTER:
			case KEYCODE.RETURN:
				e.preventDefault();
				break;
		}

		if ((e.ctrlKey || e.metaKey) && e.keyCode !== KEYCODE.V) {
			this.ctrlKey = true;
		} else {
			this.ctrlKey = false;
		}
	}

	private handleKeyup(e: KeyboardEvent): void {
		this.deleting = false;

		switch (e.keyCode) {
			case KEYCODE.UP:
			case KEYCODE.DOWN:
				e.preventDefault();
				break;
			case KEYCODE.ENTER:
			case KEYCODE.RETURN:
				this.selectResult();
				break;
			case KEYCODE.LEFT:
			case KEYCODE.RIGHT:
				break;
			case KEYCODE.BACK_SPACE:
			case KEYCODE.DELETE:
				this.deleting = true;
				this.getSuggestions();
				break;
			default:
				if (!this.ctrlKey) {
					this.getSuggestions();
				}
		}

		this.ctrlKey = false;
	}

	private handleFocus(): void {
		this.autosuggestInput.autocomplete = 'false';
		this.getSuggestions();
	}

	private handleBlur(): void {

		if (this.results.length && this.query) {
			this.selectResult();
		}

		setTimeout(() => {
			this.autosuggestInput.autocomplete = this.input.autocomplete;
			this.resultsElement.innerHTML = null;

			if (!this.input.value && this.query) {
				this.autosuggestInput.classList.add(this.invalidClass);
			}
		}, 300);	
	}

	private navigateResults(direction: number): void {
		let index = this.highlightedIndex + direction;
		const numberOfResults = this.results.length - 1;

		if (index > numberOfResults) {
			index = 0;
		} else if (index < 0) {
			index = numberOfResults;
		}

		this.setHighlitedResult(index);
	}

	private setHighlitedResult(index: number) {
		this.highlightedIndex = index;

		if (this.results.length) {
			this.results.forEach(results => {
				results.elem.className = this.itemClassName;
			});

			this.results[index].elem.classList.add(this.higlightendItemClassName);
		}
	}

	get wrapperClass(): string {
		if (!this._wrapperClass) {
			this._wrapperClass = this.options.wrapperClass || `${this.options.baseClass}__wrapper`;
		}

		return this._wrapperClass;
	}

	get validClass(): string {

		if (!this._validClassName) {
			this._validClassName = this.options.inputValidClass || `${this.input.className}--valid`;
		}

		return this._validClassName;
	}

	get invalidClass(): string {
		if (!this._invalidClassName) {
			this._invalidClassName = this.options.inputInvalidClass || `${this.input.className}--invalid`;
		}

		return this._invalidClassName;
	}

	get noResultsClass(): string {
		if (!this._noResultsClass) {
			this._noResultsClass = this.options.noResultsClass || `${this.input.className}--no-results`;
		}

		return this._noResultsClass;
	}

	get itemClassName(): string {
		if (!this._itemClassName) {
			this._itemClassName = this.options.resultItemClass || `${this.options.baseClass}__result`;
		}

		return this._itemClassName;
	}

	get higlightendItemClassName(): string {
		if (!this._higlightendItemClassName) {
			this._higlightendItemClassName = this.options.resultItemActiveClass || `${this.itemClassName}--active`;
		}

		return this._higlightendItemClassName;
	}

	private selectResult(): void {
		this.settingResult = true;
		this.input.value = this.results[this.highlightedIndex].value;
		this.autosuggestInput.value = this.results[this.highlightedIndex].displayValue;
		this.autosuggestInput.classList.add(this.validClass);
		this.resultsElement.innerHTML = '';

		setTimeout(() => {
			this.settingResult = false;
			this.autosuggestInput.autocomplete = 'false';
		}, 300);
	}

	private unsetResults(): void {
		this.input.value = '';
		this.autosuggestInput.classList.remove(this.validClass);
		this.autosuggestInput.classList.remove(this.invalidClass);
		this.autosuggestInput.classList.remove(this.noResultsClass);
		this.resultsElement.innerHTML = '';
	}

	private getSuggestions(): void {
		if (!this.settingResult) {
			this.query = this.autosuggestInput.value.trim().replace(/\s\s+/g, ' ').toLowerCase();

			if (this.query !== this.previousQuery) {
				this.unsetResults();

				if (this.query) {
					this.suggestionFunction(this.query).then(this.handleResults.bind(this));
				} else {
					this.resultsElement.innerHTML = '';
				}
			}
		}
	}

	private handleResults(results: AutosuggestResult[]): void {
		if (!this.deleting || (results.length > 1 && this.deleting)) {
			this.results = results.map((result, index) => {
				const elem = document.createElement('li');
				elem.className = this.itemClassName;
				elem.innerHTML = result.suggestionHTML;

				elem.addEventListener('mouseover', () => {
					this.setHighlitedResult(index);
				});

				elem.addEventListener('click', () => {
					this.setHighlitedResult(index);
					this.selectResult();
				});

				this.resultsElement.appendChild(elem);

				return {
					value: result.value,
					displayValue: result.displayValue,
					elem
				}
			});

			this.setHighlitedResult(0);
		}

		if (this.results.length === 0) {
			this.autosuggestInput.classList.add(this.noResultsClass);
			this.resultsElement.innerHTML = `<li class="${this.itemClassName}">No results found for "${this.autosuggestInput.value}"</li>`;
		}
	}
}
