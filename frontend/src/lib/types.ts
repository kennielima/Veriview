export interface Review {
    title: string
    brand: string
    content: string
    id: string
    createdAt: string
    rating: number
    updatedAt: string
    user: User
    userId: string,
    productId: string,
    anonymous: boolean
}
export interface Product {
    id: string
    name: string
    averageRating: number
    ratingsCount: number
    reviews: Review[]
    rating: UserRating[]
}
export interface UserRating {
    id: string
    productRating: number
    productId: string
    userId: string
}

export interface User {
    username: string
    email: string
    createdAt: string
    fullName: string
    id: string
    password: string
    updatedAt: string
    review: Review | null
}