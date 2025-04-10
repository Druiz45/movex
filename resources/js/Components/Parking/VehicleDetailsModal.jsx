import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"

export default function VehicleDetailsModal({
  isOpen,
  onClose,
  onCheckout,
  space,
  section,
  vehicleTypeName,
  processing,
}) {
  const getTimeElapsed = () => {
    if (!space.entry) return "N/A"
    const entryTime = new Date(space.entry)
    const now = new Date()
    const diffMs = now - entryTime
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalles del Vehículo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div><Label>Número de Espacio</Label><Input value={space.number} readOnly /></div>
          <div><Label>Sección</Label><Input value={section} readOnly /></div>
          <div><Label>Tipo de Vehículo</Label><Input value={vehicleTypeName} readOnly /></div>
          <div><Label>Placa</Label><Input value={space.license_plate || "N/A"} readOnly /></div>
          <div><Label>Conductor</Label><Input value={space.driver || "N/A"} readOnly /></div>

          <div className="grid grid-cols-2 gap-4">
            <div><Label>Fecha Entrada</Label><Input value={space.entry ? new Date(space.entry).toLocaleString() : "N/A"} readOnly /></div>
            <div><Label>Tiempo Transcurrido</Label><Input value={getTimeElapsed()} readOnly /></div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onCheckout}
            disabled={processing}
          >
            {processing ? "Procesando..." : "Registrar Salida"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
