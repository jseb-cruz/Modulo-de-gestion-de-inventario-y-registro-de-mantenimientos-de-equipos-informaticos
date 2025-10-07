import { MaintenanceDTO } from "../../shared/contracts/maintenance.contract";
export type MaintenanceStatus =
    "Active" |
    "Inactive" |
    "InProgress" |
    "Done" |
    "Scheduled";
export type MaintenanceType =
    "Inspection" |
    "Preventive" |
    "Corrective" |
    "Predictive" |
    "Proactive" |
    "Reactive" |
    "Scheduled" |
    "Automated";
export class Maintenance {
    constructor(
        public readonly id: string,
        public readonly equipmentId: string,
        public readonly type: MaintenanceType,
        public readonly scheduledAt: Date,
        public readonly technician: string,
        public readonly status: MaintenanceStatus,
        public readonly performedAt?: Date,
        public readonly cost?: number,
        public readonly notes?: string,
    ) { }
    static create(input: MaintenanceDTO): Maintenance {
        const sched = input.scheduledAt instanceof Date
            ? input.scheduledAt
            : new Date(input.scheduledAt);
        const perf = input.performedAt instanceof Date || !input.performedAt
            ? (input.performedAt as Date | undefined)
            : new Date(input.performedAt);
        return new Maintenance(
            input.id,
            input.equipmentId,
            input.type,
            sched,
            input.technician,
            input.status ?? 'Scheduled',
            perf,
            input.cost,
            input.notes,
        );
    }
    isCompleted(): boolean {
        return this.status === 'Done';
    }
}
