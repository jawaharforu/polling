import { Component,
  
           Input,
           Output,
           EventEmitter,
           forwardRef} from '@angular/core';
  
  import { NG_VALUE_ACCESSOR } from '@angular/forms';
  
  
  export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaterialChipsComponent),
    multi: true
  };
  
  @Component({
    selector: 'mdb-material-chips',
    templateUrl: 'chips.component.html',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
  })
  
  export class MaterialChipsComponent  {
  
    @Input('placeholder') public placeholder = '';
  
    addAreaDisplayed: boolean;
    isTagsFocused = false;
    values: string[];
    labelToAdd: string;
    focused: string;
    selected: string;
    noop: any;
  
    @Output() tagsfocusedChange = new EventEmitter();
    @Output() labelsChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  
    @Input()
    get tagsfocused() {
      return this.isTagsFocused;
    }
  
    private onTouchedCallback: () => void = this.noop;
    private onChangeCallback: (_: any) => void = this.noop;
    registerOnChange(fn: any) { this.onChangeCallback = fn; }
    registerOnTouched(fn: any) { this.onTouchedCallback = fn; }
    constructor() {
      this.onTouchedCallback = this.onTouchedCallback === undefined ? this.noop : this.onTouchedCallback;
      this.onChangeCallback = this.onChangeCallback === undefined ? this.noop : this.onChangeCallback;
    }
  
    removeValue(value: string) {
      const index = this.values.indexOf(value, 0);
      if (index !== undefined) {
        this.values.splice(index, 1);
        this.labelsChange.emit(this.values);
      }
    }
  
    addValue(value: string) {
      if (!value || value.trim() === '') { return; }
      this.values.push(value);
      this.labelsChange.emit(this.values);
      this.labelToAdd = '';
    }
  
    writeValue(value: string[]) {
      if (value !== this.values) {
        this.values = value;
      }
    }
  
    onFocus() {
     this.focused = 'md-focused';
     this.isTagsFocused = true;
     this.tagsfocusedChange.emit(this.isTagsFocused);
    }
    focusOutFunction() {
      this.focused = '';
      this.isTagsFocused = false;
      this.tagsfocusedChange.emit(this.isTagsFocused);
    }
  }
  