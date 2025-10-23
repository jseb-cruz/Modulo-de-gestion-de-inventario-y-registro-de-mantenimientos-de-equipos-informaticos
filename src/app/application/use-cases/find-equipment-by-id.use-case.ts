import { inject, Injectable } from '@angular/core';
import { Equipment } from '../../domain/models/equipment.model';
import { EquipmentRepository } from
  '../../domain/repositories/equipment.repository';

@Injectable({
  providedIn: 'root'
})
export class FindEquipmentByIdUseCase {
  private readonly repo = inject(EquipmentRepository);
  async execute(id: string): Promise<Equipment | null> {
    return this.repo.findById(id);
  }
}
