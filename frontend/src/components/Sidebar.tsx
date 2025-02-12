import { fetchProducts } from '@/app/hooks/useGetProducts'
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Product } from '@/lib/types'

const Sidebar = async () => {
    const Products = await fetchProducts()

    return (
        <div className='flex flex-col gap-4 my-8'>
            <h1 className='text-xl font-bold'>Products</h1>
            <div className="space-y-4 w-full">
                {Products && Products.length > 0 ? (
                    Products.map((product: Product) => (
                        <div className='flex flex-col' key={product.id}>
                            <div className='flex gap-1 items-center'>
                                <Link href={`products/${product.id}`} className='hover:text-gray-600'>{capitalizeFirstLetter(product.name)}</Link>
                                <Star
                                    className='text-yellow-500 w-4 h-4 ml-1'
                                    fill={"currentColor"}
                                    stroke="currentColor"
                                />
                                <p className='text-gray-600 text-sm'>{product.rating}</p>
                            </div>
                            <p className='text-gray-600 text-sm'>{product.reviews.length} reviews</p>
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