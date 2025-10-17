# Export & Import Data Guide

WebCrate now includes data export and import functionality to backup and restore your data.

## 📤 Export Data

**How to Export:**

1. Click the **Download icon** (⬇️) in the top-right corner of the app
2. A JSON file will be downloaded automatically with the format: `webcrate-backup-YYYY-MM-DD.json`

**What Gets Exported:**

- All your saved links/items
- All your folders
- Complete folder-to-item associations
- Export metadata (version, export date)

**Export File Format:**

```json
{
  "version": "1.0",
  "exportDate": "2025-10-17T12:00:00.000Z",
  "links": [
    {
      "id": 1234567890,
      "url": "https://example.com",
      "title": "Example Site",
      "description": "Example description",
      "notes": "My notes",
      "category": "Website/App",
      "color": "#3b82f6",
      "folder_id": 1234567891,
      "created_at": "2025-10-17T12:00:00.000Z"
    }
  ],
  "folders": [
    {
      "id": 1234567891,
      "name": "Work Projects",
      "color": "#22c55e",
      "created_at": "2025-10-17T12:00:00.000Z"
    }
  ]
}
```

## 📥 Import Data

**How to Import:**

1. Click the **Upload icon** (⬆️) in the top-right corner of the app
2. Select a previously exported JSON file
3. The app will validate and import the data
4. A confirmation message will show how many items and folders were imported

**Import Behavior:**

- ⚠️ **Imports replace all existing data** - your current data will be overwritten
- The import process validates the JSON structure before applying changes
- Invalid files will show an error message without affecting your data

**Supported File Format:**

- Must be a valid JSON file
- Must contain a `links` array (folders are optional)
- Should use the same structure as exported files

## 💡 Use Cases

### 1. **Backup Your Data**

Export regularly to keep backups of your WebCrate data:

```
webcrate-backup-2025-10-01.json
webcrate-backup-2025-10-15.json
webcrate-backup-2025-10-31.json
```

### 2. **Transfer Between Devices**

1. Export from Device A
2. Transfer the JSON file to Device B
3. Import on Device B

### 3. **Share Collections**

Export and share curated link collections with team members or friends

### 4. **Version Control**

Keep your data in version control systems (Git) by exporting regularly

### 5. **Restore from Backup**

If you accidentally delete items, restore from a previous export

## ⚠️ Important Notes

- **Data Replacement:** Import operations replace ALL existing data. Export current data first if you want to keep it!
- **Browser Storage:** Data is stored in localStorage, which has size limits (typically 5-10MB)
- **No Merge:** Import does not merge with existing data - it performs a complete replacement
- **Validation:** Only valid JSON files with proper structure will be accepted

## 🔒 Privacy & Security

- All data stays in your browser's localStorage
- No data is sent to external servers
- Export files are stored locally on your device
- You have full control over your data files

## 🛠️ Troubleshooting

### "Invalid data format" error

- Ensure the JSON file is not corrupted
- Verify the file has a `links` array
- Check that the JSON syntax is valid

### Import not working

1. Verify the file is a `.json` file
2. Check browser console for detailed error messages
3. Try exporting fresh data and reimporting as a test

### File too large

- localStorage has size limits (typically 5-10MB)
- Consider splitting data into smaller collections
- Remove unnecessary items or old data

---

**Version:** 1.0  
**Last Updated:** October 17, 2025
