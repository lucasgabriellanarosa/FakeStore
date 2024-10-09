"use client";
import { useRouter } from 'next/navigation';

const useNavigate = () => {
    const router = useRouter();
    return (url) => {
        router.push(`/${url}`);
    };
};

export default useNavigate;