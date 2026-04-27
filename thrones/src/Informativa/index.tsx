import { useState, useEffect } from 'react';
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

function Informativa() {

    const [characters, setCharacters] = useState<Character[]>([])

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

    // Estadísticas calculadas desde los datos
    const totalPersonajes = characters.length
    const familias = new Set(characters.map((char) => char.family || 'Sin familia')).size
    const conTitulo = characters.filter((char) => char.title).length
    const sinTitulo = characters.filter((char) => !char.title).length

    return (
        <>
            <div className="tabla-container">
                <h2>Sobre la App</h2>
                <p>Esta aplicación muestra información sobre los personajes de Game of Thrones usando la API de <a href="https://thronesapi.com" target="_blank">thronesapi.com</a>.</p>

                <h2>Datos de la API</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><strong>URL de la API</strong></td>
                            <td>https://thronesapi.com/api/v2/Characters</td>
                        </tr>
                        <tr>
                            <td><strong>Versión</strong></td>
                            <td>v2</td>
                        </tr>
                        <tr>
                            <td><strong>Autenticación</strong></td>
                            <td>No requerida</td>
                        </tr>
                        <tr>
                            <td><strong>Formato</strong></td>
                            <td>JSON</td>
                        </tr>
                    </tbody>
                </table>

                <h2>Estadísticas</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Total de personajes</strong></td>
                            <td>{totalPersonajes}</td>
                        </tr>
                        <tr>
                            <td><strong>Familias distintas</strong></td>
                            <td>{familias}</td>
                        </tr>
                        <tr>
                            <td><strong>Personajes con título</strong></td>
                            <td>{conTitulo}</td>
                        </tr>
                        <tr>
                            <td><strong>Personajes sin título</strong></td>
                            <td>{sinTitulo}</td>
                        </tr>
                    </tbody>
                </table>

                <h2>Campos disponibles</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Campo</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>id</td><td>Identificador único del personaje</td></tr>
                        <tr><td>firstName</td><td>Primer nombre</td></tr>
                        <tr><td>lastName</td><td>Apellido</td></tr>
                        <tr><td>fullName</td><td>Nombre completo</td></tr>
                        <tr><td>title</td><td>Título formal del personaje</td></tr>
                        <tr><td>family</td><td>Familia o casa a la que pertenece</td></tr>
                        <tr><td>imageUrl</td><td>URL de la imagen del personaje</td></tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Informativa;