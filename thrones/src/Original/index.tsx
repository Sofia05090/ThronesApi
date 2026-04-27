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

function Original() {

    const [characters, setCharacters] = useState<Character[]>([])
    const [filtro, setFiltro] = useState('todos') // Estado del filtro

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://thronesapi.com/api/v2/Characters`)
                const data: Character[] = await res.json()
                setCharacters(data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData()
    }, []);

    // Familias generadas dinámicamente desde la API
    const familias = ['todos', ...new Set(characters.map((char) => char.family || 'Sin familia'))]

    // Filtrar personajes según familia seleccionada
    const charactersFiltrados = filtro === 'todos'
        ? characters
        : characters.filter((char) => char.family === filtro)

    // Agrupar por familia
    const porFamilia = charactersFiltrados.reduce((grupos, char) => {
        const familia = char.family || 'Sin familia'
        if (!grupos[familia]) {
            grupos[familia] = []
        }
        grupos[familia].push(char)
        return grupos
    }, {} as Record<string, Character[]>)

    return (
        <>
            <div className="tabla-container">
                <h2>Personajes por Familia</h2>

                {/* Botones de filtro dinámicos */}
                <div className="filtros">
                    {familias.map((familia) => (
                        <button
                            key={familia}
                            onClick={() => setFiltro(familia)}
                            className={filtro === familia ? 'activo' : ''}
                        >
                            {familia}
                        </button>
                    ))}
                </div>

                {Object.entries(porFamilia).map(([familia, personajes]) => (
                    <div key={familia}>
                        <h3>{familia}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Título</th>
                                </tr>
                            </thead>
                            <tbody>
                                {personajes.map((char) => (
                                    <tr key={char.id}>
                                        <td>
                                            <img src={char.imageUrl} alt={char.fullName} width={50} />
                                        </td>
                                        <td>
                                            <Link to={`/personaje/${char.id}`}>{char.fullName}</Link>
                                        </td>
                                        <td>{char.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Original;