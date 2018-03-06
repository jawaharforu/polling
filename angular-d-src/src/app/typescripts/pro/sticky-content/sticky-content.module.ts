import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common';

import { MdbStickyDirective } from './sticky-content.directive';

export { MdbStickyDirective };

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [MdbStickyDirective],
  exports: [ MdbStickyDirective ]
})

export class MdbStickyModule {}
