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
    rating: number
    reviews: Review[]
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