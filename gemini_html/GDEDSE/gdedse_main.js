
// --- Configuration ---
const KNOWN_FOLDERS = ['01_rnd', '02_work', '03_travel', '04_AI_Study', '05_Private', '06_VNTG_AI_STUDY', '07_RD_HOT_NEWS'];

// Hash Mappings for Security/Obfuscation
const HASH_MAPPINGS = {
    '01_rnd': 'AED13WE',
    '02_work': 'BF7K2M9',
    '03_travel': 'C8PQ4X1',
    '04_AI_Study': 'QT38XYX',
    '05_Private': 'RU4TYZ1',
    '06_VNTG_AI_STUDY': 'VNTG7S2',
    '07_RD_HOT_NEWS': 'RDH10WS'
};

const SECRET_LIST_HASHES = {
    '01_rnd': 'r-research-lock-24',
    '02_work': 'w-work-auth-88',
    '03_travel': 't-travel-auth-55',
    '04_AI_Study': 'a-ai-study-lock-99',
    '05_Private': 'p-private-key-12',
    '06_VNTG_AI_STUDY': 'l-life-auth-77',
    '07_RD_HOT_NEWS': 'n-news-auth-2024'
};

// --- Logic ---

async function fetchAllFolderConfigs() {
    const config = {};
    for (const folderKey of KNOWN_FOLDERS) {
        const hashPath = HASH_MAPPINGS[folderKey] || folderKey;
        try {
            // Fetch files.json from the relative path of the hash directory
            const response = await fetch(`../${hashPath}/files.json?v=${new Date().getTime()}`);
            if (response.ok) {
                config[folderKey] = await response.json();
            } else {
                console.warn(`Could not load files.json for ${folderKey} (${hashPath})`);
            }
        } catch (e) {
            console.error(`Error fetching config for ${folderKey}:`, e);
        }
    }
    return config;
}

async function init() {
    const container = document.getElementById('contentArea');
    container.innerHTML = `<div class="loading" style="text-align:center; padding:50px; color:#191919; opacity:0.5;">
        <i class="fas fa-spinner fa-spin"></i> Loading archive items...
    </div>`;

    // Load configs dynamically at runtime (Zero-Sync)
    const config = await fetchAllFolderConfigs();

    if (Object.keys(config).length === 0) {
        container.innerHTML = `<div class="loading">Could not load archive data. Please check connection.</div>`;
        return;
    }

    container.innerHTML = '';
    let totalFiles = 0;
    let totalFolders = 0;

    KNOWN_FOLDERS.forEach(folderKey => {
        const folderData = config[folderKey];
        if (!folderData) return;

        totalFolders++;
        // Identify files: items that are not metadata keys
        const fileKeys = Object.keys(folderData).filter(k => k !== '_folderName' && k !== '_order');

        // Use _order if available for sorting
        let sortedKeys = fileKeys;
        if (folderData._order) {
            sortedKeys = folderData._order.filter(k => fileKeys.includes(k));
            const unordered = fileKeys.filter(k => !folderData._order.includes(k));
            sortedKeys = [...sortedKeys, ...unordered];
        }

        totalFiles += sortedKeys.length;

        const section = document.createElement('div');
        section.className = 'folder-section';

        const hashPath = HASH_MAPPINGS[folderKey] || folderKey;
        const folderName = folderData._folderName || folderKey;

        const secretHash = SECRET_LIST_HASHES[folderKey] || '';
        const listAccessUrl = `../${hashPath}/#${secretHash}`;

        section.innerHTML = `
            <div class="folder-header">
                <div class="folder-title">${folderName}</div>
                <div style="display:flex; align-items:center; gap:12px;">
                    <div class="folder-count">${sortedKeys.length} posts</div>
                    <button class="copy-link-btn" onclick="copyListLink('${hashPath}', '${secretHash}')">
                        <i class="fas fa-link"></i> 목록 복사
                    </button>
                    <a href="${listAccessUrl}" class="copy-link-btn" style="text-decoration:none; background:var(--accent-color); color:white;">
                        <i class="fas fa-external-link-alt"></i> 목록 바로가기
                    </a>
                </div>
            </div>
            <div class="file-grid">
                ${sortedKeys.map(fileName => {
            const desc = folderData[fileName] || fileName.replace('.html', '');
            const displayName = desc;
            const fileType = fileName.split('.').pop().toUpperCase();

            // SPA hash link logic
            const fileNameNoExt = fileName.replace(/\.[^/.]+$/, "");
            const linkUrl = `../${hashPath}/#${fileNameNoExt}`;

            return `
                        <div class="file-card" onclick="window.location.href='${linkUrl}'" data-search="${displayName.toLowerCase()} ${fileName.toLowerCase()}">
                            <div class="file-meta">
                                <span>${fileType}</span>
                            </div>
                            <div class="file-title">${displayName}</div>
                            <div class="file-desc">${displayName}</div> 
                            <div class="card-actions" style="margin-top:20px; border-top:1px solid #eee; padding-top:15px; justify-content: space-between;">
                                <button class="action-btn" onclick="event.stopPropagation(); window.location.href='${linkUrl}'" style="color:var(--accent-color); font-weight:600;">
                                    <i class="fas fa-play-circle"></i> 바로가기
                                </button>
                                <button class="action-btn" onclick="event.stopPropagation(); copyDirectLink('${hashPath}', '${fileNameNoExt}')">
                                    <i class="fas fa-copy"></i> 링크 복사
                                </button>
                            </div>
                        </div>
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
// --- Toast Logic ---
// window.copyLink removed to comply with "Stealth/No-List" rule

window.copyDirectLink = function (hashPath, fileNameNoExt) {
    const baseUrl = window.location.href.split('/GDEDSE/')[0];
    const url = `${baseUrl}/${hashPath}/#${fileNameNoExt}`;
    doCopy(url);
}

window.copyListLink = function (hashPath, secretHash) {
    const baseUrl = window.location.href.split('/GDEDSE/')[0];
    const url = `${baseUrl}/${hashPath}/#${secretHash}`;
    doCopy(url);
}

function doCopy(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast();
    }).catch(err => {
        const input = document.createElement('textarea');
        input.value = text;
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

// Ensure init is available globally
window.init = init;
console.log('GDEDSE Main Script Loaded');
