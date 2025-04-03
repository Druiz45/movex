import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

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

        </AuthenticatedLayout>
    );
}
