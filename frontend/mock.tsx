// import { useState } from 'react';
// import { Star, Edit, Trash2, Settings, User, BookOpen, Heart, Clock, Grid, List, Plus, Filter, ChevronDown, Bell } from 'lucide-react';

// export default function UserDashboard() {
//     const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//     const [activeTab, setActiveTab] = useState('my-reviews');

//     // Sample user data
//     const user = {
//         name: "Alex Johnson",
//         username: "alexj",
//         avatar: null, // Will use initials if no avatar
//         joinDate: "January 2023",
//         reviewCount: 24,
//         followersCount: 156,
//         followingCount: 42
//     };

//     // Sample reviews data
//     const reviews = [
//         {
//             id: 1,
//             brandName: "TechGadgets",
//             title: "Excellent Customer Service",
//             content: "I had an issue with my recent purchase and their support team was incredibly helpful and responsive. They resolved my problem within hours.",
//             rating: 5,
//             date: "2 weeks ago",
//             likes: 24,
//             comments: 3,
//             image: "/api/placeholder/300/200"
//         },
//         {
//             id: 2,
//             brandName: "CoffeeDelights",
//             title: "Disappointing Quality",
//             content: "The coffee beans I received were stale and didn't have the advertised aroma. I expected better quality given the premium price point.",
//             rating: 2,
//             date: "1 month ago",
//             likes: 15,
//             comments: 7,
//             image: null
//         },
//         {
//             id: 3,
//             brandName: "FitnessPro",
//             title: "Great Workout Equipment",
//             content: "The home gym equipment I purchased is sturdy, easy to assemble and perfect for my daily workouts. Definitely worth the investment.",
//             rating: 5,
//             date: "3 weeks ago",
//             likes: 42,
//             comments: 5,
//             image: "/api/placeholder/300/200"
//         },
//         {
//             id: 4,
//             brandName: "BookWonders",
//             title: "Fast Shipping, Damaged Product",
//             content: "While the shipping was impressively fast, the book arrived with a damaged cover. Customer service was helpful with the return process.",
//             rating: 3,
//             date: "2 days ago",
//             likes: 8,
//             comments: 1,
//             image: null
//         }
//     ];

//     // Sample drafts
//     const drafts = [
//         {
//             id: 101,
//             brandName: "EcoFriendly",
//             title: "Sustainable Packaging",
//             lastEdited: "Yesterday",
//             rating: 4
//         },
//         {
//             id: 102,
//             brandName: "TravelAgency",
//             title: "European Tour Experience",
//             lastEdited: "4 days ago",
//             rating: 0 // No rating yet
//         }
//     ];

//     // Sample bookmarked brands
//     const bookmarkedBrands = [
//         {
//             id: 201,
//             name: "TechGadgets",
//             category: "Electronics",
//             avgRating: 4.2,
//             reviewCount: 1245
//         },
//         {
//             id: 202,
//             name: "FitnessPro",
//             category: "Health & Fitness",
//             avgRating: 4.7,
//             reviewCount: 876
//         },
//         {
//             id: 203,
//             name: "BookWonders",
//             category: "Books & Media",
//             avgRating: 4.1,
//             reviewCount: 2354
//         }
//     ];

//     const renderStars = (rating: number) => {
//         return Array(5).fill(0).map((_, i) => (
//             <Star 
//         key= { i }
//         size = { 16}
//         className = { i<rating ? "text-yellow-500 fill-yellow-500": "text-gray-300" }
//             />
//     ));
//     };

//     const getInitials = (name: string) => {
//         return name
//             .split(' ')
//             .map(part => part[0])
//             .join('')
//             .toUpperCase();
//     };

//     return (
//         <div className= "min-h-screen bg-gray-50" >
//         {/* Header */ }
//         < header className = "bg-white shadow-sm" >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center" >
//                 <div className="font-bold text-xl text-blue-600" > ReviewHub </div>

//                     < div className = "flex items-center space-x-4" >
//                         <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative" >
//                             <Bell size={ 20 } />
//                                 < span className = "absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" > </>
//                                     </button>
//                                     < div className = "h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium" >
//                                         { user.avatar ? <img src={ user.avatar } alt = { user.name } /> : getInitials(user.name)
// }
// </>
//     </div>
//     </div>
//     </header>

//     < div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
//         <div className="lg:flex lg:space-x-8" >
//             {/* Sidebar / Profile Section */ }
//             < div className = "lg:w-1/4" >
//                 <div className="bg-white rounded-lg shadow overflow-hidden mb-6" >
//                     <div className="bg-blue-600 h-24 relative" >
//                         {/* Profile picture overlay */ }
//                         < div className = "absolute -bottom-10 left-6" >
//                             <div className="h-20 w-20 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center text-white text-xl font-bold" >
//                                 { user.avatar ? <img src={ user.avatar } alt = { user.name } /> : getInitials(user.name)}
// </div>
//     </div>
//     < div className = "absolute top-4 right-4" >
//         <button className="bg-white/20 text-white rounded-full p-1.5 hover:bg-white/30" >
//             <Settings size={ 16 } />
//                 </button>
//                 </div>
//                 </div>

