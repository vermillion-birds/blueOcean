import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';



export default function ImageUpload() {
  // state for images
  const [selectedImage, setSelectedImage] = useState([]);
  // state image data
  const [imageData, setImageData] = useState(null);

  const uploadImage = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    const formData = new FormData()
    formData.append('file', selectedImage);
    formData.append('upload_preset', 'eocwrax6'  )


  const postImage = async () => {
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnrbmkmnd/image/upload"
      )
      setImageData(response.data)
    }
    catch( error) {
      console.error(error)
    }
  }
  postImage()
}

  return (
    <>
    <div className="wrapper">
        <h1 className="heading">Cloudinary Image Upload</h1>
        <article className="article">
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setSelectedImages(e.target.files[0])}
            className="input"
          />
          <button onClick={uploadImage} className="button">
            Upload Image
          </button>
        </article>

        <article className="image-container">
          {imageData && (
            <Image
              cloudName=""
              publicId={``}

            />
          )}
        </article>
      </div>
    </>
  )
}