import { NavLink } from "react-router-dom";
import styledComponent from "styled-components";

// import "./NavLinks.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavLinksWrapper className="nav-links">
      <li>
        <NavLink to="/">All Users</NavLink>
      </li>

      {authCtx.isLoggedIn && (
        <li>
          <NavLink to={`/${authCtx.userId}/places`}>My Places</NavLink>
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
    </NavLinksWrapper>
  );
};

export default NavLinks;

const NavLinksWrapper = styledComponent.ul`
	list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

	li {
		margin: 1rem;
	}

	a {
		border: 1px solid transparent;
		color: #fff;
		text-decoration: none;
		padding: 0.5rem;
		transition: all 0.25s;

		&:hover, &:active, &.active {
			background: rgba(255, 196, 112, 0.75);
			border-color: #000;
			color: #000;
			border-radius: 5px;
		}
	}

	button {
		cursor: pointer;
		color: #000;
		background: transparent;
		padding: 0.5rem;
		font: inherit;

		&:focus {
			outline: none;
		}

		&:hover, &:active {
			background: #000;
  		color: white;
		}
	}

	@media (min-width: 768px) {
    flex-direction: row;

  	li {
    	margin: 0 0.5rem;
  	}

  	a {
			color: white;
			text-decoration: none;
  	}

  	button {
			border: 1px solid white;
			color: white;
			background: transparent;

			&:hover,
			&:active {
				background: #ffc470;
				color: #000;
			}
  	}
}

`;
