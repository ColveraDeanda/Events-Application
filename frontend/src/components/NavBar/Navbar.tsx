import { User } from "../../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    return (
        <nav className="bg-gray-900 text-white p-4 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
            <span className="text-lg font-bold text-white">
                TicketMaster
            </span>
            <div className="flex items-center space-x-4">
                {loggedInUser ? (
                <NavBarLoggedInView 
                    user={loggedInUser} 
                    onLogoutSuccessful={() => {
                        onLogoutSuccessful();
                        window.location.href = "/";
                    }} 
                />
                ) : (
                <NavBarLoggedOutView 
                    onLoginClicked={onLoginClicked} 
                    onSignUpClicked={onSignUpClicked} 
                />
                )}
            </div>
            </div>
        </nav>
    );
}

export default NavBar;