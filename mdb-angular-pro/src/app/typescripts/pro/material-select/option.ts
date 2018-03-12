import {IOption} from './option-interface';

export class Option {

  wrappedOption: IOption;

  disabled: boolean;
  highlighted: boolean;
  selected: boolean;
  shown: boolean;
  group: boolean;

  constructor(option: IOption) {
    this.wrappedOption = option;

    this.disabled = false;
    this.highlighted = false;
    this.selected = false;
    this.shown = true;
    this.group = false;
  }

  get value(): string {
    return this.wrappedOption.value;
  }

  get label(): string {
    return this.wrappedOption.label;
  }

  get icon(): string {
    if (this.wrappedOption.icon !== '' && this.wrappedOption.icon !== undefined) {
      return this.wrappedOption.icon;
    } else {
      return '';
    }

  }

}

