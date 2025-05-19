import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Artist {
    id: string;
    name : string;
    genres: string[];
    imageUrl: string;
}

const ArtistPage = () => {
    const { id } = useParams();
    const { accessToken } = useAuth();
    const [artist, setArtist] = useState<Artist | null>(null);

    useEffect(() => {
        const fetchArtist = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:8080/artists/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                const data = await response.json();
                setArtist(data)
            } catch(error){
                console.error('Error fetching artist data', error)
            }
        }

        if(id && accessToken){
            fetchArtist();
        }
    }, [id, accessToken])

    return(
        <div>
            <Link to='/dashboard'>Back to Dashboard</Link>

            <div>
                <img src={artist?.imageUrl} alt={artist?.name} 
                className='w-64 h-64'/>
                <div>
                    <h1>{artist?.name}</h1>
                    <p>{artist?.genres.join(', ')}</p>
                </div>
            </div>
        </div>
    )
}

export default ArtistPage;