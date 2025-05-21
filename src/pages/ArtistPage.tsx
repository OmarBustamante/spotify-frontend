import { useParams, Link } from 'react-router-dom';
import { use, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import SearchResults from "../components/SearchResults";

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
    const [albums, setAlbums] = useState([])

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

    useEffect(() => {
        const fetchSearchResults = async () => {
            try{
                //Cambiar que funcione no solo con artistas
                const response = await fetch(`http://127.0.0.1:8080/search?q=${artist?.name}&type=album`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                const data = await response.json();
                setAlbums(data)
            } catch(error){
                console.log('Error fetching the search result: ', error)
            }
        }

        const delayDebounce = setTimeout(() => {
            fetchSearchResults();
        }, 400)

        return () => clearTimeout(delayDebounce);
    }, [accessToken, artist])

    return(
        <div className='flex flex-col items-center text-white'>
            <Link to='/dashboard' className='bg-gray-400 w-full p-5 text-2xl mb-5 text-black flex items-center hover:text-white'>
                <IoMdArrowRoundBack />Back to Dashboard
            </Link>

            <div className='flex'>
                <img src={artist?.imageUrl} alt={artist?.name} 
                className='w-64 h-64'/>
                <div className='m-2 flex flex-col justify-between'>
                    <h1 className='mb-2 text-4xl'>{artist?.name}</h1>
                    <p className='mb-2 text-xl'>Genres: {artist?.genres.join(', ')}</p>
                    <p className='mb-2 text-xl'>Follower: {artist?.followers}</p>
                </div>
            </div>

            <SearchResults 
                artists={[]}
                albums={albums}
                tracks={[]}
            />
        </div>
    )
}

export default ArtistPage;