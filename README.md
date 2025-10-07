# Proyecto Integrador

## Nombre del Proyecto

Modulo de gestion de inventario y registro de 
mantenimientos de equipos informaticos.

## Descripcion del Proyecto

Diseñar e implementar un modulo de gestion del inventario y registro para mantenimientos para equipos informaticos, que permite llevar un control eficiente del estado, ubicacion y mantenimiento preventivo y correctivo de los dispositivos, mejorando la trasabilidad y disponibilidad y toma de decisiones en la administracion de recursos tecnologicos.

## Pasos iniciales

- **Instalación de angular:**
  
  ```bash
  npm install -g @angular/cli
  ```

- **Creación de proyecto:**
  
  ```bash
  ng new frontend
  ```

- **Ubicación en directorio:**
  
  ```bash
  cd frontend
  ```

- **Levantamiento de proyecto:**

  ```bash
  ng serve -o
  ```

  ## Diagrama de clases
  ```mermaid
  classDiagram
    class Maintenance {
        +id: string
        +equipmentId: string
        +type: string
        +scheduleAt: Date
        +performedAt: Date
        +technician: string
        +notes?: string | null
        +cost?: number
        +status: string
        +isCompleted(): boolean
    }
    class MaintenanceStatus{
        <<enumeration>>
        Active
        Inactive
        InProgress
        Finished
    }

     class MaintenanceType{
        <<enumeration>>
        Inspection
        Preventive
        Corrective
        Predictive
        Proactive
        Reactive
        scheduled
        Automated

    }

    Maintenance --> MaintenanceStatus: "Define estado"
    Maintenance --> MaintenanceType: "Define Tipo"


    
    class Equipment {
        +id: string
        +assetTag: string
        +serialNumber: string
        +model: string
        +type: EquipmentType
        +status: EquipmentStatus
        +locationId: string
        +purchaseDate: Date
        +warrantyEnd: Date
        +metada: Map<string, any>
        +isActive(): boolean
    }

    class EquipmentStatus{
        <<enumeration>>
        Available
        InUse
        InRepair
        Retired
    }
    

    class EquipmentType{
        <<enumeration>>
        Personal Computer
        Phone
        Console
        All in One
        Peripherals
        Electrodomestics
    }
    
    Equipment --> EquipmentType : "Define tipo"
    Equipment --> EquipmentStatus: "Define status"

    
# DTO, Data transfer Object