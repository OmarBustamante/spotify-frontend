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

        <div className='mt-10 space-y-12'>
            {artists.length > 0 && (
                <div>
                    <h2>Artists</h2>
                    <div className='grid gris-cols-2 md:grid-cols-4 gap-4'>
                        {artists.map((artist) => (
                            <Link key={artist.id} to={`/artists/${artist.id}`}>
                                <img src={artist.imageUrl} alt={artist.name} />
                                <p>{artist.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {albums.length > 0 && (
                <div>
                    <h2>Albums</h2>
                    <div className='grid gris-cols-2 md:grid-cols-4 gap-4'>
                        {albums.map((album) => (
                            <Link key={album.id} to={`/albums/${album.id}`}>
                                <img src={album.imageUrl} alt={album.name} />
                                <p>{album.name}</p>
                                <p>{album.artists.map(a => a.name).join(', ')}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {tracks.length > 0 && (
                <div>
                    <h2>Tracks</h2>
                    <div className='grid gris-cols-2 md:grid-cols-4 gap-4'>
                        {tracks.map((track) => (
                            <div>
                                <p>{track.name}</p>
                                <p>{track.artists.map(a => a.name).join(', ')}</p>
                                <p>{track.album}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>

    )
}

export default SearchResults;