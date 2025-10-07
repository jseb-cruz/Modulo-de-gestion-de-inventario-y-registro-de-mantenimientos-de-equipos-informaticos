import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { LoadEquipmentListUseCase } from '../../../../application/use-cases/load-equipment-list.use-case';
import { Equipment } from '../../../../domain/models/equipment.model';


type Status = 'Available' | 'InUse' | 'InRepair' | 'Retired' | 'All';
type Type = 'Laptop' | 'Desktop' | 'Printer' | 'Monitor' | 'Server' | 'Other' |
    'All';

@Injectable({
    providedIn: 'root'
})
export class EquipmentStore {
    private readonly loadList = inject(LoadEquipmentListUseCase);
    readonly items = signal<Equipment[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    // Filtros UI
    readonly query = signal<string>('');
    readonly status = signal<string>('All');
    readonly type = signal<string>('All');
    // PaginaciÃ³n
    readonly page = signal<number>(1);
    readonly pageSize = signal<number>(10);
    readonly total = signal<number>(0);
    async fetchAll() {
        this.loading.set(true);
        this.error.set(null);
        try {
            const data = await this.loadList.execute();
            this.items.set(data);
            this.page.set(1)
        } catch (err: any) {
            this.error.set(err?.message ?? 'Unexpected error');
        } finally {
            this.loading.set(false);
        }
    }

    readonly filtered = computed(() => {
        const query = this.query().toLowerCase();
        const status = this.status();
        const type = this.type();
        return this.items().filter(equipment => {
            const byQuery = !query
                || equipment.assetTag.toLowerCase().includes(query)
                || equipment.serialNumber.toLowerCase().includes(query)
                || equipment.model.toLowerCase().includes(query);
            const byStatus = status === 'All' || equipment.status === status;
            const byType = type === 'All' || equipment.type === type;
            return byQuery && byStatus && byType;
        });
    });

    /**
     * The constructor function sets up an effect that updates the total based on the length of the
     * filtered items.
     */
    constructor() {
        effect(() => {
            this.total.set(this.filtered().length);
        });
    }

    readonly paged = computed(() => {
        const data = this.filtered();
        const start = (this.page() - 1) * this.pageSize();
        return data.slice(start, start + this.pageSize());
    });
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



