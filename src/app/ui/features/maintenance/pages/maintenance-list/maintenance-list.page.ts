import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { MaintenanceStore } from '../../state/maintenance.store';
import { MaintenanceTable } from '../../components/maintenance-table/maintenance-table';
@Component({
 selector: 'app-maintenance-list',
 standalone: true,
 imports: [CommonModule, MaintenanceTable],
 templateUrl: './maintenance-list.page.html',
})
export class MaintenanceListPage implements OnInit {
 private readonly store = inject(MaintenanceStore);
 loading = this.store.loading;
 error = this.store.error;
 items = computed(() => this.store.items());
 ngOnInit() { this.store.fetchAll(); }
 reload() { this.store.fetchAll(); }
}
