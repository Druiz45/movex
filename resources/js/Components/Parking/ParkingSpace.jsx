"use client"

import { memo } from "react"
import { Car, Bike } from "lucide-react"
import { cn } from "@/lib/utils"

// Using React.memo to prevent unnecessary re-renders
const ParkingSpace = memo(function ParkingSpace({
  id,
  number,
  status,
  vehicleType,
  vehicleTypeId,
  section,
  licensePlate,
  onClick,
}) {
  // Convert status from number to string for component logic
  const isAvailable = status === 0
  // console.log(id, number, status, vehicleType, vehicleTypeId, section, licensePlate, onClick)
  // console.log("ParkingSpace props:", { id, number, status, vehicleType, vehicleTypeId, section, licensePlate, onClick })
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-colors",
        isAvailable ? "border-green-500 bg-green-50 hover:bg-green-100" : "border-red-500 bg-red-50 hover:bg-red-100",
      )}
      onClick={onClick}
    >
      <div className="text-lg font-bold">{number}</div>
      <div className="text-xs text-muted-foreground">Sección {section}</div>
      <div className="mt-2">
        {vehicleTypeId == 1 ? (
          <Car className={cn("h-6 w-6", !isAvailable ? "text-red-500" : "text-green-500")} />
        ) : vehicleTypeId == 2 ? (
          <Bike className={cn("h-6 w-6", !isAvailable ? "text-red-500" : "text-green-500")} />
        ) : (
          <></>
        )}
      </div>
      <div className="mt-1 text-xs font-medium">{isAvailable ? "Disponible" : "Ocupado"}</div>
      {licensePlate && (
        <div className="mt-1 text-xs font-bold bg-gray-200 px-2 py-0.5 rounded-full">{licensePlate}</div>
      )}
    </div>
  )
})

export default ParkingSpace

