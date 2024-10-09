'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import useNavigate from '../hooks/useNavigate'

const page = () => {

    const navigate = useNavigate();
    const userData = useAuth()

    const [userCard, setUserCard] = useState([])
    const [totalValue, setTotalValue] = useState(0)

    useEffect(() => {

        if (userData.is_logged) {
            axios.get(`http://127.0.0.1:8000/api/getUserCart/`, {
                withCredentials: true,
            })
                .then(response => {
                    setUserCard(response.data.cart_items)
        })}

    }, [userData])

    useEffect(() => {
        const total = userCard.reduce((accumulator, product) => {
            return accumulator + parseFloat(product.price);
        }, 0);
        setTotalValue(total);
    }, [userCard]);

    const removeProductFromCart = (productID) => {

        const data = {
            'productID': productID
        }

        if (userData.is_logged) {
            axios.post(`http://127.0.0.1:8000/api/removeProductFromCart/`, data, {
                withCredentials: true,
            })
                .then(response => setUserCard(response.data.cart_items))
        }
    }

    const payCart = () => {

        const phone = "5533998212351";
        const message = `Olá, gostaria de finalizar minha compra! 🛒

*_Detalhes do Pedido_*

*Nome do Cliente*: ${userData.username}
*Produtos*: 
${userCard.map((product) => `- ${product.name} (1): R$${product.price}`).join('\n')}
*Total*: R$${totalValue}

Aguardo as instruções para concluir a compra. Obrigado!
`;
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

        window.open(url, '_blank').focus();
        
        // createOrdering()
    }

    return (
        <div>
            <Header />
            <Main>
                {
                    userCard > [] ?
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl text-gray-700 italic">Meu carrinho</h1>
                            <ul className="flex flex-col justify-center w-full gap-4">
                                {userCard.map((product) => (
                                    <li className='flex border-y-2 border-gray-400 py-2 gap-3' key={product.id}>
                                        <div className="w-32 flex justify-center items-center bg-white">
                                            <img className="min-h-32 max-h-32 min-w-32 max-w-32" src={`http://127.0.0.1:8000/media/${product.image}`} />
                                        </div>
                                        <div className='flex flex-col py-2'>
                                            <h2 className="text-xl text-gray-800" onClick={() => navigate(`product/${product.id}`)}>{product.name}</h2>
                                            <h3 className="text-lg text-gray-500">R${product.price}</h3>
                                            <button className='bg-red-300 self-start mt-auto px-2 py-1 rounded-lg text-sm' onClick={() => removeProductFromCart(product.id)}>Remover</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col gap-2 items-end">
                                <p className="text-2xl text-gray-600">Valor Total: R${totalValue}</p>
                                <button onClick={payCart} className="bg-sky-200 w-2/4 rounded-sm py-1 text-xl text-gray-800">Fechar pedido</button>
                            </div>

                        </div>
                        :
                        <p>No items in your cart.</p>
                }
            </Main>
        </div>
    )
}

export default page