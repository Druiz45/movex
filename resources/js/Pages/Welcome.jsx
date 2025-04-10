import { Link } from '@inertiajs/react';
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            {/* Navbar */}
            <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-extrabold" style={{ color: "#2E4F4F" }}>
                    Movex Parqueadero
                </h1>
                <div className="space-x-4">
                    <Link href={route('login')}>
                        <button className="bg-[#2E4F4F] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
                            <i className="bi bi-box-arrow-in-right mr-2" />
                            Iniciar sesión
                        </button>
                    </Link>
                    <Link href={route('register')}>
                        <button className="border border-[#2E4F4F] text-[#2E4F4F] px-4 py-2 rounded-lg hover:bg-[#2E4F4F]/10 transition-all">
                            <i className="bi bi-person-plus mr-2" />
                            Registrar
                        </button>
                    </Link>
                </div>
            </nav >

            {/* Hero Section */}
            < header className="flex-1 py-16 px-6 md:px-16 bg-gray-50" >
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                    {/* Texto principal */}
                    <div>
                        <h2 className="text-4xl font-extrabold mb-4" style={{ color: "#2E4F4F" }}>
                            Gestión inteligente de parqueaderos con Movex
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Optimiza tus espacios, registra entradas y salidas, y lleva el
                            control total de tu parqueadero con nuestra plataforma moderna.
                        </p>
                        <div className="flex space-x-4">
                            <Link href={route('login')}>
                                <button className="bg-[#2E4F4F] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                                    <i className="bi bi-rocket-takeoff-fill mr-2" />
                                    Comenzar ahora
                                </button>
                            </Link>
                            <Link href={route('login')}>
                                <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all">
                                    <i className="bi bi-eye-fill mr-2" />
                                    Ver más
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Imagen ilustrativa */}
                    <div className="flex justify-center">
                        <img
                            src="/img/auto.jpg"
                            alt="Parqueadero"
                            className="rounded-2xl shadow-xl w-full max-w-md"
                        />
                    </div>
                </div>
            </header >

            {/* About Section */}
            < section className="bg-gray-100 py-16 px-6 md:px-16" >
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-4" style={{ color: "#2E4F4F" }}>
                        ¿Por qué elegir Movex?
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                        Movex te permite tener un control total de los vehículos que entran
                        y salen, generar reportes automáticos y maximizar la eficiencia de
                        tu parqueadero.
                    </p>
                    <div className="flex justify-center space-x-6 text-2xl" style={{ color: "#2E4F4F" }}>
                        <i className="bi bi-car-front-fill"></i>
                        <i className="bi bi-speedometer2"></i>
                        <i className="bi bi-clipboard-data"></i>
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="bg-white shadow-inner py-6 text-center text-sm text-gray-500" >
                <div className="flex flex-col items-center space-y-2">
                    <div className="flex space-x-4 text-[#2E4F4F] text-xl">
                        <a href="#"><i className="bi bi-twitter hover:text-blue-500" /></a>
                        <a href="#"><i className="bi bi-facebook hover:text-blue-700" /></a>
                        <a href="#"><i className="bi bi-instagram hover:text-pink-500" /></a>
                        <a href="#"><i className="bi bi-github hover:text-black" /></a>
                    </div>
                    <div>© {new Date().getFullYear()} Movex. Todos los derechos reservados.</div>
                </div>
            </footer >
        </div >
    );
}
