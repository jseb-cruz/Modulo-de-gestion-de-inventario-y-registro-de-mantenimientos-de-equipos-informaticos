import { Equipment } from '../models/equipment.model';
export abstract class EquipmentRepository {
    abstract findAll(): Promise<Equipment[]>;
    abstract findById(id: string): Promise<Equipment | null>;
    // abstract create(input: EquipmentDTO): Promise<Equipment>;
    // abstract update(id: string, input: Partial<EquipmentDTO>): Promise<Equipment>;
    // abstract delete(id: string): Promise<void>;
}
