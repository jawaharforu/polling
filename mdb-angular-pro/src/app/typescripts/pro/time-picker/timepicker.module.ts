import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ClockPickerComponent } from './timepicker.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ClockPickerComponent],
  exports: [ClockPickerComponent]
})
export class TimePickerModule {
}
