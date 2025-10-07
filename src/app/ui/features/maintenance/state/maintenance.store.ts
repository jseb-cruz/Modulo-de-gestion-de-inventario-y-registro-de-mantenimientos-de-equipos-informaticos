import { inject, Injectable, signal } from '@angular/core';
import { LoadMaintenanceListUseCase } from '../../../../application/use-cases/load-maintenance-list.use-case';
import { Maintenance } from '../../../../domain/models/maintenance.model';
@Injectable( {
 providedIn: 'root'
} )
export class MaintenanceStore {
 private readonly loadList = inject( LoadMaintenanceListUseCase );
 readonly items = signal<Maintenance[]>( [] );
 readonly loading = signal( false );
 readonly error = signal<string | null>( null );
 async fetchAll () {
 this.loading.set( true );
 this.error.set( null );
 try {
 const data = await this.loadList.execute();
 this.items.set( data );
 } catch ( err: any ) {
 this.error.set( err?.message ?? 'Unexpected error' );
 } finally {
 this.loading.set( false );
 }
 }
}
