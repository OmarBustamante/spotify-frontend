import { GiMusicalNotes, GiMusicalScore } from "react-icons/gi";

const Login = () => {

    const handleLogin = async() => {
        window.location.href = 'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            client_id: 'e0d605558ba04a078cc71d072fdc4083',
            response_type: 'code',
            redirect_uri: 'http://127.0.0.1:5173/callback',
            scope: 'user-top-read user-read-private'
        }).toString();
    }

    return(
        <div className='h-screen flex flex-col items-center gap-25 justify-center bg-gray-900'>
            <div className="flex items-center">
                <GiMusicalScore className="text-white" size={150} />
                <GiMusicalNotes className="text-white" size={100} />
            </div>
            <button
                className='bg-gray-500 text-white px-6 py-3 rounded-xl text-xl hover:bg-gray-400'
                onClick={handleLogin}
            >
                Login with Spotify
            </button>
        </div>
    )
}

export default Login;