//                 < div className = "pt-12 px-6 pb-6" >
//                     <h2 className="text-xl font-bold text-gray-900" > { user.name } </h2>
//                         < p className = "text-gray-500" > @{ user.username } </p>

//                             < div className = "mt-4 text-sm text-gray-500" >
//                                 <p>Member since { user.joinDate } </p>
//                                     </div>

//                                     < div className = "mt-6 flex space-x-6 text-sm" >
//                                         <div>
//                                         <span className="font-bold text-gray-900" > { user.reviewCount } </span>
//                                             < span className = "text-gray-500 ml-1" > Reviews </span>
//                                                 </div>
//                                                 < div >
//                                                 <span className="font-bold text-gray-900" > { user.followersCount } </span>
//                                                     < span className = "text-gray-500 ml-1" > Followers </span>
//                                                         </div>
//                                                         < div >
//                                                         <span className="font-bold text-gray-900" > { user.followingCount } </span>
//                                                             < span className = "text-gray-500 ml-1" > Following </span>
//                                                                 </div>
//                                                                 </div>

//                                                                 < button className = "mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md" >
//                                                                     Edit Profile
//                                                                         </button>
//                                                                         </div>
//                                                                         </div>

// {/* Sidebar Navigation */ }
// <div className="bg-white rounded-lg shadow overflow-hidden" >
//     <nav className="px-2 py-4" >
//         <button
//                   onClick={ () => setActiveTab('my-reviews') }
// className = {`flex items-center px-4 py-2 w-full text-left rounded-md ${activeTab === 'my-reviews' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//     }`}
//                 >
//     <BookOpen size={ 18 } className = "mr-3" />
//         <span>My Reviews </span>
//             </button>

//             < button
// onClick = {() => setActiveTab('drafts')}
// className = {`flex items-center px-4 py-2 w-full text-left rounded-md ${activeTab === 'drafts' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//     }`}
//                 >
//     <Edit size={ 18 } className = "mr-3" />
//         <span>Drafts </span>
//         </>

//         < button
// onClick = {() => setActiveTab('bookmarks')}
// className = {`flex items-center px-4 py-2 w-full text-left rounded-md ${activeTab === 'bookmarks' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//     }`}
//                 >
//     <Heart size={ 18 } className = "mr-3" />
//         <span>Bookmarked Brands </span>
//             </button>

//             < button
// onClick = {() => setActiveTab('activity')}
// className = {`flex items-center px-4 py-2 w-full text-left rounded-md ${activeTab === 'activity' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//     }`}
//                 >
//     <Clock size={ 18 } className = "mr-3" />
//         <span>Recent Activity </span>
//             </button>
//             </nav>
//             </div>
//             </div>

// {/* Main Content */ }
// <div className="lg:flex-1 mt-6 lg:mt-0" >
//     {/* Content Header */ }
//     < div className = "bg-white rounded-lg shadow px-6 py-4 mb-6" >
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center" >
//             <h1 className="text-xl font-bold text-gray-900" >
//                 { activeTab === 'my-reviews' && 'My Reviews'}
// { activeTab === 'drafts' && 'My Drafts' }
// { activeTab === 'bookmarks' && 'Bookmarked Brands' }
// { activeTab === 'activity' && 'Recent Activity' }
// </h1>

//     < div className = "mt-4 sm:mt-0 flex space-x-2" >
//         { activeTab === 'my-reviews' && (
//             <>
//             <div className="flex items-center" >
//                 <button 
//                           onClick={ () => setViewMode('grid') }
// className = {`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-100' : 'text-gray-500 hover:bg-gray-50'}`}
//                         >
//     <Grid size={ 18 } />
//         </button>
//         < button
// onClick = {() => setViewMode('list')}
// className = {`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-100' : 'text-gray-500 hover:bg-gray-50'}`}
//                         >
//     <List size={ 18 } />
//         </button>
//         </div>

//         < button className = "flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50" >
//             <Filter size={ 14 } className = "mr-1.5" />
//                 <span>Filter </span>
//                 < ChevronDown size = { 14} className = "ml-1.5" />
//                     </button>
//                     </>
//                   )}

// <button className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700" >
//     <Plus size={ 14 } className = "mr-1.5" />
//         <span>New Review </span>
//             </button>
//             </div>
//             </div>
//             </div>

