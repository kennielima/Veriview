"use client"
import { rateProduct } from '@/app/services/useRating';
import Modal from '@/components/Modal';
import { RenderStars } from '@/components/renderStars';
import { Product, Review, User } from '@/lib/types';
import { Check, LoaderCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


export type ProductTypeProps = {
    id: string;
    user: User;
    product: Product
}

const RateProduct: React.FC<ProductTypeProps> = ({ id, user, product }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [rating, setRating] = useState(0);
    const [reviewerCantRate, setReviewerCantRate] = useState(false);

    const router = useRouter();
    const UserReviews = user?.reviews || [];
    const userHasRatedBrand = UserReviews.filter((review: Review) => review.productId === id).length > 0;

    const submitRating = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (userHasRatedBrand) {
                setReviewerCantRate(true)
                return;
            }
            if (rating != 0 && user && !userHasRatedBrand) {
                await rateProduct(rating, id);
            }
            setIsOpen(true);
            router.push(`/products/${id}`);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={submitRating} className="flex flex-col justify-center gap-3">
            <div className='flex items-center space-x-1'>
                <span className='text-gray-600 text-sm'> Rate this brand: </span>
                <RenderStars rating={rating} setRating={setRating} size='size-5' />
            </div>
            <div className='flex flex-col gap-1 mb-4 md:mb-0'>
                <button
                    type='submit'
                    className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-2xl w-3/6 md:w-full md:mx-auto'
                >
                    Rate
                </button>
                {(reviewerCantRate && rating != 0) &&
                    <span className='text-xs'>A reviewer can&apos;t also rate.
                        <Link href='/faq?index=2' className='text-indigo-600 hover:text-indigo-500 font-bold'> Find out why</Link>
                    </span>
                }
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {isLoading ? (
                    <div className='flex w-full justify-center text-indigo-600'><LoaderCircle className='h-10 w-10 animate-spin' /></div>
                ) : (
                    <div>
                        <div
                            className='flex w-full justify-end text-gray-600 cursor-pointer mb-6'
                            onClick={() => setIsOpen(false)}
                        >
                            <X />
                        </div>
                        {!user ? (
                            <div className='flex flex-col w-full font-bold  items-center text-center gap-2'>
                                <div>You must be logged in to rate a product</div>
                                <Link href='/auth'>
                                    <button
                                        className='bg-indigo-600 mx-auto my-2 hover:bg-indigo-700 w-fit rounded-md text-white px-4 py-2'
                                    >
                                        Login
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className='flex flex-col w-full items-center text-center'>
                                <div className='rounded-full bg-[#36b400] w-fit p-6 text-white'>
                                    <Check className='size-8' />
                                </div>
                                <p className="mt-8 mb-2 text-lg font-semibold">You have successfully rated this brand!</p>
                                <div className=''>
                                    <span>Drop a review instead? </span>
                                    <Link href={`/create-review?brand=${product.id}`} className='text-indigo-600 text-sm font-semibold'>Post Review</Link>
                                </div>
                                <p className='text-xs text-gray-600 mx-3'>Posting reviews help others make better informed decisions about this brand</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </form>
    )
}

export default RateProduct;