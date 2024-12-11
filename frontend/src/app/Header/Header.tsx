"use client"
import { Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                    ReviewMe
                </div>

                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-gray-700 hover:text-gray-900 transition">Home</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900 transition">Products</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900 transition">About</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900 transition">Contact</a>
                </nav>

                <div className="flex items-center space-x-4">
                    {/* <User className="cursor-pointer" /> */}
                    <Link href='/login'>
                    <button className='bg-background bg-opacity-50 rounded-md text-white px-4 py-2'> Login </button>
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className="md:hidden focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <X />
                        ) : (
                            <Menu />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-50">
                    <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <a href="#" className="text-xl text-gray-700 hover:text-gray-900">Home</a>
                        <a href="#" className="text-xl text-gray-700 hover:text-gray-900">Products</a>
                        <a href="#" className="text-xl text-gray-700 hover:text-gray-900">About</a>
                        <a href="#" className="text-xl text-gray-700 hover:text-gray-900">Contact</a>
                        <button
                            onClick={toggleMenu}
                            className="mt-8 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;