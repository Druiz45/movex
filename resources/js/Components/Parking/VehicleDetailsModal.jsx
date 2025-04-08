"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { formatDateTime, calculateDuration } from "@/lib/utils"

export default function VehicleDetailsModal({ isOpen, onClose, onCheckout, space, section, vehicleTypeName }) {
  // Calculate duration and price
  const entryTime = new Date(space.created_at)
  const currentTime = new Date()
  const durationHours = (currentTime - entryTime) / (1000 * 60 * 60)

  // Calculate price (example: $2000 per hour for cars, $1000 for motorcycles)
  const hourlyRate = vehicleTypeName?.toLowerCase().includes("auto") ? 2000 : 1000
  const accumulatedPrice = Math.ceil(hourlyRate * durationHours)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Detalles del Vehículo - Espacio {space.number} (Sección {section})
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Placa:</div>
            <div className="col-span-2">{space.license_plate}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Conductor:</div>
            <div className="col-span-2">{space.driver}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Tipo:</div>
            <div className="col-span-2">{vehicleTypeName}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Entrada:</div>
            <div className="col-span-2">{formatDateTime(space.created_at)}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Salida:</div>
            <div className="col-span-2">Por definir</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Duración:</div>
            <div className="col-span-2">{calculateDuration(space.created_at, new Date())}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-right">Precio Acumulado:</div>
            <div className="col-span-2 font-bold text-lg">${accumulatedPrice.toLocaleString("es-CO")}</div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button type="button" variant="destructive" onClick={onCheckout}>
            Finalizar Estacionamiento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

