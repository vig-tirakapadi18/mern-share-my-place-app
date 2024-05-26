/* eslint-disable react/prop-types */
import styledComponent from "styled-components";

import Card from "../../shared/components/UI/Card";
import UserItem from "./UserItem";

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
    <UsersListWrapper>
      {props.items.map((item) => (
        <UserItem
          key={item._id}
          id={item._id}
          image={item.image}
          name={item.name}
          placeCount={item.places.length}
        />
      ))}
    </UsersListWrapper>
  );
};

export default UsersList;

const UsersListWrapper = styledComponent.ul`
	list-style: none;
	margin: 0 auto;
	padding: 0;
	width: 90%;
	max-width: 50rem;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
  border-radius: 10px;
`;
