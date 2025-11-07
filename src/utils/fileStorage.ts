// Utility functions for storing and retrieving files in sessionStorage

const FILES_STORAGE_KEY = "instarizz_uploaded_files";

export interface StoredFile {
  name: string;
  dataUrl: string;
}

// Convert File to base64 data URL
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Save files to sessionStorage as base64
export async function saveFilesToSession(files: File[]): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const storedFiles: StoredFile[] = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        dataUrl: await fileToDataUrl(file),
      }))
    );

    sessionStorage.setItem(FILES_STORAGE_KEY, JSON.stringify(storedFiles));
  } catch (error) {
    console.error("Failed to save files to session:", error);
  }
}

// Get files from sessionStorage
export function getFilesFromSession(): StoredFile[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = sessionStorage.getItem(FILES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to get files from session:", error);
    return [];
  }
}

// Clear files from sessionStorage
export function clearFilesFromSession(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(FILES_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear files from session:", error);
  }
}
