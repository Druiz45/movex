import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    collapsed = false,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900') +
                ' ' + className
            }
        >
            {/* Ícono */}
            {children[0]}

            {/* Texto (solo si no está colapsado) */}
            {!collapsed && children[1]}
        </Link>
    );
}
