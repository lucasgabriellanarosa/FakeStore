import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const useAuth = () => {
    const [isUserLogged, setIsUserLogged] = useState(false)
    const router = useRouter();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/checkLogin/`, {
            withCredentials: true,
        })
        .then(response => setIsUserLogged(response.data.is_logged))
    }, [router]);

    return isUserLogged;
};

export default useAuth;