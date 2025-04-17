import React from 'react'
import SearchBar from '../../components/Searchbar'
import { fetchProducts } from '../hooks/useGetProducts';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

const page = async () => {
    const Products = await fetchProducts();

    return (
        <div className='max-w-4xl flex flex-col gap-12 items-center mx-auto my-8'>
            <h1 className='text-xl font-bold'>All Reviewed Brands ({Products.length})</h1>
            <SearchBar searchCategory={"brands"} setIsMenuOpen={undefined} />
            <div className='w-full mx-auto'>
                <div className="mx-auto max-w-xl px-8 md:px-4 space-y-4 w-full">
                    {Products && Products.length > 0 ? (
                        Products.map((product: Product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <p>No Brands found</p>
                    )}
                </div >
            </div>
        </div>
    )
}

export default page