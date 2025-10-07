import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'statusLabel',
  standalone: true,
})
export class StatusLabelPipe implements PipeTransform {
  transform(value: string, entity: 'equipment' | 'maintenance' = 'equipment'): string {
    const equipmentMap: Record<string, string> = {
      Available: 'Disponible',
      InUse: 'En uso',
      InRepair: 'En reparación',
      Retired: 'Retirado',
    };
    const maintenanceMap: Record<string, string> = {
      Active: 'Activo',
      Inactive: 'Inactivo',
      InProgress: 'En progreso',
      Done: 'Completado',
      Scheduled: 'Programado',
    };
    const map = entity === 'maintenance' ? maintenanceMap : equipmentMap;
    return map[value] ?? value;
  }
}
