import { inject, Injectable } from '@angular/core';
import { EquipmentRepository } from
  '../../domain/repositories/equipment.repository';
@Injectable({
  providedIn: 'root'
})
export class RemoveEquipmentUseCase {
  private readonly repo = inject(EquipmentRepository);
  async execute(id: string): Promise<void> {
    this.repo.remove(id);
  }
}
