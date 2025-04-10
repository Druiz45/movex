import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
    HomeIcon,
    ArrowPathIcon,
    Squares2X2Icon,
    UserIcon
} from '@heroicons/react/24/outline'

export default function AuthenticatedLayout({ header, children }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
    const name = usePage().props.name;
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar (desktop) */}
            <aside
                className={`
                    ${sidebarCollapsed ? 'w-20' : 'w-64'} 
                    hidden sm:flex flex-col bg-white border-r border-gray-200 transition-all duration-300
                `}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>
                    <button onClick={toggleSidebar} className="text-gray-600">
                        {sidebarCollapsed ? (
                            <ArrowRightIcon className="h-5 w-5" />
                        ) : (
                            <ArrowLeftIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>

                <nav className="flex-1 px-2 py-6 space-y-4">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')} collapsed={sidebarCollapsed}>
                        <HomeIcon className="h-5 w-5" />
                        <span className="ml-2">Inicio</span>
                    </NavLink>

                    <NavLink href={route('entrances-exits.index')} active={route().current('entrances-exits.index')} collapsed={sidebarCollapsed}>
                        <ArrowPathIcon className="h-5 w-5" />
                        <span className="ml-2">Entredas y salidas</span>
                    </NavLink>

                    <NavLink href={route('parking_spaces.index')} active={route().current('parking_spaces.index')} collapsed={sidebarCollapsed}>
                        <Squares2X2Icon className="h-5 w-5" />
                        <span className="ml-2">Espacios de parqueadero</span>
                    </NavLink>

                    <NavLink href={route('users.index')} active={route().current('users.index')} collapsed={sidebarCollapsed}>
                        <UserIcon className="h-5 w-5" />
                        <span className="ml-2">Usuarios</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Mobile overlay */}
            <div
                className={`
                    fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity sm:hidden 
                    ${sidebarMobileOpen ? 'block' : 'hidden'}
                `}
                onClick={() => setSidebarMobileOpen(false)}
            ></div>

            {/* Mobile sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 
                    sm:hidden ${sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>
                    <button onClick={() => setSidebarMobileOpen(false)} className="text-gray-600">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-4">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')} collapsed={sidebarCollapsed}>
                        <HomeIcon className="h-5 w-5" />
                        <span className="ml-2">Inicio</span>
                    </NavLink>

                    <NavLink href={route('entrances-exits.index')} active={route().current('entrances-exits.index')} collapsed={sidebarCollapsed}>
                        <ArrowPathIcon className="h-5 w-5" />
                        <span className="ml-2">Entredas y salidas</span>
                    </NavLink>

                    <NavLink href={route('parking_spaces.index')} active={route().current('parking_spaces.index')} collapsed={sidebarCollapsed}>
                        <Squares2X2Icon className="h-5 w-5" />
                        <span className="ml-2">Espacios de parqueadero</span>
                    </NavLink>

                    <NavLink href={route('users.index')} active={route().current('users.index')} collapsed={sidebarCollapsed}>
                        <UserIcon className="h-5 w-5" />
                        <span className="ml-2">Usuarios</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-white shadow h-16 flex items-center px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between w-full">
                        {/* Mobile hamburger */}
                        <button
                            className="text-gray-600 sm:hidden"
                            onClick={() => setSidebarMobileOpen(true)}
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>

                        {/* Header title */}
                        {header && <div className="text-lg font-semibold">{header}</div>}

                        {/* Dropdown */}
                        <div className="relative ml-auto">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center text-sm focus:outline-none text-gray-700 hover:text-gray-900">
                                        <span className="mr-2">{name}</span>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right" width="48">
                                    <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Cerrar Sesion
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}