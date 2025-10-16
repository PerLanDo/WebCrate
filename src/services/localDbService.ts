import { Link, NewLink, SortOption } from '../types';
import { SAMPLE_LINKS } from '../sample-data';

const DB_KEY = 'web-crate-links';

const getLinksFromStorage = (): Link[] => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLinksToStorage = (links: Link[]): void => {
  localStorage.setItem(DB_KEY, JSON.stringify(links));
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
      case 'created_at_asc':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'title_asc':
        return a.title.localeCompare(b.title);
      case 'title_desc':
        return b.title.localeCompare(a.title);
      case 'created_at_desc':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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
    const linkIndex = links.findIndex(link => link.id === updatedLinkData.id);

    if (linkIndex === -1) {
        throw new Error("Link not found");
    }

    links[linkIndex] = updatedLinkData;
    saveLinksToStorage(links);
    return Promise.resolve();
};

export const deleteLink = async (id: number): Promise<void> => {
    const links = getLinksFromStorage();
    const updatedLinks = links.filter(link => link.id !== id);
    saveLinksToStorage(updatedLinks);
    return Promise.resolve();
};
