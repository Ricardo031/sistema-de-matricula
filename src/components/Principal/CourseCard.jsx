import { calcularCuposDisponibles } from '../../utils/validaciones';

function CourseCard({ curso, yaSeleccionado, puedeSeleccionar, onToggle }) {
    const cuposDisponibles = calcularCuposDisponibles(curso);
    const sinCupos = cuposDisponibles === 0;

    return (
        <div
            className={`border-2 rounded-lg p-4 transition ${yaSeleccionado
                ? 'border-green-500 bg-green-50'
                : sinCupos
                    ? 'border-red-300 bg-red-50 opacity-70'
                    : puedeSeleccionar
                        ? 'border-gray-200 hover:border-indigo-300'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
        >
            <div className="flex justify-between items-start  md:items-center">
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{curso.nombre}</h3>
                    <div className='flex gap-3'>
                        <p className="text-gray-600">{curso.codigo}</p>
                        <span className="text-[#2563EB] font-semibold">
                            {curso.creditos} créditos
                        </span>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm">

                        <span className={
                            sinCupos ? 'text-red-600 font-semibold' :
                                cuposDisponibles < 5 ? 'text-orange-600' : 'text-green-600'
                        }>
                            {cuposDisponibles} cupos disponibles
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => onToggle(curso)}
                    disabled={!yaSeleccionado && (!puedeSeleccionar || sinCupos)}
                    className={`px-6 py-2 lg:px-4 rounded-lg text-xs md:text-sm font-medium transition ${yaSeleccionado
                        ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                        : puedeSeleccionar && !sinCupos
                            ? 'bg-[#2563EB] hover:bg-[#1c4aaf] text-white cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {yaSeleccionado ? 'Quitar' : 'Agregar'}
                </button>
            </div>
            {sinCupos && !yaSeleccionado && (
                <p className="text-sm text-red-600 mt-2 font-semibold">
                    Sin cupos disponibles
                </p>
            )}
            {!sinCupos && !puedeSeleccionar && !yaSeleccionado && (
                <p className="text-sm text-red-600 mt-2">
                    No puedes agregar este curso (excederías el límite de créditos)
                </p>
            )}
        </div>
    );
}

export default CourseCard;