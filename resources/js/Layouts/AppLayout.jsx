import React from 'react';
import { Link } from '@inertiajs/react';

export default function AppLayout({ children }) {
    return (
        <div className="flex h-screen">
            {/* Barra Lateral */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Menú</h2>
                <nav>
                    <ul>
                        <li className="mb-2">
                            <Link href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/profile" className="block p-2 hover:bg-gray-700 rounded">Perfil</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/logout" method="post" as="button" className="block p-2 w-full text-left hover:bg-gray-700 rounded">
                                Cerrar Sesión
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                {children}
            </main>
        </div>
    );
}
