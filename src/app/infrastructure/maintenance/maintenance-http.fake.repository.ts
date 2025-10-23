import { Injectable } from '@angular/core';
import { MaintenanceRepository } from '../../domain/repositories/maintenance.repository';
import { Maintenance, MaintenanceStatus, MaintenanceType } from '../../domain/models/maintenance.model';
import { MaintenanceDTO } from '../../shared/contracts/maintenance.contract';
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
  private  data = [...seed];
  async findAll(): Promise<Maintenance[]> {
    // Simula latencia
    await new Promise(r => setTimeout(r, 300));
    return this.data;
  }
  async findById(id: string): Promise<Maintenance | null> {
    await new Promise(r => setTimeout(r, 200));
    return this.data.find(e => e.id === id) ?? null;
  }
  async create(input: MaintenanceDTO): Promise<Maintenance> {
    await new Promise(r => setTimeout(r, 200));
    const entity = Maintenance.create(input);
    this.data = [entity, ...this.data];
    return entity;
  }
  async update(id: string, patch: Partial<MaintenanceDTO>): Promise<Maintenance> {
    await new Promise(r => setTimeout(r, 200));
    const idx = this.data.findIndex(e => e.id === id);
    if (idx < 0) throw new Error('Maintenance not found');
    const current = this.data[idx];
    const merged: MaintenanceDTO = {
      id: current.id,
      equipmentId: patch.equipmentId ?? current.equipmentId,
      type: patch.type ?? current.type,
      scheduledAt: patch.scheduledAt ?? current.scheduledAt,
      performedAt: patch.performedAt ?? current.performedAt!,
      technician: patch.technician ?? current.technician,
      status: patch.status ?? current.status,
      cost: patch.cost ?? current.cost,
      notes: patch.notes ?? current.notes,
    } as MaintenanceDTO;
    const updated = Maintenance.create(merged);
    this.data[idx] = updated;
    return updated;
  }
  async remove(id: string): Promise<void> {
    await new Promise(r => setTimeout(r, 200));
    this.data = this.data.filter(e => e.id !== id);
  }
}
 
