import { Injectable } from '@angular/core';
import { EquipmentRepository } from
  '../../domain/repositories/equipment.repository';
import { Equipment, EquipmentStatus, EquipmentType } from
  '../../domain/models/equipment.model';
import { EquipmentDTO } from '../../shared/contracts/equipment.contract';

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
  private data = [...seed];                //toca quitar el readonly
  async findAll(): Promise<Equipment[]> {
    // Simula latencia
    await new Promise(r => setTimeout(r, 300));
    return this.data;
  }
  async findById(id: string): Promise<Equipment | null> {
    await new Promise(r => setTimeout(r, 200));
    return this.data.find(e => e.id === id) ?? null;
  }
  async create(input: EquipmentDTO): Promise<Equipment> {
    await new Promise(r => setTimeout(r, 200));
    const entity = Equipment.create(input);
    this.data = [entity, ...this.data];
    return entity;
  }
  async update(id: string, patch: Partial<EquipmentDTO>): Promise<Equipment> {
    await new Promise(r => setTimeout(r, 200));
    const idx = this.data.findIndex(e => e.id === id);
    if (idx < 0) throw new Error('Equipment not found');
    const current = this.data[idx];
    const merged: EquipmentDTO = {
      id: current.id,
      assetTag: patch.assetTag ?? current.assetTag,
      serialNumber: patch.serialNumber ?? current.serialNumber,
      model: patch.model ?? current.model,
      type: patch.type ?? current.type,
      status: patch.status ?? current.status,
      locationId: patch.locationId ?? current.locationId,
      purchaseDate: patch.purchaseDate ?? current.purchaseDate,
      warrantyEnd: patch.warrantyEnd ?? current.warrantyEnd,
      metadata: (patch.metadata as any) ?? current.metadata,
    } as any;
    const updated = Equipment.create(merged);
    this.data[idx] = updated;
    return updated;
  }
  async remove(id: string): Promise<void> {
    await new Promise(r => setTimeout(r, 200));
    this.data = this.data.filter(e => e.id !== id);
  }
}


