import { BrowserRouter as Router, Route, Routes, Link} from 'react-router';
import Original from './Original'
import Home from './Home'
import Favorito from './Favorito'
import Informativa from './Informativa'
import Usuario from './Usuario';
import Personaje from './Personaje';
import './App.css'

function App() {

  return (
    <>
      <Router>

        <nav className='c-menu'>
          <Link to='/'>Home</Link>
          <Link to='/favorito'>Favorito</Link>
          <Link to='/original'>Original</Link>
          <Link to='/informativa'>Informativa</Link>
          <Link to='/usuario'>Usuario</Link>
        </nav>

        <nav className='c-menu-movil'>
         <Link to='/'>Home</Link>
          <Link to='/favorito'>Favorito</Link>
          <Link to='/original'>Original</Link>
          <Link to='/informativa'>Informativa</Link>
          <Link to='/usuario'>Usuario</Link>
        </nav>

        <Routes>
          <Route path='/'element={<Home/>} />
          <Route path='/favorito'element={<Favorito/> } />
          <Route path='/original'element={<Original/> } />
          <Route path='/informativa'element={<Informativa/> } />
          <Route path='/usuario'element={<Usuario/> } />
          <Route path='/personaje/:id' element={<Personaje/>} />
        </Routes>

      </Router>
    </>
  )
}

export default App

