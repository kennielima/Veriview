"use client"
import React, { useState } from 'react'
import { Copy, Share as ShareIcon, X } from 'lucide-react';
import Modal from '@/components/Modal'
import { Twitter, Whatsapp, Facebook, MailIcon } from '@/lib/Icons'
import Link from 'next/link';

const Share = ({ reviewId }: { reviewId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const link = `https://veriview.com.ng/reviews/${reviewId}`;

    const copyToClipboard = async () => {
        // const body = 'See this review:';
        // const text = `${body}\n${url}`;
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <div
                className='flex items-center gap-1 cursor-pointer hover:text-black'
                onClick={() => setIsOpen(true)}
            >
                <ShareIcon className='size-5 cursor-pointer' />
                <p className='text-xs'>Share</p>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div
                    className='flex w-full justify-end text-gray-600 cursor-pointer mb-4'
                    onClick={() => setIsOpen(false)}
                >
                    <X />
                </div>
                <div className='flex items-center justify-center gap-5 my-2'>
                    <div
                        className='flex flex-col justify-center items-center gap-1 cursor-pointer text-gray-800'
                        onClick={copyToClipboard}
                    >
                        <Copy className='size-8' />
                        <span className='text-sm'>{copied ? 'Link copied!' : 'Copy link'}</span>
                    </div>
                    <Link
                        className='flex flex-col justify-center items-center gap-1 cursor-pointer'
                        href={`https://wa.me/?text=${'See this review'}%20${link}`}
                        target='_blank'
                    >
                        <Whatsapp />
                        <span className='text-sm'>Whatsapp</span>
                    </Link>
                    {/* <Link
                        className='flex flex-col justify-center items-center gap-1 cursor-pointer'
                        href=''
                        target='_blank'
                    >
                        <Instagram />
                        <span className='text-sm'> Instagram</span>
                    </Link> */}
                    <Link
                        className='flex flex-col justify-center items-center gap-1 cursor-pointer'
                        href={`https://twitter.com/intent/tweet?url=${link}&text=${'See this review'}`}
                        target='_blank'
                    >
                        <Twitter />
                        <span className='text-sm'> Twitter</span>
                    </Link>
                    <Link
                        className='flex flex-col justify-center items-center gap-1 cursor-pointer'
                        href={`https://www.facebook.com/share.php?u=${link}&title=${'See this review'}`}
                        target='_blank'
                    >
                        <Facebook />
                        <span className='text-sm'>Facebook</span>
                    </Link>
                    <Link
                        className='flex flex-col justify-center items-center gap-1 cursor-pointer'
                        href={`mailto:?subject=${'Review from Veriview'}&body=See this review: ${link}`}
                        target='_blank'
                    >
                        <MailIcon />
                        <span className='text-sm'>Mail</span>
                    </Link>
                </div>
            </Modal>
        </div>
    )
}

export default Share