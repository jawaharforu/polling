import {Option} from './option';
import {IOption} from './option-interface';
import {Diacritics} from './diacritics';

export class OptionList {

  private _options: Array<Option>;

  /* Consider using these for performance improvement. */
  // private _selection: Array<Option>;
  // private _filtered: Array<Option>;
  // private _value: Array<string>;

  // private _highlightedOption: Option = null;
  private _highlightedOption: Option | any = null;
  private _hasShown: boolean;

  public setToNullValue: any = null;
  // v0 and v1 are assumed not to be undefined or null.
  static equalValues(v0: Array<string>, v1: Array<string>): boolean {

    if (v0.length !== v1.length) {
      return false;
    }

    const a: Array<string> = v0.slice().sort();
    const b: Array<string> = v1.slice().sort();

    return a.every((v, i) => {
      return v === b[i];
    });
  }

  constructor(options: Array<IOption>) {

    if (typeof options === 'undefined' || options === null) {
      options = [];
    }

    this._options = options.map((option) => {
      const o: Option = new Option(option);
      if (option.disabled) {
        o.disabled = true;
      }
      if (option.group) {
        o.disabled = true;
        o.group = true;
      }
      return o;
    });

    this._hasShown = this._options.length > 0;
    this.highlight();
  }

  /** Options. **/

  get options(): Array<Option> {
    return this._options;
  }

  getOptionsByValue(value: string): Array<Option> {
    return this.options.filter((option) => {
      return option.value === value;
    });
  }

  /** Value. **/

  get value(): Array<string> {
    return this.selection.map((selectedOption) => {
      return selectedOption.value;
    });
  }

  set value(v: Array<string>) {
    v = typeof v === 'undefined' || v === null ? [] : v;

    this.options.forEach((option) => {
      option.selected = v.indexOf(option.value) > -1;
    });
  }

  /** Selection. **/

  get selection(): Array<Option> {
    return this.options.filter((option) => {
      return option.selected;
    });
  }

  select(option: Option, multiple: boolean) {
    if (!multiple) {
      this.clearSelection();
    }
    option.selected = true;
  }

  deselect(option: Option) {
    option.selected = false;
  }

  clearSelection() {
    this.options.forEach((option) => {
      option.selected = false;
    });
  }

  /** Filter. **/

  get filtered(): Array<Option> {
    return this.options.filter((option) => {
      return option.shown;
    });
  }

  filter(term: string): boolean {
    let anyShown = false;

    if (term.trim() === '') {
      this.resetFilter();
      anyShown = this.options.length > 0;
    } else {
      this.options.forEach((option) => {
        const l: string = Diacritics.strip(option.label).toUpperCase();
        const t: string = Diacritics.strip(term).toUpperCase();
        option.shown = l.indexOf(t) > -1;
      });

    }

    this.highlight();
    this._hasShown = anyShown;

    return anyShown;
  }

  private resetFilter() {
    this.options.forEach((option) => {
      option.shown = true;
    });
  }

  /** Highlight. **/

  get highlightedOption(): Option {
    return this._highlightedOption;
  }

  highlight() {
    const option: Option = this.hasShownSelected() ?
      this.getFirstShownSelected() : this.getFirstShown();
    this.highlightOption(option);
  }

  highlightOption(option: Option) {
    this.clearHighlightedOption();

    if (option !== null) {
      option.highlighted = true;
      this._highlightedOption = option;
    }
  }

  highlightNextOption() {
    const shownOptions = this.filtered;
    const index = this.getHighlightedIndexFromList(shownOptions);

    if (index > -1 && index < shownOptions.length - 1) {
      this.highlightOption(shownOptions[index + 1]);
    }
  }

  highlightPreviousOption() {
    const shownOptions = this.filtered;
    const index = this.getHighlightedIndexFromList(shownOptions);

    if (index > 0) {
      this.highlightOption(shownOptions[index - 1]);
    }
  }

  private clearHighlightedOption() {
    if (this.highlightedOption !== null) {
      this.highlightedOption.highlighted = false;
      this._highlightedOption = null;
    }
  }

  private getHighlightedIndexFromList(options: Array<Option>) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].highlighted) {
        return i;
      }
    }
    return -1;
  }

  getHighlightedIndex() {
    return this.getHighlightedIndexFromList(this.filtered);
  }

  /** Util. **/

  get hasShown(): boolean {
    return this._hasShown;
  }

  hasSelected() {
    return this.options.some((option) => {
      return option.selected;
    });
  }

  hasShownSelected() {
    return this.options.some((option) => {
      return option.shown && option.selected;
    });
  }

  private getFirstShown(): Option {
    for (const option of this.options) {
      if (option.shown) {
        return option;
      }
    }
    // return null;
    return this.setToNullValue;
  }

  private getFirstShownSelected(): Option {
    for (const option of this.options) {
      if (option.shown && option.selected) {
        return option;
      }
    }
    // return null;
    return this.setToNullValue;
  }

}
