import { useEffect, useState } from "react";
import * as UsersApi from "./network/users_api";
import LoginModal from "./components/Auth/LoginModal";
import SignUpModal from "./components/Auth/SignUpModal";
import { User } from "./models/user";
import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FavoritePage from "./pages/favorites";
import EventPage from "./pages/events";

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
	<BrowserRouter>
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
		<Routes>
		  <Route path="/" element={<EventPage loggedInUser={loggedInUser}/>}/>
		  <Route path="/favorites" element={<FavoritePage loggedInUser={loggedInUser} />} />
		</Routes>
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

	</BrowserRouter>
  );
}

export default App;
