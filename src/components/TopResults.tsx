import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface Artist {
    id: string;
    name: string;
    imageUrl: string;
}

const TopResults = () => {
    const { accessToken } = useAuth();
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        const fetchTopArtists = async () => {
            try{
                const response = await fetch('http://127.0.0.1:8080/me/top/artists', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                const mappedArtist = data.map((artist: any) => ({
                    id: artist.id,
                    name: artist.name,
                    imageUrl: artist.imageUrl
                }));
                setArtists(mappedArtist);
            } catch(error){
                console.error('Failed to fetch top artists', error);
            }
        };

        if(accessToken){
            fetchTopArtists();
        }
    }, [accessToken]);

    return(
        <div className='grid grid-cols-5 gap-6 p-10 m-24 bg-amber-400'>
            {artists.map((artist) => (
                <Link 
                    to={`/artists/${artist.id}`}
                    key={artist.id}
                    className='flex flex-col items-center bg-gray-800 hover:bg-gray-700'
                >
                    <img 
                        src={artist.imageUrl}
                        alt={artist.name}
                        className='w-50 h-50'
                    />
                    <h3 className='text-white text-xl'>{artist.name}</h3>
                </Link>
            ))}
        </div>
    );
}

export default TopResults;