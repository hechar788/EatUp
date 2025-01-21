import { useAuth0 } from "@auth0/auth0-react";

function LoginButton(){
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export {
  LoginButton,
  LogoutButton
}
