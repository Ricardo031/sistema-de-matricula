# 📚 Explicación Completa del Flujo de Trabajo - Sistema de Matriculación

## 🎯 Objetivo General

El sistema permite que estudiantes registrados se autentiquen, visualicen cursos disponibles, agreguen cursos a su matrícula, revisen los cambios y confirmen la matrícula. Los datos se guardan en localStorage para persistencia.

---

## 🔄 FLUJO GENERAL DE LA APLICACIÓN

```
INICIO
  ↓
¿Usuario Autenticado?
  ├─ NO → LoginScreen (Pantalla de Login)
  │       ↓
  │   Usuario ingresa ID
  │       ↓
  │   handleLogin() verifica ID
  │       ↓
  │   ¿ID Válido?
  │   ├─ SÍ → Carga datos del estudiante + matrículas previas
  │   └─ NO → Permanece en login
  │
  ├─ SÍ → ¿Matrícula Confirmada?
          ├─ SÍ → ConfirmacionFinal (Pantalla de éxito)
          │       ↓ "Ver Matrícula" / "Cerrar Sesión"
          │
          ├─ NO → ¿Mostrar Resumen?
                  ├─ SÍ → ResumenMatricula (Revisión antes de confirmar)
                  │       ↓
                  │   "Confirmar Matrícula" → guardarMatricula() → localStorage
                  │
                  └─ NO → Pantalla Principal
                          ↓
                      ¿Tiene cursos guardados?
                      ├─ SÍ → Muestra cursos protegidos + botón "Editar Matrícula"
                      │       ↓
                      │   Si click "Editar" → modoEdicion = true
                      │       ↓
                      │   CourseList activo (puede agregar/quitar)
                      │
                      └─ NO → CourseList activo directamente
                              ↓
                          Usuario selecciona cursos
                              ↓
                          "Continuar a Resumen" → mostrarResumen = true
```

---

## 📁 ESTRUCTURA DE CARPETAS Y ARCHIVOS

```
src/
├── App.jsx                          ← Componente raíz, gestiona toda la lógica
├── main.jsx                         ← Punto de entrada
├── index.css                        ← Estilos (Tailwind + personalizados)
│
├── components/
│   ├── login/
│   │   └── LoginScreen.jsx         ← Pantalla de autenticación
│   ├── Principal/
│   │   ├── Header.jsx              ← Encabezado con info del estudiante
│   │   ├── StudentInfo.jsx         ← Información del estudiante
│   │   ├── CourseList.jsx          ← Lista de cursos disponibles
│   │   └── CourseCard.jsx          ← Componente individual de curso
│   ├── matricula/
│   │   ├── ResumenMatricula.jsx    ← Resumen antes de confirmar
│   │   └── ConfirmacionFinal.jsx   ← Pantalla de confirmación
│   └── SelectedCoursesBar.jsx      ← Barra de cursos seleccionados
│
├── data/
│   ├── cursos.json                 ← Base de datos de cursos
│   └── estudiantes.json            ← Base de datos de estudiantes
│
└── utils/
    └── validaciones.js             ← Funciones de lógica de negocio
```

---

## 🧠 ENTENDIENDO LOS ESTADOS (STATES) EN App.jsx

```javascript
const [estudiante, setEstudiante] = useState(null);
// ✓ Almacena datos del estudiante autenticado
// ✓ null = no autenticado, objeto = autenticado

const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
// ✓ Array con cursos que el estudiante eligió
// ✓ Se actualiza cuando agrega/quita cursos
// ✓ Se guarda en localStorage cuando confirma

const [mostrarResumen, setMostrarResumen] = useState(false);
// ✓ Controla si se muestra la pantalla de resumen
// ✓ true = muestra ResumenMatricula
// ✓ false = muestra pantalla principal

const [matriculaConfirmada, setMatriculaConfirmada] = useState(false);
// ✓ Indica si ya confirmó la matrícula
// ✓ true = muestra ConfirmacionFinal
// ✓ Se reinicia al volver a la pantalla principal

const [modoEdicion, setModoEdicion] = useState(false);
// ✓ true = puede editar cursos (si tiene guardados)
// ✓ false = cursos protegidos (muestra solo lectura)

const [tieneCursosGuardados, setTieneCursosGuardados] = useState(false);
// ✓ true = estudiante tiene una matrícula previa
// ✓ false = es su primera matrícula
// ✓ Controla qué interfaz mostrar
```

