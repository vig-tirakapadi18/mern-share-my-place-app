/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styledComponent from "styled-components";

import Avatar from "../../shared/components/UI/Avatar";
import Card from "../../shared/components/UI/Card";

const UserItem = (props) => {
  return (
    <UserListItem>
      <Card className="user-item-content">
        <Link to={`/${props.id}/places`}>
          <UserListItemImage>
            <Avatar
              image={props.image}
              alt={props.name}
            />
          </UserListItemImage>

          <UserListItemInfo>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </UserListItemInfo>
        </Link>
      </Card>
    </UserListItem>
  );
};

export default UserItem;

const UserListItem = styledComponent.li`
	margin: 1rem;
  width: calc(45% - 2rem);
  min-width: 17.5rem;

	.user-item-content {
		padding: 0;
	}

	a {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		text-decoration: none;
		padding: 1rem;
		color: white;
		background: rgba(0, 0, 0, 0.85);
		box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.35);
		transition: background-color 0.25s;

		&:hover, &:active {
			background: #ffc470;
		}
	}

	&:hover h2,
	&:active h2,
	&:hover h3,
	&:active h3 {
  	color: #292929;
	}
`;

const UserListItemImage = styledComponent.div`
	width: 4rem;
	height: 4rem;
	margin-right: 1rem;
`;

const UserListItemInfo = styledComponent.div`
	h2 {
		font-size: 1.5rem;
		margin: 0 0 0.5rem 0;
		font-weight: normal;
		color: #ffc470;
	}

	h3 {
  	margin: 0;
	}
`;
