import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ParkingLotView from "@/components/parking-lot-view"

export default function Registros({ auth, entrancesExits }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Espacios
                </h2>
            }
        >
            <Head title="Espacios" />
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Gestión de Parqueadero</h1>
                <ParkingLotView />
            </main>
        </AuthenticatedLayout>
    );
}