---

## 🔐 FUNCIONES PRINCIPALES EN App.jsx

### 1️⃣ **handleLogin(id)** - Autenticación del estudiante

```javascript
const handleLogin = (id) => {
  // PASO 1: Buscar estudiante en la base de datos
  const estudianteEncontrado = estudianteData.find(est => est.id.toString() === id);
  
  if (estudianteEncontrado) {
    // PASO 2: Guardar datos del estudiante
    setEstudiante(estudianteEncontrado);
    
    // PASO 3: Buscar matrículas previas del estudiante
    const matriculas = obtenerMatriculasPorEstudiante(parseInt(id));
    
    // PASO 4: Si tiene matrículas previas, cargar la última
    if (matriculas.length > 0) {
      const ultimaMatricula = matriculas[matriculas.length - 1];
      setCursosSeleccionados(ultimaMatricula.cursos);  // Cargar cursos
      setTieneCursosGuardados(true);                   // Activar protección
      setModoEdicion(false);                           // Bloquear edición
    }
  }
};
```

**¿Qué pasa?**
- Usuario ingresa ID 101
- Sistema busca si existe ese ID en `estudianteData`
- Si existe: carga el estudiante y sus matrículas previas
- Si tiene matrículas previas: carga los cursos en `cursosSeleccionados`

---

### 2️⃣ **handleLogout()** - Cerrar sesión

```javascript
const handleLogout = () => {
  setEstudiante(null);                    // Limpia datos del estudiante
  setCursosSeleccionados([]);              // Vacía cursos
  setMostrarResumen(false);                // Oculta resumen
  setMatriculaConfirmada(false);           // Limpia confirmación
  setModoEdicion(false);                   // Desactiva edición
  setTieneCursosGuardados(false);          // Limpia flag
};
```

**¿Qué pasa?**
- Limpia TODOS los estados
- Usuario vuelve a LoginScreen
- Los datos en localStorage permanecen (solo se limpian los estados en memoria)

---

### 3️⃣ **toggleCurso(curso)** - Agregar/Quitar curso

```javascript
const toggleCurso = (curso) => {
  // Verificar si el curso ya está seleccionado
  const yaSeleccionado = cursosSeleccionados.find(c => c.id === curso.id);

  if (yaSeleccionado) {
    // Si ya está: REMOVER
    setCursosSeleccionados(cursosSeleccionados.filter(c => c.id !== curso.id));
  } else {
    // Si no está: AGREGAR
    setCursosSeleccionados([...cursosSeleccionados, curso]);
  }
};
```

**¿Qué pasa?**
- Usuario hace clic en botón "Agregar" o "Quitar" de un curso
- Si ya está en la lista: se quita
- Si no está: se agrega
- La lista de `cursosSeleccionados` se actualiza
- Se recalculan automáticamente los créditos totales

---

### 4️⃣ **confirmarMatricula()** - Guardar matrícula

```javascript
const confirmarMatricula = () => {
  // PASO 1: Guardar en localStorage
  guardarMatricula(estudiante, cursosSeleccionados);
  
  // PASO 2: Mostrar pantalla de confirmación
  setMatriculaConfirmada(true);
  
  // PASO 3: Marcar como guardado
  setTieneCursosGuardados(true);
  
  // PASO 4: Desactivar modo edición
  setModoEdicion(false);
};
```

**¿Qué pasa?**
- Se llama cuando usuario hace clic en "Confirmar Matrícula" en el resumen
- Ejecuta `guardarMatricula()` que guarda en localStorage
- Cambia pantalla a "¡Matrícula Confirmada!"
- Los cursos quedan protegidos hasta siguiente edición

---

### 5️⃣ **nuevaMatricula()** - Volver a pantalla principal

```javascript
const nuevaMatricula = () => {
  // Solo limpia los estados de visualización
  // NO limpia los cursos seleccionados (permanecen guardados)
  setMostrarResumen(false);        // Oculta resumen
  setMatriculaConfirmada(false);   // Limpia confirmación
  setModoEdicion(false);            // Desactiva edición
};
```

