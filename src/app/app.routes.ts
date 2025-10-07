import { Routes } from '@angular/router';
import { equipmentExistsGuard } from './ui/features/equipment/guards/equipment-exists-guard';
import { equipmentListResolver } from
    './ui/features/equipment/resolvers/equipment-list-resolver';
import { maintenanceExistsGuard } from './ui/features/maintenance/guards/maintenance-exists-guard';
import { maintenanceListResolver } from './ui/features/maintenance/resolvers/maintenance-list-resolver';
import { Shell } from './ui/layout/shell/shell';
export const routes: Routes = [
    {
        path: '',
        component: Shell,
        children: [
            {
                path: 'equipment',
                loadComponent: () => import(
                    './ui/features/equipment/pages/equipment-list/equipment-list.page').then(m =>
                        m.EquipmentListPage),
                resolve: { preload: equipmentListResolver }
            },
            {
                path: 'equipment/new',
                loadComponent: () => import(
                    './ui/features/equipment/pages/equipment-form/equipment-form.page').then(m =>
                        m.EquipmentFormPage)
            },
            {
                path: 'equipment/:id',
                canActivate: [equipmentExistsGuard],
                loadComponent: () => import(
                    './ui/features/equipment/pages/equipment-detail/equipment-detail.page').then(
                        m => m.EquipmentDetailPage)
            },
            {
                path: 'maintenance',
                loadComponent: () => import(
                    './ui/features/maintenance/pages/maintenance-list/maintenance-list.page').then(m =>
                        m.MaintenanceListPage),
                resolve: { preload: maintenanceListResolver }
            },
            {
                path: 'maintenance/new',
                loadComponent: () => import(
                    './ui/features/maintenance/pages/maintenance-form/maintenance-form.page').then(m =>
                        m.MaintenanceFormPage)
            },
            {
                path: 'maintenance/:id',
                canActivate: [maintenanceExistsGuard],
                loadComponent: () => import(
                    './ui/features/maintenance/pages/maintenance-detail/maintenance-detail.page').then(
                        m => m.MaintenanceDetailPage)
            },
            { path: '', pathMatch: 'full', redirectTo: 'equipment' },
            { path: '**', redirectTo: 'equipment' },
        ],
    },
];


