import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MaintenanceRepository } from '../../../../domain/repositories/maintenance.repository';
export const maintenanceExistsGuard: CanActivateFn = async (route, state) => {
  const repo = inject(MaintenanceRepository);
  const router = inject(Router);
  const id = route.paramMap.get('id');
  if (!id) return router.createUrlTree(['/maintenance']);
  try {
    const found = await repo.findById(id);
    return !!found || router.createUrlTree(['/maintenance']);
  } catch {
    return router.createUrlTree(['/maintenance']);
  }
};
