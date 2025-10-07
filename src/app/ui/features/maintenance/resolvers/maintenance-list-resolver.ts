import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MaintenanceStore } from '../state/maintenance.store';
export const maintenanceListResolver: ResolveFn<boolean> = async (route, state) => {
  const store = inject(MaintenanceStore);
  if (store.items().length === 0) {
    await store.fetchAll();
  }
  return true;
};
