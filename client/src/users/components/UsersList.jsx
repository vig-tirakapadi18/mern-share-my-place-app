/* eslint-disable react/prop-types */
import Card from "../../shared/components/UI/Card";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No users found!</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {props.items.map((item) => (
                <UserItem
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    placeCount={item.places.length}
                />
            ))}
        </ul>
    );
};

export default UsersList;
