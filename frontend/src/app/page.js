"use client";

import { GoPerson } from "react-icons/go";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";

export default function Home() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getCategories/`)
        .then((res) => res.json())
        .then((data) => setCategories(data.categories))
    }, [])


    return (
        <div>

            <header className="px-5 py-3 flex flex-col gap-3 shadow-md fixed w-full z-50">

                {/* TOP */}
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl">Shoppe</h1>
                    <ul className="flex gap-3">
                        <li className="text-2xl">
                            <FaRegHeart />
                        </li> 
                        <li className="text-2xl">
                            <LuShoppingCart />
                        </li>   
                        <li className="text-2xl">
                            <GoPerson />
                        </li>     
                    </ul>
                </div>

                <form className="flex justify-center items-center gap-1 border-gray-300 border-solid border-2 w-min self-center px-3 py-1 rounded-2xl shadow-sm">
                    <input placeholder="O que você procura hoje?" className="w-60"/>
                    <IoIosSearch className="text-xl" />
                </form>

            </header>

            <main className="pt-32 flex flex-col px-6">
                <ul className="flex flex-col gap-5">
                { Object.values(categories).map( (category) => (
                    <li className="text-2xl capitalize" key={category.id}>{category.name}
                            <ul className="flex gap-3">
                            {category.products.length > 0 ? (
                                category.products.map((product) => (
                                    <li key={product.id} className="border-4 border-solid border-blue-500 px-5 py-3">
                                        {product.name}
                                        <img src={`http://127.0.0.1:8000/media/${product.image}`} />
                                    </li>
                                ))
                            )
                            :
                            <li>No products available.</li>
                        }
                        </ul>
                    </li>
                ))}
                </ul>
            </main>


        </div>
    );
}
