import { CheckCircle } from 'lucide-react';

function ConfirmacionFinal({ onNuevaMatricula, onLogout }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                <CheckCircle className="mx-auto text-green-600 mb-4" size={80} />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    ¡Matrícula Confirmada!
                </h1>
                <p className="text-gray-600 mb-8">
                    Tu matrícula ha sido registrada exitosamente. La información ha sido guardada.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={onNuevaMatricula}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition cursor-pointer"
                    >
                        Ver Matrícula
                    </button>
                    <button
                        onClick={onLogout}
                        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition cursor-pointer"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmacionFinal;