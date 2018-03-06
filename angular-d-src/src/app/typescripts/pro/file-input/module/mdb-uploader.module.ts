import { NgModule } from '@angular/core';
import { MDBFileDropDirective } from '../directives/mdb-file-drop.directive';
import { MDBFileSelectDirective } from '../directives/mdb-file-select.directive';

@NgModule({
  declarations: [
  MDBFileSelectDirective,
  MDBFileDropDirective
  ],
  exports: [
  MDBFileSelectDirective,
  MDBFileDropDirective
  ]
})
export class MDBUploaderModule {}
