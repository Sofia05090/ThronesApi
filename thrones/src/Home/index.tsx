import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import "./style.css"

interface Character {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    family: string;
    imageUrl: string;
}

type FiltroTipo = 'todos' | 'stark' | 'lannister' | 'targaryen' | 'baratheon'

function Home(){

    const [characters, setCharacters] = useState<Character[]>([])
    const [filtro, setFiltro] = useState<FiltroTipo>('todos')
    const [busqueda, setBusqueda] = useState('')

    useEffect(() => {

        const fetchData = async () => {
            try {

                const res = await fetch(`https://thronesapi.com/api/v2/Characters`)
                const data: Character[] = await res.json()
                setCharacters(data)
                
            
        } catch (error){
            console.error(error);
        }

    };

        fetchData()

}, []);

const charactersFiltrados = characters
    .filter((char) =>
        filtro === 'todos' ? true : char.family.toLowerCase().includes(filtro)

    )
    .filter((char) =>
        busqueda.length < 3
        ? true
        : char.fullName.toLowerCase().includes(busqueda.toLowerCase())
)


    return(

        <>
            <div className="tabla-container">
                <h2>Personajes de Game of Thrones</h2>
                
                {/* Buscador */}

                <input
                    type="text"
                    placeholder="Buscar personaje..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}

                />

                {/* Botones de  filtro */}
                <div className="filtros">
                    <button onClick={() => setFiltro('todos')}>Todos</button>
                    <button onClick={() => setFiltro('stark')}>Stark</button>
                    <button onClick={() => setFiltro('lannister')}>Lannister</button>
                    <button onClick={() => setFiltro('targaryen')}>Targaryen</button>
                    <button onClick={() => setFiltro('baratheon')}>Baratheon</button>
                </div>
                
                
                
                <table>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Familia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {charactersFiltrados.map((char)=> (
                            <tr key={char.id}>
                                <td>
                                    <img src={char.imageUrl} alt={char.fullName} width={50} />
                                </td>
                                <td>
                                    <Link to={`/personaje/${char.id}`}>{char.fullName}</Link>
                                </td>
                                <td>{char.family}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            
            </div>
        
        </>
    );
}


export default Home;