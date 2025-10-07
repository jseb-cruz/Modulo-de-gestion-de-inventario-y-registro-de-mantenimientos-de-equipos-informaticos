import z from "zod";

export const MaintenanceDTOSchema = z.object({
    id: z.string().min(1),
    equipmentId: z.string().trim().min(1, 'Equipo es requerido'),
    type: z.enum([
        'Inspection',
        'Preventive',
        'Corrective',
        'Predictive',
        'Proactive',
        'Reactive',
        'Scheduled',
        'Automated',
    ]),
    scheduledAt: z.union([z.string(), z.date()]),
    performedAt: z.union([z.string(), z.date()]).optional(),
    technician: z.string().trim().min(1, 'Técnico es requerido'),
    status: z.enum(['Active', 'Inactive', 'InProgress', 'Done', 'Scheduled']),
    cost: z.number().nonnegative().optional(),
    notes: z.string().trim().optional(),
});

export type MaintenanceDTOInput = z.infer<typeof MaintenanceDTOSchema>;