**¿Qué pasa?**
- Cuando hace clic "Ver Matrícula" desde ConfirmacionFinal
- Vuelve a la pantalla principal
- Los cursos guardados se muestran protegidos

---

## 🛠️ FUNCIONES DE VALIDACIÓN Y LÓGICA

Todas están en `src/utils/validaciones.js`:

### **filtrarCursosDisponibles(cursos, estudiante)**
```javascript
export const filtrarCursosDisponibles = (cursos, estudiante) => {
  return cursos.filter(curso => {
    const esSemestreActual = curso.semestre === estudiante.semestre;
    const estudianteMatriculado = estudiante.matriculado;
    return esSemestreActual && estudianteMatriculado;
  });
};
```
✓ **¿Para qué?** Retorna solo los cursos que:
  - Pertenecen al semestre actual del estudiante
  - El estudiante está matriculado (estado activo)

✓ **Ejemplo:** Si estudiante es semestre 2, solo ve cursos de semestre 2

---

### **calcularCreditosTotales(cursos)**
```javascript
export const calcularCreditosTotales = (cursos) => {
  return cursos.reduce((total, curso) => total + curso.creditos, 0);
};
```
✓ **¿Para qué?** Suma TODOS los créditos de los cursos seleccionados

✓ **Ejemplo:**
- Curso A: 3 créditos
- Curso B: 4 créditos
- Total: 7 créditos

---

### **puedeCursoSerSeleccionado(curso, cursosSeleccionados, estudiante)**
```javascript
export const puedeCursoSerSeleccionado = (curso, cursosSeleccionados, estudiante) => {
  // No permitir si ya está seleccionado
  const yaSeleccionado = cursosSeleccionados.find(c => c.id === curso.id);
  if (yaSeleccionado) return false;

  // Verificar si agregar este curso excedería los créditos permitidos
  const creditosActuales = calcularCreditosTotales(cursosSeleccionados);
  const nuevosCreditos = creditosActuales + curso.creditos;

  return nuevosCreditos <= estudiante.creditosPermitidos;
};
```
✓ **¿Para qué?** Valida si se puede agregar un curso

✓ **Devuelve false si:**
  - Ya está seleccionado
  - Excedería el límite de créditos

✓ **Ejemplo:** Si estudiante puede 20 créditos y tiene 18, no puede agregar curso de 4

---

### **calcularCuposDisponibles(curso)**
```javascript
export const calcularCuposDisponibles = (curso) => {
  return curso.limiteCupos - curso.matriculados;
};
```
✓ **¿Para qué?** Calcula cuántos cupos quedan libres en un curso

✓ **Ejemplo:**
- Límite de cupos: 30
- Ya matriculados: 28
- Cupos disponibles: 2

---

### **guardarMatricula(estudiante, cursos)**
```javascript
export const guardarMatricula = (estudiante, cursos) => {
  const matricula = {
    id: Date.now(),                    // ID único basado en timestamp
    estudiante: {...},                 // Datos del estudiante
    cursos: cursos.map(...),           // Cursos seleccionados
    fecha: new Date().toISOString(),   // Fecha y hora actual
    creditosTotales: ...,              // Total de créditos
    estado: 'confirmada'               // Estado de la matrícula
  };

  // Obtener todas las matrículas previas
  const matriculasGuardadas = obtenerTodasLasMatriculas();
  
  // Agregar la nueva
  matriculasGuardadas.push(matricula);
  
  // Guardar en localStorage
  localStorage.setItem('matriculas', JSON.stringify(matriculasGuardadas));
  localStorage.setItem('ultimaMatricula', JSON.stringify(matricula));
  
  return matricula;
};
```
✓ **¿Para qué?** Guarda la matrícula en localStorage

✓ **Pasos:**
1. Crea objeto con datos de la matrícula
2. Obtiene todas las matrículas guardadas
3. Agrega la nueva a la lista
4. Guarda en localStorage (2 copias)

---

