import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Equipment } from '../../../../../domain/models/equipment.model';
import { StatusLabelPipe } from '../../../../shared/pipes/status-label-pipe';
import { TypeLabelPipe } from '../../../../shared/pipes/type-label-pipe';

@Component({
  selector: 'app-equipment-table',
  imports: [CommonModule, TypeLabelPipe, StatusLabelPipe],
  templateUrl: './equipment-table.html',
  styleUrl: './equipment-table.css'
})
export class EquipmentTable {
  @Input() data: Equipment[] = [];
}
