import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'typeLabel',
  standalone: true,
})
export class TypeLabelPipe implements PipeTransform {
  transform(value: string, entity: 'equipment' | 'maintenance' = 'equipment'): string {
    const equipmentMap: Record<string, string> = {
      Laptop: 'Portátil',
      Desktop: 'Escritorio',
      Printer: 'Impresora',
      Monitor: 'Monitor',
      Server: 'Servidor',
      Other: 'Otro',
    };
    const maintenanceMap: Record<string, string> = {
      Inspection: 'Inspección',
      Preventive: 'Preventivo',
      Corrective: 'Correctivo',
      Predictive: 'Predictivo',
      Proactive: 'Proactivo',
      Reactive: 'Reactivo',
      Scheduled: 'Programado',
      Automated: 'Automatizado',
    };
    const map = entity === 'maintenance' ? maintenanceMap : equipmentMap;
    return map[value] ?? value;
  }
}
