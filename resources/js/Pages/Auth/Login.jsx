import { Head, Link, useForm } from '@inertiajs/react';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex w-full max-w-4xl rounded-[50px] overflow-hidden shadow-xl bg-white">
                    {/* Izquierda - Formulario */}
                    <div className="w-full md:w-1/2 bg-white px-10 py-12 flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">LOGIN</h1>
                        <form onSubmit={submit} className="w-full max-w-sm space-y-6">
                            {/* Email */}
                            <div className="flex items-center border-b border-black py-2">
                                <FaUser className="text-xl text-black mr-3" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                                    placeholder="Usuario"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                            {/* Password */}
                            <div className="flex items-center border-b border-black py-2">
                                <FaLock className="text-xl text-black mr-3" />
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                                    placeholder="Contraseña"
                                />

                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                            {/* Forgot password */}
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-blue-500 hover:underline block text-right"
                                >
                                    Olvide contraseña
                                </Link>
                            )}

                            {/* Botón de login */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#314F50] hover:bg-[#263d3e] text-white font-bold py-2 rounded-md transition"
                            >
                                INICIAR
                            </button>

                            {/* Enlaces adicionales */}
                            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 pt-6 gap-2">
                                <Link href="/" className="hover:underline hover:text-[#314F50] transition">
                                    ⬅ Volver al inicio
                                </Link>

                                <Link href={route('register')} className="hover:underline hover:text-[#314F50] transition">
                                    ¿No tienes cuenta? Regístrate
                                </Link>
                            </div>
                        </form>

                    </div>

                    {/* Derecha - Imagen */}
                    <div className="hidden md:flex w-1/2 bg-[#314F50] items-center justify-center">
                        <img
                            src="/img/auto.jpg" // cambia esta ruta si lo necesitas
                            alt="Login Car"
                            className="object-cover max-h-[400px]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
