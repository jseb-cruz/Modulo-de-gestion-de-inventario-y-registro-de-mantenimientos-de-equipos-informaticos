import { InjectionToken } from '@angular/core';
export interface AppConfig {
 apiUrl: string;
 useFakeApi: boolean;
}
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
