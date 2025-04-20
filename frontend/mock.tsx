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








// "use client"
// import { useState } from 'react';
// import { Star, Search, Home, BookOpen, Users, Settings, Bell, Menu, X } from 'lucide-react';

// export default function ReviewsHomepage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
  
//   // Sample review data
//   const reviews = [
//     {
//       id: 1,
//       title: "Amazing Product Experience",
//       content: "This product exceeded all my expectations. The quality is outstanding and the performance is beyond anything I've tried before. Highly recommend to anyone looking for a reliable solution.",
//       rating: 5,
//       username: "JohnDoe",
//       timeAgo: "2 days ago"
//     },
//     {
//       id: 2,
//       title: "Good Value for Money",
//       content: "While not perfect, this offers excellent value for the price point. The features work as advertised and customer service was responsive when I had questions.",
//       rating: 4,
//       username: "SarahK",
//       timeAgo: "1 week ago"
//     },
//     {
//       id: 3,
//       title: "Decent but Has Some Issues",
//       content: "There are some good aspects to this product, but I encountered a few problems during setup. Once working, it performs adequately but could use improvements.",
//       rating: 3,
//       username: "TechGuru42",
//       timeAgo: "3 days ago"
//     },
//     {
//       id: 4,
//       title: "Excellent Customer Service",
//       content: "While the product itself is good, what really stood out was the customer service. They were incredibly helpful and resolved my issue promptly.",
//       rating: 5,
//       username: "CustomerFirst",
//       timeAgo: "5 hours ago"
//     },
//     {
//       id: 5,
//       title: "Not What I Expected",
//       content: "Unfortunately, the product didn't meet my expectations. The description was somewhat misleading, and I found the quality to be lower than advertised.",
//       rating: 2,
//       username: "HonestReviewer",
//       timeAgo: "2 weeks ago"
//     },
//     {
//       id: 6,
//       title: "Perfect for My Needs",
//       content: "This was exactly what I was looking for! Easy to use, well designed, and solves my problem perfectly. I've already recommended it to several friends.",
//       rating: 5,
//       username: "SatisfiedUser",
//       timeAgo: "1 day ago"
//     }
//   ];

// const renderStars = (rating: any) => {
//     return Array(5).fill(0).map((_, i) => (
//       <Star 
//         key={i}
//         size={16}
//         className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
//       />
//     ));
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <button onClick={toggleSidebar} className="text-gray-500 md:hidden">
//               <Menu size={24} />
//             </button>
//             <div className="font-bold text-xl text-blue-600">ReviewHub</div>
//           </div>
          
//           <div className="relative flex-1 max-w-lg mx-8 hidden md:block">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Search reviews..."
//             />
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
//               <Bell size={20} />
//             </button>
//             <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
//               JD
//             </div>
//           </div>
//         </div>
//       </header>
      
//       {/* Mobile Search - visible only on mobile */}
//       <div className="px-4 py-2 md:hidden">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Search reviews..."
//           />
//         </div>
//       </div>

//       <div className="flex flex-1">
//         {/* Sidebar for desktop */}
//         <aside className="hidden md:block w-64 bg-white shadow-md">
//           <div className="p-4">
//             <nav className="space-y-1">
//               <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700">
//                 <Home className="mr-3 h-5 w-5" />
//                 Home
//               </a>
//               <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
//                 <BookOpen className="mr-3 h-5 w-5" />
//                 My Reviews
//               </a>
//               <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
//                 <Users className="mr-3 h-5 w-5" />
//                 Community
//               </a>
//               <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
//                 <Settings className="mr-3 h-5 w-5" />
//                 Settings
//               </a>
//             </nav>
//           </div>
//         </aside>

//         {/* Mobile sidebar */}
//         {sidebarOpen && (
//           <div className="fixed inset-0 flex z-40 md:hidden">
//             <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
//             <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
//               <div className="absolute top-0 right-0 -mr-12 pt-2">
//                 <button
//                   className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//                   onClick={toggleSidebar}
//                 >
//                   <X className="h-6 w-6 text-white" />
//                 </button>
//               </div>
//               <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
//                 <div className="flex-shrink-0 flex items-center px-4">
//                   <span className="font-bold text-xl text-blue-600">ReviewHub</span>
//                 </div>
//                 <nav className="mt-5 px-2 space-y-1">
//                   <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-blue-100 text-blue-700">
//                     <Home className="mr-4 h-5 w-5" />
//                     Home
//                   </a>
//                   <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
//                     <BookOpen className="mr-4 h-5 w-5" />
//                     My Reviews
//                   </a>
//                   <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
//                     <Users className="mr-4 h-5 w-5" />
//                     Community
//                   </a>
//                   <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
//                     <Settings className="mr-4 h-5 w-5" />
//                     Settings
//                   </a>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Main content */}
//         <main className="flex-1 p-4 md:p-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-2xl font-bold text-gray-900">Recent Reviews</h1>
//               <div className="flex space-x-2">
//                 <select className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm">
//                   <option>Most Recent</option>
//                   <option>Highest Rated</option>
//                   <option>Lowest Rated</option>
//                 </select>
//                 <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-medium">
//                   Write Review
//                 </button>
//               </div>
//             </div>
            
