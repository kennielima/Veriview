import { getAUser, getCurrentUserData, getProductRating, getUserRateHelpful } from '@/app/services/useUser';
import Userpage from '../components/Userpage';


export default async function page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { userData } = id === "me" ? await getCurrentUserData() : await getAUser(id);

    return (
        <Userpage
            user={userData}
            id={id}
        />
    )
}