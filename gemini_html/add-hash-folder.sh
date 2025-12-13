#!/bin/bash

# Hash Folder Generator Script (Updated for Hash Routing)
# Usage: ./add-hash-folder.sh <folder_name> <title> <emoji> <hash> [gradient]
#
# Example: ./add-hash-folder.sh 04_projects "Projects" "🚀" "PRJ8X2Y"

set -e

# Check arguments
if [ $# -lt 4 ]; then
    echo "Usage: $0 <folder_name> <title> <emoji> <hash> [gradient]"
    echo ""
    echo "Example:"
    echo "  $0 04_projects \"Projects\" \"🚀\" \"PRJ8X2Y\""
    echo ""
    echo "Arguments:"
    echo "  folder_name  - Folder name (e.g., 04_projects)"
    echo "  title        - Display title (e.g., \"Projects\")"
    echo "  emoji        - Emoji icon (e.g., \"🚀\")"
    echo "  hash         - 7-character hash code (e.g., PRJ8X2Y)"
    echo "  gradient     - Optional CSS gradient (default: purple)"
    exit 1
fi

FOLDER_NAME=$1
TITLE=$2
EMOJI=$3
HASH=$4
GRADIENT=${5:-"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GEMINI_HTML_DIR="$SCRIPT_DIR"

echo "🚀 Creating hash folder for: $FOLDER_NAME"
echo "   Title: $EMOJI $TITLE"
echo "   Hash: $HASH"
echo ""

# Step 1: Update hash_config.json
echo "📝 Updating hash_config.json..."
CONFIG_FILE="$GEMINI_HTML_DIR/hash_config.json"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "{}" > "$CONFIG_FILE"
fi

# Add new entry to config (using jq if available)
if command -v jq &> /dev/null; then
    TEMP_FILE=$(mktemp)
    jq --arg folder "$FOLDER_NAME" \
       --arg hash "$HASH" \
       --arg title "$EMOJI $TITLE" \
       --arg desc "Description for $TITLE" \
       --arg gradient "$GRADIENT" \
       '.[$folder] = {
           "hash": $hash,
           "title": $title,
           "description": $desc,
           "gradient": $gradient
       }' "$CONFIG_FILE" > "$TEMP_FILE"
    mv "$TEMP_FILE" "$CONFIG_FILE"
    echo "   ✓ Config updated with jq"
else
    echo "   ⚠ jq not found, please manually add to hash_config.json:"
    echo "   \"$FOLDER_NAME\": {"
    echo "     \"hash\": \"$HASH\","
    echo "     \"title\": \"$EMOJI $TITLE\","
    echo "     \"description\": \"Description\","
    echo "     \"gradient\": \"$GRADIENT\""
    echo "   }"
fi

# Step 2: Create hash folder
echo ""
echo "📁 Creating hash folder: $HASH/"
HASH_DIR="$GEMINI_HTML_DIR/$HASH"

if [ -d "$HASH_DIR" ]; then
    echo "   ⚠ Folder $HASH already exists, skipping..."
else
    mkdir -p "$HASH_DIR"
    echo "   ✓ Folder created"
fi

# Step 3: Copy template from AED13WE
echo ""
echo "📋 Copying template from AED13WE..."
cp "$GEMINI_HTML_DIR/AED13WE/index.html" "$HASH_DIR/index.html"
echo "   ✓ Template copied"

# Step 4: Update the copied index.html
echo ""
echo "✏️  Updating index.html..."
INDEX_FILE="$HASH_DIR/index.html"

# Replace title
sed -i "s|<title>🔬 R&D - Research & Development</title>|<title>$EMOJI $TITLE</title>|g" "$INDEX_FILE"

# Replace header
sed -i "s|<h1>🔬 R&D</h1>|<h1>$EMOJI $TITLE</h1>|g" "$INDEX_FILE"
sed -i "s|<p>Research & Development Projects</p>|<p>$TITLE Content</p>|g" "$INDEX_FILE"

# Replace gradient
sed -i "s|background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);|background: $GRADIENT;|g" "$INDEX_FILE"

# Replace API path
sed -i "s|const GITHUB_PATH = 'gemini_html/01_rnd';|const GITHUB_PATH = 'gemini_html/$FOLDER_NAME';|g" "$INDEX_FILE"

# Replace config path
sed -i "s|fetch('../01_rnd/files.json')|fetch('../$FOLDER_NAME/files.json')|g" "$INDEX_FILE"

# Replace file content path
sed -i "s|fetch(\`../01_rnd/\${filename}\`)|fetch(\`../$FOLDER_NAME/\${filename}\`)|g" "$INDEX_FILE"

echo "   ✓ index.html updated"

# Step 5: Remind to update GDEDSE
echo ""
echo "🔄 Next: Update GDEDSE/index.html"
echo "   ⚠ Please manually add to GDEDSE/index.html HASH_MAPPINGS:"
echo "   '$FOLDER_NAME': '$HASH',"

echo ""
echo "✅ Hash folder created successfully!"
echo ""
echo "📌 Next steps:"
echo "   1. Verify hash_config.json has correct entry"
echo "   2. Update GDEDSE/index.html HASH_MAPPINGS to include:"
echo "      '$FOLDER_NAME': '$HASH',"
echo "   3. Create the original folder: $FOLDER_NAME/"
echo "   4. Add HTML files to $FOLDER_NAME/"
echo "   5. Test the new hash URL:"
echo "      https://chriskilee.github.io/gemini_html/$HASH/"
echo ""
echo "🔗 Share this link to give access to $FOLDER_NAME only!"
