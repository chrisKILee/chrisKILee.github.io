# Hash Folder Generator Script (PowerShell) - Updated for Hash Routing
# Usage: .\add-hash-folder.ps1 -FolderName "04_projects" -Title "Projects" -Emoji "🚀" -Hash "PRJ8X2Y"

param(
    [Parameter(Mandatory=$true)]
    [string]$FolderName,
    
    [Parameter(Mandatory=$true)]
    [string]$Title,
    
    [Parameter(Mandatory=$true)]
    [string]$Emoji,
    
    [Parameter(Mandatory=$true)]
    [string]$Hash,
    
    [Parameter(Mandatory=$false)]
    [string]$Gradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Creating hash folder for: $FolderName" -ForegroundColor Cyan
Write-Host "   Title: $Emoji $Title"
Write-Host "   Hash: $Hash"
Write-Host ""

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$GeminiHtmlDir = $ScriptDir

# Step 1: Update hash_config.json
Write-Host "📝 Updating hash_config.json..." -ForegroundColor Yellow
$ConfigFile = Join-Path $GeminiHtmlDir "hash_config.json"

if (-not (Test-Path $ConfigFile)) {
    "{}" | Out-File -FilePath $ConfigFile -Encoding UTF8
}

$config = Get-Content $ConfigFile -Raw | ConvertFrom-Json
$newEntry = @{
    hash = $Hash
    title = "$Emoji $Title"
    description = "Description for $Title"
    gradient = $Gradient
}

$config | Add-Member -MemberType NoteProperty -Name $FolderName -Value $newEntry -Force
$config | ConvertTo-Json -Depth 10 | Out-File -FilePath $ConfigFile -Encoding UTF8

Write-Host "   ✓ Config updated" -ForegroundColor Green

# Step 2: Create hash folder
Write-Host ""
Write-Host "📁 Creating hash folder: $Hash/" -ForegroundColor Yellow
$HashDir = Join-Path $GeminiHtmlDir $Hash

if (Test-Path $HashDir) {
    Write-Host "   ⚠ Folder $Hash already exists, skipping..." -ForegroundColor Yellow
} else {
    New-Item -ItemType Directory -Path $HashDir | Out-Null
    Write-Host "   ✓ Folder created" -ForegroundColor Green
}

# Step 3: Copy template
Write-Host ""
Write-Host "📋 Copying template from AED13WE..." -ForegroundColor Yellow
$TemplateFile = Join-Path $GeminiHtmlDir "AED13WE\index.html"
$IndexFile = Join-Path $HashDir "index.html"
Copy-Item $TemplateFile $IndexFile -Force
Write-Host "   ✓ Template copied" -ForegroundColor Green

# Step 4: Update the copied index.html
Write-Host ""
Write-Host "✏️  Updating index.html..." -ForegroundColor Yellow

$content = Get-Content $IndexFile -Raw -Encoding UTF8

# Replace title
$content = $content -replace '<title>🔬 R\&D - Research \& Development</title>', "<title>$Emoji $Title</title>"

# Replace header
$content = $content -replace '<h1 class="page-title">Research \& Development</h1>', "<h1 class=\"page-title\">$Title</h1>"
$content = $content -replace '<p class="page-desc">Exploring new technologies and architectures.</p>', "<p class=\"page-desc\">$Title Content</p>"
$content = $content -replace 'placeholder="Search R\&D docs..."', "placeholder=\"Search $Title docs...\""

# Replace secondary gradient
$content = $content -replace '--primary-gradient: linear-gradient\(135deg, #00c6fb 0%, #005bea 100%\);', "--primary-gradient: $Gradient;"
$content = $content -replace '--accent-color: #005bea;', "--accent-color: $(if($Gradient -match '#([a-fA-F0-9]{6})'){$Matches[0]}else{'#2a5298'});"

# Replace API path
$content = $content -replace "contents/gemini_html/01_rnd", "contents/gemini_html/$FolderName"

# Replace config path
$content = $content -replace "CONFIG_PATH = '../01_rnd/files.json'", "CONFIG_PATH = '../$FolderName/files.json'"

# Replace file content path
$content = $content -replace "CONTENT_BASE_PATH = '../01_rnd/'", "CONTENT_BASE_PATH = '../$FolderName/'"

$content | Out-File -FilePath $IndexFile -Encoding UTF8 -NoNewline

Write-Host "   ✓ index.html updated" -ForegroundColor Green

# Step 5: Reminder for GDEDSE
Write-Host ""
Write-Host "🔄 Next: Update GDEDSE/index.html" -ForegroundColor Yellow
Write-Host "   ⚠ Please manually add to GDEDSE/index.html HASH_MAPPINGS:" -ForegroundColor Yellow
Write-Host "   '$FolderName': '$Hash',"

Write-Host ""
Write-Host "✅ Hash folder created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Verify hash_config.json has correct entry"
Write-Host "   2. Update GDEDSE/index.html HASH_MAPPINGS to include:"
Write-Host "      '$FolderName': '$Hash',"
Write-Host "   3. Create the original folder: $FolderName/"
Write-Host "   4. Add HTML files to $FolderName/"
Write-Host "   5. Test the new hash URL:"
Write-Host "      https://chriskilee.github.io/gemini_html/$Hash/"
Write-Host ""
Write-Host "🔗 Share this link to give access to $FolderName only!" -ForegroundColor Green
