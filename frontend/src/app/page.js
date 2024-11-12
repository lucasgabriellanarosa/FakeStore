"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './globals.css'
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import axios from 'axios';
import useNavigate from "./hooks/useNavigate";

export default function Home() {

    const [maxLength, setMaxLength] = useState();

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getCategories/`)
            .then(response => setCategories(response.data.categories))

        // Função para atualizar o número de caracteres com base na largura da tela
        const updateMaxLength = () => {
            if (window.innerWidth >= 1024) {
                setMaxLength(20); // Para telas grandes, exibe 20 caracteres
            } else if (window.innerWidth >= 768) {
                setMaxLength(24); // Para telas médias, exibe 15 caracteres
            } else {
                setMaxLength(12); // Para telas pequenas, exibe 12 caracteres
            }
        };

        // Chama a função ao carregar o componente e ao redimensionar a janela
        updateMaxLength();
        window.addEventListener('resize', updateMaxLength);

        // Remove o listener ao desmontar o componente
        return () => window.removeEventListener('resize', updateMaxLength);

    }, [])

    return (
        <div>
            <Header />

            <Main>
                <ul className="flex flex-col gap-5 max-w-7xl">
                    {
                        Object.values(categories).map((category) => (
                            <li className="flex flex-col gap-1" key={category.id}>
                                <h2 className='text-3xl capitalize font-josefin text-green-600'>{category.name} </h2>
                                <Swiper
                                    modules={[Pagination]}
                                    breakpoints={{
                                        350: {
                                            slidesPerView: 2,
                                            spaceBetween: 10,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 15,
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 20,
                                        },
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                >
                                    {category.products.length > 0 ? (
                                        category.products.map((product) => (
                                            <SwiperSlide key={product.id} className="border-2 border-purple-200 shadow-md flex flex-col p-2 gap-2 bg-white rounded-md">
                                                <img className="min-h-32 max-h-32 min-w-32 max-w-32" src={`http://127.0.0.1:8000/media/${product.image}`} />
                                                <div className='flex flex-col gap-2 w-full'>
                                                    <h3 onClick={() => navigate(`product/${product.id}`)} className="text-purple-700 text-xl italic hover:cursor-pointer">
                                                        {product.name.length > maxLength
                                                            ? `${product.name.substring(0, maxLength)}...`
                                                            : product.name}
                                                    </h3>
                                                    <h4 className="text-purple-400 text-2xl italic">R${product.price}</h4>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    )

                                        :
                                        <li className="text-xl italic">Nenhum produto disponivel.</li>
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
