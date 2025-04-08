import { Head, Link, useForm } from '@inertiajs/react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './Register.css';
// import route from 'ziggy-js';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="auth-wrapper">
            <Head title="Register" />

            <div className="auth-container">
                <div className="auth-form-container">
                    <h1 className="auth-title">REGISTRO</h1>

                    <form onSubmit={submit} className="auth-form">
                        <div className="flex items-center border-b border-black py-2">
                            <FaUser className="text-xl text-black mr-3" />
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                                placeholder="Nombre"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </div>
                        {errors.name && <div className="input-error">{errors.name}</div>}

                        <div className="flex items-center border-b border-black py-2">
                            <FaEnvelope className="text-xl text-black mr-3" />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                                placeholder="Email"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>
                        {errors.email && <div className="input-error">{errors.email}</div>}

                        <div className="flex items-center border-b border-black py-2">
                            <FaLock className="text-xl text-black mr-3" />
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                                placeholder="Contraseña"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        {errors.password && <div className="input-error">{errors.password}</div>}

                        <div className="flex items-center border-b border-black py-2">
                            <FaLock className="text-xl text-black mr-3" />
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                                placeholder="Confirmar Contraseña"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                        {errors.password_confirmation && <div className="input-error">{errors.password_confirmation}</div>}

                        <button type="submit" className="auth-button" disabled={processing}>
                            REGISTRAR
                        </button>
                    </form>

                    <div className="auth-links">
                        <Link href={route('login')} className="login-link">
                            ¿Ya tienes cuenta? Iniciar sesión
                        </Link>
                    </div>
                </div>

                <div className="auth-image-container">
                    {/* <div className="image-frame"> */}
                        {/* <div className="inner-frame"> */}
                            <img
                                src="/img/auto.jpg"
                                alt="Classic Car"
                                className="auth-image"
                            />
                        {/* </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}