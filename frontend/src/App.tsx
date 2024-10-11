import { useEffect, useState } from "react";
import * as UsersApi from "./network/users_api";
import LoginModal from "./components/Auth/LoginModal";
import SignUpModal from "./components/Auth/SignUpModal";
import { User } from "./models/user";
import Navbar from "./components/NavBar/Navbar";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
	async function fetchLoggedInUser() {
		try {

			const user = await UsersApi.getLogInUser();
			setLoggedInUser(user);
		} catch (error) {
			// console.error(error);
		}
	}
	fetchLoggedInUser();
  }, []);

  return (
	<div>
		<Navbar
		  loggedInUser={loggedInUser}
		  onLoginClicked={() => {
			setShowLoginModal(true);
			setShowSignUpModal(false);
		  }}
		  onSignUpClicked={() => {
			setShowSignUpModal(true);
			setShowLoginModal(false);
		  }}
		  onLogoutSuccessful={() => setLoggedInUser(null)}
		/>
		{showSignUpModal && (
		  <SignUpModal
			onDismiss={() => setShowSignUpModal(false)}
			onSignUpSuccessful={(user) => {
			  setLoggedInUser(user);
			  setShowSignUpModal(false);
			}}
		  />
		)}
		{showLoginModal && (
		  <LoginModal
			onDismiss={() => setShowLoginModal(false)}
			onLoginSuccessful={(user) => {
			  setLoggedInUser(user);
			  setShowLoginModal(false);
			}}
		  />
		)}
	</div>
  );
}

export default App;
