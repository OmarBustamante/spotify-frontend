import { useEffect } from "react";
import { useNavigate, useSearchParams} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const Callback = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { setAccessToken } = useAuth();

    useEffect(() => {
        const code = params.get('code');

        const fetchToken = async () => {
            try{
                const response = await fetch('http://127.0.0.1:8080/auth/spotify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        code: code,
                        redirectUri: 'http://127.0.0.1:5173/callback'
                    }),
                });
                const data = await response.json();
                setAccessToken(data.accessToken);
                navigate('/dashboard');
            } catch(error){
                console.error("Failed to fetch token: ", error);
            }
        };

        if(code){
            fetchToken();
        }
    }, [params, setAccessToken, navigate]);

    return(
        <p className="text-center text-white mt-20">
            Loading...
        </p>
    )
}

export default Callback;