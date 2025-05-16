import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async() => {
        window.location.href = 'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            client_id: 'e0d605558ba04a078cc71d072fdc4083',
            response_type: 'code',
            redirect_uri: 'http://127.0.0.1:3000/callback',
            scope: 'user-top-read user-read-private'
        }).toString();
    }

    return(
        <div className='h-screen flex items-center justify-center bg-gray-900'>
            <button
                className='bg-green-500 text-white px-6 py-3 rounded-xl text-xl hover:bg-green-400'
                onClick={handleLogin}
            >
                Login with Spotify
            </button>
        </div>
    )
}

export default Login;