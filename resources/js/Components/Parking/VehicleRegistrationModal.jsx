import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"

export default function VehicleRegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  space,
  vehicleTypes,
  section,
  formData,
  setFormData,
  errors,
  processing
}) {
  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Vehículo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Display the parking space number (read-only) */}
            <div>
              <Label htmlFor="number">Número de Espacio</Label>
              <Input id="number" value={space.number} disabled />
            </div>
            <div>
              <Label htmlFor="number">Seccion</Label>
              <Input id="number" value={section} disabled />
            </div>

            {/* Vehicle type selection */}
            <div>
              <Label htmlFor="type_vehicle_id">Tipo de Vehículo <span className="text-red-500">*</span></Label>
              <Select
                value={formData.type_vehicle_id}
                onValueChange={(value) => handleChange("type_vehicle_id", value)}
                required
              >
                <SelectTrigger id="type_vehicle_id">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicleData?.type_vehicle_id && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicleData.type_vehicle_id}</p>
              )}
            </div>

            {/* License plate input */}
            <div>
              <Label htmlFor="license_plate">Placa <span className="text-red-500">*</span></Label>
              <Input
                id="license_plate"
                value={formData.license_plate}
                onChange={(e) => handleChange("license_plate", e.target.value)}
                placeholder="ABC-123"
                required
              />
              {errors.vehicleData?.license_plate && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicleData.license_plate}</p>
              )}
            </div>

            {/* Driver name input */}
            <div>
              <Label htmlFor="driver">Conductor <span className="text-red-500">*</span></Label>
              <Input
                id="driver"
                value={formData.driver}
                onChange={(e) => handleChange("driver", e.target.value)}
                placeholder="Nombre del conductor"
                required
              />
              {errors.vehicleData?.driver && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicleData.driver}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? "Registrando..." : "Registrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}