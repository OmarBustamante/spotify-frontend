import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Artist {
    id: string;
    name : string;
    genres: string[];
    imageUrl: string;
    followers: string;
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
                console.log(data)
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
        <div className='flex flex-col items-center text-white'>
            <Link to='/dashboard' className='bg-gray-400 w-full p-5 text-2xl mb-5 text-black'>Back to Dashboard</Link>

            <div>
                <img src={artist?.imageUrl} alt={artist?.name} 
                className='w-64 h-64'/>
                <div className='m-2'>
                    <h1 className='mb-2 text-3xl'>{artist?.name}</h1>
                    <p className='mb-2 text-2xl'>{artist?.genres.join(', ')}</p>
                    <p className='mb-2 text-2xl'>Follower: {artist?.followers}</p>
                </div>
            </div>
        </div>
    )
}

export default ArtistPage;