import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ImageModalComponent } from './image-popup';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ImageModalComponent],
  exports: [ImageModalComponent]
})
export class LightBoxModule {
}
