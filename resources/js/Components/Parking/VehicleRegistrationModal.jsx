"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"

export default function VehicleRegistrationModal({ isOpen, onClose, onSubmit, spaceId, section }) {
  const [formData, setFormData] = useState({
    license_plate: "",
    driver_name: "",
    vehicle_type: "car",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Registrar Vehículo - Espacio {spaceId} (Sección {section})
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="license_plate" className="text-right">
                Placa
              </Label>
              <Input
                id="license_plate"
                name="license_plate"
                value={formData.license_plate}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="driver_name" className="text-right">
                Conductor
              </Label>
              <Input
                id="driver_name"
                name="driver_name"
                value={formData.driver_name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle_type" className="text-right">
                Tipo
              </Label>
              <Select
                value={formData.vehicle_type}
                onValueChange={(value) => handleSelectChange("vehicle_type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Tipo de vehículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Automóvil</SelectItem>
                  <SelectItem value="motorcycle">Motocicleta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Registrar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

