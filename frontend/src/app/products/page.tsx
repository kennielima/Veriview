import React from 'react'
import SearchBar from '../../components/Searchbar'
import { fetchProducts } from '../hooks/useGetProducts';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import BrandSort from '@/components/BrandSort';

const page = async ({ searchParams }: { searchParams: { page: number, sort: string } }) => {
    const param = await searchParams;
    const FetchProducts = await fetchProducts(param.page, param.sort)
    const { data: Products, totalProducts, totalPages, hasNextPage, hasPrevPage } = FetchProducts;
    let offset = (param.page ? param.page : 1) * 5;

    return (
        <div className='flex flex-col items-center gap-8 md:gap-12 my-10 px-8'>
            <h1 className='text-xl font-bold'>All Reviewed Brands</h1>
            {Products?.length > 0 &&
                <p className='hidden md:flex gap-1 text-left w-full mb-[-2rem] pl-4'>
                    Showing{" "}
                    <span className='font-semibold'>{hasNextPage ? offset : totalProducts}</span>
                    {" "}of{" "}
                    <span className='font-semibold'>{totalProducts}</span>
                    {" "}brands
                </p>
            }
            <div className='flex flex-col-reverse md:flex-row gap-14 justify-between w-full'>
                <div className="mx-auto px-4 space-y-4 w-full md:w-5/6">
                    {Products?.length > 0 &&
                        <p className='md:hidden text-left w-full md:mb-[-2rem]'>
                            Showing{" "}
                            <span className='font-semibold'>{hasNextPage ? offset : totalProducts}</span>
                            {" "}of{" "}
                            <span className='font-semibold'>{totalProducts}</span>
                            {" "}brands
                        </p>
                    }
                    {Products && Products?.length > 0 ? (
                        Products.map((product: Product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <p className='text-center'>No Brands found</p>
                    )}
                </div>
                <div className='flex flex-col gap-5 md:gap-6 md:border md:border-gray-3 md:py-10 px-6 h-fit md:h-screen md:rounded-md md:shadow'>
                    <SearchBar searchCategory={"brands"} placeholder={"Search by brand..."} />
                    <BrandSort param={param} />
                </div>
            </div>
            {/* <hr className='border-[0.5px] border-gray-300 h-screen' /> */}
            <Pagination
                param={param}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
            />
        </div>
    )
}

export default page