'use client'

import React, { useEffect, useState } from 'react'
import { GoPerson } from "react-icons/go";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';

const Header = () => {

    const router = useRouter();
    const handleNavigate = (url) => {
        router.push(`${url}`);
    };

    const isUserLogged = useAuth();

    return (
        <header className="bg-white px-5 py-3 flex flex-col gap-3 shadow-md fixed w-full z-50">

            <div className="flex justify-between items-center">
                <h1 className="text-4xl hover:cursor-pointer" onClick={() => handleNavigate('/')}>Shoppe</h1>
                <ul className="flex gap-3">
                    {
                        isUserLogged ?
                            <>
                                <li className="text-2xl">
                                    <FaRegHeart />
                                </li>
                                <li className="text-2xl">
                                    <LuShoppingCart />
                                </li>
                                <li className="text-2xl">
                                    <GoPerson onClick={() => handleNavigate('/profile')} />
                                </li>
                            </>
                            :
                            <li className="text-2xl">
                                <GoPerson onClick={() => handleNavigate('/login')} />
                            </li>
                    }

                </ul>
            </div>

            <form className="flex justify-center items-center gap-1 border-gray-300 border-solid border-2 w-min self-center px-3 py-1 rounded-2xl shadow-sm">
                <input placeholder="O que você procura hoje?" className="w-60" />
                <IoIosSearch className="text-xl" />
            </form>

        </header>
    )
}

export default Header