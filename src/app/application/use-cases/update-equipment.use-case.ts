import { inject, Injectable } from '@angular/core';
import { Equipment } from '../../domain/models/equipment.model';
import { EquipmentRepository } from
  '../../domain/repositories/equipment.repository';
import { EquipmentDTO } from '../../shared/contracts/equipment.contract';
@Injectable({
  providedIn: 'root'
})
export class UpdateEquipmentUseCase {
  private readonly repo = inject(EquipmentRepository);
  async execute(id: string, input: Partial<EquipmentDTO>): Promise<Equipment> {
    return this.repo.update(id, input);
  }
}
