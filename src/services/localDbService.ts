import { Link, NewLink, SortOption, Folder, NewFolder } from "../types";
import { SAMPLE_LINKS } from "../sample-data";

const DB_KEY = "web-crate-links";
const FOLDERS_KEY = "web-crate-folders";

const getLinksFromStorage = (): Link[] => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLinksToStorage = (links: Link[]): void => {
  localStorage.setItem(DB_KEY, JSON.stringify(links));
};

const getFoldersFromStorage = (): Folder[] => {
  const data = localStorage.getItem(FOLDERS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveFoldersToStorage = (folders: Folder[]): void => {
  localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
};

const initializeSampleData = () => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    saveLinksToStorage(SAMPLE_LINKS);
  }
};

initializeSampleData();

export const getAllLinks = async (sortBy: SortOption): Promise<Link[]> => {
  let links = getLinksFromStorage();

  links.sort((a, b) => {
    switch (sortBy) {
      case "created_at_asc":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "title_asc":
        return a.title.localeCompare(b.title);
      case "title_desc":
        return b.title.localeCompare(a.title);
      case "created_at_desc":
      default:
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  });

  return Promise.resolve(links);
};

export const addLink = async (newLink: NewLink): Promise<void> => {
  const links = getLinksFromStorage();
  const linkToAdd: Link = {
    ...newLink,
    id: Date.now(),
    created_at: new Date().toISOString(),
  };
  const updatedLinks = [linkToAdd, ...links];
  saveLinksToStorage(updatedLinks);
  return Promise.resolve();
};

export const updateLink = async (updatedLinkData: Link): Promise<void> => {
  const links = getLinksFromStorage();
  const linkIndex = links.findIndex((link) => link.id === updatedLinkData.id);

  if (linkIndex === -1) {
    throw new Error("Link not found");
  }

  links[linkIndex] = updatedLinkData;
  saveLinksToStorage(links);
  return Promise.resolve();
};

export const deleteLink = async (id: number): Promise<void> => {
  const links = getLinksFromStorage();
  const updatedLinks = links.filter((link) => link.id !== id);
  saveLinksToStorage(updatedLinks);
  return Promise.resolve();
};

// Folder operations
export const getAllFolders = async (): Promise<Folder[]> => {
  const folders = getFoldersFromStorage();
  return Promise.resolve(
    folders.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  );
};

export const addFolder = async (newFolder: NewFolder): Promise<void> => {
  const folders = getFoldersFromStorage();
  const folderToAdd: Folder = {
    ...newFolder,
    id: Date.now(),
    created_at: new Date().toISOString(),
  };
  const updatedFolders = [folderToAdd, ...folders];
  saveFoldersToStorage(updatedFolders);
  return Promise.resolve();
};

export const updateFolder = async (
  updatedFolderData: Folder
): Promise<void> => {
  const folders = getFoldersFromStorage();
  const folderIndex = folders.findIndex(
    (folder) => folder.id === updatedFolderData.id
  );

  if (folderIndex === -1) {
    throw new Error("Folder not found");
  }

  folders[folderIndex] = updatedFolderData;
  saveFoldersToStorage(folders);
  return Promise.resolve();
};

export const deleteFolder = async (id: number): Promise<void> => {
  const folders = getFoldersFromStorage();
  const updatedFolders = folders.filter((folder) => folder.id !== id);
  saveFoldersToStorage(updatedFolders);

  // Remove folder_id from all links in this folder
  const links = getLinksFromStorage();
  const updatedLinks = links.map((link) =>
    link.folder_id === id ? { ...link, folder_id: undefined } : link
  );
  saveLinksToStorage(updatedLinks);

  return Promise.resolve();
};

// Export and Import operations
export const exportData = (): string => {
  const links = getLinksFromStorage();
  const folders = getFoldersFromStorage();
  const exportData = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    links,
    folders,
  };
  return JSON.stringify(exportData, null, 2);
};

export const importData = (
  jsonString: string
): {
  success: boolean;
  message: string;
  counts?: { links: number; folders: number };
} => {
  try {
    const importedData = JSON.parse(jsonString);

    // Validate the structure
    if (!importedData.links || !Array.isArray(importedData.links)) {
      return {
        success: false,
        message: "Invalid data format: missing or invalid links array",
      };
    }

    // Import folders if they exist
    if (importedData.folders && Array.isArray(importedData.folders)) {
      saveFoldersToStorage(importedData.folders);
    }

    // Import links
    saveLinksToStorage(importedData.links);

    return {
      success: true,
      message: "Data imported successfully",
      counts: {
        links: importedData.links.length,
        folders: importedData.folders?.length || 0,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to import data",
    };
  }
};
