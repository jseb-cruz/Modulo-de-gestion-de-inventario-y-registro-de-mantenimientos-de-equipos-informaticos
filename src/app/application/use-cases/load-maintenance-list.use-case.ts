import { inject, Injectable } from '@angular/core';
import { MaintenanceRepository } from
'../../domain/repositories/maintenance.repository';
import { Maintenance } from '../../domain/models/maintenance.model';
@Injectable({ providedIn: 'root' })
export class LoadMaintenanceListUseCase {
 private readonly repo = inject(MaintenanceRepository);
 async execute(): Promise<Maintenance[]> {
 return this.repo.findAll();
 }
}
