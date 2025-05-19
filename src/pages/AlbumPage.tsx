import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Album {
    id: string;
    name : string;
    artists: string[];
    imageUrl: string;
}

const AlbumPage = () => {
    const { id } = useParams();
    const { accessToken } = useAuth();
    const [album, setAlbum] = useState<Album | null>(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:8080/albums/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                const data = await response.json();
                setAlbum(data)
            } catch(error){
                console.error('Error fetching album data', error)
            }
        }

        if(id && accessToken){
            fetchAlbum();
        }
    }, [id, accessToken])

    return(
        <div>
            <Link to='/dashboard'>Back to Dashboard</Link>

            <div>
                <img src={album?.imageUrl} alt={album?.name} 
                className='w-64 h-64'/>
                <div>
                    <h1>{album?.name}</h1>
                    <p>{album?.artists.join(', ')}</p>
                </div>
            </div>
        </div>
    )
}

export default AlbumPage;