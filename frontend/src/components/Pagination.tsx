"use client"
import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationTypeProps = {
    param: { page?: number; sort?: string; }
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

const Pagination: React.FC<PaginationTypeProps> = ({ param, totalPages, hasNextPage, hasPrevPage }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(param.page) || 1;

    const handlePageChange = (currentPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', currentPage.toString());
        router.push(`?${params.toString()}`);
        // window.location.href = `?${param.sort ? `sort=${param.sort}&` : ""}page=${currentPage}`;
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="mt-8 flex justify-center">
            <nav className="flex items-center">
                <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={!hasPrevPage}
                    className={`p-2 rounded-l-md border ${!hasPrevPage
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    <ChevronLeftIcon size={20} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    if (
                        pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-10 h-10 border-t border-b ${currentPage === pageNum
                                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    } else if (
                        (pageNum === currentPage - 2 && currentPage > 3) ||
                        (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                        return (
                            <span
                                key={pageNum}
                                className="w-10 h-10 border-t border-b flex items-center justify-center text-gray-500"
                            >
                                ...
                            </span>
                        );
                    }
                    return null;
                })}
                <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={!hasNextPage}
                    className={`p-2 rounded-r-md border ${!hasNextPage
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    <ChevronRightIcon size={20} />
                </button>
            </nav>
        </div>
    )
}

export default Pagination