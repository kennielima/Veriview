import Dashboard from './components/dashboardComponent';
import getUserData, { getUserRateHelpful } from '../hooks/useUser';

export default async function page() {
    const { userData } = await getUserData();
    const userRateHelpful = await getUserRateHelpful(userData.id);

    return (
        <Dashboard user={userData} userRateHelpful={userRateHelpful} />
    )
}