import { Head } from "@inertiajs/inertia-react"
import ParkingLotView from "@/Components/Parking/ParkingLotView"

export default function Index({ spaces }) {
  return (
    <>
      <Head title="Gestión de Parqueadero" />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Gestión de Parqueadero</h1>
        <ParkingLotView initialSpaces={spaces} />
      </main>
    </>
  )
}

