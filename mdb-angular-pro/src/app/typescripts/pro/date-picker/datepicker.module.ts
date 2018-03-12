import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MDBDatePickerComponent } from './datepicker.component';
import { FocusDirective } from './directives/datepickerFocus.directive';
import { InputAutoFillDirective } from './directives/datepickerAutofill.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [MDBDatePickerComponent, FocusDirective, InputAutoFillDirective],
  exports: [MDBDatePickerComponent, FocusDirective, InputAutoFillDirective]
})
export class MDBDatePickerModule {
}
