import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { BarComponent } from './bar.component';
import { ProgressDirective } from './progress.directive';
import { ProgressbarComponent } from './progressbar.component';
import { ProgressbarConfigComponent } from './progressbar.config.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressDirective, BarComponent, ProgressbarComponent],
  exports: [ProgressDirective, BarComponent, ProgressbarComponent]
})
export class ProgressbarModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: ProgressbarModule, providers: [ProgressbarConfigComponent]};
  }
}
