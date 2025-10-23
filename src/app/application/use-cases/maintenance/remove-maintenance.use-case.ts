import { inject, Injectable } from '@angular/core';
import { MaintenanceRepository } from '../../../domain/repositories/maintenance.repository';

@Injectable({
  providedIn: 'root'
})
export class RemoveMaintenanceUseCase {
  private readonly repo = inject(MaintenanceRepository);
  async execute(id: string): Promise<void> {
    this.repo.remove(id);
  }
}
