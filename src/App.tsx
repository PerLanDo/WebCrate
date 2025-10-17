import React, { useState, useEffect, FormEvent, useCallback } from "react";
import { Link, NewLink, Folder, NewFolder, SortOption } from "./types";
import { Category, CATEGORIES, ITEM_COLORS } from "./constants";
import {
  getAllLinks,
  addLink,
  updateLink,
  deleteLink,
  getAllFolders,
  addFolder,
  updateFolder,
  deleteFolder,
  exportData,
  importData,
} from "./services/localDbService";
import { fetchLinkMetadata } from "./services/geminiService";
import {
  SparklesIcon,
  MagicWandIcon,
  AppIcon,
  PlusIcon,
  SunIcon,
  MoonIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
  ListViewIcon,
  GridViewIcon,
  SearchIcon,
  FolderIcon,
  DownloadIcon,
  UploadIcon,
} from "./components/icons";

type Theme = "light" | "dark";
type ViewMode = "list" | "grid" | "compact";

const App: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("created_at_desc");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFolderFormVisible, setIsFolderFormVisible] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "dark";
  });
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const savedViewMode = localStorage.getItem("viewMode") as ViewMode;
    return savedViewMode || "list";
  });

  // Link form state
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [folderId, setFolderId] = useState<number | undefined>(undefined);

  // Folder form state
  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState<string>(ITEM_COLORS[0]);

  // Apply theme on mount and when it changes
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.body.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save view mode preference
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const refreshLinks = useCallback(async () => {
    try {
      const fetchedLinks = await getAllLinks(sortBy);
      setLinks(fetchedLinks);
    } catch (err) {
      console.error("Failed to fetch links:", err);
      setError("Could not load saved items. Please try refreshing the page.");
    }
  }, [sortBy]);

  const refreshFolders = useCallback(async () => {
    try {
      const fetchedFolders = await getAllFolders();
      setFolders(fetchedFolders);
    } catch (err) {
      console.error("Failed to fetch folders:", err);
    }
  }, []);

  useEffect(() => {
    refreshLinks();
    refreshFolders();
  }, [refreshLinks, refreshFolders]);

  const handleAutoFill = async () => {
    if (!url || !url.startsWith("http")) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }
    setError(null);
    setIsFetching(true);
    try {
      const [fetchedTitle, fetchedDesc] = await fetchLinkMetadata(url);
      setTitle(fetchedTitle);
      setDescription(fetchedDesc);
    } catch (err) {
      console.error("Failed to fetch metadata:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Could not fetch metadata from the URL."
      );
    } finally {
      setIsFetching(false);
    }
  };

  const clearForm = () => {
    setUrl("");
    setTitle("");
    setDescription("");
    setNotes("");
    setCategory(CATEGORIES[0]);
    setColor(undefined);
    setFolderId(undefined);
    setError(null);
    setEditingLink(null);
  };

  const clearFolderForm = () => {
    setFolderName("");
    setFolderColor(ITEM_COLORS[0]);
    setEditingFolder(null);
  };

  const handleAddNew = () => {
    clearForm();
    setIsFormVisible(true);
  };

  const handleAddNewFolder = () => {
    clearFolderForm();
    setIsFolderFormVisible(true);
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
    setUrl(link.url);
    setTitle(link.title);
    setDescription(link.description);
    setNotes(link.notes);
    setCategory(link.category);
    setColor(link.color);
    setFolderId(link.folder_id);
    setIsFormVisible(true);
  };

  const handleEditFolder = (folder: Folder) => {
    setEditingFolder(folder);
    setFolderName(folder.name);
    setFolderColor(folder.color);
    setIsFolderFormVisible(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteLink(id);
      await refreshLinks();
    }
  };

  const handleDeleteFolder = async (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this folder? Items in this folder will not be deleted."
      )
    ) {
      await deleteFolder(id);
      await refreshFolders();
      await refreshLinks();
      if (selectedFolder === id) {
        setSelectedFolder(null);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title) {
      setError("Title is a required field.");
      return;
    }

    if (editingLink) {
      const updatedLink: Link = {
        ...editingLink,
        url,
        title,
        description,
        notes,
        category,
        color,
        folder_id: folderId,
      };
      await updateLink(updatedLink);
    } else {
      const newLink: NewLink = {
        url,
        title,
        description,
        notes,
        category,
        color,
        folder_id: folderId,
      };
      await addLink(newLink);
    }

    clearForm();
    setIsFormVisible(false);
    await refreshLinks();
  };

  const handleFolderSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) {
      return;
    }

    if (editingFolder) {
      const updatedFolder: Folder = {
        ...editingFolder,
        name: folderName,
        color: folderColor,
      };
      await updateFolder(updatedFolder);
    } else {
      const newFolder: NewFolder = {
        name: folderName,
        color: folderColor,
      };
      await addFolder(newFolder);
    }

    clearFolderForm();
    setIsFolderFormVisible(false);
    await refreshFolders();
  };

  const handleExportData = () => {
    try {
      const jsonData = exportData();
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `webcrate-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      setError("Failed to export data. Please try again.");
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const result = importData(content);

        if (result.success) {
          await refreshLinks();
          await refreshFolders();
          alert(
            `Import successful! Imported ${
              result.counts?.links || 0
            } links and ${result.counts?.folders || 0} folders.`
          );
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Import failed:", err);
        setError("Failed to import data. Please check the file format.");
      }
    };
    reader.readAsText(file);

    // Reset input so same file can be selected again
    event.target.value = "";
  };

  const getCategoryBadgeColor = (category: Category) => {
    switch (category) {
      case "Website/App":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Dev Tool":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Design Resource":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Knowledge/Learning":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Filter links based on search query and selected folder
  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      link.title.toLowerCase().includes(query) ||
      link.description.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query) ||
      link.notes.toLowerCase().includes(query) ||
      link.category.toLowerCase().includes(query);

    const matchesFolder =
      selectedFolder === null || link.folder_id === selectedFolder;

    return matchesSearch && matchesFolder;
  });

  // Count links in each folder
  const getLinkCountForFolder = (folderId: number) => {
    return links.filter((link) => link.folder_id === folderId).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 font-sans">
        <header className="flex items-center justify-between gap-3 mb-6 md:mb-8 sticky top-0 bg-[var(--color-background)]/95 backdrop-blur-sm z-10 py-4 -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2 md:gap-3">
            <AppIcon className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-primary)]" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-foreground)]">
              WebCrate
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              className="p-2 rounded-full hover:bg-[var(--color-accent)] transition-colors"
              title="Export data"
            >
              <DownloadIcon className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-foreground)]" />
            </button>
            <label
              className="p-2 rounded-full hover:bg-[var(--color-accent)] transition-colors cursor-pointer"
              title="Import data"
            >
              <UploadIcon className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-foreground)]" />
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--color-accent)] transition-colors"
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-foreground)]" />
              ) : (
                <MoonIcon className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-foreground)]" />
              )}
            </button>
          </div>
        </header>{" "}
        <section className="mb-12">
          {isFormVisible ? (
            <form
              onSubmit={handleSubmit}
              className="relative p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-lg space-y-4 animate-fade-in"
            >
              <button
                type="button"
                onClick={() => {
                  setIsFormVisible(false);
                  clearForm();
                }}
                className="absolute top-4 right-4 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold">
                {editingLink ? "Edit Item" : "Add a New Item"}
              </h2>

              <div className="relative">
                <input
                  type="url"
                  placeholder="URL (optional)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 focus:ring-2 focus:ring-[var(--color-ring)] focus:outline-none transition-colors pr-28"
                />
                <button
                  type="button"
                  onClick={handleAutoFill}
                  disabled={isFetching || !url.startsWith("http")}
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 bg-[var(--color-primary)] hover:opacity-90 rounded-[var(--radius-md)] text-sm font-semibold text-[var(--color-primary-foreground)] disabled:bg-[var(--color-muted)] disabled:text-[var(--color-muted-foreground)] disabled:cursor-not-allowed transition-colors"
                >
                  <SparklesIcon
                    className={`w-4 h-4 ${isFetching ? "animate-pulse" : ""}`}
                  />
                  {isFetching ? "Fetching..." : "Auto-Fill"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 focus:ring-2 focus:ring-[var(--color-ring)] focus:outline-none transition-colors"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 focus:ring-2 focus:ring-[var(--color-ring)] focus:outline-none transition-colors appearance-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 focus:ring-2 focus:ring-[var(--color-ring)] focus:outline-none transition-colors resize-y"
              ></textarea>
              <textarea
                placeholder="Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 focus:ring-2 focus:ring-[var(--color-ring)] focus:outline-none transition-colors resize-y"
              ></textarea>

              <div>
                <label
                  htmlFor="folder-select"
                  className="block text-sm font-medium text-[var(--color-muted-foreground)] mb-2"
                >
                  Folder
                </label>
                <select
                  id="folder-select"
                  value={folderId || ""}
                  onChange={(e) =>
                    setFolderId(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-full bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 focus:ring-2 focus:ring-[var(--color-ring)] focus:outline-none transition-colors"
                >
                  <option value="">No Folder</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-muted-foreground)] mb-2">
                  Color Tag
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {ITEM_COLORS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${
                        color === c
                          ? "ring-2 ring-offset-2 ring-offset-[var(--color-card)] ring-[var(--color-ring)]"
                          : ""
                      }`}
                    ></button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setColor(undefined)}
                    className={`w-7 h-7 rounded-full bg-transparent border-2 border-dashed border-[var(--color-border)] transition-transform hover:scale-110 ${
                      !color
                        ? "ring-2 ring-offset-2 ring-offset-[var(--color-card)] ring-[var(--color-ring)]"
                        : ""
                    }`}
                  ></button>
                </div>
              </div>

              {error && (
                <p className="text-[var(--color-destructive)] text-sm">
                  {error}
                </p>
              )}

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold rounded-[var(--radius-md)] hover:opacity-90 transition-opacity"
                >
                  {editingLink ? "Update Item" : "Save Item"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFormVisible(false);
                    clearForm();
                  }}
                  className="px-6 py-2 text-[var(--color-muted-foreground)] font-semibold hover:text-[var(--color-foreground)] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={handleAddNew}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold rounded-[var(--radius-lg)] hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
            >
              <PlusIcon className="w-5 h-5" />
              Add a New Item
            </button>
          )}
        </section>
        {/* Folder Management Section */}
        <section className="mb-8">
          {isFolderFormVisible ? (
            <form
              onSubmit={handleFolderSubmit}
              className="relative p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-lg space-y-4 animate-fade-in"
            >
              <button
                type="button"
                onClick={() => {
                  setIsFolderFormVisible(false);
                  clearFolderForm();
                }}
                className="absolute top-4 right-4 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold">
                {editingFolder ? "Edit Folder" : "Add a New Folder"}
              </h2>

              <input
                type="text"
                placeholder="Folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                required
                className="w-full bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 focus:ring-2 focus:ring-[var(--color-ring)] focus:outline-none transition-colors"
              />

              <div>
                <label className="block text-sm font-medium text-[var(--color-muted-foreground)] mb-2">
                  Folder Color
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {ITEM_COLORS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setFolderColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${
                        folderColor === c
                          ? "ring-2 ring-offset-2 ring-offset-[var(--color-card)] ring-[var(--color-ring)]"
                          : ""
                      }`}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold rounded-[var(--radius-md)] hover:opacity-90 transition-opacity"
                >
                  {editingFolder ? "Update Folder" : "Save Folder"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFolderFormVisible(false);
                    clearFolderForm();
                  }}
                  className="px-6 py-2 text-[var(--color-muted-foreground)] font-semibold hover:text-[var(--color-foreground)] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FolderIcon className="w-5 h-5" />
                  Folders
                </h2>
                <button
                  onClick={handleAddNewFolder}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] font-semibold rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-sm"
                >
                  <PlusIcon className="w-4 h-4" />
                  New Folder
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedFolder(null)}
                  className={`px-4 py-2 rounded-[var(--radius-md)] font-medium transition-colors text-sm ${
                    selectedFolder === null
                      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                      : "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-accent)]"
                  }`}
                >
                  All Items
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-black/20 text-xs">
                    {links.length}
                  </span>
                </button>
                {folders.map((folder) => (
                  <div key={folder.id} className="relative group">
                    <button
                      onClick={() => setSelectedFolder(folder.id)}
                      style={{
                        backgroundColor:
                          selectedFolder === folder.id
                            ? folder.color
                            : undefined,
                      }}
                      className={`px-4 py-2 rounded-[var(--radius-md)] font-medium transition-colors text-sm ${
                        selectedFolder === folder.id
                          ? "text-white"
                          : "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-accent)]"
                      }`}
                    >
                      <div
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: folder.color }}
                      ></div>
                      {folder.name}
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-black/20 text-xs">
                        {getLinkCountForFolder(folder.id)}
                      </span>
                    </button>
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 hidden group-hover:flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditFolder(folder);
                        }}
                        className="p-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-full hover:bg-[var(--color-accent)] transition-colors"
                        title="Edit folder"
                      >
                        <EditIcon className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFolder(folder.id);
                        }}
                        className="p-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-full hover:bg-[var(--color-destructive)] hover:text-white transition-colors"
                        title="Delete folder"
                      >
                        <DeleteIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        <section>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">
                {selectedFolder === null
                  ? `All Items (${links.length})`
                  : `${
                      folders.find((f) => f.id === selectedFolder)?.name ||
                      "Folder"
                    } (${filteredLinks.length})`}
              </h2>
              <div className="relative w-full sm:w-64">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--color-input)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-sm focus:ring-2 focus:ring-[var(--color-ring)] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-[var(--color-muted-foreground)]">
                {searchQuery &&
                  `Found ${filteredLinks.length} of ${links.length} items`}
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                        : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                    }`}
                    title="List View"
                  >
                    <ListViewIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "grid"
                        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                        : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                    }`}
                    title="Grid View"
                  >
                    <GridViewIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("compact")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "compact"
                        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                        : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                    }`}
                    title="Compact View"
                  >
                    <ListViewIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-by"
                    className="text-sm text-[var(--color-muted-foreground)]"
                  >
                    Sort by:
                  </label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-[var(--color-card)] border-[var(--color-border)] rounded-[var(--radius-md)] px-2 py-1 text-sm focus:ring-1 focus:ring-[var(--color-ring)] focus:outline-none transition-colors appearance-none"
                  >
                    <option value="created_at_desc">Recently Added</option>
                    <option value="created_at_asc">Oldest First</option>
                    <option value="title_asc">Title (A-Z)</option>
                    <option value="title_desc">Title (Z-A)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : viewMode === "compact"
                ? "space-y-2"
                : "space-y-4"
            }
          >
            {filteredLinks.length === 0 ? (
              <div className="text-center py-10 px-6 bg-[var(--color-card)] border border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)]">
                <p className="text-[var(--color-muted-foreground)]">
                  {searchQuery
                    ? `No items found matching "${searchQuery}"`
                    : "No items saved yet. Add one using the form above!"}
                </p>
              </div>
            ) : (
              filteredLinks.map((link) => (
                <div
                  key={link.id}
                  className={`bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] transition-all hover:border-[var(--color-accent)] ${
                    viewMode === "compact" ? "p-3" : "p-4"
                  }`}
                  style={{
                    borderLeft: `4px solid ${link.color || "transparent"}`,
                  }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3
                      className={`font-semibold text-[var(--color-foreground)] flex-1 ${
                        viewMode === "compact"
                          ? "text-base mb-0.5"
                          : "text-lg mb-1"
                      }`}
                    >
                      {link.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full border whitespace-nowrap ${getCategoryBadgeColor(
                        link.category
                      )}`}
                    >
                      {link.category}
                    </span>
                  </div>
                  {link.url && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] break-all transition-colors"
                    >
                      {link.url}
                    </a>
                  )}
                  {viewMode !== "compact" && link.description && (
                    <p className="mt-2 text-sm">{link.description}</p>
                  )}
                  {viewMode !== "compact" && link.notes && (
                    <p
                      className="mt-2 text-sm p-3 bg-[var(--color-input)] border-l-2"
                      style={{
                        borderColor: link.color || "var(--color-primary)",
                      }}
                    >
                      {link.notes}
                    </p>
                  )}
                  <div
                    className={`flex justify-between items-center ${
                      viewMode === "compact" ? "mt-2" : "mt-3"
                    }`}
                  >
                    {viewMode !== "compact" && (
                      <small className="text-[var(--color-muted-foreground)] text-xs">
                        Saved: {new Date(link.created_at).toLocaleString()}
                      </small>
                    )}
                    {viewMode === "compact" && <div />}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(link)}
                        className="p-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="p-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-destructive)] transition-colors"
                      >
                        <DeleteIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