//             {/* Review grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {reviews.map(review => (
//                 <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                   <div className="p-5">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-1">{review.title}</h3>
//                       <div className="flex">{renderStars(review.rating)}</div>
//                     </div>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-3">{review.content}</p>
//                     <div className="flex justify-between items-center text-xs text-gray-500">
//                       <span className="font-medium">{review.username}</span>
//                       <span>{review.timeAgo}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             {/* Pagination */}
//             <div className="mt-8 flex justify-center">
//               <nav className="flex items-center space-x-1">
//                 <a href="#" className="px-3 py-1 rounded border text-sm text-gray-500 hover:bg-gray-50">Previous</a>
//                 <a href="#" className="px-3 py-1 rounded border bg-blue-600 text-white text-sm">1</a>
//                 <a href="#" className="px-3 py-1 rounded border text-sm text-gray-700 hover:bg-gray-50">2</a>
//                 <a href="#" className="px-3 py-1 rounded border text-sm text-gray-700 hover:bg-gray-50">3</a>
//                 <span className="px-2 text-gray-500">...</span>
//                 <a href="#" className="px-3 py-1 rounded border text-sm text-gray-700 hover:bg-gray-50">8</a>
//                 <a href="#" className="px-3 py-1 rounded border text-sm text-gray-500 hover:bg-gray-50">Next</a>
//               </nav>
//             </div>
//           </div>
//         </main>
//       </div>
      
//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200 py-4">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="md:flex md:justify-between">
//             <div className="mb-4 md:mb-0">
//               <p className="text-sm text-gray-500">© 2025 ReviewHub. All rights reserved.</p>
//             </div>
//             <div className="flex space-x-6">
//               <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
//               <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
//               <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Guidelines</a>
//               <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Support</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }





// "use client"
// import { useState } from 'react';
// import { Search, Star, Filter, ChevronRight, ChevronDown, TrendingUp, Award, Clock, Menu, X, User } from 'lucide-react';

// export default function ReviewsHomepage() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // Sample featured brands
//   const featuredBrands = [
//     { id: 1, name: "TechGadgets", category: "Electronics", rating: 4.7, reviewCount: 1243, image: "/api/placeholder/100/100" },
//     { id: 2, name: "EcoFriendly", category: "Home & Garden", rating: 4.5, reviewCount: 876, image: "/api/placeholder/100/100" },
//     { id: 3, name: "TravelXpert", category: "Travel Services", rating: 4.2, reviewCount: 534, image: "/api/placeholder/100/100" },
//     { id: 4, name: "StyleShop", category: "Fashion", rating: 4.0, reviewCount: 1521, image: "/api/placeholder/100/100" },
//   ];

//   // Sample categories
//   const categories = [
//     { id: 1, name: "Electronics", reviewCount: 4325, icon: "💻" },
//     { id: 2, name: "Food & Dining", reviewCount: 5247, icon: "🍽️" },
//     { id: 3, name: "Health & Wellness", reviewCount: 2156, icon: "🌿" },
//     { id: 4, name: "Financial Services", reviewCount: 1876, icon: "💳" },
//     { id: 5, name: "Home & Garden", reviewCount: 3214, icon: "🏡" },
//     { id: 6, name: "Fashion", reviewCount: 2943, icon: "👕" },
//   ];

//   // Sample recent reviews
//   const recentReviews = [
//     {
//       id: 1,
//       brandName: "TechGadgets",
//       title: "Amazing Customer Service",
//       content: "I had an issue with my recent purchase and their support team was incredible. They responded within minutes and resolved my problem immediately. I've never experienced such excellent service before!",
//       rating: 5,
//       userName: "AlexJ",
//       userAvatar: null,
//       timeAgo: "2 hours ago",
//       helpful: 24,
//       comments: 5,
//       brandLogo: "/api/placeholder/48/48"
//     },
//     {
//       id: 2,
//       brandName: "FreshGrocery",
//       title: "Disappointed with Delivery",
//       content: "My delivery was late and some items were missing. When I contacted customer service, they were apologetic but couldn't resolve the issue quickly. I'll give them another chance but wasn't happy this time.",
//       rating: 2,
//       userName: "SarahM",
//       userAvatar: null,
//       timeAgo: "5 hours ago",
//       helpful: 12,
//       comments: 8,
//       brandLogo: "/api/placeholder/48/48"
//     },
//     {
//       id: 3,
//       brandName: "StyleShop",
//       title: "Perfect Fit and Fast Shipping",
//       content: "I ordered clothes online and was worried about the fit, but everything was perfect! The shipping was also incredibly fast - I received my order the next day. Will definitely shop here again.",
//       rating: 5,
//       userName: "MikeT",
//       userAvatar: null,
//       timeAgo: "1 day ago",
//       helpful: 45,
//       comments: 3,
//       brandLogo: "/api/placeholder/48/48"
//     }
//   ];

