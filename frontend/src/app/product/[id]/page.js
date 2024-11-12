'use client'

import Header from "@/app/components/Header/Header";
import Main from "@/app/components/Main/Main";
import { useEffect, useState } from "react";
import axios from 'axios';
import { LuShoppingCart } from "react-icons/lu";
import useNavigate from "@/app/hooks/useNavigate";

export default function ProductPage({ params }) {

  const navigate = useNavigate()

  const [product, setProduct] = useState({})

  const productId = params.id

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getProduct/${productId}`)
      .then(response => setProduct(response.data.product))
  }, [])

  const addProductToCart = () => {
    const data = {
      'productID': productId
    }

    axios.post(`http://127.0.0.1:8000/api/addProductToCart/`, data, {
      withCredentials: true,
    })
      .then(response => {
        navigate(`cart`);
      })
  }

  return (
    <div>
      <Header />
      <Main>

        <ul className="flex gap-2 w-full justify-center items-center">
          {
            product.categories ?
              product.categories.map((category) => (
                <li key={category.name} className="bg-green-200 text-indigo-800 px-3 py-1 rounded-xl text-md">
                  {category.name}
                </li>
              ))
              :
              <></>
          }
        </ul>

        <div className="flex flex-col justify-center items-center lg:flex-row lg:items-start gap-8">

          <img className="w-full max-w-xl" src={`http://127.0.0.1:8000/media/${product.image}`} />

          <div className="flex flex-col gap-4">
            <h2 className="capitalize italic text-green-700 text-3xl">{product.name}</h2>
            <h3 className="text-purple-800 text-2xl">R${product.price}</h3>
            <h2 className="text-purple-800 text-3xl">Descrição</h2>
            <p className="text-lg max-w-xl">{product.description}</p>
            <button className="flex justify-center items-center gap-1 w-fit px-6 py-2 border-green-600 text-green-800 border-2 text-lg hover:bg-green-600 hover:text-white" onClick={addProductToCart}>
              <LuShoppingCart />
              Comprar
            </button>

          </div>

        </div>



      </Main>
    </div>
  );
}