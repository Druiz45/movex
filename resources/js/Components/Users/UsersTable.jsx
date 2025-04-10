import { useForm } from "@inertiajs/react"
import { useCallback } from "react"
export default function UsersTable({ users = [] }) {
    const { data, setData, put, processing, errors, reset } = useForm();


    const handleToggleStatus = useCallback(
        (userId) => {
            route(put(`/users/${userId}/toggle-status`), {
            })
        },
        [put]
    )

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
                <thead className="bg-gray-100">
                    <tr className="text-left">
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Correo electrónico</th>
                        <th className="border px-4 py-2">Fecha de registro</th>
                        <th className="border px-4 py-2">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="border hover:bg-gray-50">
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                                <th className="border px-4 py-2"><button
                                    className={`px-3 py-1 rounded text-white ${user.status ? 'bg-red-500' : 'bg-green-500'}`}
                                    onClick={() => handleToggleStatus(user.id)}
                                >
                                    {user.status ? 'Deshabilitar' : 'Habilitar'}
                                </button></th>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="border px-4 py-4 text-center text-gray-500">
                                No hay usuarios registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
