export interface Review {
    title: string
    brand: string
    content: string
    id: string
    createdAt: string
    rating: number
    updatedAt: string
    user: User
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