import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Maintenance } from '../../domain/models/maintenance.model';
import { MaintenanceDTO } from '../../shared/contracts/maintenance.contract';
import { MaintenanceRepository } from
'../../domain/repositories/maintenance.repository';
import { firstValueFrom } from 'rxjs';
@Injectable( {
  providedIn: 'root'
} )
export class MaintenanceHttpRepository implements MaintenanceRepository {
 private readonly http = inject( HttpClient );
 async findAll (): Promise<Maintenance[]> {
 const data = await firstValueFrom( this.http.get<MaintenanceDTO[]>( 'maintenance'
) );
 return ( data ?? [] ).map( Maintenance.create );
 }
 async findById ( id: string ): Promise<Maintenance | null> {
 const dto = await firstValueFrom( this.http.get<MaintenanceDTO>( `maintenance/${
id }` ) );
 return dto ? Maintenance.create( dto ) : null;
 }
}
