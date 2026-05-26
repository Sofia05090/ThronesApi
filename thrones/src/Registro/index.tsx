import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router';
import './style.css';

function Registro() {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegistro = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            
            // Guarda el nombre de usuario en el perfil de Firebase
            await updateProfile(userCredential.user, { displayName: nombre })
            navigate('/') // redirige a Home tras registro exitoso
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Este email ya está registrado')
            } else if (err.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres')
            } else {
                setError('Error al registrarse, intenta de nuevo')
            }
        }
    }

    return (
        <div className="auth-container">
            <h2>Crear Cuenta</h2>

            {error && <p className="auth-error">{error}</p>}

            <div className="auth-form">
                <label>Nombre de usuario</label>
                <input
                    type="text"
                    placeholder="Tu nombre..."
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder="Mínimo 6 caracteres..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleRegistro}>Crear Cuenta</button>

                <p className="auth-link">
                    ¿Ya tienes cuenta? <Link to='/login'>Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default Registro;