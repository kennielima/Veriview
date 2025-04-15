import { fetchProducts } from '@/app/hooks/useGetProducts'
import React from 'react'
import { Product } from '@/lib/types'
import ProductCard from '../../../components/ProductCard'

const ProductPage = async () => {
    const Products = await fetchProducts();

    return (
        <div className="mx-auto max-w-xl px-8 md:px-4 space-y-4 w-full">
            {Products && Products.length > 0 ? (
                Products.map((product: Product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))
            ) : (
                <p>No Brands found</p>
            )
            }
        </div >
    )
}
export default ProductPage