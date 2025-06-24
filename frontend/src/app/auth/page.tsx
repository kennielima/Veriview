import Link from "next/link"
import { LogIn, UserPlus, Layers } from "lucide-react"
import { Google } from "@/lib/Icons"

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

                    <Link href={`/api/auth/google`}>
                        <button
                            className="w-full h-12 mt-4 text-base flex items-center justify-center gap-2 bg-white border-gray-300 rounded-md border font-semibold"
                        >
                            <Google />
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