//   // Sample trending topics
//   const trendingTopics = [
//     "Customer Service", "Product Quality", "Value for Money",
//     "Delivery Speed", "Return Policy", "App Experience"
//   ];

//   const renderStars = (rating: any) => {
//     return Array(5).fill(0).map((_, i) => (
//       <Star
//         key={i}
//         size={16}
//         className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
//       />
//     ));
//   };

//   const getInitials = (name: any) => {
//     return name
//       .split(' ')
//       .map((part: any) => part[0])
//       .join('')
//       .toUpperCase();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <button
//                 className="text-gray-500 md:hidden"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <Menu size={24} />
//               </button>
//               <div className="ml-2 md:ml-0 font-bold text-xl text-blue-600">ReviewHub</div>
//               <nav className="hidden md:ml-10 md:flex md:space-x-8">
//                 <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</a>
//                 <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Categories</a>
//                 <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Top Brands</a>
//                 <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Latest Reviews</a>
//               </nav>
//             </div>

//             <div className="hidden md:flex md:items-center">
//               <div className="relative mr-4">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="Search for brands or reviews"
//                 />
//               </div>

//               <div className="flex space-x-4 items-center">
//                 <a href="#" className="text-gray-500 hover:text-blue-600 text-sm font-medium">Log in</a>
//                 <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
//                   Sign up
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile search - visible only on mobile */}
//         <div className="md:hidden border-t border-gray-200 px-4 py-3">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Search for brands or reviews"
//             />
//           </div>
//         </div>
//       </header>

//       {/* Mobile menu */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-40 md:hidden">
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
//           <div className="relative flex flex-col w-full max-w-xs bg-white h-full">
//             <div className="absolute top-0 right-0 -mr-12 pt-4">
//               <button
//                 className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <X className="h-6 w-6 text-white" />
//               </button>
//             </div>
//             <div className="px-4 pt-5 pb-4 flex items-center">
//               <div className="font-bold text-xl text-blue-600">ReviewHub</div>
//             </div>
//             <div className="mt-5 flex-1 h-0 overflow-y-auto">
//               <nav className="px-2 space-y-1">
//                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-100">Home</a>
//                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">Categories</a>
//                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">Top Brands</a>
//                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">Latest Reviews</a>
//               </nav>
//               <div className="pt-4 pb-3 border-t border-gray-200">
//                 <div className="px-2 space-y-1">
//                   <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">Log in</a>
//                   <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-gray-50">Sign up</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hero Section */}
//       <div className="bg-blue-600 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1 className="text-3xl md:text-4xl font-bold mb-4">Find and Share Authentic Brand Experiences</h1>
//             <p className="text-blue-100 text-lg mb-8">Join thousands of users who trust ReviewHub to discover honest reviews and make informed decisions.</p>

//             <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <button className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 shadow-md">
//                 Write a Review
//               </button>
//               <button className="w-full sm:w-auto px-6 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 border border-blue-500">
//                 Explore Reviews
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Featured Brands Section */}
//         <section className="mb-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Featured Brands</h2>
//             <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
//               View all <ChevronRight size={16} className="ml-1" />
//             </a>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredBrands.map(brand => (
//               <div key={brand.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
//                 <div className="p-6">
//                   <div className="flex items-start mb-4">
//                     <img src={brand.image} alt={brand.name} className="w-12 h-12 rounded object-cover mr-4" />
//                     <div>
//                       <h3 className="font-semibold text-gray-900">{brand.name}</h3>
//                       <p className="text-sm text-gray-500">{brand.category}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <Star size={18} className="text-yellow-500 fill-yellow-500 mr-1" />
//                       <span className="font-medium text-gray-900">{brand.rating}</span>
//                       <span className="text-sm text-gray-500 ml-1">({brand.reviewCount})</span>
//                     </div>
//                     <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Categories Section */}
//         <section className="mb-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
//             <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
//               All Categories <ChevronRight size={16} className="ml-1" />
//             </a>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {categories.map(category => (
//               <a
//                 key={category.id}
//                 href="#"
//                 className="bg-white rounded-lg shadow-sm hover:shadow p-4 text-center transition-shadow"
//               >
//                 <div className="text-3xl mb-2">{category.icon}</div>
//                 <h3 className="font-medium text-gray-900">{category.name}</h3>
//                 <p className="text-sm text-gray-500 mt-1">{category.reviewCount} reviews</p>
//               </a>
//             ))}
//           </div>
//         </section>

