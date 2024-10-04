import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const useAuth = () => {
    const [userData, setUserData] = useState({})
    const router = useRouter();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/checkLogin/`, {
            withCredentials: true,
        })
        .then(response => setUserData(response.data))
    }, [router]);

    return userData;
};

export default useAuth;