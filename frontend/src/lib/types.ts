export interface Review {
    title: string
    brand: string
    content: string
    id: number
    createdAt: string
    rating: number
    updatedAt: string
    user: User
    userId: number
}
export interface User {
    username: string
    email: string
    createdAt: string
    fullName: string
    id: number
    password: string
    updatedAt: string
    review: Review | null
}