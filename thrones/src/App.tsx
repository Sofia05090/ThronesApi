import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import { AuthProvider, useAuth } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Original from './Original'
import Home from './Home'
import Favorito from './Favorito'
import Informativa from './Informativa'
import Usuario from './Usuario';
import Personaje from './Personaje';
import Login from './Login';
import Registro from './Registro';
import './App.css'

function AppContent() {
    const { user } = useAuth()
    const [menuAbierto, setMenuAbierto] = useState(false)

    return (
        <>
            {user && (
                <>
                    <nav className='c-menu'>
                        <Link to='/'>Home</Link>
                        <Link to='/favorito'>Favorito</Link>
                        <Link to='/original'>Original</Link>
                        <Link to='/informativa'>Informativa</Link>
                        <Link to='/usuario'>Usuario</Link>
                    </nav>

                    <button
                        className='hamburguesa'
                        onClick={() => setMenuAbierto(!menuAbierto)}
                    >
                        {menuAbierto ? '✕' : '☰'}
                    </button>

                    {menuAbierto && (
                        <div className='overlay' onClick={() => setMenuAbierto(false)} />
                    )}

                    <nav className={`c-menu-lateral ${menuAbierto ? 'abierto' : ''}`}>
                        <Link to='/' onClick={() => setMenuAbierto(false)}>Home</Link>
                        <Link to='/favorito' onClick={() => setMenuAbierto(false)}>Favorito</Link>
                        <Link to='/original' onClick={() => setMenuAbierto(false)}>Original</Link>
                        <Link to='/informativa' onClick={() => setMenuAbierto(false)}>Informativa</Link>
                        <Link to='/usuario' onClick={() => setMenuAbierto(false)}>Usuario</Link>
                    </nav>
                </>
            )}

            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/registro' element={<Registro/>} />
                <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>} />
                <Route path='/favorito' element={<PrivateRoute><Favorito/></PrivateRoute>} />
                <Route path='/original' element={<PrivateRoute><Original/></PrivateRoute>} />
                <Route path='/informativa' element={<PrivateRoute><Informativa/></PrivateRoute>} />
                <Route path='/usuario' element={<PrivateRoute><Usuario/></PrivateRoute>} />
                <Route path='/personaje/:id' element={<PrivateRoute><Personaje/></PrivateRoute>} />
            </Routes>
        </>
    )
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    )
}

export default App