import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipment } from '../../../../../domain/models/equipment.model';
import { EquipmentDTOInput, EquipmentDTOSchema } from
  '../../schemas/equipment.zod';


@Component({
  selector: 'app-equipment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './equipment-form.page.html',
  styleUrl: './equipment-form.page.css'
})
export class EquipmentFormPage {
  private fb = inject(FormBuilder);
  public submitting = signal(false);
  public error = signal<string | null>(null);
  public success = signal(false);

  public form = this.fb.group({
    id: this.fb.control<string>(crypto.randomUUID(), { nonNullable: true }),
    assetTag: this.fb.control<string>('', {
      nonNullable: true, validators: [
        Validators.required]
    }),
    serialNumber: this.fb.control<string>('', {
      nonNullable: true, validators: [
        Validators.required]
    }),
    model: this.fb.control<string>('', {
      nonNullable: true, validators: [
        Validators.required]
    }),
    type: this.fb.control<'Laptop' | 'Desktop' | 'Printer' | 'Monitor' | 'Server'
      | 'Other'>('Laptop', { nonNullable: true }),
    status: this.fb.control<'Available' | 'InUse' | 'InRepair' | 'Retired'>(
      'Available', { nonNullable: true }),
    locationId: this.fb.control<string>('', {
      nonNullable: true, validators: [
        Validators.required]
    }),
    purchaseDate: this.fb.control<string>('', {
      nonNullable: true, validators: [
        Validators.required]
    }),
    warrantyEnd: this.fb.control<string>('', {
      nonNullable: true, validators: [
        Validators.required]
    }),
    metadata: this.fb.control<Record<string, unknown>>({}, { nonNullable: true }
    ),
  });

  async onSubmit() {
    this.error.set(null);
    this.success.set(false);
    this.submitting.set(true);

    try {
      const raw = this.form.getRawValue();
      const parsed: EquipmentDTOInput = EquipmentDTOSchema.parse(raw);
      // Mapeo final a entidad (dominio) – aplica ETL de create()
      const entity = Equipment.create({
        ...parsed,
        // Garantiza tipos Date para la entidad si vienen como string
        purchaseDate: new Date(parsed.purchaseDate as any),
        warrantyEnd: new Date(parsed.warrantyEnd as any),
      } as any);
      // Aquí se debería llamar al caso de uso "create/update".
      // Por ahora simulamos guardado:
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
