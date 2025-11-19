import { useState } from 'react';
import ilustracion from '../../assets/sistema-matricula.png';
import loginIcon from '../../assets/login.svg';
import userSearchIcon from '../../assets/user-search.svg';

function LoginScreen({ onLogin }) {
    const [studentId, setStudentId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!studentId.trim()) {
            setError('Por favor ingresa un ID');
            return;
        }

        // IDs válidos: 101, 102, 103
        const idsValidos = ['101', '102', '103'];
        if (!idsValidos.includes(studentId.trim())) {
            setError('ID no válido. Intenta con 101, 102 o 103');
            return;
        }

        onLogin(studentId);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Lado izquierdo - Formulario */}
            <div className="w-full lg:w-1/2 flex items-center gap-5">
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <div className="text-center flex flex-col gap-2 mx-3">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Bienvenido
                        </h1>
                        <p className="text-gray-600 text-base">
                            Ingresa tu sesión con tu ID
                        </p>
                    </div>

                    <div className="space-y-4 flex flex-col px-3 w-full items-center">

                        <div className='flex w-full sm:w-sm h-auto items-center border-2 border-gray-300 rounded-lg overflow-hidden'>
                            <div className="pl-4 flex items-center">
                                <img src={userSearchIcon} alt="User" className="w-5 h-5 " />
                            </div>
                            <input
                                type="text"
                                value={studentId}
                                onChange={(e) => {
                                    setStudentId(e.target.value);
                                    setError('');
                                }}
                                onKeyPress={handleKeyPress}
                                placeholder="ID"
                                style={{ padding: '10px 16px' }}
                                className="w-full border-0 focus:outline-none"
                            />
                        </div>

                        {error && (
                            <div className="w-full sm:w-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            style={{ padding: '10px 24px' }}
                            className="w-full sm:w-sm bg-[#2563EB] hover:bg-[#1f55ca] text-white font-normal rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <img src={loginIcon} alt="Login" className="w-5 h-5" />
                            Ingresar Sesión
                        </button>
                    </div>

                    <div className="p-4 rounded-lg w-80 mx-3">
                        <p className="text-sm text-center font-light text-gray-500">
                            <strong>Prueba intentando: ID 101, 102, 103</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex w-1/2 items-center justify-center">
                <img
                    src={ilustracion}
                    alt="Ilustración de matriculación"
                    className="max-w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

export default LoginScreen;