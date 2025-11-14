import { CheckCircle } from 'lucide-react';

function ResumenMatricula({
    estudiante,
    cursos,
    creditosTotales,
    onConfirmar,
    onVolver
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Resumen de Matrícula
                    </h1>

                    <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 mb-6">
                        <h2 className="font-bold text-indigo-900 mb-3">
                            Información del Estudiante
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className='flex gap-2 items-center'>
                                <p className="text-sm text-indigo-700">Nombre:</p>
                                <p className="font-semibold">{estudiante.nombre}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <p className="text-sm text-indigo-700">ID:</p>
                                <p className="font-semibold">{estudiante.id}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <p className="text-sm text-indigo-700">Carrera:</p>
                                <p className="font-semibold">{estudiante.carrera}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <p className="text-sm text-indigo-700">Semestre:</p>
                                <p className="font-semibold">{estudiante.semestre}°</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="font-bold text-gray-800 text-xl mb-4">
                            Cursos Seleccionados
                        </h2>
                        <div className="space-y-3">
                            {cursos.map(curso => (
                                <div
                                    key={curso.id}
                                    className="border-2 border-gray-200 rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-gray-800">{curso.nombre}</h3>
                                            <p className="text-gray-600">{curso.codigo}</p>
                                        </div>
                                        <span className="bg-[#2563EB] text-white px-4 py-2 rounded-full font-semibold">
                                            {curso.creditos} créditos
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-sm text-green-700">Cantidad de Cursos</p>
                                <p className="font-bold text-2xl text-green-900">{cursos.length}</p>
                            </div>
                            <div>
                                <p className="text-sm text-green-700">Total de Créditos</p>
                                <p className="font-bold text-2xl text-green-900">{creditosTotales}</p>
                            </div>
                            <div>
                                <p className="text-sm text-green-700">Créditos Permitidos</p>
                                <p className="font-bold text-2xl text-green-900">{estudiante.creditosPermitidos}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onVolver}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition cursor-pointer"
                        >
                            Volver
                        </button>
                        <button
                            onClick={onConfirmar}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <CheckCircle size={24} />
                            Confirmar Matrícula
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumenMatricula;