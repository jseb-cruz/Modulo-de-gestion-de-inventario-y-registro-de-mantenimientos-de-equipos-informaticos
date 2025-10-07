import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'typeLabel'
})
export class TypeLabelPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const map: Record<string, string> = {
      Laptop: 'Portátil',
      Desktop: 'Escritorio',
      Printer: 'Impresora',
      Monitor: 'Monitor',
      Server: 'Servidor',
      Other: 'Otro',
    };
    return map[value] ?? value;
  }
}
