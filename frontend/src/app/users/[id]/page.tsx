import { getAUser, getCurrentUserData } from '@/app/services/useUser';
import Userpage from '../components/Userpage';

type Params = Promise<{
    id: string
}>

export default async function page({ params }: { params: Params }) {
    const { id } = await params;
    const { userData } = id === "me" ? await getCurrentUserData() : await getAUser(id);

    return (
        <Userpage
            user={userData}
            id={id}
        />
    )
}