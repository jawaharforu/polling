import {Component, Input, OnChanges, OnInit, Output, EventEmitter, ExistingProvider, ViewChild,
        ViewEncapsulation, forwardRef, ElementRef, HostListener} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {SelectDropdownComponent} from './select-dropdown.component';
import {IOption} from './option-interface';
import {Option} from './option';
import {OptionList} from './option-list';

export const SELECT_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'mdb-select',
  templateUrl: 'select.component.html',
  providers: [SELECT_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})

export class SelectComponent implements ControlValueAccessor, OnChanges, OnInit {

  @Input() options: Array<IOption>;

  @Input() allowClear = false;
  @Input() disabled = false;
  @Input() highlightColor: string;
  @Input() highlightTextColor: string;
  @Input() multiple = false;
  @Input() noFilter = 0;
  @Input() notFoundMsg = 'No results found';
  @Input() placeholder = '';
  @Input() filterPlaceholder = '';
  @Input() label = '';
  @Input() filterEnabled = false;

  @Output() opened: EventEmitter<null> = new EventEmitter<null>();
  @Output() closed: EventEmitter<null> = new EventEmitter<null>();
  @Output() selected: EventEmitter<IOption> = new EventEmitter<IOption>();
  @Output() deselected: EventEmitter<IOption | IOption[]> =
    new EventEmitter<IOption | IOption[]>();
  @Output() noOptionsFound: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('selection') selectionSpan: any;
  @ViewChild('dropdown') dropdown: SelectDropdownComponent;
  @ViewChild('filterInput') filterInput: any;

