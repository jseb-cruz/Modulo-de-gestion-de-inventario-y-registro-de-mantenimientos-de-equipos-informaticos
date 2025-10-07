import { Injectable } from '@angular/core';
import { MaintenanceRepository } from
  '../../domain/repositories/maintenance.repository';
import { Maintenance, MaintenanceStatus, MaintenanceType } from
  '../../domain/models/maintenance.model';
const seed: Maintenance[] = [
  
  new Maintenance(
    '1',
    'EQ-001',
    'Preventive',
    new Date('2024-07-01T10:00:00Z'),
    'John Doe',
    'Scheduled',
    undefined,
    undefined,  
    'Initial preventive maintenance scheduled.'
  ),
  new Maintenance(
    '2',
    'EQ-002',
    'Corrective',
    new Date('2024-06-15T14:00:00Z'),
    'Jane Smith',
    'InProgress',
    undefined,
    undefined,
    'Corrective maintenance in progress due to unexpected failure.'
  ),
];
@Injectable({ providedIn: 'root' })
export class MaintenanceFakeRepository implements MaintenanceRepository {
  private readonly data = [...seed];
  async findAll(): Promise<Maintenance[]> {
    // Simula latencia
    await new Promise(r => setTimeout(r, 300));
    return this.data;
  }
  async findById(id: string): Promise<Maintenance | null> {
    await new Promise(r => setTimeout(r, 200));
    return this.data.find(e => e.id === id) ?? null;
  }
}

