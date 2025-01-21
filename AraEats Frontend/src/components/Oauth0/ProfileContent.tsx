import { useAuth0 } from '@auth0/auth0-react';

type PropsTypes = {
  accountType: 'new_user' | 'merchant' | 'customer'
}

export default function ProfileContent({accountType}: PropsTypes) {
  const { user, isLoading, error } = useAuth0();

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name} - {accountType}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

