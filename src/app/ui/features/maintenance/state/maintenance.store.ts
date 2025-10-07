import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { LoadMaintenanceListUseCase } from '../../../../application/use-cases/load-maintenance-list.use-case';
import { Maintenance } from '../../../../domain/models/maintenance.model';

type Status = 'Active' | 'Inactive' | 'InProgress' | 'Done' | 'Scheduled' | 'All';
type Type =
    | 'Inspection'
    | 'Preventive'
    | 'Corrective'
    | 'Predictive'
    | 'Proactive'
    | 'Reactive'
    | 'Scheduled'
    | 'Automated'
    | 'All';

@Injectable({ providedIn: 'root' })
export class MaintenanceStore {
    private readonly loadList = inject(LoadMaintenanceListUseCase);

    readonly items = signal<Maintenance[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    // Filtros UI
    readonly query = signal<string>('');
    readonly status = signal<Status>('All');
    readonly type = signal<Type>('All');

    // Paginación
    readonly page = signal<number>(1);
    readonly pageSize = signal<number>(10);
    readonly total = signal<number>(0);

    async fetchAll() {
        this.loading.set(true);
        this.error.set(null);
        try {
            const data = await this.loadList.execute();
            this.items.set(data);
            this.page.set(1);
        } catch (err: any) {
            this.error.set(err?.message ?? 'Unexpected error');
        } finally {
            this.loading.set(false);
        }
    }

    readonly filtered = computed(() => {
        const q = this.query().toLowerCase();
        const st = this.status();
        const tp = this.type();
        return this.items().filter((m) => {
            const byQuery = !q
                || m.equipmentId.toLowerCase().includes(q)
                || m.technician.toLowerCase().includes(q)
                || (m.notes ? m.notes.toLowerCase().includes(q) : false);
            const byStatus = st === 'All' || m.status === st;
            const byType = tp === 'All' || m.type === tp;
            return byQuery && byStatus && byType;
        });
    });

    readonly paged = computed(() => {
        const data = this.filtered();
        const start = (this.page() - 1) * this.pageSize();
        return data.slice(start, start + this.pageSize());
    });

    constructor() {
        effect(() => {
            this.total.set(this.filtered().length);
        });
    }

    setQuery(query: string) {
        this.query.set(query);
        this.page.set(1);
    }
    setStatus(status: Status) {
        this.status.set(status);
        this.page.set(1);
    }
    setType(type: Type) {
        this.type.set(type);
        this.page.set(1);
    }
    setPage(page: number) {
        this.page.set(page);
    }
    setPageSize(n: number) {
        this.pageSize.set(n);
        this.page.set(1);
    }
}
