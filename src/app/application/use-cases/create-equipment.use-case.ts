import { inject, Injectable } from '@angular/core';
import { Equipment } from '../../domain/models/equipment.model';
import { EquipmentRepository } from
  '../../domain/repositories/equipment.repository';
import { EquipmentDTO } from '../../shared/contracts/equipment.contract';
@Injectable({
  providedIn: 'root'
})
export class CreateEquipmentUseCase {
  private readonly repo = inject(EquipmentRepository);
  async execute(input: EquipmentDTO): Promise<Equipment> {
    return this.repo.create(input);
  }
}
