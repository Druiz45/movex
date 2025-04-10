"use client"

import { useState, useCallback, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ParkingSpace from "./parking-space"

// Generate example data for parking spaces
const generateInitialSpaces = () =>
  Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    status: Math.random() > 0.3 ? "available" : "occupied",
    vehicleType: Math.random() > 0.5 ? "car" : "motorcycle",
    section: i < 10 ? "A" : i < 20 ? "B" : "C",
  }))

export default function ParkingLotView() {
  const [spaces, setSpaces] = useState(generateInitialSpaces)
  const [statusFilter, setStatusFilter] = useState("all")
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("all")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Memoize filtered spaces to prevent recalculation on every render
  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      return (
        (statusFilter === "all" || space.status === statusFilter) &&
        (vehicleTypeFilter === "all" || space.vehicleType === vehicleTypeFilter) &&
        (sectionFilter === "all" || space.section === sectionFilter) &&
        (searchQuery === "" || space.id.toString().includes(searchQuery))
      )
    })
  }, [spaces, statusFilter, vehicleTypeFilter, sectionFilter, searchQuery])

  // Use useCallback to prevent recreation of this function on every render
  const toggleSpaceStatus = useCallback((id) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) =>
        space.id === id ? { ...space, status: space.status === "available" ? "occupied" : "available" } : space,
      ),
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
            placeholder="Buscar por número..."
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
            onClick={() => toggleSpaceStatus(space.id)}
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
        <Button>Generar Reporte</Button>
      </div>
    </div>
  )
}

