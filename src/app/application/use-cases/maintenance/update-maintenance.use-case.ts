import { inject, Injectable } from '@angular/core';
import { Maintenance } from '../../../domain/models/maintenance.model';
import { MaintenanceRepository } from '../../../domain/repositories/maintenance.repository';
import { MaintenanceDTO } from '../../../shared/contracts/maintenance.contract';
@Injectable({
  providedIn: 'root'
})
export class UpdateMaintenanceUseCase {
  private readonly repo = inject(MaintenanceRepository);
  async execute(id: string, input: Partial<MaintenanceDTO>): Promise<Maintenance> {
    return this.repo.update(id, input);
  }
}