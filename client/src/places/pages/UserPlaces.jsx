import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";

const DUMMY_PLACES = [
    {
        id: "u1",
        title: "Colosseum",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/405px-Colosseo_2020.jpg",
        description:
            "The Colosseum, also known as the Flavian Amphitheater, is a large, elliptical amphitheater in Rome, Italy. It was built between 70 and 72 CE and is considered one of the most spectacular architectural monuments of the ancient world.",
        address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
        creatorId: "c1",
        location: { lat: 41.890251, long: 12.492373 },
    },
    {
        id: "u2",
        title: "Eiffel Tower",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Exposition_Universelle_de_Paris_1889_-_Universit%C3%A4ts-_und_Landesbibliothek_Darmstadt.jpg/1280px-Exposition_Universelle_de_Paris_1889_-_Universit%C3%A4ts-_und_Landesbibliothek_Darmstadt.jpg",
        description:
            "The Eiffel Tower is a 1,083 ft (330 m) tall wrought iron tower in Paris, France that was designed by Gustave Eiffel for the 1889 World's Fair. It's the tallest structure in Paris and one of the most recognizable structures in the world. The tower's silhouette has been replicated around the world.",
        address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
        creatorId: "c2",
        location: { lat: 48.8583736, long: 2.291901 },
    },
];

const UserPlaces = () => {
    const { userId } = useParams();

    const filteredPlaces = DUMMY_PLACES.filter((place) => place.id === userId);

    return <PlacesList places={filteredPlaces} />;
};

export default UserPlaces;
