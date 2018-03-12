import {NgModule, ModuleWithProviders} from '@angular/core';
import {
  MdProgressSpinnerComponent,
  MdSpinnerComponent,
  MdProgressSpinnerCssMatStylerDirective,
} from './progress-spinner.component';

import { ProgressSpinnerComponent } from '../progress-spinner.component';


@NgModule({
  exports: [
    MdProgressSpinnerComponent,
    MdSpinnerComponent,
    MdProgressSpinnerCssMatStylerDirective,
    ProgressSpinnerComponent
  ],
  declarations: [
    MdProgressSpinnerComponent,
    MdSpinnerComponent,
    MdProgressSpinnerCssMatStylerDirective,
    ProgressSpinnerComponent
  ],
})

class MdProgressSpinnerModule {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdProgressSpinnerModule,
      providers: []
    };
  }
}

export {MdProgressSpinnerModule};
export * from './progress-spinner.component';
