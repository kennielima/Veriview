"use server"
import getCurrentUser from '@/lib/getCurrentUser';
import HeaderClient from './HeaderClient';

const Header = async () => {
    const {user} = await getCurrentUser();
    console.log("user", user);

    return (
        <HeaderClient user={user} loggedIn={false} />
    );
};

export default Header;