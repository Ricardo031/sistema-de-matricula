import { useEffect, useState } from 'react';
import LoginScreen from './components/login/LoginScreen';
import Header from './components/Principal/Header';
import StudentInfo from './components/Principal/StudentInfo';
import SelectedCoursesBar from './components/SelectedCoursesBar';
import CourseList from './components/Principal/CourseList';
import ResumenMatricula from './components/matricula/ResumenMatricula';
import ConfirmacionFinal from './components/matricula/ConfirmacionFinal';

import cursosData from './data/cursos.json';
import estudianteData from './data/estudiantes.json';

import {
  filtrarCursosDisponibles,
  calcularCreditosTotales,
  guardarMatricula,
  obtenerMatriculasPorEstudiante
} from './utils/validaciones';

function App() {
  const [estudiante, setEstudiante] = useState(null);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [matriculaConfirmada, setMatriculaConfirmada] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [tieneCursosGuardados, setTieneCursosGuardados] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem('estudianteId');
    if (savedId) {
      const estudianteEncontrado = estudianteData.find(est => est.id.toString() === savedId);
      if (estudianteEncontrado) {
        setEstudiante(estudianteEncontrado);

        // Cargar la última matrícula guardada del estudiante
        const matriculas = obtenerMatriculasPorEstudiante(parseInt(savedId));
        if (matriculas.length > 0) {
          const ultimaMatricula = matriculas[matriculas.length - 1];
          setCursosSeleccionados(ultimaMatricula.cursos);
          setTieneCursosGuardados(true);
        }
      }
    }
  }, []);
  //* Login
  const handleLogin = (id) => {
    const estudianteEncontrado = estudianteData.find(est => est.id.toString() === id);
    if (estudianteEncontrado) {
      setEstudiante(estudianteEncontrado);

      localStorage.setItem('estudianteId', id)

      // Cargar la última matrícula guardada del estudiante
      const matriculas = obtenerMatriculasPorEstudiante(parseInt(id));
      if (matriculas.length > 0) {
        const ultimaMatricula = matriculas[matriculas.length - 1];
        setCursosSeleccionados(ultimaMatricula.cursos);
        setTieneCursosGuardados(true);
        setModoEdicion(false);
      }
    }
  };

  //* Logout
  const handleLogout = () => {
    setEstudiante(null);
    setCursosSeleccionados([]);
    setMostrarResumen(false);
    setMatriculaConfirmada(false);
    setModoEdicion(false);
    setTieneCursosGuardados(false);
  };

  // Toggle curso (agregar/quitar)
  const toggleCurso = (curso) => {
    const yaSeleccionado = cursosSeleccionados.find(c => c.id === curso.id);

    if (yaSeleccionado) {
      setCursosSeleccionados(cursosSeleccionados.filter(c => c.id !== curso.id));
    } else {
      setCursosSeleccionados([...cursosSeleccionados, curso]);
    }
  };

  //* Confirmar matrícula
  const confirmarMatricula = () => {
    guardarMatricula(estudiante, cursosSeleccionados);
    setMatriculaConfirmada(true);
    setTieneCursosGuardados(true);
    setModoEdicion(false);
  };

  //* Resetear para nueva matrícula
  const nuevaMatricula = () => {
    setMostrarResumen(false);
    setMatriculaConfirmada(false);
    setModoEdicion(false);
  };

  // Calcular datos
  const creditosTotales = calcularCreditosTotales(cursosSeleccionados);
  const cursosFiltrados = estudiante
    ? filtrarCursosDisponibles(cursosData, estudiante)
    : [];

  // Pantalla de Login
  if (!estudiante) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Pantalla de confirmación final
  if (matriculaConfirmada) {
    return (
      <ConfirmacionFinal
        onNuevaMatricula={nuevaMatricula}
        onLogout={handleLogout}
      />
    );
  }

  // Pantalla de resumen
  if (mostrarResumen) {
    return (
      <ResumenMatricula
        estudiante={estudiante}
        cursos={cursosSeleccionados}
        creditosTotales={creditosTotales}
        onConfirmar={confirmarMatricula}
        onVolver={() => {
          setMostrarResumen(false);
          setModoEdicion(false);
        }}
      />
    );
  }

  // Pantalla principal
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Header estudiante={estudiante} onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <StudentInfo
          estudiante={estudiante}
          creditosTotales={creditosTotales}
        />

        {tieneCursosGuardados && !modoEdicion && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Cursos Matriculados
              </h2>
              <button
                onClick={() => setModoEdicion(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-6 rounded-lg transition cursor-pointer"
              >
                Editar Matrícula
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {cursosSeleccionados.map(curso => (
                <div key={curso.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <div>
                    <p className="font-semibold text-gray-800">{curso.nombre}</p>
                    <p className="text-sm text-gray-600">{curso.codigo}</p>
                  </div>
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
                    {curso.creditos} créditos
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <SelectedCoursesBar cursos={cursosSeleccionados} />

        {modoEdicion || !tieneCursosGuardados ? (
          <CourseList
            cursos={cursosFiltrados}
            cursosSeleccionados={cursosSeleccionados}
            estudiante={estudiante}
            onToggleCurso={toggleCurso}
            onContinuar={() => {
              setModoEdicion(false);
              setMostrarResumen(true);
            }}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-center">
              Tu matrícula está protegida. Haz clic en "Editar Matrícula" para realizar cambios.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;