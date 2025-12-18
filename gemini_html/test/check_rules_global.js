const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../');
const IGNORE_DIRS = ['.git', '.agent', '.vscode', 'node_modules', 'test']; // Ignore test dir itself to avoid flagging the test files
const IGNORE_FILES = ['check_rules_global.js', 'verification_script.js'];

// Rules
const RULES = [
    {
        name: 'No Back Button',
        check: (content) => {
            // Heuristic patterns for back buttons
            const patterns = [
                /<button[^>]*>.*(Back|뒤로).*<\/button>/i,
                /class="[^"]*nav-back[^"]*"/i,
                /class="[^"]*back-button[^"]*"/i,
                />\s*(Back to List|목록으로|뒤로가기)\s*</i
            ];
            for (const p of patterns) {
                if (p.test(content)) return `Found pattern: ${p}`;
            }
            return null;
        }
    },
    {
        name: 'No Iframes',
        check: (content) => {
            if (/<iframe/i.test(content)) return 'Found <iframe> tag';
            return null;
        }
    }
];

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    let violations = [];

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (IGNORE_DIRS.includes(file)) continue;
            violations = violations.concat(scanDir(fullPath));
        } else if (file.endsWith('.html')) {
            if (IGNORE_FILES.includes(file)) continue;

            const content = fs.readFileSync(fullPath, 'utf8');
            const relPath = path.relative(ROOT_DIR, fullPath);

            RULES.forEach(rule => {
                const result = rule.check(content);
                if (result) {
                    violations.push({
                        file: relPath,
                        rule: rule.name,
                        details: result
                    });
                }
            });
        }
    }
    return violations;
}

console.log('Starting Global Rule Check...');
console.log(`Scanning directory: ${ROOT_DIR}`);
const results = scanDir(ROOT_DIR);

if (results.length === 0) {
    console.log('\n✅ PASS: No violations found across all files.');
    process.exit(0);
} else {
    console.log(`\n❌ FAIL: Found ${results.length} violations:`);
    results.forEach(v => {
        console.log(`- [${v.rule}] ${v.file}: ${v.details}`);
    });
    process.exit(1);
}
