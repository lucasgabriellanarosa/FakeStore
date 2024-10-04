'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import useAuth from '../hooks/useAuth'
import axios from 'axios'

const page = () => {

    const userData = useAuth()

    const [userCard, setUserCard] = useState([])

    useEffect(() => {

        if(userData.is_logged){
            axios.get(`http://127.0.0.1:8000/api/getUserCart/`, {
                withCredentials: true,
            })
            .then(response => setUserCard(response.data.cart_items))
        }
    
    }, [userData])

    const removeProductFromCart = (productID) => {

        const data = {
            'productID': productID
        }

        if(userData.is_logged){
            axios.post(`http://127.0.0.1:8000/api/removeProductFromCart/`, data, {
                withCredentials: true,
            })
            .then(response => setUserCard(response.data.cart_items))
        }
    }

  return (
    <div>
        <Header/>
        <Main>
            {
                userCard > [] ?
                    <div>
                        <ul className="flex flex-col justify-center w-full gap-4">
                            {userCard.map((product) => (
                                <li className='flex border-y-2 border-gray-400 py-2' key={product.id}>
                                    <div className="w-32 flex justify-center items-center bg-white">
                                        <img className="min-h-32 max-h-32" src={`http://127.0.0.1:8000/media/${product.image}`} />
                                    </div>
                                    <div className='flex flex-col bg-cyan-500'>
                                        <h2 className="text-xl text-gray-800">{product.name}</h2>
                                        <h3 className="text-lg text-gray-500">R${product.price}</h3>
                                        <button className='bg-red-400 self-start justify-self-end' onClick={() => removeProductFromCart(product.id)}>Remover</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <p>No items in your cart.</p>
            }
        </Main>
    </div>
  )
}

export default page