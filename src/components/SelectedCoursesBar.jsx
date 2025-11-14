function SelectedCoursesBar({ cursos }) {
    if (cursos.length === 0) return null;

    return (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-2">
                Cursos Seleccionados ({cursos.length})
            </h3>
            <div className="flex flex-wrap gap-2">
                {cursos.map(curso => (
                    <span
                        key={curso.id}
                        className="bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                        {curso.codigo} - {curso.creditos} créditos
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SelectedCoursesBar;