  // Angular lifecycle hooks.
  KEYS: any = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        UP: 38,
        DOWN: 40
  };

  _value: Array<any> = [];
  optionList: OptionList;

  // Selection state variables.
  hasSelected = false;

  // View state variables.
  hasFocus = false;
  isOpen = false;
  isBelow = true;
  filterInputWidth = 1;
  isDisabled = false;
  placeholderView = '';

  clearClicked = false;
  selectContainerClicked = false;

  // Width and position for the dropdown container.
  width: number;
  top: number;
  left: number;

  onChange = (_: any) => {};
  onTouched = () => {};

  /** Event handlers. **/

  @HostListener('document:click', ['$event']) closeSelect($event: any) {
      if (!this.isChild($event.target) && this.isOpen) {
          this.closeDropdown();
      }
  };


  // Angular lifecycle hooks.
  constructor(public el: ElementRef) {
  }

  ngOnInit() {
    this.placeholderView = this.placeholder;
  }

  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('options')) {
      this.updateOptionsList(changes['options'].isFirstChange());
    }
    if (changes.hasOwnProperty('noFilter')) {
      const numOptions: number = this.optionList.options.length;
      const minNumOptions: number = changes['noFilter'].currentValue;
      this.filterEnabled = numOptions >= minNumOptions;
    }
  }

  isChild(elemnt: any) {
    let node = elemnt.parentNode;
    while (node != null) {
      if (node === this.el.nativeElement) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  // Window.

  onWindowClick() {
    if (!this.selectContainerClicked && !this.multiple) {
      this.closeDropdown();
    }
    this.clearClicked = false;
    this.selectContainerClicked = false;
  }

  onWindowResize() {
    this.updateWidth();
  }

  // Select container.

  onSelectContainerClick() {
    this.selectContainerClicked = true;
    if (!this.clearClicked) {
      this.toggleDropdown();
    }
  }

  onSelectContainerFocus() {
    this.onTouched();
  }

  onSelectContainerKeydown(event: any) {
    this.handleSelectContainerKeydown(event);
  }

  // Dropdown container.

  onDropdownOptionClicked(option: Option) {
    this.multiple ?
      this.toggleSelectOption(option) : this.selectOption(option);
  }

  onDropdownClose(focus: any) {
    this.closeDropdown(focus);
  }

  // Single filter input.
  onSingleFilterClick() {
    this.selectContainerClicked = true;
  }

  onSingleFilterInput(term: string) {
    const hasShown: boolean = this.optionList.filter(term);
    if (!hasShown) {
      this.noOptionsFound.emit(term);
    }
  }

  onSingleFilterKeydown(event: any) {
    this.handleSingleFilterKeydown(event);
  }

  // Multiple filter input.

  onMultipleFilterInput(event: any) {
    if (!this.isOpen) {
      this.openDropdown();
    }
    this.updateFilterWidth();
    setTimeout(() => {
      const term: string = event.target.value;
      const hasShown: boolean = this.optionList.filter(term);
      if (!hasShown) {
        this.noOptionsFound.emit(term);
      }
    });
  }

  onMultipleFilterKeydown(event: any) {
    this.handleMultipleFilterKeydown(event);
  }

  // Single clear select.

  onClearSelectionClick() {

    this.clearClicked = true;
    this.clearSelection();
    this.closeDropdown(true);
  }

  // Multiple deselect option.

  onDeselectOptionClick(option: Option) {
    this.clearClicked = true;
    this.deselectOption(option);
  }

  /** API. **/

  // TODO fix issues with global click/key handler that closes the dropdown.
  open() {
    this.openDropdown();
  }

  close() {
    this.closeDropdown();
  }


  get value(): string | string[] {
      return this.multiple ? this._value : this._value[0];
  }

  set value(v: string | string[]) {
    if (typeof v === 'undefined' || v === null || v === '') {
      v = [];
    } else if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      v = [v];
    } else if (!Array.isArray(v)) {
      throw new TypeError('Value must be a string or an array.');
    }

    if (!OptionList.equalValues(v, this._value)) {
      this.optionList.value = v;
      this.valueChanged();
    }
  }

  clear() {
    this.clearSelection();
  }

  select(value: string) {
    this.optionList.getOptionsByValue(value).forEach((option) => {
      this.selectOption(option);
    });
  }

  /** ControlValueAccessor interface methods. **/

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }


  valueChanged() {
    this._value = this.optionList.value;

    this.hasSelected = this._value.length > 0;
    this.placeholderView = this.hasSelected ? '' : this.placeholder;
    this.updateFilterWidth();

    this.onChange(this.value);
  }

  /** Initialization. **/

  updateOptionsList(firstTime: boolean) {
    // let v: Array<string> | any;
    let v: Array<string> | any;

    if (!firstTime) {
      v = this.optionList.value;
    }

    this.optionList = new OptionList(this.options);

    if (!firstTime) {
      this.optionList.value = v;
      this.valueChanged();
    }
  }

  /** Dropdown. **/
  toggleDropdown() {
    if (!this.isDisabled) {
      this.isOpen ? this.closeDropdown(true) : this.openDropdown();

    }
  }

  openDropdown() {
    if (!this.isOpen) {
      this.updateWidth();
      this.updatePosition();
      this.isOpen = true;
      if (this.multiple && this.filterEnabled) {
        this.filterInput.nativeElement.focus();
      }
      this.opened.emit(null);
    }
  }

  closeDropdown(focus: boolean = false) {
    const container = this.el.nativeElement.lastElementChild.classList;
    container.remove('fadeInSelect');

    setTimeout( () => {

      if (this.isOpen) {
        this.clearFilterInput();
        this.isOpen = false;
        if (focus) {
          this.focus();
        }
        this.closed.emit(null);
      }

    }, 200 );

  }

  /** Select. **/

  selectOption(option: Option) {
    if (!option.selected) {
      this.optionList.select(option, this.multiple);
      this.valueChanged();
      this.selected.emit(option.wrappedOption);
    }
  }

  deselectOption(option: Option) {
    if (option.selected) {
      this.optionList.deselect(option);
      this.valueChanged();
      this.deselected.emit(option.wrappedOption);
    }
  }

  clearSelection() {
    const selection: Array<Option> = this.optionList.selection;
    if (selection.length > 0) {
      this.optionList.clearSelection();
      this.valueChanged();

      if (selection.length === 1) {
        this.deselected.emit(selection[0].wrappedOption);
      } else {
        this.deselected.emit(selection.map((option) => {
          return option.wrappedOption;
        }));
      }
    }
  }

  toggleSelectOption(option: Option) {
    option.selected ?
      this.deselectOption(option) : this.selectOption(option);
  }

  selectHighlightedOption() {
    const option: Option = this.optionList.highlightedOption;
    if (option !== null) {
      this.selectOption(option);
      this.closeDropdown(true);
    }
  }

  deselectLast() {
    const sel: Array<Option> = this.optionList.selection;

    if (sel.length > 0) {
      const option: Option = sel[sel.length - 1];
      this.deselectOption(option);
      this.setMultipleFilterInput(option.label + ' ');
    }
  }

  /** Filter. **/

  clearFilterInput() {
    if (this.multiple && this.filterEnabled) {
        this.filterInput.nativeElement.value = '';
    } else {
        this.dropdown.clearFilterInput();
    }
  }

    setMultipleFilterInput(value: string) {
      if (this.filterEnabled) {
          this.filterInput.nativeElement.value = value;
      }
    }

    handleSelectContainerKeydown(event: any) {
      const key = event.which;

      if (this.isOpen) {
        if (key === this.KEYS.ESC ||
              (key === this.KEYS.UP && event.altKey)) {
          this.closeDropdown(true);
        } else if (key === this.KEYS.TAB) {
          this.closeDropdown();
        } else if (key === this.KEYS.ENTER) {
          this.selectHighlightedOption();
        } else if (key === this.KEYS.UP) {
          this.optionList.highlightPreviousOption();
          this.dropdown.moveHighlightedIntoView();
          if (!this.filterEnabled) {
              event.preventDefault();
          }
        } else if (key === this.KEYS.DOWN) {
          this.optionList.highlightNextOption();
          this.dropdown.moveHighlightedIntoView();
          if (!this.filterEnabled) {
              event.preventDefault();
          }
        }
      } else {
        if (key === this.KEYS.ENTER || key === this.KEYS.SPACE ||
              (key === this.KEYS.DOWN && event.altKey)) {

          /* FIREFOX HACK:
           *
           * The setTimeout is added to prevent the enter keydown event
           * to be triggered for the filter input field, which causes
           * the dropdown to be closed again.
           */
          setTimeout(() => { this.openDropdown(); });
        }
      }

    }

    handleMultipleFilterKeydown(event: any) {
      const key = event.which;

      if (key === this.KEYS.BACKSPACE) {
        if (this.hasSelected && this.filterEnabled &&
                this.filterInput.nativeElement.value === '') {
          this.deselectLast();
        }
      }
    }

    handleSingleFilterKeydown(event: any) {
      const key = event.which;

      if (key === this.KEYS.ESC || key === this.KEYS.TAB
              || key === this.KEYS.UP || key === this.KEYS.DOWN
              || key === this.KEYS.ENTER) {
        this.handleSelectContainerKeydown(event);
      }
    }

    /** View. **/

    focus() {
      this.hasFocus = true;
      if (this.multiple && this.filterEnabled) {
          this.filterInput.nativeElement.focus();
      } else {
          this.selectionSpan.nativeElement.focus();
      }
    }

    blur() {
      this.hasFocus = false;
      this.selectionSpan.nativeElement.blur();
    }

    updateWidth() {
      this.width = this.selectionSpan.nativeElement.offsetWidth;
    }

    updatePosition() {
      const e = this.selectionSpan.nativeElement;
      this.left = e.offsetLeft;
      this.top = e.offsetTop + e.offsetHeight;
    }

    updateFilterWidth() {
      if (typeof this.filterInput !== 'undefined') {
        const value: string = this.filterInput.nativeElement.value;
        this.filterInputWidth = value.length === 0 ?
            1 + this.placeholderView.length * 10 : 1 + value.length * 10;
      }
    }
}
