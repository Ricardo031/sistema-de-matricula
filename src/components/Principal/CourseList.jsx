import { AlertCircle, CheckCircle } from 'lucide-react';
import CourseCard from './CourseCard';
import { puedeCursoSerSeleccionado } from '../../utils/validaciones';

function CourseList({
    cursos,
    cursosSeleccionados,
    estudiante,
    onToggleCurso,
    onContinuar
}) {
    //!en el caso en que no halla cursos pues que aparezca esto.
    if (cursos.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Cursos Disponibles - Semestre {estudiante.semestre}
                </h2>
                <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="mx-auto mb-2" size={48} />
                    <p>No hay cursos disponibles para tu estado Actual</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                    Cursos Disponibles - Semestre {estudiante.semestre}
                </h2>

                <div className="space-y-3">
                    {cursos.map(curso => {
                        const yaSeleccionado = cursosSeleccionados.find(c => c.id === curso.id);
                        const puedeSeleccionar = puedeCursoSerSeleccionado(
                            curso,
                            cursosSeleccionados,
                            estudiante
                        );

                        return (
                            <CourseCard
                                key={curso.id}
                                curso={curso}
                                yaSeleccionado={!!yaSeleccionado}
                                puedeSeleccionar={puedeSeleccionar}
                                onToggle={onToggleCurso}
                            />
                        );
                    })}
                </div>
            </div>

            {cursosSeleccionados.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <button
                        onClick={onContinuar}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <CheckCircle size={24} />
                        Continuar a Resumen de Matrícula
                    </button>
                </div>
            )}
        </>
    );
}

export default CourseList;