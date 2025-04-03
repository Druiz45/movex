"use client"

import { memo } from "react"
import { Car, Bike } from "lucide-react"
import { cn } from "@/lib/utils"

// Using React.memo to prevent unnecessary re-renders
const ParkingSpace = memo(function ParkingSpace({ id, status, vehicleType, section, onClick }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-colors",
        status === "available"
          ? "border-green-500 bg-green-50 hover:bg-green-100"
          : "border-red-500 bg-red-50 hover:bg-red-100",
      )}
      onClick={onClick}
    >
      <div className="text-lg font-bold">{id}</div>
      <div className="text-xs text-muted-foreground">Sección {section}</div>
      <div className="mt-2">
        {vehicleType === "car" ? (
          <Car className={cn("h-6 w-6", status === "occupied" ? "text-red-500" : "text-green-500")} />
        ) : (
          <Bike className={cn("h-6 w-6", status === "occupied" ? "text-red-500" : "text-green-500")} />
        )}
      </div>
      <div className="mt-1 text-xs font-medium">{status === "available" ? "Disponible" : "Ocupado"}</div>
    </div>
  )
})

export default ParkingSpace

