import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
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
                <nav className="drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>

            <MainHeader>
                <button
                    className="menu-btn"
                    onClick={toggleDrawerHandler}>
                    <TiThMenu
                        size={50}
                        color="#fff"
                    />
                </button>
                <h1 className="title">
                    <Link to="/">Your Places</Link>
                </h1>
                <nav className="header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </Fragment>
    );
};

export default MainNavigation;
