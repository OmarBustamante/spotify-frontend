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
        <div>
            <h1>Dashboard</h1>
            <div className="flex">
                <input 
                    type="text" 
                    placeholder="Search for artists, albums or tracks"
                    className="px-4 py-2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {openType === false ? (
                    <button onClick={() => setOpenType(true)}>{type}</button>
                ): (
                    <div className="flex flex-col">
                        <button onClick={() => {
                            setType('artist')
                            setOpenType(false)
                        }}>Artist</button>
                        <button onClick={() => {
                            setType('album')
                            setOpenType(false)
                        }}>Album</button>
                        <button onClick={() => {
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