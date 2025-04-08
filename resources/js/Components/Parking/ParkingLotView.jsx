"use client"

import { useState, useCallback, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import ParkingSpace from "./ParkingSpace"
import VehicleRegistrationModal from "./VehicleRegistrationModal"
import VehicleDetailsModal from "./VehicleDetailsModal"
import { useForm } from "@inertiajs/react"

export default function ParkingLotView({ initialSpaces = [], vehicleTypes = [] }) {
  // console.log(vehicleTypes)
  const { data, setData, post, processing, errors, reset } = useForm({
    parking_space_id: "",
    vehicleData: {},
  });

  const [spaces, setSpaces] = useState(initialSpaces)
  const [statusFilter, setStatusFilter] = useState("all")
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Modal states
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedSpace, setSelectedSpace] = useState(null)

  // Get sections from space numbers (e.g., 1-10 = A, 11-20 = B, etc.)
  const getSection = (number) => {
    if (number <= 10) return "A"
    if (number <= 20) return "B"
    return "C"
  }

  // Memoize filtered spaces to prevent recalculation on every render
  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const vehicleTypeMatch = vehicleTypeFilter === "all" || space.type_vehicle_id?.toString() === vehicleTypeFilter

      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "available" && space.status === 0) ||
        (statusFilter === "occupied" && space.status === 1)

      const searchMatch =
        searchQuery === "" ||
        space.number?.toString().includes(searchQuery) ||
        (space.license_plate && space.license_plate.toLowerCase().includes(searchQuery.toLowerCase()))

      return vehicleTypeMatch && statusMatch && searchMatch
    })
  }, [spaces, statusFilter, vehicleTypeFilter, searchQuery])

  // Handle space click based on status
  const handleSpaceClick = useCallback((space) => {
    setSelectedSpace(space)
    if (space.status === 0) {
      // 0 = available
      setRegistrationModalOpen(true)
    } else {
      setDetailsModalOpen(true)
    }
  }, [])

  // Handle vehicle registration
  const handleRegisterVehicle = useCallback(
    (spaceId, vehicleData) => {
      console.log(spaceId, vehicleData);
      post(route("parking_spaces.register"), {
        data: {
          parking_space_id: spaceId,
          vehicleData: { ...vehicleData },
        },
        onSuccess: () => {
          setRegistrationModalOpen(false);
        },
      });
    },
    [],
  )

  // Handle vehicle checkout
  const handleCheckoutVehicle = useCallback(
    (spaceId) => {
      router.post(
        route("parking-spaces.checkout"),
        {
          parking_space_id: spaceId,
        },
        {
          onSuccess: () => {
            setDetailsModalOpen(false)
          },
        },
      )
    },
    [route],
  )

  // Calculate available spaces count once
  const availableSpacesCount = useMemo(() => {
    return filteredSpaces.filter((s) => s.status === 0).length
  }, [filteredSpaces])

  // Get vehicle type name from ID
  const getVehicleTypeName = (typeId) => {
    const type = vehicleTypes.find((t) => t.id === typeId)
    return type ? type.name : ""
  }

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
            {vehicleTypes.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filteredSpaces.map((space) => (
          <ParkingSpace
            key={space.id}
            id={space.id}
            number={space.number}
            status={space.status}
            vehicleType={getVehicleTypeName(space.type_vehicle_id)}
            vehicleTypeId={space.type_vehicle_id}
            section={getSection(space.number)}
            licensePlate={space.license_plate}
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

      {/* Registration Modal */}
      {selectedSpace && (
        <VehicleRegistrationModal
          isOpen={registrationModalOpen}
          onClose={() => setRegistrationModalOpen(false)}
          onSubmit={(data) => handleRegisterVehicle(selectedSpace.id, data)}
          space={selectedSpace}
          vehicleTypes={vehicleTypes}
          section={getSection(selectedSpace.number)}
        />
      )}

      {/* Details Modal */}
      {selectedSpace && selectedSpace.status === 1 && (
        <VehicleDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          onCheckout={() => handleCheckoutVehicle(selectedSpace.id)}
          space={selectedSpace}
          section={getSection(selectedSpace.number)}
          vehicleTypeName={getVehicleTypeName(selectedSpace.type_vehicle_id)}
        />
      )}
    </div>
  )
}

