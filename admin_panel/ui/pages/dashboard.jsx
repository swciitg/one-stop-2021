import React, {useState} from "react";
import styled from "styled-components";
import {
    Box,
    H2,
    H5,
    H4,
    Text,
    Illustration,
    IllustrationProps,
    Button,
} from "@adminjs/design-system";

import { useTranslation } from "adminjs";

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

const ImageUploadButton = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      // You can perform additional validation or processing here if needed
  
      setSelectedImage(file);
    };
  
    const handleUpload = async () => {
      // You can implement the logic to upload the selectedImage here
      console.log("Upload logic goes here:", selectedImage);
      try {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const currentUrl = window.location.href;
        const currentUrlParts = currentUrl.split('/');
        const postUrl = currentUrlParts.slice(0, currentUrlParts.length - 1).join('/') + '/homepage';
        console.log(postUrl);
        const response = await fetch(postUrl, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log('Image uploaded successfully:', responseData);
        } else {
          console.error('Error uploading image:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }

    };
  
    return (
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={handleUpload}>Upload Image</button>
  
        {selectedImage && (
          <div>
            <p>Selected Image:</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          </div>
        )}
      </div>
    );
  };

export const DashboardHeader = () => {
    const { translateMessage } = useTranslation();