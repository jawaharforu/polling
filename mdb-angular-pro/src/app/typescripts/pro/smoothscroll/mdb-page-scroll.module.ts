/**
* Created by sebastianfuss on 03.09.16.
*/

import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';

import {PageScrollService} from './mdb-page-scroll.service';
import {PageScrollDirective} from './mdb-page-scroll.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PageScrollDirective],
  exports: [PageScrollDirective]
})
export class MDBPageScrollModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: MDBPageScrollModule,
        providers: [
            {provide: PageScrollService, useClass: PageScrollService}
        ]
    };
  }
}
