"use client"

import { useState, useCallback, useMemo } from "react"
import { Inertia } from "@inertiajs/inertia"
import { Search } from "lucide-react"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import ParkingSpace from "./ParkingSpace"
import VehicleRegistrationModal from "./VehicleRegistrationModal"
import VehicleDetailsModal from "./VehicleDetailsModal"
// import { route } from "@inertiajs/react"

export default function ParkingLotView({ initialSpaces }) {
  const [spaces, setSpaces] = useState(initialSpaces || [])
  const [statusFilter, setStatusFilter] = useState("all")
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("all")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Modal states
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedSpace, setSelectedSpace] = useState(null)

  // Memoize filtered spaces to prevent recalculation on every render
  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      return (
        (statusFilter === "all" || space.status === statusFilter) &&
        (vehicleTypeFilter === "all" || space.vehicleType === vehicleTypeFilter) &&
        (sectionFilter === "all" || space.section === sectionFilter) &&
        (searchQuery === "" ||
          space.id.toString().includes(searchQuery) ||
          (space.vehicle &&
            space.vehicle.license_plate &&
            space.vehicle.license_plate.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    })
  }, [spaces, statusFilter, vehicleTypeFilter, sectionFilter, searchQuery])

  // Handle space click based on status
  const handleSpaceClick = useCallback((space) => {
    setSelectedSpace(space)
    if (space.status === "available") {
      setRegistrationModalOpen(true)
    } else {
      setDetailsModalOpen(true)
    }
  }, [])

  // Handle vehicle registration
  const handleRegisterVehicle = useCallback((spaceId, vehicleData) => {
    Inertia.post(
      route("parking.register"),
      {
        space_id: spaceId,
        ...vehicleData,
      },
      {
        onSuccess: () => {
          setRegistrationModalOpen(false)
          // The page will refresh with new data from the server
        },
      },
    )
  }, [])

  // Handle vehicle checkout
  const handleCheckoutVehicle = useCallback((parkingId) => {
    Inertia.post(
      route("parking.checkout"),
      {
        parking_id: parkingId,
      },
      {
        onSuccess: () => {
          setDetailsModalOpen(false)
          // The page will refresh with new data from the server
        },
      },
    )
  }, [])

  // Calculate available spaces count once
  const availableSpacesCount = useMemo(() => {
    return filteredSpaces.filter((s) => s.status === "available").length
  }, [filteredSpaces])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por número o placa..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="available">Disponible</SelectItem>
            <SelectItem value="occupied">Ocupado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Tipo de vehículo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="car">Automóvil</SelectItem>
            <SelectItem value="motorcycle">Motocicleta</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sectionFilter} onValueChange={setSectionFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sección" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="A">Sección A</SelectItem>
            <SelectItem value="B">Sección B</SelectItem>
            <SelectItem value="C">Sección C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filteredSpaces.map((space) => (
          <ParkingSpace
            key={space.id}
            id={space.id}
            status={space.status}
            vehicleType={space.vehicleType}
            section={space.section}
            licensePlate={space.vehicle?.license_plate}
            onClick={() => handleSpaceClick(space)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Ocupado</span>
          </div>
        </div>
        <div>
          <span className="font-medium">
            {availableSpacesCount} disponibles / {filteredSpaces.length} total
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => Inertia.get(route("parking.report"))}>Generar Reporte</Button>
      </div>

      {/* Registration Modal */}
      {selectedSpace && (
        <VehicleRegistrationModal
          isOpen={registrationModalOpen}
          onClose={() => setRegistrationModalOpen(false)}
          onSubmit={(data) => handleRegisterVehicle(selectedSpace.id, data)}
          spaceId={selectedSpace.id}
          section={selectedSpace.section}
        />
      )}

      {/* Details Modal */}
      {selectedSpace && selectedSpace.vehicle && (
        <VehicleDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          onCheckout={() => handleCheckoutVehicle(selectedSpace.vehicle.id)}
          vehicle={selectedSpace.vehicle}
          spaceId={selectedSpace.id}
          section={selectedSpace.section}
        />
      )}
    </div>
  )
}

