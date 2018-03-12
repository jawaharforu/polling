import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastComponent } from './toast.component';
import { TOAST_CONFIG } from './toast.token';
import { ToastService } from './toast.service';
import { GlobalConfig } from './toast.config';
import { OverlayContainer } from '../overlay/overlay-container';
import { Overlay } from '../overlay/overlay';


@NgModule({
  imports: [CommonModule],
  exports: [ToastComponent],
  declarations: [ToastComponent],
  entryComponents: [ToastComponent],
})
export class ToastModule {
  static forRoot(config?: GlobalConfig): ModuleWithProviders {
    return {
      ngModule: ToastModule,
      providers: [
        { provide: TOAST_CONFIG, useValue: config },
        OverlayContainer,
        Overlay,
        ToastService,
      ]
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: ToastModule) {
    if (parentModule) {
      throw new Error('ToastModule is already loaded. It should only be imported in your application\'s main module.');
    }
  }
}
