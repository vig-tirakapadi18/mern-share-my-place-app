import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import styledComponent from "styled-components";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { Fragment, useState } from "react";
import Backdrop from "../UI/Backdrop";

const MainNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerHandler = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <Fragment>
      {isDrawerOpen && <Backdrop onClick={toggleDrawerHandler} />}

      <SideDrawer
        onClick={toggleDrawerHandler}
        showDrawer={isDrawerOpen}>
        <DrawerNav className="drawer-nav">
          <NavLinks />
        </DrawerNav>
      </SideDrawer>

      <MainHeader>
        <MenuButton
          className="menu-btn"
          onClick={toggleDrawerHandler}>
          <TiThMenu
            size={50}
            color="#fff"
          />
        </MenuButton>
        <Title className="title">
          <Link to="/">Your Places</Link>
        </Title>
        <HeaderNav className="header-nav">
          <NavLinks />
        </HeaderNav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;

const MenuButton = styledComponent.button`
	width: 3rem;
	height: 3rem;
	background: transparent;
	border: none;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-right: 2rem;
	cursor: pointer;

	@media (min-width: 768px) {
    display: none;
	}
`;

const Title = styledComponent.h1`
	color: white;

	a {
		text-decoration: none;
    color: white;
	}
`;

const HeaderNav = styledComponent.nav`
	display: none;

	@media (min-width: 768px) {
		display: block;
  }
`;

const DrawerNav = styledComponent.nav`
	height: 100%;
`;
