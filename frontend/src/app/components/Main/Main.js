import React from 'react'

const Main = ({children}) => {
  return (
    <main className="pt-32 pb-10 flex flex-col px-6">
        {children}
    </main>
  )
}

export default Main