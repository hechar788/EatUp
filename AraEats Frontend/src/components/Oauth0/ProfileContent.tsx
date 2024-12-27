import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function ProfileContent() {
  const { user, isLoading, error } = useAuth0();

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

