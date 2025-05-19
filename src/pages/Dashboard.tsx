import TopResults from "../components/TopResults";
import SearchResults from "../components/SearchResults";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { accessToken } = useAuth();
    const [query, setQuery] = useState('');
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [type, setType] = useState('artist');
    const [openType, setOpenType] = useState(false);

    const handleLogin = async() => {
        window.location.href = 'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            client_id: 'e0d605558ba04a078cc71d072fdc4083',
            response_type: 'code',
            redirect_uri: 'http://127.0.0.1:5173/callback',
            scope: 'user-top-read user-read-private'
        }).toString();
    }

    if(accessToken === null){
        handleLogin();
    }

    useEffect(() => {
        const fetchSearchResults = async () => {
            setArtists([]);
            setAlbums([]);
            setTracks([]);

            try{
                //Cambiar que funcione no solo con artistas
                const response = await fetch(`http://127.0.0.1:8080/search?q=${query}&type=${type}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                const data = await response.json();
                if(type === 'artist'){
                    setArtists(data || []);
                } else if(type === 'album'){
                    setAlbums(data || []);
                } else if(type === 'track'){
                    setTracks(data || []);
                }
            } catch(error){
                console.log('Error fetching the search result: ', error)
            }
        }

        const delayDebounce = setTimeout(() => {
            fetchSearchResults();
        }, 400)

        return () => clearTimeout(delayDebounce);
    }, [query, accessToken, type])

    return(
        <div className="bg-gray-900 h-full">
            <h1 className='bg-gray-400 w-full p-5 text-2xl mb-5'>Dashboard</h1>
            <div className="flex justify-center">
                <input 
                    type="text" 
                    placeholder="Search for artists, albums or tracks"
                    className="px-4 py-2 bg-white rounded-l-2xl w-1/2 h-16"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {openType === false ? (
                    <button className="bg-gray-400 p-4 rounded-r-2xl" onClick={() => setOpenType(true)}>{type}</button>
                ): (
                    <div className="flex flex-col overflow-visible h-25">
                        <button 
                        className="p-4 bg-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => {
                            setType('artist')
                            setOpenType(false)
                        }}>Artist</button>
                        <button 
                        className="p-4 bg-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => {
                            setType('album')
                            setOpenType(false)
                        }}>Album</button>
                        <button 
                        className="p-4 bg-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => {
                            setType('track')
                            setOpenType(false)
                        }}>Track</button>
                    </div>
                )}
            </div>

            {query.length === 0 && <TopResults />}
            {query.length > 0 && (
                <SearchResults 
                    artists={artists}
                    albums={albums}
                    tracks={tracks}
                />
            )}
        </div>

    )
}

export default Dashboard;