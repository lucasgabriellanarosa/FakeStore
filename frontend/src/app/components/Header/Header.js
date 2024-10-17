'use client'

import { GoPerson } from "react-icons/go";
import { LuShoppingCart } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import useAuth from '@/app/hooks/useAuth';
import useNavigate from "@/app/hooks/useNavigate";

const Header = () => {

    const navigate = useNavigate()
    const userData = useAuth();

    return (
        <header className="px-5 py-3 flex flex-col gap-3 shadow-md fixed w-full z-50 bg-gradient-to-br from-indigo-500 to-indigo-300">

            <div className="flex justify-between items-center">
                <h1 className="text-4xl hover:cursor-pointer text-green-400 font-josefin" onClick={() => navigate('/')}>Ecommerce</h1>
                <ul className="flex gap-3">
                    {
                        userData.is_logged ?
                            <>
                                <li className="text-2xl text-green-400">
                                    <LuShoppingCart onClick={() => navigate(`cart`)} />
                                </li>
                                <li className="text-2xl text-green-400">
                                    <GoPerson onClick={() => navigate(`profile`)} />
                                </li>
                            </>
                            :
                            <li className="text-2xl text-green-400">
                                <GoPerson onClick={() => navigate('login')} />
                            </li>
                    }

                </ul>
            </div>

            <form className="flex justify-around items-center border-green-400 border-solid border-2 self-center px-3 py-1 rounded-2xl shadow-sm w-9/12">
                <input placeholder="O que você procura hoje?" className="bg-transparent text-green-200 placeholder-green-200 outline-none" />
                <IoIosSearch className="text-xl text-green-200" />
            </form>

        </header>
    )
}

export default Header