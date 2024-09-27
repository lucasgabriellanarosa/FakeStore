'use client'

import Header from "@/app/components/Header/Header";
import Main from "@/app/components/Main/Main";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function ProductPage({params}) {

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
      <img src={`http://127.0.0.1:8000/media/${product.image}`} />

      </Main>
    </div>
  );
}