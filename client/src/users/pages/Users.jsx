import { Fragment, useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingPulse from "../../shared/components/UI/LoadingPulse";
import { useHttp } from "../../shared/hooks/http-hook";

const Users = () => {
    const [users, setUsers] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttp();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/api/users"
                );

                setUsers(responseData.users);

                console.log(responseData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [sendRequest]);

    return (
        <Fragment>
            <ErrorModal
                error={error}
                onClear={clearError}
            />

            {isLoading && <LoadingPulse />}
            {!isLoading && users && <UsersList items={users} />}
        </Fragment>
    );
};

export default Users;
