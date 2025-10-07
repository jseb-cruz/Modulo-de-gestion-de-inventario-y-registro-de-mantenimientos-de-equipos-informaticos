import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Maintenance } from '../../../../../domain/models/maintenance.model';
@Component( {
 selector: 'app-maintenance-table',
 imports: [CommonModule],
 templateUrl: './maintenance-table.html',
 styleUrl: './maintenance-table.css'
} )
export class MaintenanceTable {
 @Input() data: Maintenance[] = [];
}
