import { Injectable } from '@angular/core';
import { EquipmentRepository } from
  '../../domain/repositories/equipment.repository';
import { Equipment, EquipmentStatus, EquipmentType } from
  '../../domain/models/equipment.model';
const seed: Equipment[] = [
  new Equipment(
    'e-1', 'ASSET-0001', 'SN-ABC-001', 'Dell Latitude 5420',
    'Laptop', 'Available', 'LOC-01',
    new Date('2023-02-10'), new Date('2026-02-10'),
    new Map<string, unknown>([['ram', 16], ['cpu', 'i7']])
  ),
  new Equipment(
    'e-2', 'ASSET-0002', 'SN-XYZ-002', 'HP ProDesk 600',
    'Desktop', 'InUse', 'LOC-02',
    new Date('2022-05-01'), new Date('2025-05-01'),
    new Map<string, unknown>([['ram', 8], ['cpu', 'i5']])
  ),
  
];
@Injectable({ providedIn: 'root' })
export class EquipmentFakeRepository implements EquipmentRepository {
  private readonly data = [...seed];
  async findAll(): Promise<Equipment[]> {
    // Simula latencia
    await new Promise(r => setTimeout(r, 300));
    return this.data;
  }
  async findById(id: string): Promise<Equipment | null> {
    await new Promise(r => setTimeout(r, 200));
    return this.data.find(e => e.id === id) ?? null;
  }
}
