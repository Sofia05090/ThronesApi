import { useState, useEffect } from 'react';
import "./style.css"

interface Character {
    id: number;
    fullName: string;
    family: string;
    imageUrl: string;
}

interface Perfil {
    nombre: string;
    familiaFavorita: string;
    personajeFavorito: string;
}

function Usuario() {

    const [characters, setCharacters] = useState<Character[]>([])
    const [perfil, setPerfil] = useState<Perfil>({
        nombre: '',
        familiaFavorita: '',
        personajeFavorito: ''
    })
    const [guardado, setGuardado] = useState(false)

    // Cargar personajes y perfil guardado
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

        // Cargar perfil desde localStorage
        const perfilGuardado = JSON.parse(localStorage.getItem('perfil') || 'null')
        if (perfilGuardado) {
            setPerfil(perfilGuardado)
        }

    }, []);

    // Familias únicas desde la API
    const familias = [...new Set(characters.map((char) => char.family || 'Sin familia'))]

    const handleGuardar = () => {
        localStorage.setItem('perfil', JSON.stringify(perfil))
        setGuardado(true)
        setTimeout(() => setGuardado(false), 2000) // oculta el mensaje después de 2 segundos
    }

    const handleLimpiar = () => {
        const perfilVacio = { nombre: '', familiaFavorita: '', personajeFavorito: '' }
        setPerfil(perfilVacio)
        localStorage.removeItem('perfil')
        setGuardado(false)
    }

    // Personaje favorito seleccionado
    const personajeFavoritoData = characters.find(
        (char) => char.fullName === perfil.personajeFavorito
    )

    return (
        <>
            <div className="tabla-container">
                <h2>Mi Perfil</h2>

                {/* Formulario */}
                <div className="perfil-form">

                    <label>Nombre</label>
                    <input
                        type="text"
                        placeholder="Tu nombre..."
                        value={perfil.nombre}
                        onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
                    />

                    <label>Familia favorita</label>
                    <select
                        value={perfil.familiaFavorita}
                        onChange={(e) => setPerfil({ ...perfil, familiaFavorita: e.target.value })}
                    >
                        <option value="">Selecciona una familia...</option>
                        {familias.map((familia) => (
                            <option key={familia} value={familia}>{familia}</option>
                        ))}
                    </select>

                    <label>Personaje favorito</label>
                    <select
                        value={perfil.personajeFavorito}
                        onChange={(e) => setPerfil({ ...perfil, personajeFavorito: e.target.value })}
                    >
                        <option value="">Selecciona un personaje...</option>
                        {characters.map((char) => (
                            <option key={char.id} value={char.fullName}>{char.fullName}</option>
                        ))}
                    </select>

                    <div className="perfil-botones">
                        <button onClick={handleGuardar}>Guardar</button>
                        <button onClick={handleLimpiar}>Limpiar</button>
                    </div>

                    {guardado && <p> Perfil guardado correctamente</p>}

                </div>

                {/* Vista previa del perfil */}
                {perfil.nombre && (
                    <div className="perfil-preview">
                        <h3>Bienvenido, {perfil.nombre}</h3>

                        {perfil.familiaFavorita && (
                            <p><strong>Familia favorita:</strong> {perfil.familiaFavorita}</p>
                        )}

                        {personajeFavoritoData && (
                            <div>
                                <p><strong>Personaje favorito:</strong> {personajeFavoritoData.fullName}</p>
                                <img
                                    src={personajeFavoritoData.imageUrl}
                                    alt={personajeFavoritoData.fullName}
                                    width={100}
                                />
                            </div>
                        )}
                    </div>
                )}

            </div>
        </>
    );
}

export default Usuario;