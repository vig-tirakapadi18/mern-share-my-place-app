import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import styledComponent from "styled-components";

import Button from "./Button";
import { app } from "../../../../firebase";

/* eslint-disable react/prop-types */
const ImageUpload = (props) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const imagePickerRef = useRef();

  const uploadImage = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageref = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageref, imageFile);
    const imageIsValid = imageFileUploadError ? false : true;

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.totalBytes > 1024 * 1024) {
          setImageFileUploadError(
            "Could not upload image (must be less than 1MB )!"
          );
          return;
        }
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress);
      },
      () => {
        setImageFileUploadError(
          "Could not upload image (must be less than 1MB )!"
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          props.onInput(props.id, downloadURL, imageIsValid);
        });
      }
    );
  };

  const imageChangeHandler = (event) => {
    imagePickerRef.current.click();
    const image = event.target.files[0];
    if (image) {
      setImageFile(event.target.files[0]);
      setImageFileUrl(URL.createObjectURL(image));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <FormControl>
      <input
        type="file"
        ref={imagePickerRef}
        id={props.id}
        style={{ display: "none" }}
        accept="image/*"
        onChange={imageChangeHandler}
      />
      <div className={`image ${props.center && "center"}`}>
        <ImagePreview>
          {imageFileUrl && !imageFileUploadError && (
            <img
              src={imageFileUrl}
              alt="Preview of Image"
            />
          )}

          {!imageFileUrl && <p>Please pick an image!</p>}
          {imageFileUploadError && <p>{imageFileUploadError}</p>}
        </ImagePreview>

        {imageFileUploadProgress && (
          <h4 style={{ color: "#10b981" }}>
            {imageFileUploadProgress.toFixed(2)} %
          </h4>
        )}

        <Button
          type="button"
          onClick={imageChangeHandler}>
          PICK IMAGE
        </Button>
      </div>
    </FormControl>
  );
};

export default ImageUpload;

const ImagePreview = styledComponent.div`
	width: 13rem;
  height: 13rem;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const FormControl = styledComponent.div`
	p {
		margin-top: 10px;
		color: red; 
	}

  .image.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

// import { useEffect, useRef, useState } from "react";
// import Button from "./Button";
// import "./ImageUpload.css";

// /* eslint-disable react/prop-types */
// const ImageUpload = (props) => {
//     const [image, setImage] = useState();
//     const [previewUrl, setPreviewUrl] = useState();
//     const [isValid, setIsValid] = useState(false);
//     const imagePickerRef = useRef();

//     useEffect(() => {
//         if (!image) return;

//         const fileReader = new FileReader();
//         fileReader.onload = () => {
//             setPreviewUrl(fileReader.result);
//         };
//         fileReader.readAsDataURL(image);
//     }, [image]);

//     const pickedImageHandler = (event) => {
//         let pickedImage;
//         let imageIsValid = isValid;
//         if (event.target.files && event.target.files.length === 1) {
//             pickedImage = event.target.files[0];
//             setImage(pickedImage);
//             setIsValid(true);
//             imageIsValid = true;
//         } else {
//             setIsValid(false);
//             imageIsValid = false;
//         }

//         props.onInput(props.id, pickedImage, imageIsValid);
//     };

//     const imagePickHandler = () => {
//         imagePickerRef.current.click();
//     };

//     return (
//         <div className="form-control">
//             <input
//                 type="file"
//                 ref={imagePickerRef}
//                 id={props.id}
//                 style={{ display: "none" }}
//                 accept=".jpg,.png,.jpeg,.avif"
//                 onChange={pickedImageHandler}
//             />
//             <div className={`image ${props.center && "center"}`}>
//                 <div className="image-preview">
//                     {previewUrl && (
//                         <img
//                             src={previewUrl}
//                             alt="Preview of Image"
//                         />
//                     )}
//                     {!previewUrl && <p>Please pick an image!</p>}
//                 </div>

//                 <Button
//                     type="button"
//                     onClick={imagePickHandler}>
//                     PICK IMAGE
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default ImageUpload;
