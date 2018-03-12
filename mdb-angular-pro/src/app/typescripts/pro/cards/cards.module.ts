import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule  } from '@angular/common';

import { CardRevealComponent } from './card-reveal.component';
import { CardRotatingComponent } from './card-rotating.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ CardRevealComponent, CardRotatingComponent],
  exports: [CardRevealComponent, CardRotatingComponent]
})
export class CardsModule {
  public static forRoot(): ModuleWithProviders {
  return {ngModule: CardsModule, providers: []};
  }
}
