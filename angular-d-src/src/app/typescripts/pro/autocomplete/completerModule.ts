import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CompleterComponent } from './components/completer.component';
import { CompleterListItemComponent } from './components/completer-list-item.component';
import { CompleterService } from './services/completer.service';
import { LocalDataFactoryProvider, RemoteDataFactoryProvider } from './services/data-factory.service';
import { MdbCompleterDirective } from './directives/completer.directive';
import { MdbDropdownDirective } from './directives/dropdown.directive';
import { MdbInputDirective } from './directives/input.directive';
import { MdbListDirective } from './directives/list-context.directive';
import { MdbRowDirective } from './directives/row.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    CompleterListItemComponent,
    MdbCompleterDirective,
    MdbDropdownDirective,
    MdbInputDirective,
    MdbListDirective,
    MdbRowDirective,
    CompleterComponent
  ],
  exports: [
    CompleterComponent,
    CompleterListItemComponent,
    MdbCompleterDirective,
    MdbDropdownDirective,
    MdbInputDirective,
    MdbListDirective,
    MdbRowDirective
  ],
  providers: [
    CompleterService,
    LocalDataFactoryProvider,
    RemoteDataFactoryProvider
  ]
})
export class Ng2CompleterModule { }
