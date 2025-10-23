import { inject, Injectable } from '@angular/core';
import { Maintenance } from '../../../domain/models/maintenance.model';
import { MaintenanceRepository } from '../../../domain/repositories/maintenance.repository';

@Injectable({
  providedIn: 'root'
})
export class FindMaintenanceByIdUseCase {
  private readonly repo = inject(MaintenanceRepository);
  async execute(id: string): Promise<Maintenance | null> {
    return this.repo.findById(id);
  }
}
