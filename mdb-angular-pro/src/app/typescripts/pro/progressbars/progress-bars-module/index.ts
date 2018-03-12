import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progressbar.component';


@NgModule({
  imports: [CommonModule],
  exports: [ProgressBarComponent],
  declarations: [ProgressBarComponent],
})
export class MdProgressBarModule {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdProgressBarModule,
      providers: []
    };
  }
}

export * from './progressbar.component';
