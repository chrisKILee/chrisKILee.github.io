
// --- Configuration ---
const KNOWN_FOLDERS = ['01_rnd', '02_work', '03_travel', '04_AI_Study', '05_Private'];

// Hash Mappings for Security/Obfuscation
const HASH_MAPPINGS = {
    '01_rnd': 'AED13WE',
    '02_work': 'BF7K2M9',
    '03_travel': 'C8PQ4X1',
    '04_AI_Study': 'QT38XYX',
    '05_Private': 'RU4TYZ1'
};

// --- Logic ---

function init() {
    const container = document.getElementById('contentArea');
    const config = window.FOLDER_CONFIG || {};

    if (Object.keys(config).length === 0) {
        container.innerHTML = `<div class="loading">설정 파일을 찾을 수 없습니다. (files_config.js 로딩 실패)</div>`;
        return;
    }

    container.innerHTML = '';
    let totalFiles = 0;
    let totalFolders = 0;

    KNOWN_FOLDERS.forEach(folderKey => {
        const folderData = config[folderKey];
        if (!folderData) return;

        totalFolders++;
        const fileKeys = Object.keys(folderData).filter(k => k !== '_folderName' && k !== '_order');
        // Use _order if available for sorting
        let sortedKeys = fileKeys;
        if (folderData._order) {
            sortedKeys = folderData._order.filter(k => fileKeys.includes(k));
            // Add any unordered files at the end
            const unordered = fileKeys.filter(k => !folderData._order.includes(k));
            sortedKeys = [...sortedKeys, ...unordered];
        }

        totalFiles += sortedKeys.length;

        // Render Folder Section
        const section = document.createElement('div');
        section.className = 'folder-section';

        const hashPath = HASH_MAPPINGS[folderKey] || folderKey;
        const folderName = folderData._folderName || folderKey;

        section.innerHTML = `
            <div class="folder-header">
                <div class="folder-title">${folderName}</div>
                <div class="folder-count">${sortedKeys.length} posts</div>
                <button class="copy-link-btn" onclick="copyLink('${hashPath}')">
                    <i class="fas fa-link"></i> 링크 복사
                </button>
            </div>
            <div class="file-grid">
                ${sortedKeys.map(fileName => {
            const desc = folderData[fileName]; // The value in JSON is the description/title
            const displayName = desc;
            const size = "2 KB"; // Mock or derived if available
            const date = "Jan 2025";
            const fileType = fileName.split('.').pop().toUpperCase();

            // Link to Hash Path
            // OLD (Broken): const linkUrl = `../${hashPath}/${fileName}`;
            // NEW (Fixing ... but keeping old for TDD 'Red' state first, or user wanted to skip manual? 
            // The user said "Test success then commit". 
            // I will implement the FIX here immediately to pass the test, as efficient agent.)

            // Fix: remove extension and add hash
            const fileNameNoExt = fileName.replace(/\.[^/.]+$/, "");
            const linkUrl = `../${hashPath}/#${fileNameNoExt}`;

            return `
                        <a href="${linkUrl}" class="file-card" data-search="${displayName.toLowerCase()} ${fileName.toLowerCase()}">
                            <div class="file-meta">
                                <span>${fileType}</span>
                                <span style="color: #ddd;">|</span>
                                <span>Gemini</span>
                            </div>
                            <div class="file-title">${displayName}</div>
                            <div class="file-desc">${fileName}</div> 
                        </a>
                    `;
        }).join('')}
            </div>
        `;
        container.appendChild(section);
    });

    if (document.getElementById('totalFiles')) document.getElementById('totalFiles').innerText = totalFiles;
    if (document.getElementById('totalFolders')) document.getElementById('totalFolders').innerText = totalFolders;

    // Search Logic
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.file-card');

            cards.forEach(card => {
                const searchData = card.getAttribute('data-search');
                if (searchData.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Hide empty sections
            document.querySelectorAll('.folder-section').forEach(sec => {
                let hasVisible = false;
                sec.querySelectorAll('.file-card').forEach(c => {
                    if (c.style.display !== 'none') hasVisible = true;
                });
                sec.style.display = hasVisible ? 'block' : 'none';
            });
        });
    }
}

// --- Toast Logic ---
function copyLink(hashPath) {
    const url = `${window.location.origin}/gemini_html/${hashPath}/`;
    navigator.clipboard.writeText(url).then(() => {
        showToast();
    }).catch(err => {
        // Fallback
        const input = document.createElement('textarea');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Auto-run if not in test environment? 
// We can check if 'module' exists or similar, but for simple script inclusions:
// We rely on 'window.addEventListener' in the HTML mostly. 
// But here let's export it or attach to window for testing.
window.init = init;
