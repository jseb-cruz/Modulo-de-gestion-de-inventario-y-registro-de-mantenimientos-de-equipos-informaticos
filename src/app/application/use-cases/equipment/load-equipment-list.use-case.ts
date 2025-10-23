import { inject, Injectable } from '@angular/core';
import { EquipmentRepository } from '../../../domain/repositories/equipment.repository';
import { Equipment } from '../../../domain/models/equipment.model';

@Injectable({ providedIn: 'root' })
export class LoadEquipmentListUseCase {
    private readonly repo = inject(EquipmentRepository);

    async execute(): Promise<Equipment[]> {
        return this.repo.findAll();
    }
}
