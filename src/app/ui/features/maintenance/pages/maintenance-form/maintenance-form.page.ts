import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Maintenance } from '../../../../../domain/models/maintenance.model';
import { MaintenanceDTOInput, MaintenanceDTOSchema } from '../../schemas/maintenance.zod';

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './maintenance-form.page.html',
  styleUrls: ['./maintenance-form.page.css']
})
export class MaintenanceFormPage {
  private fb = inject(FormBuilder);
  public submitting = signal(false);
  public error = signal<string | null>(null);
  public success = signal(false);

  public form = this.fb.group({
    id: this.fb.control<string>(crypto.randomUUID(), { nonNullable: true }),
    equipmentId: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    type: this.fb.control<
      'Inspection' | 'Preventive' | 'Corrective' | 'Predictive' | 'Proactive' | 'Reactive' | 'Scheduled' | 'Automated'
    >('Inspection', { nonNullable: true }),
    scheduledAt: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    performedAt: this.fb.control<string | null>(null),
    technician: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    status: this.fb.control<'Active' | 'Inactive' | 'InProgress' | 'Done' | 'Scheduled'>(
      'Scheduled', { nonNullable: true }
    ),
    cost: this.fb.control<number | null>(null, { validators: [Validators.min(0)] }),
    notes: this.fb.control<string | null>(null),
  });

  async onSubmit() {
    this.error.set(null);
    this.success.set(false);
    this.submitting.set(true);
    try {
      const raw = this.form.getRawValue();
      // Normaliza opcionales antes de validar
      const toValidate = {
        ...raw,
        cost: raw.cost == null ? undefined : raw.cost,
        performedAt: !raw.performedAt ? undefined : raw.performedAt,
      } as any;
      const parsed: MaintenanceDTOInput = MaintenanceDTOSchema.parse(toValidate);
      const entity = Maintenance.create(parsed as any);

      await new Promise(r => setTimeout(r, 500));
      console.log('Entidad lista para persistir:', entity);
      this.success.set(true);
      this.form.markAsPristine();
    } catch (e: any) {
      this.error.set(e?.message ?? 'Error al guardar');
    } finally {
      this.submitting.set(false);
    }
  }
}

