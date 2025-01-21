import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
import AppRoutes from './AppRoutes';

export default function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      if (user?.['https://tpw.cam/role'] === 'new_user') {
        navigate('/account-type-selection');
      } else if (isAuthenticated) {
        try {
          await getAccessTokenSilently();
          console.log('fetched access token')
        } catch (error) {
          console.log(error)
        }
      }
    };
    
    checkUserRole();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  return (
      <AppRoutes isAuthenticated={isAuthenticated} accountType={user?.['https://tpw.cam/role']}/>
  );
}