//         {/* Recent Reviews Section */}
//         <section className="mb-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Recent Reviews</h2>
//             <div className="flex items-center">
//               <button className="mr-4 flex items-center text-sm text-gray-700 hover:text-blue-600">
//                 <Filter size={14} className="mr-1" />
//                 Filter
//                 <ChevronDown size={14} className="ml-1" />
//               </button>
//               <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
//                 View all <ChevronRight size={16} className="ml-1" />
//               </a>
//             </div>
//           </div>

//           <div className="space-y-6">
//             {recentReviews.map(review => (
//               <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-6">
//                   <div className="flex items-start">
//                     <img
//                       src={review.brandLogo}
//                       alt={review.brandName}
//                       className="w-12 h-12 rounded mr-4"
//                     />
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{review.title}</h3>
//                           <a href="#" className="text-sm text-blue-600 hover:text-blue-700">{review.brandName}</a>
//                         </div>
//                         <div className="flex">{renderStars(review.rating)}</div>
//                       </div>
//                       <p className="mt-3 text-gray-700">{review.content}</p>
//                       <div className="mt-4 flex justify-between items-center">
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">
//                             {review.userAvatar ?
//                               <img src={review.userAvatar} alt={review.userName} className="w-8 h-8 rounded-full" /> :
//                               getInitials(review.userName)
//                             }
//                           </div>
//                           <div>
//                             <span className="text-sm font-medium">{review.userName}</span>
//                             <div className="text-xs text-gray-500 flex items-center">
//                               <Clock size={12} className="mr-1" />
//                               {review.timeAgo}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-4 text-sm text-gray-500">
//                           <button className="flex items-center hover:text-blue-600">
//                             <span className="mr-1">Helpful ({review.helpful})</span>
//                           </button>
//                           <button className="flex items-center hover:text-blue-600">
//                             <span className="mr-1">Comment ({review.comments})</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 text-center">
//             <button className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//               Load More Reviews
//             </button>
//           </div>
//         </section>

//         {/* Two-column section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
//           {/* Trending Topics */}
//           <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <TrendingUp className="mr-2 text-blue-600" size={20} />
//               <h2 className="text-xl font-bold text-gray-900">Trending Topics</h2>
//             </div>
//             <div className="space-y-2">
//               {trendingTopics.map((topic, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 hover:text-blue-600"
//                 >
//                   #{topic.replace(/\s+/g, '')}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Write a Review CTA */}
//           <div className="lg:col-span-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md p-6 text-white">
//             <div className="flex flex-col md:flex-row md:items-center justify-between">
//               <div className="mb-6 md:mb-0">
//                 <h2 className="text-xl font-bold mb-2">Share Your Experience</h2>
//                 <p className="text-blue-100">Help others make better decisions by sharing your honest review of brands you've experienced.</p>
//               </div>
//               <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 shadow-md">
//                 Write a Review
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-lg font-bold mb-4">ReviewHub</h3>
//               <p className="text-gray-300 text-sm">The trusted platform for authentic brand reviews and ratings from real users.</p>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold mb-4">Explore</h3>
//               <ul className="space-y-2 text-gray-300 text-sm">
//                 <li><a href="#" className="hover:text-white">Top Brands</a></li>
//                 <li><a href="#" className="hover:text-white">Categories</a></li>
//                 <li><a href="#" className="hover:text-white">Latest Reviews</a></li>
//                 <li><a href="#" className="hover:text-white">Trending Topics</a></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold mb-4">Company</h3>
//               <ul className="space-y-2 text-gray-300 text-sm">
//                 <li><a href="#" className="hover:text-white">About Us</a></li>
//                 <li><a href="#" className="hover:text-white">Guidelines</a></li>
//                 <li><a href="#" className="hover:text-white">Blog</a></li>
//                 <li><a href="#" className="hover:text-white">Careers</a></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold mb-4">Support</h3>
//               <ul className="space-y-2 text-gray-300 text-sm">
//                 <li><a href="#" className="hover:text-white">Help Center</a></li>
//                 <li><a href="#" className="hover:text-white">Contact Us</a></li>
//                 <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-white">Terms of Service</a></li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row md:justify-between items-center">
//             <p className="text-gray-300 text-sm mb-4 md:mb-0">© 2025 ReviewHub. All rights reserved.</p>
//             <div className="flex space-x-6">
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <span className="sr-only">Facebook</span>
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
//                 </svg>
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <span className="sr-only">Twitter</span>
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                 </svg>
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <span className="sr-only">Instagram</span>
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }