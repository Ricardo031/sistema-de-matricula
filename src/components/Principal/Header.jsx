import { LogOut } from 'lucide-react';

function Header({ estudiante, onLogout }) {
    return (
        <header className="bg-white shadow-md">
            <div className="w-full px-4 md:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                            Sistema de Matriculación
                        </h1>
                        <p className="text-xs md:text-sm text-gray-600">{estudiante.carrera}</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="relative flex items-center gap-2 text-gray-800 transition cursor-pointer px-3 py-2 text-sm md:text-base"
                >
                    <LogOut size={20} />
                    <span className="hidden sm:inline">Cerrar Sesión</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full hidden sm:block"></span>
                    <style>{`
                        button:hover span:last-child {
                            width: 100%;
                        }
                    `}</style>
                </button>
            </div>
        </header>
    );
}

export default Header;