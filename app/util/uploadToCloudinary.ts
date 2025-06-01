import axios from "axios";

const CLOUD_NAME = "dlpcempww";
const UPLOAD_PRESET = "tailor";

export const uploadMultipleToCloudinary = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      urls.push(res.data.secure_url);
    } catch (err) {
      console.error(`Error uploading ${file.name}:`, err);
    }
  }

  return urls;
};
