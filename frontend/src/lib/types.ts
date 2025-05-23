export interface Review {
    title: string
    brand: string
    content: string
    images?: string[]
    id: string
    createdAt: string
    rating: number
    updatedAt: string
    user: User
    userId: string,
    productId: string,
    anonymous: boolean,
    ratedhelpful: RatedHelpful[]
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

export interface RatedHelpful {
    id: string
    helpful: number
    reviewId: string
    userId: string,
    review?: Review
}
export interface Userrating {
    id: string
    productRating: string
    productId: string
    userId: string
    product: Product
}

export interface User {
    username: string
    email: string
    createdAt: string
    fullName: string
    id: string
    password: string
    updatedAt: string
    reviews?: Review[] | null
    ratedhelpful?: RatedHelpful[] | null
    userratings?: Userrating[] | null
}