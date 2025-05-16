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
            const response = await fetch('http://localhost:8080/auth/spotify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code,
                    redirectUri: 'http://127.0.0.1:3000/callback'
                }),
            });

            const data = await response.json();
            setAccessToken(data.accessToken);
            navigate('/dashboard');
        };

        if(code){
            fetchToken();
        }
    }, [params, setAccessToken, navigate]);

    return(
        <p className="text-white text-center mt-10">
            Loading...
        </p>
    )
}

export default Callback;