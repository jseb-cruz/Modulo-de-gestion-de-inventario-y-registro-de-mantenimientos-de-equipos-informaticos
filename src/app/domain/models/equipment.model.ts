import { EquipmentDTO } from "../../shared/contracts/equipment.contract";
export type EquipmentStatus =
 "Available" |
 "InUse" |
 "InRepair" |
 "Retired";
export type EquipmentType =
 "Laptop" |
 "Desktop" |
 "Printer" |
 "Monitor" |
 "Server" |
 "Other";
export class Equipment {
 constructor (
 public readonly id: string,
 public readonly assetTag: string,
 public readonly serialNumber: string,
 public readonly model: string,
 public readonly type: EquipmentType,
 public readonly status: EquipmentStatus,
 public readonly locationId: string,
 public readonly purchaseDate: Date,
 public readonly warrantyEnd: Date,
 public readonly metadata: Map<string, any>,
 ) { }
 /**
 * Fabrica desde primitivas, mapeadas del DTO
 */
 static create ( input: EquipmentDTO ) {
 if ( !input.assetTag?.trim() ) throw new Error( 'assetTag vacío' );
 if ( !input.serialNumber?.trim() ) throw new Error( 'serialNumber vacío'
);
 const purchase = input.purchaseDate instanceof Date
 ? input.purchaseDate
 : new Date( input.purchaseDate );
 const warranty = input.warrantyEnd instanceof Date
 ? input.warrantyEnd
 : new Date( input.warrantyEnd );
 const meta =
 input.metadata instanceof Map
 ? input.metadata
 : new Map( Object.entries( input.metadata ?? {} ) );
 return new Equipment(
 input.id,
 input.assetTag,
 input.serialNumber,
 input.model,
 input.type,
 input.status,
 input.locationId,
 purchase,
 warranty,
 meta,
 );
 }
 isActive (): boolean {
    return this.status === 'Available' || this.status === 'InUse';
 }
 canBeMaintained (): boolean {
 return this.status !== 'Retired';
 }
}
