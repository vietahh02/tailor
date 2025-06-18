import imageCompression from "browser-image-compression";

/**
 * Nén một ảnh duy nhất
 * @param file File ảnh gốc
 * @returns File ảnh đã nén
 */
export const compressSingleImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.23,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Compression failed", error);
    throw error;
  }
};

/**
 * Nén danh sách ảnh
 * @param files Danh sách File ảnh gốc
 * @returns Danh sách File ảnh đã nén
 */
export const compressMultipleImages = async (
  files: File[]
): Promise<File[]> => {
  const compressedFiles: File[] = [];

  for (const file of files) {
    try {
      const compressed = await compressSingleImage(file);
      compressedFiles.push(compressed);
    } catch (error) {
      console.warn(`Không thể nén ảnh: ${file.name}`, error);
    }
  }

  return compressedFiles;
};