### **obtenerMatriculasPorEstudiante(estudianteId)**
```javascript
export const obtenerMatriculasPorEstudiante = (estudianteId) => {
  const matriculas = obtenerTodasLasMatriculas();
  return matriculas.filter(m => m.estudiante.id === estudianteId);
};
```
✓ **¿Para qué?** Obtiene TODAS las matrículas de un estudiante

✓ **Uso:** Se llama en `handleLogin()` para cargar matrículas previas

---

## 🎨 COMPONENTES PRINCIPALES

### **LoginScreen.jsx**
```
┌─────────────────────────────────────┐
│     LADO IZQUIERDO     │   LADO DERECHO   │
│  Formulario de login   │  Ilustración     │
│  - Icono               │  (imagen)        │
│  - Título "Bienvenido" │                  │
│  - Input ID            │                  │
│  - Botón Ingresar      │                  │
└─────────────────────────────────────┘
```
- **Props recibidas:** `onLogin` (función)
- **Lo que hace:** Captura ID y llama `onLogin(id)`

---

### **Header.jsx**
```
┌────────────────────────────────────┐
│ Logo + Info Estudiante │ Cerrar Sesión │
│ Nombre + Carrera       │              │
└────────────────────────────────────┘
```
- **Props:** `estudiante`, `onLogout`
- **Lo que hace:** Muestra datos y botón de logout

---

### **StudentInfo.jsx**
```
┌──────────────────────────────────────┐
│  ID │ Semestre │ Créditos │ Estado   │
│ 101 │    2     │  7/20    │Matriculado│
└──────────────────────────────────────┘
```
- **Props:** `estudiante`, `creditosTotales`
- **Lo que hace:** Muestra resumen de estudiante

---

### **CourseCard.jsx**
```
┌─────────────────────────────────────┐
│ Nombre curso           │ Agregar/Quitar │
│ Código: MAT101         │                │
│ 3 créditos | 5 cupos   │                │
└─────────────────────────────────────┘
```
- **Props:** `curso`, `yaSeleccionado`, `puedeSeleccionar`, `onToggle`
- **Lo que hace:** 
  - Muestra información del curso
  - Botón bloqueado si sin cupos o si excede créditos
  - Al hacer clic: `onToggle(curso)`

---

### **CourseList.jsx**
```
┌──────────────────────────────────────┐
│ CURSOS DISPONIBLES - SEMESTRE 2      │
├──────────────────────────────────────┤
│ CourseCard 1                         │
│ CourseCard 2                         │
│ CourseCard 3                         │
├──────────────────────────────────────┤
│   Continuar a Resumen de Matrícula   │
└──────────────────────────────────────┘
```
- **Props:** `cursos`, `cursosSeleccionados`, `onToggleCurso`, `onContinuar`
- **Lo que hace:**
  - Mapea array de cursos a CourseCard
  - Si algún curso está seleccionado, muestra botón Continuar

---

### **ResumenMatricula.jsx**
```
┌─────────────────────────────────────┐
│  RESUMEN DE MATRÍCULA                │
├─────────────────────────────────────┤
│ Info Estudiante                      │
├─────────────────────────────────────┤
│ Cursos Seleccionados:                │
│ - Matemáticas (3 cr)                 │
│ - Programación (4 cr)                │
├─────────────────────────────────────┤
│ Total: 7 Créditos / 20 Permitidos    │
├─────────────────────────────────────┤
│  Volver  │  Confirmar Matrícula      │
└─────────────────────────────────────┘
```
- **Props:** `estudiante`, `cursos`, `creditosTotales`, `onConfirmar`, `onVolver`
- **Lo que hace:**
  - Resumen final para revisar
  - Botón Confirmar → `guardarMatricula()` → localStorage

---

### **ConfirmacionFinal.jsx**
```
┌─────────────────────────────────────┐
│      ✓ ¡MATRÍCULA CONFIRMADA!        │
│  Tu matrícula ha sido guardada        │
├─────────────────────────────────────┤
│    Ver Matrícula    │  Cerrar Sesión │
└─────────────────────────────────────┘
```
- **Props:** `onNuevaMatricula`, `onLogout`
- **Lo que hace:**
  - Muestra confirmación de éxito
  - Botones para volver o logout

