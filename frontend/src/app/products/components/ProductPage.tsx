import { fetchProducts } from '@/app/hooks/useGetProducts'
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Product } from '@/lib/types'

const ProductPage = async () => {
    const Products = await fetchProducts()

    return (
        <div className="space-y-4 w-full">
            {Products && Products.length > 0 ? (
                Products.map((product: Product) => (
                    <div className='flex flex-col' key={product.id}>
                        <div className='flex gap-1 items-center'>
                            <Link href={`products/${product.id}`} className='hover:text-gray-600'>{product.name}</Link>
                            <Star
                                className='text-yellow-500 w-4 h-4 ml-1'
                                fill={"currentColor"}
                                stroke="currentColor"
                            />
                            <p className='text-gray-600 text-sm'>{product.averageRating}</p>
                        </div >
                        <p className='text-gray-600 text-sm'>{product.reviews.length} reviews</p>
                    </div >
                ))
            ) : (
                <p>No Products found</p>
            )
            }
        </div >
    )
}
export default ProductPage