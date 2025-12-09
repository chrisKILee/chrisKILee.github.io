# Hash Folder Management

## 📋 Overview
Scripts to automate the creation of new hash folders for access control.

## 🚀 Quick Start

### Adding a New Folder

**Using Bash (WSL/Linux/Mac):**
```bash
cd gemini_html
./add-hash-folder.sh 04_projects "🚀 Projects" "PRJ8X2Y"
```

**Using PowerShell (Windows):**
```powershell
cd gemini_html
.\add-hash-folder.ps1 -FolderName "04_projects" -Title "🚀 Projects" -Hash "PRJ8X2Y"
```

## 📝 Script Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `folder_name` / `-FolderName` | Folder directory name | `04_projects` |
| `title` / `-Title` | Display title with emoji | `🚀 Projects` |
| `hash` / `-Hash` | 7-character hash code | `PRJ8X2Y` |
| `gradient` / `-Gradient` | Optional CSS gradient | `linear-gradient(...)` |

## 🔧 What the Script Does

1. ✅ Updates `hash_config.json` with new folder mapping
2. ✅ Creates new hash folder (e.g., `PRJ8X2Y/`)
3. ✅ Copies template from `AED13WE/index.html`
4. ✅ Updates title, paths, and API endpoints
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

### 2. Test the New Hash URL

Visit: `https://chriskilee.github.io/gemini_html/PRJ8X2Y/`

### 3. Copy and Share

Go to `https://chriskilee.github.io/gemini_html/GDEDSE/` and use the "📋 Copy Link" button.

## 📂 File Structure

```
gemini_html/
├── hash_config.json          # Configuration file
├── add-hash-folder.sh        # Bash script
├── add-hash-folder.ps1       # PowerShell script
├── GDEDSE/                   # Home page (all folders)
├── AED13WE/                  # R&D hash folder
├── BF7K2M9/                  # Work hash folder
├── C8PQ4X1/                  # Travel hash folder
└── PRJ8X2Y/                  # New hash folder (example)
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

## 🐛 Troubleshooting

**Script permission denied (Bash):**
```bash
chmod +x add-hash-folder.sh
```

**PowerShell execution policy:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**jq not found (Bash):**
- Install jq: `sudo apt install jq` (Ubuntu/Debian)
- Or manually edit `hash_config.json`

## 📚 Example Workflow

```bash
# 1. Generate random hash
HASH=$(cat /dev/urandom | tr -dc 'A-Z0-9' | fold -w 7 | head -n 1)
echo "Generated hash: $HASH"

# 2. Run script
./add-hash-folder.sh 04_projects "🚀 Projects" "$HASH"

# 3. Edit GDEDSE/index.html (add to HASH_MAPPINGS)

# 4. Commit and push
git add .
git commit -m "Add Projects hash folder ($HASH)"
git push

# 5. Test URL
# https://chriskilee.github.io/gemini_html/$HASH/
```

## 🎯 Best Practices

1. **Descriptive Folder Names**: Use clear folder names (e.g., `04_projects`, not `04_misc`)
2. **Meaningful Titles**: Include emoji and clear description
3. **Document Hashes**: Keep a private record of what each hash is for
4. **Test Before Sharing**: Always test the hash URL before sharing
5. **Regular Backups**: Backup `hash_config.json` regularly
