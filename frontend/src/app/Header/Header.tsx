// "use server"
import getCurrentUser from '@/lib/getCurrentUser';
import HeaderClient from './HeaderClient';

const Header = async () => {
    const user = await getCurrentUser();
    return <HeaderClient user={user} />;
};

export default Header;