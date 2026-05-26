import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router';
import './style.css';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/') 
        } catch (err: any) {
            setError('Email o contraseña incorrectos')
        }
    }

    return (
        <div className="auth-container">
            <h2>Iniciar Sesión</h2>

            {error && <p className="auth-error">{error}</p>}

            <div className="auth-form">
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
                    placeholder="Tu contraseña..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>Iniciar Sesión</button>

                <p className="auth-link">
                    ¿No tienes cuenta? <Link to='/registro'>Regístrate</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;