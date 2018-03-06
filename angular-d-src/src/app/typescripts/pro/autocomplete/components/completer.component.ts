'use strict';
import { AfterViewChecked, Component, Input, Output, EventEmitter, OnInit, ViewChild,
 forwardRef, AfterViewInit, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MdbCompleterDirective } from '../directives/completer.directive';
import { CompleterData } from '../services/completer-data.service';
import { CompleterService } from '../services/completer.service';
import { CompleterItem } from './completer-item.component';
import { MAX_CHARS, MIN_SEARCH_LENGTH, PAUSE, TEXT_SEARCHING, TEXT_NO_RESULTS } from '../globals';


import 'rxjs/add/operator/catch';

const noop = () => { };

const COMPLETER_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CompleterComponent),
  multi: true
};


@Component({
  selector: 'mdb-completer',
  templateUrl: './completer.component.html',
  providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
})
export class CompleterComponent implements OnInit, ControlValueAccessor, AfterViewChecked, AfterViewInit {
  @Input() public dataService: CompleterData;
  @Input() public inputName = '';
  @Input() public inputId = '';
  @Input() public pause = PAUSE;
  @Input() public minSearchLength = MIN_SEARCH_LENGTH;
  @Input() public maxChars = MAX_CHARS;
  @Input() public overrideSuggested = false;
  @Input() public clearSelected = false;
  @Input() public clearUnselected = false;
  @Input() public fillHighlighted = true;
  @Input() public placeholder = '';
  @Input() public matchClass: string;
  @Input() public fieldTabindex: number;
  @Input() public autoMatch = false;
  @Input() public disableInput = false;
  @Input() public inputClass: string;
  @Input() public autofocus = false;
  @Input() public openOnFocus = false;
  @Input() public initialValue: any;
  @Input() public autoHighlight = false;
  @Input() public label: string;

  public focused = false;


  @Output() public selected = new EventEmitter<CompleterItem>();
  @Output() public highlighted = new EventEmitter<CompleterItem>();
  @Output() public blur = new EventEmitter<void>();
  @Output() public focusEvent = new EventEmitter<void>();
  @Output() public opened = new EventEmitter<boolean>();
  @Output() public keyup: EventEmitter<any> = new EventEmitter();
  @Output() public keydown: EventEmitter<any> = new EventEmitter();

  @ViewChild(MdbCompleterDirective) public completer: MdbCompleterDirective;
  @ViewChild('mdbInput') public mdbInput: ElementRef;

  public searchStr = '';
  public control = new FormControl('');

  //  displaySearching = true;
  displaySearching: any = true;
  //  displayNoResults = true;
  displayNoResults: any = true;
   _onTouchedCallback: () => void = noop;
   _onChangeCallback: (_: any) => void = noop;
   _focus = false;
   _open = false;
   _textNoResults = TEXT_NO_RESULTS;
   _textSearching = TEXT_SEARCHING;

  constructor(private completerService: CompleterService) { }

  get value(): any { return this.searchStr; };

  set value(v: any) {
    if (v !== this.searchStr) {
      this.searchStr = v;
    }
    // Propagate the change in any case
    this._onChangeCallback(v);
  }

  public ngAfterViewInit() {
    if (this.autofocus) {
      this._focus = true;
    }
  }

  public ngAfterViewChecked(): void {
    if (this._focus) {
      this.mdbInput.nativeElement.focus();
      this._focus = false;
    }
  }

  public onTouched() {
    this._onTouchedCallback();
  }

  public writeValue(value: any) {
    this.searchStr = value;
  }

  public registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  @Input()
  public set datasource(source: CompleterData | string | Array<any>) {
    if (source) {
      if (source instanceof Array) {
        this.dataService = this.completerService.local(source);
      } else if (typeof (source) === 'string') {
        this.dataService = this.completerService.remote(source);
      } else {
        this.dataService = source;
      }
    }
  }

  @Input()
  public set textNoResults(text: string) {
    if (this._textNoResults !== text) {
      this._textNoResults = text;
      this.displayNoResults = this._textNoResults && this._textNoResults !== 'false';
    }
  }

  @Input()
  public set textSearching(text: string) {
    if (this._textSearching !== text) {
      this._textSearching = text;
      this.displaySearching = this._textSearching && this._textSearching !== 'false';
    }
  }

  public ngOnInit() {
    this.completer.selected.subscribe((item: CompleterItem) => {
      this.selected.emit(item);
    });
    this.completer.highlighted.subscribe((item: CompleterItem) => {
      this.highlighted.emit(item);
    });
    this.completer.opened.subscribe((isOpen: boolean) => {
      this._open = isOpen;
      this.opened.emit(isOpen);
    });
    if (this.initialValue) { // <- start workaround
      this.searchStr = this.initialValue; //
      this.onFocus(); // fix label
      }// <- end workaround
  }

  public onBlur() {
    this.blur.emit();
    this.onTouched();
    if (this.searchStr === undefined || this.searchStr === '') {
      this.focused = false;
    }
  }

  public onFocus() {
    this.focusEvent.emit();
    this.onTouched();
    this.focused = true;
  }

  public onKeyup(event: any) {
    this.keyup.emit(event);
  }

  public onKeydown(event: any) {
    this.keydown.emit(event);
  }

  public onChange(value: string) {
    this.value = value;
  }

  public open() {
    this.completer.open();
  }

  public close() {
    this.completer.clear();
  }

  public focus(): void {
    if (this.mdbInput) {
      this.mdbInput.nativeElement.focus();
    } else {
      this._focus = true;
    }
  }

  public isOpen() {
    return this._open;
  }
}
