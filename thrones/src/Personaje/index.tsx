import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
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

function Personaje() {

    const { id } = useParams<{ id: string }>()
    const [char, setChar] = useState<Character | null>(null)
    const [isFavorito, setIsFavorito] = useState(false)

    useEffect(() => {
        if (!id) return;

        // Revisar si ya es favorito
        const favoritos: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
        if (favoritos.includes(Number(id))) {
            setIsFavorito(true)
        }

        const fetchData = async () => {
            try {
                const res = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
                const data: Character = await res.json()
                setChar(data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData()

    }, [id]);

    const toggleFavorito = () => {
        if (!id) return;

        let favoritos: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')

        if (favoritos.includes(Number(id))) {
            favoritos = favoritos.filter((fav) => fav !== Number(id))
            setIsFavorito(false)
        } else {
            favoritos.push(Number(id))
            setIsFavorito(true)
        }

        localStorage.setItem('favoritos', JSON.stringify(favoritos))
    }

    if (!char) return <p>Cargando...</p>

    return (
        <div className="personaje-detalle">
            <img src={char.imageUrl} alt={char.fullName} width={200} />
            <h1>
                {char.fullName}
                <button onClick={toggleFavorito}>
                    {isFavorito ? '❤️' : '🤍'}
                </button>
            </h1>
            <p><strong>Título:</strong> {char.title}</p>
            <p><strong>Familia:</strong> {char.family}</p>
            <p><strong>Nombre:</strong> {char.firstName} {char.lastName}</p>
        </div>
    );
}

export default Personaje;