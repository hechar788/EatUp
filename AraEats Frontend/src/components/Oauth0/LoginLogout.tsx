import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton(){
  const { loginWithRedirect } = useAuth0();
  return <div onClick={() => loginWithRedirect()}>Log In</div>;
};

function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <div onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </div>
  );
};

export {
  LoginButton,
  LogoutButton
}
