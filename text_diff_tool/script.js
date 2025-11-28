// Text Diff Tool - Main JavaScript

// DOM Elements
const leftTextArea = document.getElementById('leftText');
const rightTextArea = document.getElementById('rightText');
const compareBtn = document.getElementById('compareBtn');
const clearLeftBtn = document.getElementById('clearLeft');
const clearRightBtn = document.getElementById('clearRight');
const leftOutput = document.getElementById('leftOutput');
const rightOutput = document.getElementById('rightOutput');
const resultSection = document.getElementById('resultSection');

// Normalize text by removing special characters and whitespace
function normalizeText(text) {
    // Remove all special characters and whitespace, keep only alphanumeric and Korean characters
    return text.replace(/[^\w\uAC00-\uD7A3]/g, '').toLowerCase();
}

// Create a mapping between normalized and original text positions
function createPositionMap(originalText) {
    const map = [];
    let normalizedIndex = 0;

    for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        // Check if this character would be kept in normalized text
        if (/[\w\uAC00-\uD7A3]/.test(char)) {
            map[normalizedIndex] = i;
            normalizedIndex++;
        }
    }

    return map;
}

// Find differences between two normalized strings using LCS-based diff
function findDifferences(text1, text2) {
    const len1 = text1.length;
    const len2 = text2.length;

    // Build LCS matrix
    const lcs = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                lcs[i][j] = lcs[i - 1][j - 1] + 1;
            } else {
                lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
            }
        }
    }

    // Backtrack to find differences
    const diff1 = []; // differences in text1 (removed)
    const diff2 = []; // differences in text2 (added)

    let i = len1, j = len2;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && text1[i - 1] === text2[j - 1]) {
            i--;
            j--;
        } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
            diff2.push({ pos: j - 1, type: 'added' });
            j--;
        } else if (i > 0) {
            diff1.push({ pos: i - 1, type: 'removed' });
            i--;
        }
    }

    return { diff1: diff1.reverse(), diff2: diff2.reverse() };
}

// Group consecutive positions into ranges
function groupIntoRanges(diffs) {
    if (diffs.length === 0) return [];

    const ranges = [];
    let start = diffs[0].pos;
    let end = diffs[0].pos;

    for (let i = 1; i < diffs.length; i++) {
        if (diffs[i].pos === end + 1) {
            end = diffs[i].pos;
        } else {
            ranges.push({ start, end, type: diffs[0].type });
            start = diffs[i].pos;
            end = diffs[i].pos;
        }
    }
    ranges.push({ start, end, type: diffs[0].type });

    return ranges;
}

// Apply highlighting to original text based on normalized differences
function highlightText(originalText, normalizedDiffs, positionMap) {
    if (normalizedDiffs.length === 0) {
        return originalText;
    }

    const ranges = groupIntoRanges(normalizedDiffs);
    const highlightedParts = [];
    let lastPos = 0;

    for (const range of ranges) {
        const startOriginal = positionMap[range.start];
        const endOriginal = positionMap[range.end];

        if (startOriginal === undefined || endOriginal === undefined) continue;

        // Add text before this range
        if (lastPos < startOriginal) {
            highlightedParts.push(escapeHtml(originalText.substring(lastPos, startOriginal)));
        }

        // Add highlighted text
        const highlightedText = escapeHtml(originalText.substring(startOriginal, endOriginal + 1));
        const className = range.type === 'added' ? 'diff-added' : 'diff-removed';
        highlightedParts.push(`<span class="${className}">${highlightedText}</span>`);

        lastPos = endOriginal + 1;
    }

    // Add remaining text
    if (lastPos < originalText.length) {
        highlightedParts.push(escapeHtml(originalText.substring(lastPos)));
    }

    return highlightedParts.join('');
}

// Escape HTML special characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Main compare function
function compareTexts() {
    const leftText = leftTextArea.value;
    const rightText = rightTextArea.value;

    // Check if both texts are empty
    if (!leftText.trim() && !rightText.trim()) {
        leftOutput.innerHTML = '<span style="color: var(--text-muted);">텍스트를 입력해주세요</span>';
        rightOutput.innerHTML = '<span style="color: var(--text-muted);">텍스트를 입력해주세요</span>';
        resultSection.classList.add('visible');
        return;
    }

    // Normalize texts
    const normalizedLeft = normalizeText(leftText);
    const normalizedRight = normalizeText(rightText);

    // Check if normalized texts are identical
    if (normalizedLeft === normalizedRight) {
        leftOutput.innerHTML = escapeHtml(leftText) + '<div style="margin-top: 1rem; padding: 0.75rem; background: var(--color-added-bg); color: var(--color-added); border-radius: 8px; text-align: center;">✓ 텍스트가 동일합니다</div>';
        rightOutput.innerHTML = escapeHtml(rightText) + '<div style="margin-top: 1rem; padding: 0.75rem; background: var(--color-added-bg); color: var(--color-added); border-radius: 8px; text-align: center;">✓ 텍스트가 동일합니다</div>';
        resultSection.classList.add('visible');
        return;
    }

    // Create position maps
    const leftPosMap = createPositionMap(leftText);
    const rightPosMap = createPositionMap(rightText);

    // Find differences
    const { diff1, diff2 } = findDifferences(normalizedLeft, normalizedRight);

    // Apply highlighting
    const highlightedLeft = highlightText(leftText, diff1, leftPosMap);
    const highlightedRight = highlightText(rightText, diff2, rightPosMap);

    // Display results
    leftOutput.innerHTML = highlightedLeft;
    rightOutput.innerHTML = highlightedRight;
    resultSection.classList.add('visible');

    // Smooth scroll to results
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Event Listeners
compareBtn.addEventListener('click', compareTexts);

clearLeftBtn.addEventListener('click', () => {
    leftTextArea.value = '';
    leftTextArea.focus();
});

clearRightBtn.addEventListener('click', () => {
    rightTextArea.value = '';
    rightTextArea.focus();
});

// Allow Enter key with Ctrl/Cmd to trigger comparison
leftTextArea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        compareTexts();
    }
});

rightTextArea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        compareTexts();
    }
});

// Add button animation on click
compareBtn.addEventListener('click', function () {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
});
