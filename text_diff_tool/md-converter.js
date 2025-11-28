// MD to Text Converter - Main JavaScript

// DOM Elements
const mdInput = document.getElementById('mdInput');
const textOutput = document.getElementById('textOutput');
const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');
const clearInputBtn = document.getElementById('clearInputBtn');
const loadSampleBtn = document.getElementById('loadSampleBtn');
const toast = document.getElementById('toast');

// Sample markdown for demonstration
const sampleMarkdown = `주요 운영 업무
- 세아베스틸지주 근태 오픈 [~12/31]
  - 근태 환경설정, 결재양식 개발, 근태 기능 개선 등 (관련자료)
- 세아제강 이사회 분의 요청서 개선 [~12/24]
  - 순자합의자(법률검토인)의 역할에 부합하도록 버튼 및 표기 수정 (관련자료)
- 세아베스틸 주니어보드 게시판 오픈 지원
기능개선
- 세아웍스 안내사이트 개선 [~11/26]
  - 공지사항 11/21(금)
  - 오픈일: 11/25(화) 19시 이후
- 게시판 개선 [~12/11]
  - 최근게시판 기능 추가, 상단 공지 기능 개선 등
프로젝트
- 세아창원특수강: 출장시스템 인사정보 연동 및 테스트 지원
- 세아엠앤에스(SAP B1 인터페이스 연동)
  - 공통 인터페이스 모듈 개발
기타
- 11월 신규 입사자 그룹웨어 교육: 11/26(수)
- 백엔드 채용 재진행 중
- 송현홀딩스 그룹웨어 도입관련 문의 대응: 그룹웨어 소개서 관련 자료`;

// Detect the indentation level of a line
function getIndentLevel(line) {
    const markerMatch = line.match(/^(\s*)([-*•])\s+/);

    if (markerMatch) {
        const leadingWhitespace = markerMatch[1];
        const spaces = leadingWhitespace.replace(/\t/g, '  ').length;
        return Math.floor(spaces / 2) + 1;
    }

    const match = line.match(/^(\s*)/);
    if (!match) return 0;

    const leadingWhitespace = match[1];
    const spaces = leadingWhitespace.replace(/\t/g, '  ').length;

    return Math.floor(spaces / 2);
}

// Parse a line and extract its content
function parseLineContent(line) {
    const trimmed = line.trimStart();
    const content = trimmed.replace(/^[-*•]\s*/, '');
    return content;
}

// Convert markdown to formatted text
function convertMarkdown(markdown) {
    if (!markdown.trim()) return '';

    const lines = markdown.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        const indentDepth = getIndentLevel(line);
        const content = parseLineContent(line);
        if (!content) continue;

        const depth = indentDepth;

        if (depth === 0) {
            if (result.length > 0) result.push('');
            result.push(`[${content}]`);
        } else {
            const indent = '  '.repeat(depth - 1);
            result.push(`${indent}- ${content}`);
        }
    }

    return result.join('\n');
}

// Parse HTML list structure from Confluence
function parseHtmlList(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const result = [];

    function processNode(node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        if ((node.tagName === 'UL' || node.tagName === 'OL') && node.hasAttribute('data-indent-level')) {
            const indentLevel = parseInt(node.getAttribute('data-indent-level')) || 1;

            for (const child of node.children) {
                if (child.tagName === 'LI') {
                    let text = '';
                    const pTags = child.querySelectorAll(':scope > p');

                    for (const p of pTags) {
                        for (const pNode of p.childNodes) {
                            if (pNode.nodeType === Node.TEXT_NODE) {
                                text += pNode.textContent;
                            } else if (pNode.nodeName === 'STRONG') {
                                text += pNode.textContent;
                            }
                        }
                    }

                    text = text.trim();
                    if (text) {
                        if (indentLevel === 1) {
                            result.push(text);
                        } else {
                            const indent = '  '.repeat(indentLevel - 2);
                            result.push(indent + '- ' + text);
                        }
                    }

                    for (const nestedChild of child.children) {
                        processNode(nestedChild);
                    }
                }
            }
        } else {
            for (const child of node.children) {
                processNode(child);
            }
        }
    }

    processNode(tempDiv);
    return result.join('\n');
}

// Convert button click handler
function handleConvert() {
    const markdown = mdInput.value;

    if (!markdown.trim()) {
        textOutput.innerHTML = '<span class="placeholder-text">입력된 마크다운이 없습니다</span>';
        copyBtn.disabled = true;
        return;
    }

    const converted = convertMarkdown(markdown);

    if (!converted) {
        textOutput.innerHTML = '<span class="placeholder-text">변환할 내용이 없습니다</span>';
        copyBtn.disabled = true;
        return;
    }

    textOutput.textContent = converted;
    copyBtn.disabled = false;

    setTimeout(() => {
        textOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Copy to clipboard
async function handleCopy() {
    const text = textOutput.textContent;

    if (!text || text.includes('변환 버튼을') || text.includes('입력된 마크다운이')) {
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        showToast();
    } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast();
    }
}

// Show toast notification
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Load sample markdown
function loadSample() {
    mdInput.value = sampleMarkdown;
    mdInput.focus();
}

// Clear input
function clearInput() {
    mdInput.value = '';
    textOutput.innerHTML = '<span class="placeholder-text">변환 버튼을 클릭하면 결과가 여기에 표시됩니다</span>';
    copyBtn.disabled = true;
    mdInput.focus();
}

// Handle paste event
mdInput.addEventListener('paste', (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const htmlData = clipboardData.getData('text/html');

    if (htmlData && (htmlData.includes('<ul') || htmlData.includes('<ol') || htmlData.includes('<li'))) {
        e.preventDefault();

        const parsedText = parseHtmlList(htmlData);

        if (parsedText) {
            const start = mdInput.selectionStart;
            const end = mdInput.selectionEnd;
            const currentValue = mdInput.value;

            mdInput.value = currentValue.substring(0, start) + parsedText + currentValue.substring(end);

            const newPosition = start + parsedText.length;
            mdInput.selectionStart = newPosition;
            mdInput.selectionEnd = newPosition;
        }
    }
});

// Event Listeners
convertBtn.addEventListener('click', handleConvert);
copyBtn.addEventListener('click', handleCopy);
clearInputBtn.addEventListener('click', clearInput);
loadSampleBtn.addEventListener('click', loadSample);

mdInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleConvert();
    }
});

convertBtn.addEventListener('click', function () {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
});

copyBtn.addEventListener('click', function () {
    if (!this.disabled) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    }
});
