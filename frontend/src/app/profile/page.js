'use client'
import React from 'react'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const page = () => {

  const router = useRouter();

  const handleLogoutUser = () => {
      axios.post(`http://127.0.0.1:8000/api/logout/`, {}, {
          withCredentials: true,
        })
        .then(response =>
          router.push(`/login`)
          )
  }
    
  return (
    <div>
        <Header />
        <Main>
            <h1>hello!</h1>
            <button type="submit" onClick={handleLogoutUser} className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Sair</button>

        </Main>
    </div>
  )
}

export default page