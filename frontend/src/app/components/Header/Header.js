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
        <header className="px-5 py-2 flex flex-col gap-3 shadow-xl fixed w-full z-50 bg-gradient-to-r from-indigo-500 to-indigo-400 items-center">

            <div className="flex justify-between items-center w-full md:w-2/3">
                <h1 className="text-4xl hover:cursor-pointer text-green-400 font-josefin transition-all  hover:text-green-200" onClick={() => navigate('/')}>Ecommerce</h1>
                <ul className="flex gap-3">
                    {
                        userData.is_logged ?
                            <>
                                <li className="text-2xl text-green-400 cursor-pointer transition-all duration-300 hover:text-green-200">
                                    <LuShoppingCart onClick={() => navigate(`cart`)} />
                                </li>
                                <li className="text-2xl text-green-400 cursor-pointer transition-all duration-300 hover:text-green-200">
                                    <GoPerson onClick={() => navigate(`profile`)} />
                                </li>
                            </>
                            :
                            <li className="text-2xl text-green-400 cursor-pointer transition-all duration-300 hover:text-green-200">
                                <GoPerson onClick={() => navigate('login')} />
                            </li>
                    }

                </ul>
            </div>

            <form className="flex justify-between items-center bg-white border-green-400 border-solid border-2 self-center px-3 py-1 rounded-2xl shadow-sm w-9/12 max-w-md">
                <input placeholder="O que você procura hoje?" className="bg-transparent text-green-600 placeholder-green-600 w-full outline-none" />
                <IoIosSearch className="text-xl text-green-600" />
            </form>

        </header>
    )
}

export default Header