import { fetchProducts } from '@/app/hooks/useGetProducts'
import Link from 'next/link'
import React from 'react'

const Sidebar = async () => {
    const Products = await fetchProducts()

    return (
        <div className='flex flex-col gap-4 my-8'>
            <h1 className='text-xl font-bold'>Products</h1>
            <div className="space-y-4 w-full">
                {Products && Products.length > 0 ? (
                    Products.map((product: any) => (
                        <div key={product.id} className='flex gap-2'>
                            <Link href={`products/${product.id}`} className='hover:text-gray-600'>{product.name}</Link>
                            {/* <p>{product.rating}</p> */}
                        </div>
                    ))
                ) : (
                    <p>No Products found</p>
                )
                }
            </div>
        </div>
    )
}
export default Sidebar