---

## 💾 FLUJO DE DATOS CON localStorage

### **¿Cómo se guardan los datos?**

```
Paso 1: Usuario hace clic "Confirmar Matrícula"
  ↓
Paso 2: Se ejecuta guardarMatricula()
  ↓
Paso 3: Crea objeto: {id, estudiante, cursos, fecha, creditosTotales, estado}
  ↓
Paso 4: localStorage.setItem('matriculas', JSON.stringify(arrayMatriculas))
  ↓
Paso 5: Datos guardados en navegador (persisten entre sesiones)
```

### **¿Cómo se recuperan los datos?**

```
Paso 1: Usuario inicia sesión
  ↓
Paso 2: handleLogin(id)
  ↓
Paso 3: obtenerMatriculasPorEstudiante(id)
  ↓
Paso 4: Obtiene JSON de localStorage
  ↓
Paso 5: Filtra matrículas del estudiante
  ↓
Paso 6: Carga la última matrícula en cursosSeleccionados
```

---

## 🔍 EJEMPLO COMPLETO: Usuario Nuevo

```
1. Usuario abre app → LoginScreen
2. Ingresa ID: 101
3. handleLogin(101):
   - Busca estudiante con ID 101 ✓ Encontrado
   - setEstudiante(estudianteData[101])
   - Busca matrículas previas: obtenerMatriculasPorEstudiante(101)
   - No hay matrículas previas → tieneCursosGuardados = false
4. App.jsx muestra pantalla principal:
   - StudentInfo (muestra nombre, carrera, 0 créditos)
   - SelectedCoursesBar (vacío)
   - CourseList (activo, puede seleccionar)
5. Usuario agrega cursos:
   - Clic en "Agregar" de Matemáticas → toggleCurso()
   - cursosSeleccionados = [{Matemáticas}]
   - Clic en "Agregar" de Programación → toggleCurso()
   - cursosSeleccionados = [{Matemáticas}, {Programación}]
6. Clic en "Continuar a Resumen":
   - setMostrarResumen(true)
   - App muestra ResumenMatricula
7. Clic en "Confirmar Matrícula":
   - confirmarMatricula()
   - guardarMatricula() → localStorage
   - setMatriculaConfirmada(true)
   - App muestra ConfirmacionFinal
8. Clic "Ver Matrícula":
   - nuevaMatricula()
   - Vuelve a pantalla principal
   - tieneCursosGuardados = true
   - Muestra cursos protegidos
9. Si clic "Editar Matrícula":
   - setModoEdicion(true)
   - CourseList se activa de nuevo
   - Puede quitar cursos o agregar más
```

---

## 🔍 EJEMPLO COMPLETO: Usuario con Matrículas Previas

```
1. Usuario abre app → LoginScreen
2. Ingresa ID: 101
3. handleLogin(101):
   - Busca estudiante ✓ Encontrado
   - setEstudiante(estudianteData[101])
   - obtenerMatriculasPorEstudiante(101)
   - ¡Encuentra 2 matrículas previas!
   - Toma la última (más reciente)
   - setCursosSeleccionados(ultimaMatricula.cursos)
   - setTieneCursosGuardados(true)
4. App muestra pantalla principal:
   - StudentInfo (muestra créditos: 7/20)
   - SelectedCoursesBar (vacío, usa espacio del componente protegido)
   - Sección "Cursos Matriculados":
     * Muestra 2 cursos (Matemáticas + Programación)
     * Botón "Editar Matrícula"
   - Mensaje: "Tu matrícula está protegida..."
5. Si clic "Editar Matrícula":
   - setModoEdicion(true)
   - CourseList se activa
   - Puede quitar Matemáticas
6. Clic "Continuar a Resumen":
   - setModoEdicion(false)
   - ResumenMatricula solo muestra Programación
7. Clic "Confirmar Matrícula":
   - guardarMatricula() crea NUEVA matrícula solo con Programación
   - Guardada en localStorage como nueva entrada
   - ConfirmacionFinal
```

---

## 🎓 CONCEPTOS CLAVE PARA APRENDER

### 1. **Estados (useState)**
- Cada `setState` re-renderiza el componente
- Los estados son "memoria" del componente

