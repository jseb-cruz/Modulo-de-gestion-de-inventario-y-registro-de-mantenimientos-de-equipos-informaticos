import { MaintenanceStatus, MaintenanceType } from
    "../../domain/models/maintenance.model";
export interface MaintenanceDTO {
    id: string;
    equipmentId: string;
    type: MaintenanceType;
    scheduledAt: Date;
    performedAt: Date;
    technician: string;
    status: MaintenanceStatus;
    cost?: number;
    notes?: string;
}