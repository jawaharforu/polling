import { InjectionToken } from '@angular/core';

import { GlobalConfig } from './toast.config';

export const TOAST_CONFIG = new InjectionToken<GlobalConfig>('ToastConfig');
