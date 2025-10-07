import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Equipment } from '../../domain/models/equipment.model';
import { EquipmentDTO } from '../../shared/contracts/equipment.contract';
import { EquipmentRepository } from
  '../../domain/repositories/equipment.repository';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EquipmentHttpRepository implements EquipmentRepository {
  private readonly http = inject(HttpClient);
  async findAll(): Promise<Equipment[]> {
    const data = await firstValueFrom(this.http.get<EquipmentDTO[]>('equipment'
    ));
    return (data ?? []).map(Equipment.create);
  }
  async findById(id: string): Promise<Equipment | null> {
    const dto = await firstValueFrom(this.http.get<EquipmentDTO>(`equipment/${id}`));
    return dto ? Equipment.create(dto) : null;
  }
}
