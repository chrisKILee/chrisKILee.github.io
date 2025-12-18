const fs = require('fs');
const path = require('path');

// --- Mock Environment ---
const window = {
    location: { hash: '' }
};

const document = {
    head: {
        appendChild: (el) => {
            // console.log('Head append:', el);
        }
    },
    body: {
        appendChild: (el) => {
            // console.log('Body append:', el);
        }
    },
    createElement: (tag) => {
        return {
            tagName: tag.toUpperCase(),
            setAttribute: function (k, v) { this[k] = v; },
            getAttribute: function (k) { return this[k]; },
            classList: {
                add: () => { },
                remove: () => { }
            },
            cloneNode: function () { return { ...this }; }
        };
    },
    getElementById: (id) => {
        // Mock Content Frame
        if (id === 'contentFrame') {
            return {
                innerHTML: '',
                style: {},
                querySelector: () => null
            };
        }
        return null;
    },
    querySelectorAll: () => []
};

// --- Test Logic ---
console.log('--- TEST: SPA Rendering & Node Module Fix ---');

// 1. Mock Content to be loaded
const mockHTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { background-color: red; }
        .feature { color: blue; }
    </style>
</head>
<body>
    <div class="test-content">Hello World</div>
    <script src="../node_modules/chart.js/dist/chart.min.js"></script>
    <script src="js/local-script.js"></script>
</body>
</html>
`;

// 2. Logic to Test (This mimics the to-be-implemented loadContent logic)
// 우린 이 로직을 TDD로 검증할 것입니다. 실제 구현 코드를 여기에 복사하거나 가져와서 테스트합니다.
// 하지만 지금은 테스트 케이스(검증 로직)를 먼저 작성합니다.

function processContent(htmlString) {
    let processed = htmlString;

    // Feature 1: Node Modules -> CDN rewrite
    // Simple regex for demo (actual implementation will be more robust)
    processed = processed.replace(
        /src=["']\.\.\/node_modules\/([^"']+)["']/g,
        'src="https://cdn.jsdelivr.net/npm/$1"'
    );

    // Feature 2: CSS Scoping
    // We want to extract styles and scope them.
    // For this test, we'll just check if the regex works on text extraction.
    // In real browser DOM, we'd iterate style tags.

    // Simulate CSS extraction (Simplified Node version)
    const styleMatch = processed.match(/<style>([\s\S]*?)<\/style>/i);
    let extractedStyle = "";
    if (styleMatch) {
        extractedStyle = styleMatch[1];
        // Replace body/html with .imported-content
        extractedStyle = extractedStyle.replace(/(body|html)/g, '.imported-content');
    }

    return { processed, extractedStyle };
}

// 3. Execution & Assertion
try {
    const result = processContent(mockHTML);
    console.log('Processed HTML Length:', result.processed.length);

    // Assert 1: Node Modules Rewritten
    if (result.processed.includes('cdn.jsdelivr.net/npm/chart.js')) {
        console.log('PASS: node_modules path rewritten to CDN.');
    } else {
        console.log('FAIL: node_modules path NOT rewritten.');
    }

    // Assert 2: CSS Scoped
    if (result.extractedStyle.includes('.imported-content { background-color: red; }')) {
        console.log('PASS: "body" selector rewritten to ".imported-content".');
    } else {
        console.log('FAIL: "body" selector NOT rewritten properly. Got:', result.extractedStyle);
    }

    // Assert 3: Original Content Intact
    if (result.processed.includes('Hello World')) {
        console.log('PASS: Content preserved.');
    } else {
        console.log('FAIL: Content lost.');
    }

} catch (e) {
    console.error('ERROR:', e);
}
