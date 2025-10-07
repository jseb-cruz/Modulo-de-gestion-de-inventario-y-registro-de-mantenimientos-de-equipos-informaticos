import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const map: Record<string, string> = {
      Available: 'Disponible',
      InUse: 'En uso',
      InRepair: 'En reparación',
      Retired: 'Retirado',
    };
    return map[value] ?? value;
  }
}