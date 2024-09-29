'use client'

import Header from "@/app/components/Header/Header";
import Main from "@/app/components/Main/Main";
import { useEffect, useState } from "react";
import axios from 'axios';
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

export default function ProductPage({ params }) {

  const [product, setProduct] = useState({})

  const productId = params.id

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getProduct/${productId}`)
      .then(response => setProduct(response.data.product))
  }, [productId])

  console.log(product)

  return (
    <div>
      <Header />
      <Main>

        <ul className="flex gap-2 items-center">
          {
            product.categories ?
              product.categories.map((category) => (
                <li className="bg-gray-300 px-3 py-1 rounded-2xl text-xs">
                  {category.name}
                </li>
              ))
              :
              <></>
          }
          <FaRegHeart className="text-xl" />
        </ul>
        <img src={`http://127.0.0.1:8000/media/${product.image}`} />
        
        <div>
          <h2 className="capitalize italic text-gray-700 text-3xl">{product.name}</h2>
          <h3 className="text-gray-500 text-xl">R${product.price}</h3>
        </div>

        <div>
          <h2 className="text-gray-950 text-3xl">Tamanho</h2>
          <ul className="flex gap-2 items-center">
            {
              product.available_sizes?
              product.available_sizes.map((size) => (
                <li className="px-5 text-xl border-black border-2 rounded-2xl">
                  {size.name}
                </li>
              ))
              :
              <></>
            }
            {
              product.out_of_storage_sizes?
              product.out_of_storage_sizes.map((size) => (
                <li className="px-5 text-xl border-gray-200 border-2 rounded-2xl text-gray-400">
                  {size.name}
                </li>
              ))
              :
              <></>
            }
          </ul>
        </div>

        <button className="flex justify-center items-center gap-1 w-fit px-6 py-2 border-black border-2 text-lg"> 
          <LuShoppingCart />
          Comprar
        </button>

        <div>
          <h2 className="text-gray-950 text-3xl">Descrição</h2>
          <p>{product.description}</p>
        </div>

      </Main>
    </div>
  );
}