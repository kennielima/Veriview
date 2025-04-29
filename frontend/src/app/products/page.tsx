"use client"
import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/Searchbar'
import { fetchProducts } from '../hooks/useGetProducts';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

const page = () => {
    const [Products, setProducts] = useState([]);
    const [sort, setSort] = useState("recent");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const offset = currentPage * 5;

    useEffect(() => {
        const FetchProducts = async () => {
            const data = await fetchProducts(currentPage, sort);

            setProducts(data?.data);
            setTotalPages(data?.totalPages);
            setTotalProducts(data?.totalProducts)
            setHasNextPage(data?.hasNextPage)
            setHasPrevPage(data?.hasPrevPage)
        }
        FetchProducts();
    }, [currentPage, sort])

    const handleSortChange = (e: any) => {
        setSort(e.target.value);
    };

    return (
        <div className='flex flex-col items-center gap-12 my-14 px-16'>
            <h1 className='text-xl font-bold'>All Reviewed Brands</h1>
            <p className='text-left w-full mb-[-2rem] pl-4'>Showing <span className='font-semibold'>{hasNextPage ? offset : totalProducts}</span> of <span className='font-semibold'>{totalProducts}</span> brands</p>
            <div className='flex flex-col-reverse md:flex-row gap-14 justify-between w-full'>
                <div className="mx-auto px-4 space-y-4 w-full md:w-5/6">
                    {Products && Products.length > 0 ? (
                        Products.map((product: Product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <p>No Brands found</p>
                    )}
                </div>
                <div className='flex flex-col gap-5 md:gap-10 md:border md:border-gray-3 md:py-10 px-6 h-fit md:h-screen md:rounded-md md:shadow'>
                    <SearchBar searchCategory={"brands"} placeholder={"Search by brand..."} />
                    <div className="flex items-center justify-end md:justify-center w-full">
                        <label htmlFor="sort" className="font-semibold mr-2">Sort by:</label>
                        <select
                            id="sort"
                            value={sort}
                            onChange={handleSortChange}
                            className="border border-gray-400 shadow-sm rounded-md px-3 py-1.5 md:py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="recent">Recently Reviewed</option>
                            <option value="asc">A - Z</option>
                            <option value="desc">Z - A</option>
                            <option value="reviewcount-desc">Most Popular</option>
                            <option value="reviewcount-asc">Least Popular</option>
                            <option value="highest">Highest Rated</option>
                            <option value="lowest">Lowest Rated</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* <hr className='border-[0.5px] border-gray-300 h-screen' /> */}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
            />
        </div>
    )
}

export default page