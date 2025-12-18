const fs = require('fs');
const path = require('path');

// --- Mock Environment ---
const window = {
    FOLDER_CONFIG: {
        '01_rnd': {
            _folderName: 'RND',
            'file1.html': 'Desc 1',
            _order: ['file1.html']
        }
    }
};

const domStore = {
    contentArea: ''
};

const document = {
    getElementById: (id) => {
        if (id === 'contentArea') {
            return {
                set innerHTML(val) { domStore.contentArea = val; },
                get innerHTML() { return domStore.contentArea; },
                appendChild: (child) => { domStore.contentArea += child.innerHTML; }
            };
        }
        return { innerText: '', addEventListener: () => { } };
    },
    createElement: (tag) => ({
        className: '',
        innerHTML: '',
        children: []
    }),
    querySelectorAll: () => []
};

// --- Inject Logic ---
// We read the file and eval it in this context
const scriptPath = path.join(__dirname, '../GDEDSE/gdedse_main.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Wrap in a function to execute with our mocks
const runScript = new Function('window', 'document', scriptContent + '\ninit();');

console.log('--- Runtime Simulation of GDEDSE ---');

try {
    runScript(window, document);

    // Check Output
    const output = domStore.contentArea;
    console.log('Output Length:', output.length);

    if (output.includes('copy-link-btn')) {
        console.log('PASS: "copy-link-btn" class found in output HTML.');
    } else {
        console.log('FAIL: "copy-link-btn" NOT found. Output snippet:', output.substring(0, 500));
    }

    if (output.includes('링크 복사')) {
        console.log('PASS: "링크 복사" text found in output HTML.');
    } else {
        console.log('FAIL: "링크 복사" text NOT found.');
    }

    if (output.includes('AED13WE')) {
        console.log('PASS: Hash "AED13WE" found in output (indicating mapping worked).');
    }

} catch (e) {
    console.error('CRITICAL ERROR during script execution:', e);
}
