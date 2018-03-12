import { NgModule } from '@angular/core';

import { SimpleChartComponent } from './chart-simple.component';
import { EasyPieChartComponent } from './chart-smallpie.component';

@NgModule({
  declarations: [
  SimpleChartComponent, EasyPieChartComponent
  ],
  exports: [
   SimpleChartComponent, EasyPieChartComponent
  ],
  imports: []
})
export class ChartSimpleModule {
}
