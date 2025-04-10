import { Head } from "@inertiajs/react"
import UsersTable from "@/Components/Users/UsersTable"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Users({ auth, users = [] }) {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Usuarios
                    </h2>
                }
            >
                <Head title="Gestión de Usuarios" />

                <main className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <UsersTable users={users.data} />
                    </div>
                </main>
            </AuthenticatedLayout>
        </>
    )
}
