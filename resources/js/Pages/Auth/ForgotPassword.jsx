import { Head, Link, useForm } from '@inertiajs/react';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Recuperar contraseña" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex w-full max-w-4xl rounded-[50px] overflow-hidden shadow-xl bg-white">
                    {/* Izquierda - Formulario */}
                    <div className="w-full md:w-1/2 bg-white px-10 py-12 flex flex-col justify-center items-center">
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                            ¿Olvidaste tu contraseña?
                        </h1>

                        <p className="text-gray-600 text-sm text-center mb-6">
                            No te preocupes, ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.
                        </p>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 text-center">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="w-full max-w-sm space-y-6">
                            {/* Email */}
                            <div className="flex items-center border-b border-black py-2">
                                <FaEnvelope className="text-xl text-black mr-3" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                                    placeholder="Correo electrónico"
                                    // required
                                    autoFocus
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                            {/* Botón enviar */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#314F50] hover:bg-[#263d3e] text-white font-bold py-2 rounded-md transition"
                            >
                                Enviar enlace de recuperación
                            </button>

                            {/* Enlaces adicionales */}
                            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 pt-6 gap-2">
                                <Link href="/" className="hover:underline hover:text-[#314F50] transition">
                                    ⬅ Volver al inicio
                                </Link>

                                <Link href={route('login')} className="hover:underline hover:text-[#314F50] transition">
                                    Inicia sesión
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Derecha - Imagen */}
                    <div className="hidden md:flex w-1/2 bg-[#314F50] items-center justify-center">
                        <img
                            src="/img/auto.jpg" // Asegúrate de tener esta imagen en public/img/
                            alt="Imagen lateral"
                            className="object-cover max-h-[400px]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
