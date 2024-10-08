"use client";

import { useEffect, useState } from "react";

import { FaRegHeart } from "react-icons/fa";


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import './globals.css'

import { useRouter } from 'next/navigation';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import axios from 'axios';

export default function Home() {

    const router = useRouter();
    const handleNavigate = (id) => {
        router.push(`/product/${id}`);
    };

    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getCategories/`)
        .then(response => setCategories(response.data.categories))
    }, [])

    return (
        <div>
            <Header />

            <Main>
                <ul className="flex flex-col gap-5">
                    {
                    Object.values(categories).map((category) => (
                        <li className="text-2xl capitalize flex flex-col gap-1" key={category.id}>
                            <h2>{category.name} </h2>
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={20}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                            >
                                {category.products.length > 0 ? (
                                    category.products.map((product) => (
                                        <SwiperSlide key={product.id} className="border-2 border-gray-200 p-2 flex flex-col gap-2">
                                            <FaRegHeart className="self-end text-xl" />
                                            <img className="min-h-32 max-h-32 min-w-32 max-w-32" src={`http://127.0.0.1:8000/media/${product.image}`} />
                                            <div className='flex flex-col gap-2'>
                                                <h3 onClick={() => handleNavigate(`${product.id}`)} className="text-gray-700 text-2xl italic underline hover:cursor-pointer">
                                                {product.name.length > 16 ? `${product.name.substring(0, 24)}...` : product.name}
                                                </h3>
                                                <h4 className="text-gray-500 text-xl italic">R${product.price}</h4>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                )

                                    :
                                    <li className="text-xl italic">No products available.</li>
                                }
                            </Swiper>
                        </li>
                    ))
                    }
                </ul>
            </Main>


        </div>
    );
}
