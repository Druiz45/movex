"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { formatCurrency, formatDateTime, calculateDuration } from "@/lib/utils"

export default function VehicleDetailsModal({ isOpen, onClose, onCheckout, vehicle, spaceId, section }) {
  const hasExited = !!vehicle.exit_time

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Detalles del Vehículo - Espacio {spaceId} (Sección {section})
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Placa:</div>
            <div className="col-span-2">{vehicle.license_plate}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Conductor:</div>
            <div className="col-span-2">{vehicle.driver_name}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Tipo:</div>
            <div className="col-span-2">{vehicle.vehicle_type === "car" ? "Automóvil" : "Motocicleta"}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Entrada:</div>
            <div className="col-span-2">{formatDateTime(vehicle.entry_time)}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Salida:</div>
            <div className="col-span-2">{hasExited ? formatDateTime(vehicle.exit_time) : "Por definir"}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Duración:</div>
            <div className="col-span-2">{calculateDuration(vehicle.entry_time, vehicle.exit_time || new Date())}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Precio Acumulado:</div>
            <div className="col-span-2 font-bold text-lg">{formatCurrency(vehicle.accumulated_price)}</div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {!hasExited && (
            <Button type="button" variant="destructive" onClick={onCheckout}>
              Finalizar Estacionamiento
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

