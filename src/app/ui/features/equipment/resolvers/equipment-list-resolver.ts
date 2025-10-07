import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EquipmentStore } from '../state/equipment.store';

export const equipmentListResolver: ResolveFn<boolean> = async (route, state) => {
  const store = inject(EquipmentStore);
  if (store.items().length === 0) {
    await store.fetchAll();
  }
  return true;
};
