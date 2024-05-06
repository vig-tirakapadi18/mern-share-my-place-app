import { Fragment, useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((uId) => {
        setIsLoggedIn(true);
        setUserId(uId);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
    }, []);

    let routes;

    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route
                    path="/"
                    element={<Users />}
                />
                <Route
                    path="/:userId/places"
                    element={<UserPlaces />}
                />

                <Route
                    path="/places/new"
                    element={<NewPlace />}
                />
                <Route
                    path="/places/:placeId"
                    element={<UpdatePlace />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        );
    } else {
        routes = (
            <Routes>
                <Route
                    path="/"
                    element={<Users />}
                />

                <Route
                    path="/:userId/places"
                    element={<UserPlaces />}
                />

                <Route
                    path="/sign-in"
                    element={<Auth />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/sign-up" />}
                />
            </Routes>
        );
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
            <Fragment>
                <MainNavigation />

                <main>{routes}</main>
            </Fragment>
        </AuthContext.Provider>
    );
};

export default App;
