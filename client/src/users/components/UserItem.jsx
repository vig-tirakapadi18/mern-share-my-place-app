/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UI/Avatar";
import "./UserItem.css";
import Card from "../../shared/components/UI/Card";

const UserItem = (props) => {
    return (
        <li className="user-item">
            <Card className="user-item-content">
                <Link to={`/${props.id}/places`}>
                    <div className="user-item-image">
                        <Avatar
                            image={props.image}
                            alt={props.name}
                        />
                    </div>

                    <div className="user-item-info">
                        <h2>{props.name}</h2>
                        <h3>
                            {props.placeCount}{" "}
                            {props.placeCount === 1 ? "Place" : "Places"}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
