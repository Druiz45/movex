import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { FaFileExcel } from 'react-icons/fa';

export default function Registros({ auth, entrancesExits, filters, countsByType, totalsByType, totalGeneral }) {

    const { data, setData, get } = useForm({
        date_from: filters?.date_from || '',
        date_to: filters?.date_to || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route('entrances-exits.index'), {
            preserveScroll: true,
            preserveState: true,
        });
    };

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
                <div className="max-w-7x1 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Entradas y Salidas</h2>
                        {/* Resumen por tipo de vehículo */}
                        <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {Object.keys(countsByType).map((type) => (
                                <div key={type} className="p-4 bg-gray-100 rounded shadow text-sm">
                                    <strong>{type}</strong><br />
                                    Cantidad: {countsByType[type]}<br />
                                    Total a pagar: ${totalsByType[type].toFixed(2)}
                                </div>
                            ))}
                            <div className="p-4 bg-green-100 rounded shadow text-sm">
                                <strong>Total general</strong><br />
                                ${totalGeneral.toFixed(2)}
                            </div>
                        </div>
                        {/* Filtro + botón Exportar Excel al mismo nivel */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Desde:</label>
                                    <input
                                        type="date"
                                        value={data.date_from}
                                        onChange={(e) => setData('date_from', e.target.value)}
                                        className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Hasta:</label>
                                    <input
                                        type="date"
                                        value={data.date_to}
                                        onChange={(e) => setData('date_to', e.target.value)}
                                        className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Filtrar
                                </button>
                            </form>

                            <a
                                href={route('entradas_salidas.xlsx')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition whitespace-nowrap"
                            >
                                <FaFileExcel className="text-xl" />
                                Exportar Excel
                            </a>
                        </div>

                        {/* Tabla de registros */}
                        {entrancesExits.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300 bg-white">
                                    <thead className="bg-gray-100">
                                        <tr className="text-left">
                                            <th className="border px-4 py-2">Tipo de vehículo</th>
                                            <th className="border px-4 py-2">Placa</th>
                                            <th className="border px-4 py-2">Conductor</th>
                                            <th className="border px-4 py-2">Entrada</th>
                                            <th className="border px-4 py-2">Salida</th>
                                            <th className="border px-4 py-2">Precio por hora a la fecha</th>
                                            <th className="border px-4 py-2">Total a Pagar</th>
                                            {/* <th className="border px-4 py-2">Acción</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entrancesExits.data.map(entry => (
                                            <tr key={entry.id} className="border hover:bg-gray-50">
                                                <td className="border px-4 py-2">{entry.type}</td>
                                                <td className="border px-4 py-2">{entry.license_plate}</td>
                                                <td className="border px-4 py-2">{entry.driver}</td>
                                                <td className="border px-4 py-2">{entry.formatted_entry}</td>
                                                <td className="border px-4 py-2">
                                                    {entry.departure ? entry.formatted_departure : "Aún en parqueadero"}
                                                </td>
                                                <td className="border px-4 py-2">${entry.hourly_price_to_date}</td>
                                                <td className="border px-4 py-2 bg-green-300">
                                                    {entry.departure ? `$${entry.calculated_price}` : "En cálculo"}
                                                </td>
                                                {/* <td className="border px-4 py-2">
                                                    {!entry.departure && (
                                                        <button
                                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                            onClick={() => registrarSalida(entry.id)}
                                                        >
                                                            Registrar Salida
                                                        </button>
                                                    )}
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

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
