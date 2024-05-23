import React, {useState} from "react";
import {Box, Button, Input, Text} from "@adminjs/design-system";


const ImageUploadButton = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [isCopied, setIsCopied] = useState(false);

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
            const postUrl = currentUrlParts.slice(0, currentUrlParts.length - 1).join('/') + '/uploadImage';
            console.log(postUrl);
            const response = await fetch(postUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setImageUrl(responseData.imageUrl);
                console.log('Image uploaded successfully:', responseData);
            } else {
                console.error('Error uploading image:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }

    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(imageUrl)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch((error) => console.error('Failed to copy text:', error));
    };

    return (<Box display="flex" flexDirection="column" alignItems="center" marginTop="20px">
        <Input type="file" accept="image/*" onChange={handleImageChange}/>
        {selectedImage && (
            <Box
                marginTop="10px"
                padding="10px"
                border="2px solid #ccc"
                borderRadius="8px"
                backgroundColor="#f9f9f9"
                maxWidth="80%"
                wordBreak="break-all"
                textAlign="center"
            >
                <Text margin="0 0 10px 0" fontSize="16px" color="#333">
                    Preview:
                </Text>
                <img src={URL.createObjectURL(selectedImage)}
                     alt="Preview"
                     style={{maxWidth: '100%', maxHeight: '300px', marginBottom: '10px'}}
                />
                <Button variant="primary" onClick={handleUpload} style={{marginTop: '10px'}}>
                    Upload Image
                </Button>
            </Box>
        )}
        {imageUrl && (
            <Box
                marginTop="10px"
                padding="10px"
                border="2px solid #ccc"
                borderRadius="8px"
                backgroundColor="#f9f9f9"
                maxWidth="80%"
                wordBreak="break-all"
                textAlign="center"
            >
                <Text margin="0 0 10px 0" fontSize="16px" color="#333">
                    Image URL: {imageUrl}
                </Text>
                <Button variant="primary" onClick={handleCopyToClipboard}>
                    {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
            </Box>
        )}
    </Box>);
};


export const Dashboard = () => {
    return (
        <Box>
            <section
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "32px"
                }}>
                <p style={{
                    // fontSize: "3rem",
                }}>
                    <span style={{
                        fontSize: "3rem",
                        fontWeight: "700"
                    }}>
                    OneStop 
                    </span>
                    <span style={{
                        fontSize: "3rem",
                        fontWeight: "normal",
                        color: "#282828"
                    }}>{" "}
                        Admin
                    </span>
                </p>
            </section>

            <ImageUploadButton/>

        </Box>
    );
};

export default Dashboard;