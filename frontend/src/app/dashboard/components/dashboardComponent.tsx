"use client"
import { useState } from 'react';
import { Star, Edit, Trash2, Settings, User as UserIcon, BookOpen, Heart, Clock, Grid, List, Plus, Filter, ChevronDown, Bell } from 'lucide-react';
import { formatDateTime, getInitials } from '@/lib/utils';
import { RatedHelpful, User } from '@/lib/types';
import ReviewCard from '@/components/Card';

export default function Dashboard({ user, userRateHelpful }: { user: User, userRateHelpful: RatedHelpful[] }) {
    const [activeTab, setActiveTab] = useState('my-reviews');
    const [activityTab, setActivityTab] = useState('product-rating');

    const reviews = user.reviews || [];
    // const ratedreviews = userRateHelpful?.review || [];
    console.log(userRateHelpful, "userRateHelpful")

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:flex lg:space-x-8">
                    {/* Sidebar / Profile Section */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                            <div className="bg-indigo-600 h-24 relative">
                                <div className="absolute -bottom-10 left-6">
                                    <div className="h-20 w-20 rounded-full bg-indigo-500 border-4 border-white flex items-center justify-center text-white text-xl font-bold">
                                        {getInitials(user.fullName)}
                                    </div>
                                </div>
                                {/* <div className="absolute top-4 right-4">
                                    <button className="bg-white/20 text-white rounded-full p-1.5 hover:bg-white/30">
                                        <Settings size={16} />
                                    </button>
                                </div> */}
                            </div>

                            <div className="pt-12 px-6 pb-6">
                                <h2 className="text-xl font-bold text-gray-900">{user.fullName}</h2>
                                <p className="text-gray-500">@{user.username}</p>

                                <div className="mt-4 text-sm text-gray-500">
                                    <p>Member since {formatDateTime(user.createdAt)}</p>
                                </div>

                                <div className="mt-6 flex space-x-6 text-sm">
                                    <div>
                                        <span className="font-bold text-gray-900">{reviews?.length}</span>
                                        <span className="text-gray-500 ml-1">Reviews</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-900">{user?.userratings?.length}</span>
                                        <span className="text-gray-500 ml-1">Brand Ratings</span>
                                    </div>
                                </div>

                                {/* <button className="mt-6 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
                                    Edit Profile
                                </button> */}
                            </div>
                        </div>

                        {/* Sidebar Navigation */}
                        <div className="bg-white rounded-lg shadow overflow-hidden" >
                            <nav className="px-2 py-4" >
                                <button
                                    onClick={() => setActiveTab('my-reviews')}
                                    className={`flex items-center px-4 py-2 w-full text-left rounded-md ${activeTab === 'my-reviews' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <BookOpen size={18} className="mr-3" />
                                    <span>My Reviews </span>
                                </button>

                                < button
                                    onClick={() => setActiveTab('activity')}
                                    className={`flex items-center px-4 py-2 w-full text-left rounded-md ${activeTab === 'activity' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Clock size={18} className="mr-3" />
                                    <span>Recent Activity </span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:flex-1 mt-6 lg:mt-0">
                        {/* Content Header */}
                        <div className="bg-white rounded-lg shadow px-6 py-4 mb-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h1 className="text-xl font-bold text-gray-900">
                                    {activeTab === 'my-reviews' && `My Reviews (${reviews.length})`}
                                    {activeTab === 'activity' && 'Recent Activity'}
                                </h1>

                                <div className="mt-4 sm:mt-0 flex space-x-2">
                                    <button className="flex items-center px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
                                        <Plus size={14} className="mr-1.5" />
                                        <span>New Review</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Content */}
                        {activeTab === 'my-reviews' && (
                            <div className={"space-y-4"}>
                                {reviews.map(review => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        )}

                        {/* Activity Content */}
                        {activeTab === 'activity' && (
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between items-center text-base font-medium text-gray-900 my-3 w-full sm:w-3/4 mx-auto">
                                    <h1
                                        className={`${activityTab === 'product-rating' && "font-bold text-lg border border-indigo-500 py-2 px-4 rounded-md shadow-md"} cursor-pointer`}
                                        onClick={() => setActivityTab('product-rating')}
                                    >
                                        Product Ratings ({user?.userratings?.length})
                                    </h1>
                                    <h1
                                        className={`${activityTab === 'rated-helpful' && "font-bold text-lg border border-indigo-500 py-2 px-4 rounded-md shadow-md"} cursor-pointer`}
                                        onClick={() => setActivityTab('rated-helpful')}
                                    >
                                        Reviews Rated Helpful <span className='text-base'>({user?.ratedhelpful?.length})</span>
                                    </h1>
                                </div>
                                <div className="p-6 text-center text-gray-500">
                                    {activityTab === 'product-rating' && (
                                        <div>

                                        </div>
                                    )}
                                    {activityTab === 'rated-helpful' && (
                                        <div>
                                            {userRateHelpful &&
                                                userRateHelpful.map((userRateHelpful: RatedHelpful) => (
                                                    userRateHelpful.review && (
                                                        <div key={userRateHelpful.id}>
                                                            <ReviewCard review={userRateHelpful.review} />
                                                        </div>
                                                    )
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}