changes
6954869
admin_panel\ui\pages\dashboard.jsx
@@ -1,127 +1,127 @@
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
    return (
        <Box mt="20px" px="20px">
            <H2>Welcome, Admin</H2>
        </Box>
    );
};

export const Dashboard = () => {
    const { translateMessage, translateButton } = useTranslation();
    return (
        <Box>
                <section
                style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    marginTop:"32px"
                }}>
                <p style={{
                    // fontSize: "3rem",
                }}>
                    <span style={{
                    fontSize: "3rem",
                    fontWeight:"700"
                }}>
                    OneStop 
                    </span>
                    <span style={{
                        fontSize: "3rem",
                        fontWeight:"normal",
                        color:"#282828"
                    }}>{" "}
                    Admin
                    </span>
                    </p>
                </section>

            <ImageUploadButton />

        </Box>
    );
};

export default Dashboard;