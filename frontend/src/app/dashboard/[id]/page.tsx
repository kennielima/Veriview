import { getAUser, getCurrentUserData, getProductRating, getUserRateHelpful } from '@/app/hooks/useUser';
import Dashboard from '../components/dashboardComponent';

export default async function page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { userData } = id === "me" ? await getCurrentUserData() : await getAUser(id);

    const userRateHelpful = await getUserRateHelpful(userData?.id);
    const userProductRating = await getProductRating(userData?.id);

    if (id === "me" && !userData) {
        return (
            <div className='flex flex-col my-16 w-full font-bold items-center text-center gap-2'>
                <div>Only logged in users can access this page</div>
            </div>
        )
    } else
        return (
            <Dashboard
                user={userData}
                id={id}
            />
        )
}