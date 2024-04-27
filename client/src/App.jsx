import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";

const App = () => {
    return (
        <Fragment>
            <MainNavigation />

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Users />}
                    />
                    <Route
                        path="/places/new"
                        element={<NewPlace />}
                    />
                    <Route
                        path="/:userId/places"
                        element={<UserPlaces />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </main>
        </Fragment>
    );
};

export default App;
