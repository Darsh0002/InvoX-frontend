import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", "invoice-thumbnail"); // Replace with your Cloudinary upload preset
  formData.append("cloud_name", "dftu8ygsy"); // Optional: specify folder in Cloudinary

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dftu8ygsy/image/upload", // Replace with your Cloudinary cloud name
      formData
    );
    return response.data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
