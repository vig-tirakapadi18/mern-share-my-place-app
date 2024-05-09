import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "./ImageUpload.css";

/* eslint-disable react/prop-types */
const ImageUpload = (props) => {
    const [image, setImage] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const imagePickerRef = useRef();

    useEffect(() => {
        if (!image) return;

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(image);
    }, [image]);

    const pickedImageHandler = (event) => {
        let pickedImage;
        let imageIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedImage = event.target.files[0];
            setImage(pickedImage);
            setIsValid(true);
            imageIsValid = true;
        } else {
            setIsValid(false);
            imageIsValid = false;
        }

        props.onInput(props.id, pickedImage, imageIsValid);
    };

    const imagePickHandler = () => {
        imagePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input
                type="file"
                ref={imagePickerRef}
                id={props.id}
                style={{ display: "none" }}
                accept=".jpg,.png,.jpeg,.avif"
                onChange={pickedImageHandler}
            />
            <div className={`image ${props.center && "center"}`}>
                <div className="image-preview">
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview of Image"
                        />
                    )}
                    {!previewUrl && <p>Please pick an image!</p>}
                </div>

                <Button
                    type="button"
                    onClick={imagePickHandler}>
                    PICK IMAGE
                </Button>
            </div>
        </div>
    );
};

export default ImageUpload;
