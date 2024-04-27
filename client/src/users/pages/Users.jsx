import UsersList from "../components/UsersList";

const Users = () => {
    const DUMMY_USERS = [
        {
            id: "u1",
            name: "Vig",
            image: "https://i.pinimg.com/736x/ac/d2/dc/acd2dc909ce5f4e61674480b7816a119.jpg",
            placeCount: 3,
        },
        {
            id: "u2",
            name: "Vis",
            image: "https://i.pinimg.com/564x/f4/18/59/f418595269b905129253b177fdc2596a.jpg",
            placeCount: 3,
        },
    ];

    return <UsersList items={DUMMY_USERS} />;
};

export default Users;
