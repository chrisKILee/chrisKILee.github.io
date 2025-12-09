#!/bin/bash

# Hash Folder Generator Script
# Usage: ./add-hash-folder.sh <folder_name> <title> <hash> [gradient]
#
# Example: ./add-hash-folder.sh 04_projects "🚀 Projects" "PRJ8X2Y"

set -e

# Check arguments
if [ $# -lt 3 ]; then
    echo "Usage: $0 <folder_name> <title> <hash> [gradient]"
    echo ""
    echo "Example:"
    echo "  $0 04_projects \"🚀 Projects\" \"PRJ8X2Y\""
    echo ""
    echo "Arguments:"
    echo "  folder_name  - Folder name (e.g., 04_projects)"
    echo "  title        - Display title (e.g., \"🚀 Projects\")"
    echo "  hash         - 7-character hash code (e.g., PRJ8X2Y)"
    echo "  gradient     - Optional CSS gradient (default: purple)"
    exit 1
fi

FOLDER_NAME=$1
TITLE=$2
HASH=$3
GRADIENT=${4:-"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GEMINI_HTML_DIR="$SCRIPT_DIR"

echo "🚀 Creating hash folder for: $FOLDER_NAME"
echo "   Title: $TITLE"
echo "   Hash: $HASH"
echo ""

# Step 1: Update hash_config.json
echo "📝 Updating hash_config.json..."
CONFIG_FILE="$GEMINI_HTML_DIR/hash_config.json"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "{}" > "$CONFIG_FILE"
fi

# Add new entry to config (using jq if available, otherwise manual)
if command -v jq &> /dev/null; then
    TEMP_FILE=$(mktemp)
    jq --arg folder "$FOLDER_NAME" \
       --arg hash "$HASH" \
       --arg title "$TITLE" \
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
    echo "     \"title\": \"$TITLE\","
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

# Step 3: Copy template from existing hash folder
echo ""
echo "📋 Copying template from AED13WE..."
cp "$GEMINI_HTML_DIR/AED13WE/index.html" "$HASH_DIR/index.html"
echo "   ✓ Template copied"

# Step 4: Update the copied index.html
echo ""
echo "✏️  Updating index.html..."
INDEX_FILE="$HASH_DIR/index.html"

# Replace title
sed -i "s|<h1>🔬 R&D</h1>|<h1>$TITLE</h1>|g" "$INDEX_FILE"
sed -i "s|Research & Development Projects|${TITLE#* } Content|g" "$INDEX_FILE"

# Replace API path
sed -i "s|gemini_html/01_rnd|gemini_html/$FOLDER_NAME|g" "$INDEX_FILE"

# Replace file paths
sed -i "s|../01_rnd/|../$FOLDER_NAME/|g" "$INDEX_FILE"

# Replace gradient if not default
if [ "$GRADIENT" != "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)" ]; then
    sed -i "s|linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)|$GRADIENT|g" "$INDEX_FILE"
fi

echo "   ✓ index.html updated"

# Step 5: Update GDEDSE/index.html hash mappings
echo ""
echo "🔄 Updating GDEDSE hash mappings..."
GDEDSE_FILE="$GEMINI_HTML_DIR/GDEDSE/index.html"

# Find the HASH_MAPPINGS section and add new entry
# This is a simple append - you may need to manually verify
echo "   ⚠ Please manually verify GDEDSE/index.html HASH_MAPPINGS includes:"
echo "   '$FOLDER_NAME': '$HASH',"

echo ""
echo "✅ Hash folder created successfully!"
echo ""
echo "📌 Next steps:"
echo "   1. Verify hash_config.json has correct entry"
echo "   2. Update GDEDSE/index.html HASH_MAPPINGS to include:"
echo "      '$FOLDER_NAME': '$HASH',"
echo "   3. Test the new hash URL:"
echo "      https://chriskilee.github.io/gemini_html/$HASH/"
echo ""
echo "🔗 Share this link to give access to $FOLDER_NAME only!"
