import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
    const authCtx = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/">All Users</NavLink>
            </li>

            {authCtx.isLoggedIn && (
                <li>
                    <NavLink to="/u1/places">My Places</NavLink>
                </li>
            )}

            {authCtx.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">Add Place</NavLink>
                </li>
            )}

            {!authCtx.isLoggedIn && (
                <li>
                    <NavLink to="/sign-in">Sign In</NavLink>
                </li>
            )}

            {authCtx.isLoggedIn && (
                <li>
                    <NavLink
                        onClick={authCtx.logout}
                        to="/sign-in">
                        LOG OUT
                    </NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
