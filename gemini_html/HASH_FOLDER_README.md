# Hash Folder Management (Updated for Hash Routing)

## 📋 Overview
Scripts to automate the creation of new hash folders with SPA-style hash routing for access control.

## 🚀 Quick Start

### Adding a New Folder

**Using Bash (WSL/Linux/Mac):**
```bash
cd gemini_html
./add-hash-folder.sh 04_projects "Projects" "🚀" "PRJ8X2Y"
```

**Using PowerShell (Windows):**
```powershell
cd gemini_html
.\add-hash-folder.ps1 -FolderName "04_projects" -Title "Projects" -Emoji "🚀" -Hash "PRJ8X2Y"
```

## 📝 Script Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `folder_name` / `-FolderName` | Original folder directory name | `04_projects` |
| `title` / `-Title` | Display title (without emoji) | `Projects` |
| `emoji` / `-Emoji` | Emoji icon | `🚀` |
| `hash` / `-Hash` | 7-character hash code | `PRJ8X2Y` |
| `gradient` / `-Gradient` | Optional CSS gradient | `linear-gradient(...)` |

## 🔧 What the Script Does

1. ✅ Updates `hash_config.json` with new folder mapping
2. ✅ Creates new hash folder (e.g., `PRJ8X2Y/`)
3. ✅ Copies SPA template from `AED13WE/index.html`
4. ✅ Updates title, emoji, gradient, and paths automatically
5. ⚠️ Reminds you to update `GDEDSE/index.html` manually

## 📌 Manual Steps After Running Script

After running the script, you need to:

### 1. Update GDEDSE/index.html

Open `GDEDSE/index.html` and add the new mapping to `HASH_MAPPINGS`:

```javascript
const HASH_MAPPINGS = {
    '01_rnd': 'AED13WE',
    '02_work': 'BF7K2M9',
    '03_travel': 'C8PQ4X1',
    '04_projects': 'PRJ8X2Y'  // ← Add this line
};
```

### 2. Create Original Folder

Create the original folder and add your HTML files:

```bash
mkdir 04_projects
# Add your HTML files to 04_projects/
```

### 3. (Optional) Create files.json

Create `04_projects/files.json` for custom display names and ordering:

```json
{
  "_folderName": "🚀 Projects",
  "_order": ["project1.html", "project2.html"],
  "project1.html": "My First Project",
  "project2.html": "My Second Project"
}
```

### 4. Test the New Hash URL

Visit: `https://chriskilee.github.io/gemini_html/PRJ8X2Y/`

## 🎯 How Hash Routing Works

### URL Structure

```
File List:  https://chriskilee.github.io/gemini_html/PRJ8X2Y
File View:  https://chriskilee.github.io/gemini_html/PRJ8X2Y#project1
```

### Benefits

- ✅ **No Folder Path Exposure**: URL never shows `04_projects`
- ✅ **Shareable File Links**: Each file has a unique `#hash` URL
- ✅ **No File Duplication**: Files stay in original folders
- ✅ **Browser Navigation**: Back/forward buttons work
- ✅ **Clean URLs**: No query parameters

### How It Works

1. User visits `https://chriskilee.github.io/gemini_html/PRJ8X2Y/`
2. Page loads file list from GitHub API
3. User clicks a file → URL changes to `#filename`
4. JavaScript loads file content into iframe
5. User can share the `#filename` URL
6. Recipient sees the same file without folder path exposure

## 📂 File Structure

```
gemini_html/
├── hash_config.json          # Configuration file
├── add-hash-folder.sh        # Bash script
├── add-hash-folder.ps1       # PowerShell script
├── GDEDSE/                   # Home page (all folders)
│   └── index.html
├── AED13WE/                  # R&D hash folder (SPA)
│   └── index.html
├── BF7K2M9/                  # Work hash folder (SPA)
│   └── index.html
├── C8PQ4X1/                  # Travel hash folder (SPA)
│   └── index.html
├── PRJ8X2Y/                  # New hash folder (example)
│   └── index.html
├── 01_rnd/                   # Original R&D files
│   ├── files.json
│   ├── file1.html
│   └── file2.html
├── 02_work/                  # Original Work files
├── 03_travel/                # Original Travel files
└── 04_projects/              # New original files (example)
    ├── files.json
    └── project1.html
```

