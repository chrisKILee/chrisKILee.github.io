const fs = require('fs');
const path = require('path');

// --- Mocks ---

// Mock Fetch
global.fetch = async (url) => {
    // console.log('Fetch called:', url);
    if (url.includes('files.json')) {
        return {
            ok: true,
            json: async () => ({ 'test.html': 'Test File', '_order': ['test.html'] })
        };
    }
    if (url.includes('test.html')) {
        return {
            ok: true,
            text: async () => '<html><head><style>.test{color:red;}</style></head><body><div class="test">Hello World</div></body></html>'
        };
    }
    // GitHub API fallback
    return {
        ok: true,
        json: async () => ([{ type: 'file', name: 'test.html', size: 1024 }])
    };
};

class MockElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.classList = {
            add: () => { },
            remove: () => { }
        };
        this.style = {};
        this._innerHTML = '';
        this.children = [];
        this.attributes = {};
    }

    get innerHTML() { return this._innerHTML; }
    set innerHTML(val) { this._innerHTML = val; }

    getAttribute(name) { return this.attributes[name]; }
    setAttribute(name, val) { this.attributes[name] = val; }

    appendChild(child) { this.children.push(child); }
    remove() { }

    querySelectorAll(selector) { return []; }
    querySelector(selector) { return null; }
    addEventListener(event, callback) { }
}

class MockDocument {
    constructor() {
        this.head = new MockElement('HEAD');
        this.body = new MockElement('BODY');
    }

    getElementById(id) {
        if (!this[id]) this[id] = new MockElement('DIV');
        return this[id];
    }

    createElement(tag) { return new MockElement(tag.toUpperCase()); }

    querySelectorAll(selector) { return []; }
    querySelector(selector) { return null; }
}

// Global Document/Window
global.document = new MockDocument();
global.window = {
    location: { hash: '' },
    history: { pushState: () => { } },
    addEventListener: (ev, cb) => {
        if (ev === 'DOMContentLoaded') global.window.init = cb;
    }
};

// Mock DOMParser
global.DOMParser = class {
    parseFromString(str, type) {
        // Return a mock doc for the parsed content
        const doc = new MockDocument();
        doc.body.innerHTML = 'Hello World'; // Simplified
        doc.body.className = 'mock-body-class';

        // Mock querySelectorAll for 'link', 'img', 'script' 'style'
        doc.querySelectorAll = (selector) => {
            if (selector === 'script') return []; // Simplify
            if (selector === 'style') return [];
            return [];
        };
        return doc;
    }
};

// --- Test Logic ---

function extractScript(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/<script>([\s\S]*?)<\/script>/);
    return match ? match[1] : null;
}

async function testFile(folderPath, folderName) {
    console.log(`\nTesting ${folderName} (${folderPath})...`);

    const scriptContent = extractScript(path.join(__dirname, `../${folderPath}/index.html`));
    if (!scriptContent) {
        console.error('Failed to extract script');
        return;
    }

    try {
        // Reset Mocks
        global.document = new MockDocument();
        global.filesData = []; // Clear global var if leaked

        // Run Script
        // Use a wrapper to expose async functions if defined
        const run = new Function(scriptContent + '\nreturn { loadFiles, loadContent };');
        const exposed = run();

        // Test loadContent
        await exposed.loadContent('test.html');

        const frame = global.document.getElementById('contentFrame');
        const html = frame.innerHTML;

        if (html.includes('<iframe')) {
            console.log('FAIL: Iframe tag detected in contentFrame!');
        } else if (html.includes('imported-content')) {
            console.log('PASS: "imported-content" class found (Fetch logic active).');
        } else {
            console.log('FAIL: Unexpected content in frame:', html);
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

async function runTests() {
    await testFile('AED13WE', 'R&D');
    await testFile('BF7K2M9', 'Work');
    await testFile('QT38XYX', 'AI Study');
    await testFile('RU4TYZ1', 'Private');
}

runTests();