// {/* Reviews Content */ }
// {
//     activeTab === 'my-reviews' && (
//         <div className={ viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4" }>
//         {
//             reviews.map(review => (
//                 <div key= { review.id } className = {`bg-white rounded-lg shadow overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`} >
//         {
//             review.image && viewMode === 'grid' && (
//                 <div className="h-48 overflow-hidden">
//                     <img src={ review.image } alt = { review.title } className = "w-full h-full object-cover" />
//                         </div>
//                     )
// }
// {
//     review.image && viewMode === 'list' && (
//         <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0" >
//             <img src={ review.image } alt = { review.title } className = "w-full h-full object-cover" />
//                 </div>
//                     )
// }
// <div className="p-4 flex-1" >
//     <div className="flex justify-between items-start" >
//         <div>
//         <div className="text-sm font-medium text-blue-600" > { review.brandName } </div>
//             < h3 className = "font-semibold text-gray-900 mt-1" > { review.title } </h3>
//                 </div>
//                 < div className = "flex items-center space-x-1" >
//                     { renderStars(review.rating) }
//                     </div>
//                     </div>
//                     < p className = "mt-2 text-gray-600 text-sm line-clamp-2" > { review.content } </p>
//                         < div className = "mt-3 flex justify-between items-center text-sm" >
//                             <div className="text-gray-500" > { review.date } </div>
//                                 < div className = "flex space-x-3" >
//                                     <span className="text-gray-500" > { review.likes } likes </span>
//                                         < span className = "text-gray-500" > { review.comments } comments </span>
//                                             </div>
//                                             </div>
//                                             < div className = "mt-4 flex justify-end space-x-2" >
//                                                 <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded" >
//                                                     <Edit size={ 16 } />
//                                                         </button>
//                                                         < button className = "p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" >
//                                                             <Trash2 size={ 16 } />
//                                                                 </button>
//                                                                 </div>
//                                                                 </div>
//                                                                 </div>
//                 ))}
// </div>
//             )}

// {/* Drafts Content */ }
// {
//     activeTab === 'drafts' && (
//         <div className="bg-white rounded-lg shadow overflow-hidden" >
//             <div className="divide-y divide-gray-200" >
//             {
//                 drafts.map(draft => (
//                     <div key= { draft.id } className = "p-4 flex justify-between items-center" >
//                     <div>
//                     <div className="text-sm font-medium text-blue-600" > { draft.brandName } </div>
//                 < h3 className = "font-semibold text-gray-900" > { draft.title } </h3>
//                 < div className = "text-xs text-gray-500 mt-1" > Last edited: { draft.lastEdited } </div>
//                 </div>
//                 < div className = "flex items-center space-x-4" >
//                 <div className="flex" >
//                 { draft.rating > 0 ? renderStars(draft.rating) : <span className="text-sm text-gray-400"> No rating</ span >}
//                 </div>
//                 < div className = "flex space-x-2" >
//                     <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded" >
//                         <Edit size={ 16 } />
//                             </button>
//                             < button className = "p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" >
//                                 <Trash2 size={ 16 } />
//                                     </button>
//                                     </div>
//                                     </div>
//                                     </div>
//                   ))
// }

// {
//     drafts.length === 0 && (
//         <div className="p-8 text-center" >
//             <p className="text-gray-500" > You don't have any draft reviews.</p>
//                 < button className = "mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm" >
//                     Start a New Review
//                         </button>
//                         </div>
//                   )
// }
// </div>
//     </div>
//             )}

// {/* Bookmarked Brands */ }
// {
//     activeTab === 'bookmarks' && (
//         <div className="bg-white rounded-lg shadow overflow-hidden" >
//             <div className="divide-y divide-gray-200" >
//             {
//                 bookmarkedBrands.map(brand => (
//                     <div key= { brand.id } className = "p-4 flex justify-between items-center" >
//                     <div>
//                     <h3 className="font-semibold text-gray-900" > { brand.name } </h3>
//                 < div className = "text-sm text-gray-500 mt-1" > { brand.category } </div>
//                 </div>
//                 < div className = "flex items-center space-x-6" >
//                 <div className="text-sm" >
//                 <div className="flex items-center" >
//                 <Star size={ 16} className = "text-yellow-500 fill-yellow-500 mr-1" />
//                 <span className="font-medium" > { brand.avgRating } </span>
//                 < span className = "text-gray-500 ml-1" > ({ brand.reviewCount }) </span>
//                 </div>
//                 </div>
//                 < button className = "px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50" >
//                 Write Review
//                 </button>
//                 </div>
//                 </div>
//                 ))
//             }

//     {
//         bookmarkedBrands.length === 0 && (
//             <div className="p-8 text-center" >
//                 <p className="text-gray-500" > You haven't bookmarked any brands yet.</p>
//                     < button className = "mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm" >
//                         Explore Brands
//                             </button>
//                             </div>
//                   )
//     }
//     </div>
//         </div>
//             )
// }

// {/* Activity Content */ }
// {
//     activeTab === 'activity' && (
//         <div className="bg-white rounded-lg shadow overflow-hidden" >
//             <div className="p-6 text-center text-gray-500" >
//                 <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                     <p>Recent activity will be available in a future update.</p>
//                         </div>
//                         </div>
//             )
// }
// </div>
//     </div>
//     </div>
//     </div>
//   );
// }