import { Link } from 'react-router-dom'

interface Artist {
    id: string;
    name: string;
    imageUrl: string;
}

interface Album {
    id: string;
    name: string;
    imageUrl: string;
    artists: { name: string }[];
}

interface Track{
    id: string;
    name: string;
    album: string;
    artists: { name: string }[];
}

interface Props {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}

const SearchResults = ({ artists, albums, tracks }: Props) => {
    
    return(

        <div className='gap-6 p-15 m-10 flex flex-col items-center '>

            {artists.length > 0 && (
                <div className='w-full'>
                    <h1 className='bg-gray-800 p-5 text-4xl text-white'>Artists</h1>
                    <div className='grid grid-cols-5 gap-6 bg-gray-400 py-4'>
                        {artists.map((artist) => (
                            <Link key={artist.id} to={`/artists/${artist.id}`} className='flex flex-col items-center' >
                                <img src={artist.imageUrl} alt={artist.name} className='w-50 h-50' />
                                <p>{artist.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {albums.length > 0 && (
                <div className='w-full'>
                    <h1 className='bg-gray-800 p-5 text-4xl text-white'>Albums</h1>
                    <div className='grid grid-cols-5 gap-6 bg-gray-400 py-4'>
                        {albums.map((album) => (
                            <Link key={album.id} to={`/albums/${album.id}`} className='flex flex-col items-center' >
                                <img src={album.imageUrl} alt={album.name} className='w-50 h-50' />
                                <p>{album.name}</p>
                                <p>by {album.artists.join(', ')}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {tracks.length > 0 && (
                <div className='w-1/3 text-white'>
                    <h1 className='text-lg p-2'>Tracks</h1>
                    <ul>
                        {tracks.map((track, index) => (
                            <li key={track.id}>
                                <div className='flex p-4 border-b-2'>
                                    <p className='w-1/2'>{index + 1}. {track.name}</p>
                                    <p>{track.artists.join(', ')}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>

    )
}

export default SearchResults;