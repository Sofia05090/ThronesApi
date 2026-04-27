import { useState, useEffect, useContext} from 'react';
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

function Home(){

    const [characters, setCharacters] = useState<Character[]>([])


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

    return(

        <>
            <div className="tabla-container">
                <h2>Personajes de Game of Thrones</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters.map((char)=> (
                            <tr key={char.id}>
                                <td>
                                    <img src={char.imageUrl} alt={char.fullName} width={50} />
                                </td>
                                <td>{char.fullName}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            
            </div>
        
        </>
    );
}


export default Home;