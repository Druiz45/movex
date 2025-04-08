import { Head } from "@inertiajs/react"
import ParkingLotView from "@/Components/Parking/ParkingLotView"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, parkingSpaces = [], typeVehicles = [] }) {
  // console.log("Initial parking spaces:", parkingSpaces)
  // console.log("Initial vehicle types:", typeVehicles)
  // // Check if parkingSpaces is an array
  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Entradas y Salidas
          </h2>
        }
      >
        <Head title="Gestión de Parqueadero" />
        <main className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Gestión de Parqueadero</h1>
          <ParkingLotView initialSpaces={parkingSpaces} vehicleTypes={typeVehicles} />
        </main>
      </AuthenticatedLayout>
    </>
  )
}