## 🎨 Custom Gradients

You can specify custom gradients for different themes:

**Tech/Blue:**
```
linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)
```

**Professional/Dark:**
```
linear-gradient(135deg, #2c3e50 0%, #3498db 100%)
```

**Adventure/Warm:**
```
linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
```

**Success/Green:**
```
linear-gradient(135deg, #11998e 0%, #38ef7d 100%)
```

**Purple (Default):**
```
linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

## 🔐 Hash Generation Tips

Generate random 7-character hashes:

**Bash:**
```bash
cat /dev/urandom | tr -dc 'A-Z0-9' | fold -w 7 | head -n 1
```

**PowerShell:**
```powershell
-join ((65..90) + (48..57) | Get-Random -Count 7 | % {[char]$_})
```

**Online:**
- Use: https://www.random.org/strings/

## ⚠️ Important Notes

- Hash codes should be **7 characters** (uppercase letters and numbers)
- Hash codes should be **unique** and **random**
- Don't reuse hash codes
- Keep `hash_config.json` backed up
- Test new hash URLs before sharing
- Original folder names are hidden in URLs
- Files are loaded via iframe for security

## 🐛 Troubleshooting

**Script permission denied (Bash):**
```bash
chmod +x add-hash-folder.sh
```

**PowerShell execution policy:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Files not loading:**
- Check that original folder exists (e.g., `04_projects/`)
- Verify files are in the original folder
- Check browser console for errors
- Ensure GitHub API path is correct

**Hash URL not working:**
- Verify `GDEDSE/index.html` has the hash mapping
- Check that hash folder exists
- Test on GitHub Pages (not local file://)

## 📚 Example Workflow

```bash
# 1. Generate random hash
HASH=$(cat /dev/urandom | tr -dc 'A-Z0-9' | fold -w 7 | head -n 1)
echo "Generated hash: $HASH"

# 2. Run script
./add-hash-folder.sh 04_projects "Projects" "🚀" "$HASH"

# 3. Create original folder and add files
mkdir 04_projects
cp my_project.html 04_projects/

# 4. Edit GDEDSE/index.html (add to HASH_MAPPINGS)
# Add: '04_projects': '$HASH',

# 5. Commit and push
git add .
git commit -m "Add Projects hash folder ($HASH)"
git push

# 6. Test URL
# https://chriskilee.github.io/gemini_html/$HASH/
# https://chriskilee.github.io/gemini_html/$HASH/#my_project
```

## 🎯 Best Practices

1. **Descriptive Folder Names**: Use clear folder names (e.g., `04_projects`, not `04_misc`)
2. **Meaningful Titles**: Include emoji and clear description
3. **Document Hashes**: Keep a private record of what each hash is for
4. **Test Before Sharing**: Always test the hash URL before sharing
5. **Regular Backups**: Backup `hash_config.json` regularly
6. **Use files.json**: Add custom display names for better UX
7. **Consistent Naming**: Use consistent naming conventions for files

## 🔒 Security Features

### Access Control
- ✅ Hash URLs prevent guessing folder structure
- ✅ No directory listing on GitHub Pages
- ✅ Original folder paths hidden in URLs
- ✅ Each hash provides isolated access

### Limitations
- ⚠️ Not true authentication (security by obscurity)
- ⚠️ Anyone with hash URL can access
- ⚠️ URLs can be shared further
- ⚠️ No access revocation mechanism
- ⚠️ File URLs can be discovered from browser dev tools

### Best Practices
- Share hash URLs via secure channels
- Use different hashes for different recipients if needed
- Regenerate hashes periodically for sensitive content
- Monitor access logs if available
- Don't share hash URLs publicly

## 📖 Additional Resources

- **GitHub API**: https://docs.github.com/en/rest/repos/contents
- **Hash Routing**: https://developer.mozilla.org/en-US/docs/Web/API/Location/hash
- **SPA Concepts**: https://developer.mozilla.org/en-US/docs/Glossary/SPA
