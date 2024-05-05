import { Fragment, useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingPulse from "../../shared/components/UI/LoadingPulse";

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [users, setUsers] = useState();

    // const DUMMY_USERS = [
    //     {
    //         id: "u1",
    //         name: "Vig",
    //         image: "https://i.pinimg.com/736x/ac/d2/dc/acd2dc909ce5f4e61674480b7816a119.jpg",
    //         placeCount: 3,
    //     },
    //     {
    //         id: "u2",
    //         name: "Vis",
    //         image: "https://i.pinimg.com/564x/f4/18/59/f418595269b905129253b177fdc2596a.jpg",
    //         placeCount: 3,
    //     },
    // ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users");
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setUsers(responseData.users);

                console.log(responseData);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchUsers();
    }, []);

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Fragment>
            <ErrorModal
                error={error}
                onClear={errorHandler}
            />

            {isLoading && <LoadingPulse />}
            {!isLoading && users && <UsersList items={users} />}
        </Fragment>
    );
};

export default Users;
