import { inject, Injectable } from '@angular/core';
import { Maintenance } from '../../../domain/models/maintenance.model';
import { MaintenanceRepository } from '../../../domain/repositories/maintenance.repository';
import { MaintenanceDTO } from '../../../shared/contracts/maintenance.contract';
@Injectable({
  providedIn: 'root'
})
export class CreateMaintenanceUseCase {
  private readonly repo = inject(MaintenanceRepository);
  async execute(input: MaintenanceDTO): Promise<Maintenance> {
    return this.repo.create(input);
  }
}
