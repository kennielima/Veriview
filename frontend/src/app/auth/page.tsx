import Link from "next/link"
import { LogIn, UserPlus, Layers } from "lucide-react"

export default function CTAPage() {
    return (
        <div className="flex min-h-screen flex-col items-center p-4">
            <div className="w-full max-w-md p-8 border shadow-md rounded bg-indigo-50 mt-8">
                <div className="mb-6 flex justify-center">
                    <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Layers className="h-10 w-10 text-indigo-600" />
                    </div>
                </div>
                <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">Welcome</h1>
                <p className="mb-8 text-center text-gray-600">Sign in to your account or create a new one</p>

                <div className="space-y-4">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-base rounded-md">
                        <Link href="/auth/login" className="flex items-center justify-center gap-2 text-white font-semibold">
                            <LogIn className="h-5 w-5" />
                            Log In
                        </Link>
                    </button>

                    <button
                        className="w-full h-12 text-base border-indigo-300 text-indigo-700 hover:bg-indigo-50 font-semibold"
                    >
                        <Link href="/auth/signup" className="flex items-center justify-center gap-2 border py-2 border-indigo-300 hover:border-indigo-400 rounded-md bg-white">
                            <UserPlus className="h-5 w-5" />
                            Sign Up
                        </Link>
                    </button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-indigo-50 px-2 text-gray-500">Or</span>
                        </div>
                    </div>

                    <Link href={`${process.env.API_URL}/google`}>
                        <button
                            className="w-full h-12 mt-4 text-base flex items-center justify-center gap-2 bg-white border-gray-300 rounded-md border font-semibold"
                        >
                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                <path
                                    fill="#FFC107"
                                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                />
                                <path
                                    fill="#FF3D00"
                                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                                />
                                <path
                                    fill="#4CAF50"
                                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                                />
                                <path
                                    fill="#1976D2"
                                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                    </Link>
                </div>

                <p className="mt-8 text-center text-xs text-gray-600">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}
