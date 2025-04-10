import React, { SetStateAction, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchBar = (
    { setIsMenuOpen }: { setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }
) => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm !== '') {
            router.push(`/search/${searchTerm}`)
            setIsMenuOpen(false)
        }
    };
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setSearchTerm(e.target.value)
        // e.target.value !== '' ? router.push(`/search/${e.target.value}`) : router.push('/')
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
                className="font-normal w-full pl-10 pr-4 py-2 rounded-l-md border border-gray-400 border-r-0 hover:border-indigo-600 focus:outline-none"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
            </div>
            {searchTerm && (
                <button
                    type="button"
                    onClick={clearSearchBar}
                    className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
            <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md py-2 px-4 border border-indigo-600 hover:border-indigo-700'>Search</button>
        </form>
    );
};

export default SearchBar;
