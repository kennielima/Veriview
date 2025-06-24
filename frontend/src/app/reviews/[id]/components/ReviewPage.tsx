"use client"
import DeleteComponent from '@/app/reviews/[id]/components/Delete'
import RenderedStars from '@/components/renderStars'
import { RatedHelpful, Review, User } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { ArrowLeft, CircleArrowLeft, CircleArrowRight, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { rateHelpful } from '@/app/services/useRating'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Share from './Share'
import Image from 'next/image'

export type reviewTypeProps = {
    reviewData: {
        review: Review,
    };
    currentUser: {
        loggedIn: boolean;
        user: User
    };
    id: string
}
const ReviewPage: React.FC<reviewTypeProps> = ({ reviewData, currentUser, id }) => {
    const router = useRouter();
    const review = reviewData?.review;
    const ratedHelpfulArray = Array.isArray(review?.ratedhelpful) ? review?.ratedhelpful : [];
    const ratedhelpfulCount = ratedHelpfulArray.length;
    const userRatedHelpful = ratedHelpfulArray?.find((ratedhelpful: RatedHelpful) => currentUser?.user?.id === ratedhelpful?.userId);
    const [isRatedHelpful, setIsRatedHelpful] = useState(userRatedHelpful ? true : false);
    const [openImage, setOpenImage] = useState(false);
    const [currImage, setCurrImage] = useState(review?.images?.[0] || '');
    const [currImageIndex, setCurrImageIndex] = useState(0);

    const thumbRefs = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        thumbRefs.current[currImageIndex]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, [currImageIndex]);

    const thumbsUpHandler = async () => {
        const newRateHelpful = !isRatedHelpful;
        setIsRatedHelpful(newRateHelpful);
        await rateHelpful(newRateHelpful, id)
        router.push(`/reviews/${id}`)
    }

    const slides = Array.isArray(review.images) && review.images.length > 0
        ? review.images.map((image) => ({ src: image }))
        : [];


    return (
        <Fragment>
            {review && (
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <Link href='#' onClick={(e) => { e.preventDefault(); router.back() }}>
                        <button className="mb-6 flex items-center px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-md transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Reviews
                        </button>
                    </Link>

                    <div className="p-8 mx-auto bg-white shadow-md rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-4 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-4">{review.title}</h1>
                                <div className="flex items-center mb-2 space-x-1 md:space-x-4">
                                    <RenderedStars rating={review.rating} />
                                    <span className="ml-2 text-gray-600">({review.rating}/5)</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="border-b pb-6 mb-6 border-t pt-6 mt-6">
                                <div className="grid md:grid-cols-2 gap-2 md:gap-4 text-sm text-gray-800">
                                    {review.brand && (
                                        <div>
                                            <strong>Brand:</strong>
                                            <Link href={`/products/${review?.productId}`} className='hover:text-black'>
                                                {" "}{review.brand}
                                            </Link>
                                        </div>
                                    )}
                                    <div>
                                        <strong>Reviewer: </strong>
                                        @
                                        {review.anonymous ? (
                                            <span>Anonymous</span>
                                        ) : (
                                            <Link href={`/users/${review.userId}`} className='hover:text-black'><span>{review?.user?.username}</span></Link>
                                        )}
                                    </div>
                                    <div>
                                        <strong>Date:</strong> {formatDateTime(review.createdAt)}
                                    </div>
                                </div>
                            </div>

                            {Array.isArray(review.images) && review.images.length > 0 && (
                                <div>
                                    <div className='relative flex items-center justify-center'>
                                        {/* <button disabled={currImageIndex === 0}> */}
                                        <CircleArrowLeft
                                            className={`${currImageIndex === 0 && 'opacity-50 cursor-default'} absolute left-4 size-12 text-indigo-600 opacit-80 cursor-pointer`}
                                            onClick={() => {
                                                setCurrImage(review.images![currImageIndex - 1]);
                                                setCurrImageIndex((prevIndex) => (prevIndex - 1));
                                            }}
                                        />
                                        <Image
                                            src={currImage}
                                            onClick={() => setOpenImage(true)}
                                            key={currImage}
                                            alt={`review-image-${currImage}`}
                                            className="w-full h-[32rem] object-cover rounded-lg mb-2 border border-gray-300 cursor-pointer"
                                            width={1000}
                                            height={1000}
                                        />
                                        <p className='absolute bottom-5 right-50 left-50 flex justify-center font-semibold text-lg bg-gray-700 bg-opacity-80 p-2 rounded-lg text-white'>{currImageIndex + 1} of {review.images.length}</p>
                                        {/* <button disabled={currImageIndex === review.images!.length - 1}> */}
                                        <CircleArrowRight
                                            className={`${currImageIndex === review.images!.length - 1 && 'opacity-50 cursor-default'} absolute right-4 size-12 text-indigo-600 cursor-pointer`}
                                            onClick={() => {
                                                setCurrImage(review.images![currImageIndex + 1]);
                                                setCurrImageIndex((prevIndex) => (prevIndex + 1));
                                            }}
                                        />
                                        {/* </button> */}
                                    </div>

                                    <div className="flex items-center gap-1 w-full overflow-x-scroll border border-gray-300 p-3 rounded-lg mb-4">
                                        {review.images && review.images.map((image: string, index: number) => (
                                            <Image
                                                ref={(el) => { thumbRefs.current[index] = el }}
                                                src={image}
                                                onClick={() => {
                                                    setCurrImage(image)
                                                    setCurrImageIndex(index)
                                                }}
                                                key={index}
                                                alt={`review-image-${index}`}
                                                className={` ${currImageIndex === index && 'border-2 border-indigo-500'} w-28 h-28 object-cover rounded-lg hover:cursor-pointer border hover:border-2 border-gray-300 hover:border-indigo-500 transition-colors`}
                                                width={600}
                                                height={600}
                                            />
                                        ))}
                                    </div>
                                    <Lightbox
                                        open={openImage}
                                        close={() => setOpenImage(false)}
                                        slides={slides}
                                        plugins={[Thumbnails]}
                                        thumbnails={{ width: 100, height: 100, position: 'bottom' }}
                                    // styles={{
                                    //     container: {
                                    //         maxWidth: '800px',
                                    //         maxHeight: '80vh',
                                    //         margin: 'auto',
                                    //         borderRadius: '16px',
                                    //         overflow: 'hidden',
                                    //     }
                                    // }}
                                    />
                                </div>
                            )}
                            <p className="text-gray-800 text-base leading-relaxed">{review.content}</p>
                        </div>
                        <div className='border-t pt-3 mt-6 text-gray-600 flex gap-7 items-center'>
                            <div className='flex items-center gap-2 cursor-pointer hover:text-black'>
                                <ThumbsUp
                                    className={`size-6 cursor-pointer ${isRatedHelpful && 'text-gray-600 hover:text-gray-900'}`}
                                    onClick={thumbsUpHandler}
                                    fill={isRatedHelpful ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                />
                                <p className=''>Helpful ({ratedhelpfulCount})</p>
                            </div>
                            <Share reviewId={review.id} />
                            {review.userId === currentUser?.user?.id && (
                                <DeleteComponent id={id} />
                            )}
                        </div>
                    </div>
                </div>
            )
            }
            {!review && (
                <div className="container h-screen mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold">Review Not Found</h1>
                    <Link
                        href='#'
                        onClick={(e) => {
                            e.preventDefault();
                            router.back()
                        }}>
                        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-md transition-colors">
                            Back to Reviews
                        </button>
                    </Link>
                </div>
            )}
        </Fragment>
    )
}

export default ReviewPage