### 2. **Renderizado Condicional**
```javascript
if (!estudiante) return <LoginScreen />;
if (matriculaConfirmada) return <ConfirmacionFinal />;
if (mostrarResumen) return <ResumenMatricula />;
return <PantallaPrincipal />;
```
- Según los estados, muestra diferente pantalla

### 3. **Props (Propiedades)**
- Datos que fluyen de padre a hijo
- Funciones que comunican hijo hacia padre

### 4. **localStorage**
- API del navegador para guardar datos
- JSON.stringify() convierte objeto a texto
- JSON.parse() convierte texto a objeto

### 5. **Array Methods**
- `.find()` - Busca primer elemento que cumpla condición
- `.filter()` - Retorna array con elementos que cumplen
- `.map()` - Transforma cada elemento
- `.reduce()` - Acumula valores

---

## 📊 DIAGRAMA DE ESTADOS

```
                    ┌─────────────┐
                    │   LOGOUT    │
                    └────────┬────┘
                             │
                             ↓
                    ┌─────────────────┐
              ┌────→│  LoginScreen    │
              │     │  estudiante=null│     
              │     └──────┬──────────┘     
              │            │                
              │    handleLogin(id)          
              │            │                
              │            ↓                
              │     ¿ID válido?             
              │      YES │ NO               
              │          │ └─→ Permanece   
              │          ↓                  
              │   ┌─────────────────┐      
              │   │ Carga estudiante│      
              │   │ Carga matrículas│      
              │   └────────┬────────┘      
              │            ↓                
              │   ┌─────────────────────┐  
              └───│ Pantalla Principal  │  
                  │ tieneCursosGuardados│<-|
                  └────────┬────────────┘  │
                           │               │
                    ¿Modo Edición?         │
                    YES │ NO               │
                        │ ├─ Muestra cursos protegidos
                        │ └─ Mensaje de protección
                        │                  │
                        ↓                  │
                  ┌──────────────┐         │
                  │  CourseList  │         │
                  │ (activo)     │         │
                  └──────┬───────┘         │
                         │                 │
              "Continuar a Resumen"        │
                         │                 │
                         ↓                 │
                  ┌──────────────────┐     │
                  │ ResumenMatricula │     │
                  │ mostrarResumen=T │     │
                  └──────┬───────────┘     │
                         │                 │
              "Confirmar" │ "Volver"       │
                         │ └──────→────────┘
                         ↓
                  ┌──────────────────┐
                  │ guardarMatricula │
                  │ localStorage ✓   │
                  └──────┬───────────┘
                         │
                         ↓
                  ┌──────────────────┐
                  │ConfirmacionFinal │
                  │matriculaConfirmada│
                  └──────┬───────────┘
                         │
              "Ver Matrícula" │ "Cerrar Sesión"
                         │                  │
                    nuevaMatricula()       │
                         │                  │
                         └──────→ Vuelve a Pantalla Principal
                                 │
                                 └──────→ LOGOUT ──→ LoginScreen
```

---

## 🚀 FLUJO RESUMIDO EN 3 PASOS

### **Para Usuario Nuevo:**
```
LOGIN → VER CURSOS → SELECCIONAR → RESUMEN → CONFIRMAR → localStorage
```

### **Para Usuario Existente:**
```
LOGIN (carga previos) → VER PROTEGIDOS → EDITAR → RESUMEN → CONFIRMAR → localStorage
```

### **Guardar en localStorage:**
```
confirmarMatricula() → guardarMatricula() → JSON.stringify() → localStorage.setItem()
```

---

## 💡 TIPS PARA EXPLICAR

1. **"Los estados son la memoria del componente"** - Cada vez que cambian, React re-renderiza
2. **"Props son tuberías de comunicación"** - Datos bajan, funciones suben
3. **"localStorage es como una cacha persistente"** - Los datos vuelven después de cerrar navegador
4. **"Validaciones evitan errores del usuario"** - Impiden agregar más créditos o duplicados
5. **"El flujo es como un videojuego"** - Pantallas diferentes según acciones (if/else condicional)

---

¡Ahora estás listo para explicar cada parte del sistema! 🎓
