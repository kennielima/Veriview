import React from 'react'
import ProductPage from './components/ProductPage'

const page = () => {
    return (
        <div className='max-w-4xl flex flex-col gap-12 items-center mx-auto my-8'>
            <h1 className='text-xl font-bold'>All Reviewed Brands</h1>
            <div className='w-full mx-auto'>
                <ProductPage />
            </div>
        </div>
    )
}

export default page