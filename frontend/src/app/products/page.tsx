import React from 'react'
import ProductPage from './components/ProductPage'

const page = () => {
    return (
        <div className='max-w-4xl flex flex-col gap-12 items-center mx-auto my-8'>
            <h1 className='text-xl font-bold'>All Products</h1>
            <ProductPage />
        </div>
    )
}

export default page