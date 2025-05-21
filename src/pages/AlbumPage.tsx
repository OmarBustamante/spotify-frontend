import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { IoMdArrowRoundBack } from "react-icons/io";

interface Album {
    id: string;
    name : string;
    artists: string[];
    imageUrl: string;
    releaseDate: string;
    tracks: Track[];
    artistsId: string[]
}

interface Track {
    id: string;
    name: string;
    artists: string[];
    album: string;
    durationMs: number;
    previewUrl: string;
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
        <div className='flex flex-col items-center text-white'>
            <Link to='/dashboard' className='bg-gray-400 w-full p-5 text-2xl mb-5 text-black flex items-center hover:text-white'>
                <IoMdArrowRoundBack />Back to DashboardBack to Dashboard
            </Link>

            <div className='flex w-1/3'>
                <img src={album?.imageUrl} alt={album?.name} 
                className='w-64 h-64'/>
                <div className='flex flex-col justify-between py-5 pl-5'>
                    <h1 className='text-4xl font-bold'>{album?.name}</h1>
                    <Link to={`/artists/${album?.artistsId[0]}`} className='text-xl'>{album?.artists.join(', ')}</Link>
                    <p className='text-xl'>Release Date: {album?.releaseDate}</p>
                </div>
            </div>

            <div className='w-1/3'>
                <h1 className='text-lg p-2'>Tracks</h1>
                <ul>
                    {album?.tracks.map((track, index) => (
                        <li key={track.id}>
                            <div className='flex p-4 border-b-2'>
                                <p className='w-1/2'>{index + 1}. {track.name}</p>
                                <Link to={`/artists/${album?.artistsId[0]}`}>{track.artists.join(', ')}</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AlbumPage;