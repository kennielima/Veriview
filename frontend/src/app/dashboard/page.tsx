import Dashboard from './components/dashboardComponent';
import getUserData, { getProductRating, getUserRateHelpful } from '../hooks/useUser';
import Link from 'next/link';

export default async function page() {
    const { userData } = await getUserData();
    const userRateHelpful = await getUserRateHelpful(userData?.id);
    const userProductRating = await getProductRating(userData?.id);

    if (!userData) {
        return (
            <div className='flex flex-col my-16 w-full font-bold items-center text-center gap-2'>
                <div>Only logged in users can access this page</div>
                {/* <Link href='/login'>
                    <button
                        className='bg-indigo-600 mx-auto my-2 hover:bg-indigo-700 w-fit rounded-md text-white px-4 py-2'
                    >
                        Login
                    </button>
                </Link> */}
            </div>
        )
    } else
        return (
            <Dashboard
                user={userData}
                userRateHelpful={userRateHelpful}
                userProductRating={userProductRating}
            />
        )
}