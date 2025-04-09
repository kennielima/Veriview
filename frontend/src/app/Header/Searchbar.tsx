import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchTerm !== '' ? router.push(`/search/${searchTerm}`) : router.push('/')
    };
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setSearchTerm(e.target.value)
        e.target.value !== '' ? router.push(`/search/${e.target.value}`) : router.push('/')
    };

    const clearSearchBar = () => {
        setSearchTerm('')
        router.push('/')
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex text-sm items-center w-auto max-w-xl"
        >
            <input
                type="text"
                value={searchTerm}
                onChange={changeHandler}
                placeholder="Search..."
                className="font-normal w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
            </div>
            {searchTerm && (
                <button
                    type="button"
                    onClick={clearSearchBar}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </form>
    );
};

export default SearchBar;
