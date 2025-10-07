import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Maintenance } from '../../../../../domain/models/maintenance.model';
import { StatusLabelPipe } from '../../../../shared/pipes/status-label-pipe';
import { TypeLabelPipe } from '../../../../shared/pipes/type-label-pipe';
@Component({
  selector: 'app-maintenance-table',
  standalone: true,
  imports: [CommonModule, TypeLabelPipe, StatusLabelPipe],
  templateUrl: './maintenance-table.html',
  styleUrls: ['./maintenance-table.css']
})
export class MaintenanceTable {
 @Input() data: Maintenance[] = [];
}
