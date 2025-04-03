import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Registros({ auth, entrancesExits }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Entradas y Salidas
                </h2>
            }
        >
            <Head title="Entradas y Salidas" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Entradas y Salidas</h2>

                        {entrancesExits.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300 bg-white">
                                    <thead className="bg-gray-100">
                                        <tr className="text-left">
                                            <th className="border px-4 py-2">Placa</th>
                                            <th className="border px-4 py-2">Conductor</th>
                                            <th className="border px-4 py-2">Entrada</th>
                                            <th className="border px-4 py-2">Salida</th>
                                            <th className="border px-4 py-2">Precio Acumulado</th>
                                            <th className="border px-4 py-2">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entrancesExits.data.map(entry => (
                                            <tr key={entry.id} className="border hover:bg-gray-50">
                                                <td className="border px-4 py-2">{entry.license_plate}</td>
                                                <td className="border px-4 py-2">{entry.driver}</td>
                                                <td className="border px-4 py-2">{entry.entry}</td>
                                                <td className="border px-4 py-2">
                                                    {entry.departure ? entry.departure : "Aún en parqueadero"}
                                                </td>
                                                <td className="border px-4 py-2">${entry.hourly_price_to_date}</td>
                                                <td className="border px-4 py-2">
                                                    {!entry.departure && (
                                                        <button
                                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                            onClick={() => registrarSalida(entry.id)}
                                                        >
                                                            Registrar Salida
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* PAGINACIÓN */}
                                <div className="mt-4 flex justify-center space-x-2">
                                    {entrancesExits.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-4 py-2 border rounded ${link.active
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-white text-blue-500 hover:bg-blue-100"
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">No hay registros disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
