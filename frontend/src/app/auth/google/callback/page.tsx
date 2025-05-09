import getCurrentUser from '@/lib/getCurrentUser';
import CallbackPage from './components/callback';

const page = async () => {
    const user = await getCurrentUser();
    return <CallbackPage user={user} />
}

export default page;