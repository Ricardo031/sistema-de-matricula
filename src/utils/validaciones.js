/**
 * Filtra los cursos disponibles según los criterios del estudiante
 */
export const filtrarCursosDisponibles = (cursos, estudiante) => {
    if (!estudiante) return [];

    return cursos.filter(curso => {
        const esSemestreActual = curso.semestre === estudiante.semestre;
        const estudianteMatriculado = estudiante.matriculado;

        return esSemestreActual && estudianteMatriculado;
    });
};

//*Calcula el total de créditos de una lista de cursos

export const calcularCreditosTotales = (cursos) => {
    return cursos.reduce((total, curso) => total + curso.creditos, 0);
};

//*Verifica si un curso puede ser seleccionado
export const puedeCursoSerSeleccionado = (curso, cursosSeleccionados, estudiante) => {
    // Verificar si ya está seleccionado
    const yaSeleccionado = cursosSeleccionados.find(c => c.id === curso.id);
    if (yaSeleccionado) return false;

    // Verificar límite de créditos
    const creditosActuales = calcularCreditosTotales(cursosSeleccionados);
    const nuevosCreditos = creditosActuales + curso.creditos;

    return nuevosCreditos <= estudiante.creditosPermitidos;
};

// Calcula los cupos disponibles de un curso
export const calcularCuposDisponibles = (curso) => {
    return curso.limiteCupos - curso.matriculados;
};

//* Guarda la matrícula en localStorage
export const guardarMatricula = (estudiante, cursos) => {
    const matricula = {
        id: Date.now(), // ID único para cada matrícula
        estudiante: {
            id: estudiante.id,
            nombre: estudiante.nombre,
            carrera: estudiante.carrera,
            semestre: estudiante.semestre
        },
        cursos: cursos.map(curso => ({
            id: curso.id,
            nombre: curso.nombre,
            codigo: curso.codigo,
            creditos: curso.creditos
        })),
        fecha: new Date().toISOString(),
        creditosTotales: calcularCreditosTotales(cursos),
        estado: 'confirmada'
    };

    try {
        // Obtener matrículas previas
        const matriculasGuardadas = obtenerTodasLasMatriculas();
        
        // Agregar la nueva matrícula
        matriculasGuardadas.push(matricula);
        
        // Guardar todas las matrículas
        localStorage.setItem('matriculas', JSON.stringify(matriculasGuardadas));
        
        // También guardar la última matrícula para acceso rápido
        localStorage.setItem('ultimaMatricula', JSON.stringify(matricula));
        
        console.log('Matrícula guardada exitosamente:', matricula);
        return matricula;
    } catch (error) {
        console.error('Error al guardar la matrícula:', error);
        return null;
    }
};

//* Obtiene todas las matrículas guardadas en localStorage
export const obtenerTodasLasMatriculas = () => {
    try {
        const matriculas = localStorage.getItem('matriculas');
        return matriculas ? JSON.parse(matriculas) : [];
    } catch (error) {
        console.error('Error al obtener matrículas:', error);
        return [];
    }
};

//*Obtiene la última matrícula guardada en localStorage

export const obtenerMatriculaGuardada = () => {
    try {
        const matricula = localStorage.getItem('ultimaMatricula');
        return matricula ? JSON.parse(matricula) : null;
    } catch (error) {
        console.error('Error al obtener matrícula:', error);
        return null;
    }
};

//* Obtiene las matrículas de un estudiante específico

export const obtenerMatriculasPorEstudiante = (estudianteId) => {
    try {
        const matriculas = obtenerTodasLasMatriculas();
        return matriculas.filter(m => m.estudiante.id === estudianteId);
    } catch (error) {
        console.error('Error al obtener matrículas del estudiante:', error);
        return [];
    }
};