import toast from "react-hot-toast";

/**
 * Compresses an image file to a base64 string.
 * @param {File} file - The image file to compress.
 * @param {number} maxWidth - Maximum width of the compressed image.
 * @param {number} maxHeight - Maximum height of the compressed image.
 * @param {number} quality - JPEG compression quality (0 to 1).
 * @returns {Promise<string>} - A promise that resolves to the base64 string.
 */
export const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.5) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const base64String = canvas.toDataURL("image/jpeg", quality);
        resolve(base64String);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Handles multiple image uploads and compressions.
 * @param {FileList} files - The list of files to upload.
 * @param {string[]} existingImages - Currently uploaded images.
 * @param {number} maxCount - Maximum total images allowed.
 * @returns {Promise<string[]>} - A promise that resolves to new list of base64 images.
 */
export const handleImageBatchUpload = async (files, existingImages = [], maxCount = 5) => {
  const fileArray = Array.from(files);
  if (fileArray.length + existingImages.length > maxCount) {
    toast.error(`Maximum ${maxCount} images allowed`);
    return existingImages;
  }

  const uploadedImages = [...existingImages];
  
  for (const file of fileArray) {
    try {
      const compressed = await compressImage(file);
      uploadedImages.push(compressed);
    } catch (err) {
      console.error("Compression error:", err);
    }
  }
  
  return uploadedImages;
};
