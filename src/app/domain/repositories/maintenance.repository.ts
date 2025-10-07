import { Maintenance } from '../models/maintenance.model';
export abstract class MaintenanceRepository {
 abstract findAll(): Promise<Maintenance[]>;
 abstract findById(id: string): Promise<Maintenance | null>;
 // abstract create(input: MaintenanceDTO): Promise<Maintenance>;
 // abstract update(id: string, input: Partial<MaintenanceDTO>): Promise<Maintenance>;
 // abstract delete(id: string): Promise<void>;
}
