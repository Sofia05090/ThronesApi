import { useEffect, useState } from 'react';
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

function Favorito() {

    const [favoritos, setFavoritos] = useState<number[]>([])
    const [characters, setCharacters] = useState<Character[]>([])

    // Carga los ids desde localStorage
    useEffect(() => {
        const stored: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
        setFavoritos(stored)
    }, [])

    // Fetch de cada personaje favorito
    useEffect(() => {
        if (favoritos.length === 0) return;

        const fetchFavoritos = async () => {
            try {
                const promesas = favoritos.map((id) =>
                    fetch(`https://thronesapi.com/api/v2/Characters/${id}`).then((res) => res.json())
                )
                const data: Character[] = await Promise.all(promesas)
                setCharacters(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchFavoritos()

    }, [favoritos])

    return (
        <div className="tabla-container">
            <h1>Favoritos</h1>

            {favoritos.length === 0 ? (
                <p>No tienes personajes favoritos</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Familia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters.map((char) => (
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
            )}
        </div>
    );
}

export default Favorito;