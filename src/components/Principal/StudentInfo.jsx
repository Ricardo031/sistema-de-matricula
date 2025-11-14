import { User } from 'lucide-react';

function StudentInfo({ estudiante, creditosTotales }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
                <User className="text-[#2563EB]" size={24} />
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                    Bienvenido, {estudiante.nombre}
                </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className='flex items-center gap-2'>
                    <p className="text-sm text-gray-600">ID:</p>
                    <p className="font-semibold text-gray-800">{estudiante.id}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className="text-sm text-gray-600">Semestre Actual:</p>
                    <p className="font-semibold text-gray-800">{estudiante.semestre}°</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className="text-sm text-gray-600">Créditos:</p>
                    <p className="font-semibold text-gray-800">
                        <span className={
                            creditosTotales > estudiante.creditosPermitidos
                                ? 'text-red-600'
                                : 'text-green-600'
                        }>
                            {creditosTotales}
                        </span> / {estudiante.creditosPermitidos}
                    </p>
                </div>
                <div className='flex items-center '>
                    <p className="text-sm text-gray-600">Estado:</p>
                    <p className={`font-semibold px-3 py-1 rounded-full  ${
                        estudiante.matriculado
                            ? 'text-green-600'
                            : 'text-red-600'
                    }`}>
                        {estudiante.matriculado ? 'Matriculado' : 'Fuera'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StudentInfo;