# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Sistema de Matriculación Estudiantil

Una aplicación web moderna para la gestión y manipulación de matrículas estudiantiles, desarrollada con React y Tailwind CSS.

## 🚀 Características Principales

- **Autenticación de Estudiantes**: Login seguro con ID de estudiante
- **Gestión de Matrículas**: Agregar, editar y confirmar cursos
- **Persistencia de Datos**: Guardado automático con localStorage
- **Modo Edición Protegido**: Los cursos matriculados están protegidos hasta activar modo edición
- **Diseño Responsivo**: Interfaz adaptable a dispositivos móviles y desktop
- **Validaciones Inteligentes**: Control de cupos y límites de créditos
- **Historial de Matrículas**: Registro completo de todas las matrículas realizadas

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## 🔧 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/sistema-matricula.git
cd sistema-matricula
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Compilar para producción
```bash
npm run build
```

### 5. Vista previa de producción
```bash
npm run preview
```

## 👥 Datos de Prueba

Para acceder a la aplicación, usa los siguientes ID de estudiantes:

- **ID 101**: Juan Pérez - Ingeniería de Sistemas, Semestre 2
- **ID 102**: Carolina Martinez - Ingeniería de Sistemas, Semestre 1
- **ID 103**: Oscar Juanes - Ingeniería de Sistemas, Semestre 2 (No matriculado)

## 🎯 Decisiones de Desarrollo Principales

### 1. **Configuración de Tailwind CSS v4**
- **Decisión**: Usar la importación moderna `@import 'tailwindcss'` en lugar de directives tradicionales
- **Razón**: Simplifica la configuración eliminando la necesidad de archivos `postcss.config.js` y `tailwind.config.js` innecesarios
- **Resultado**: Setup más limpio y eficiente con Vite

### 2. **Almacenamiento con localStorage**
- **Decisión**: Implementar persistencia de datos con localStorage en lugar de un backend
- **Razón**: Simular un sistema real sin dependencia de servidor, permitiendo que los datos persistan entre sesiones
- **Estructura**: Historial completo de matrículas con timestamps y estados

### 3. **Lógica de Edición Protegida**
- **Decisión**: Bloquear cursos guardados hasta que el usuario active "Editar Matrícula"
- **Razón**: Evitar cambios accidentales y proporcionar control intuitivo
- **Flujo**: Ver → Editar (opcional) → Resumen → Confirmar

### 4. **Visualización de Cursos Sin Cupos**
- **Decisión**: Mostrar todos los cursos del semestre, incluso sin cupos disponibles
- **Razón**: Transparencia total sobre la oferta académica con estado visual claro
- **Indicadores**: Cursos sin cupos bloqueados con mensaje diferenciado

### 5. **Diseño de Interfaz**
- **Inspiración**: Pinterest, Saave y Dribbble para componentes modernos
- **Prototipado**: Figma para guiar la implementación
- **Características**: 
  - Login de dos columnas (formulario + ilustración)
  - Iconos SVG personalizados para mayor claridad
  - Transiciones suaves y estados visuales claros
  - Responsive design desde mobile hasta desktop

### 6. **Gestión de Estados en React**
- **Decisión**: Usar useState para estados locales sin Redux/Context
- **Razón**: Complejidad moderada que no requiere state management global
- **Estados clave**: 
  - `modoEdicion`: Control de edición de matrículas
  - `tieneCursosGuardados`: Bloqueo de interfaz
  - `matriculaConfirmada`: Flujo de confirmación

### 7. **Validaciones Inteligentes**
- **Límite de Créditos**: Previene exceder el máximo permitido por estudiante
- **Cupos Disponibles**: Valida disponibilidad en tiempo real
- **Estado Matriculado**: Solo estudiantes activos pueden matricularse

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── login/
│   │   └── LoginScreen.jsx
│   ├── Principal/
│   │   ├── Header.jsx
│   │   ├── StudentInfo.jsx
│   │   ├── CourseList.jsx
│   │   └── CourseCard.jsx
│   ├── SelectedCoursesBar.jsx
│   ├── ResumenMatricula.jsx
│   ├── ConfirmacionFinal.jsx
│   └── HistorialMatriculas.jsx
├── data/
│   ├── cursos.json
│   └── estudiantes.json
├── utils/
│   └── validaciones.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🛠️ Tecnologías Utilizadas

- **React 19**: Framework principal
- **Vite 7**: Build tool rápido y moderno
- **Tailwind CSS v4**: Utilidades CSS modernas
- **Lucide React**: Iconografía consistente
- **localStorage API**: Persistencia de datos

## 📚 Funcionalidades Detalladas

### Flujo de Matrícula

1. **Login**: Autenticación por ID de estudiante
2. **Vista de Cursos**: 
   - Si tiene matrículas previas: Muestra cursos guardados (protegidos)
   - Si es nuevo: Muestra formulario de selección
3. **Edición (Opcional)**: Agregar/quitar cursos con validaciones
4. **Resumen**: Revisión antes de confirmar
5. **Confirmación**: Guardado en localStorage con timestamp
6. **Historial**: Acceso a todas las matrículas realizadas

### Validaciones Implementadas

- ✅ Control de cupos por curso
- ✅ Límite máximo de créditos por estudiante
- ✅ Filtrado por semestre actual
- ✅ Verificación de estado de matriculación
- ✅ Prevención de duplicados

## 🎨 Paleta de Colores

- **Primario**: #2563EB (Azul)
- **Secundario**: Verde (matrículas exitosas)
- **Alerta**: Rojo (cursos sin cupos)
- **Neutro**: Grises para interfaz estándar

## 🔐 Seguridad

- Los datos se guardan localmente en el navegador
- No se envían datos a servidores externos
- Las contraseñas no son requeridas (sistema de demostración)

## 📱 Responsividad

- **Móvil**: Optimizado para pantallas pequeñas
- **Tablet**: Interfaz intermedia adaptada
- **Desktop**: Experiencia completa con dos columnas
- **Punto de quiebre**: 425px (oculta texto en botones pequeños)

## ⚠️ Notas Importantes

- Los datos se guardan únicamente en localStorage del navegador
- Al limpiar caché del navegador, se perderán los datos
- Cada navegador tiene su propio almacenamiento independiente
- Máximo de estudiantes registrados: 3 (expandible en `estudiantes.json`)

## 🤝 Contribuciones

Las sugerencias y mejoras son bienvenidas. Por favor, abre un issue o crea un pull request.

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---
