import { Provider, inject } from '@angular/core';
import { APP_CONFIG } from '../../core/config/app-config.token';
import { MaintenanceRepository } from
'../../domain/repositories/maintenance.repository';
import { MaintenanceHttpRepository } from './maintenance-http.repository';
import { MaintenanceFakeRepository } from './maintenance-http.fake.repository';
export const provideMaintenanceRepository = (): Provider => ( {
 provide: MaintenanceRepository,
 useFactory: () => {
 const cfg = inject( APP_CONFIG );
 return cfg.useFakeApi ? inject( MaintenanceFakeRepository ) : inject(
MaintenanceHttpRepository );
 },
 deps: [ APP_CONFIG, MaintenanceHttpRepository, MaintenanceFakeRepository ],
} );
