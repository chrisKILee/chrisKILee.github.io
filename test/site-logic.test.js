import { describe, it, expect } from 'vitest';
import {
  getEffectiveTier,
  changeFileTier,
  applyAdminOverrides,
  generateToken,
} from '../assets/js/site-logic.js';

// ─── getEffectiveTier ─────────────────────────────────────────────────────────

describe('getEffectiveTier', () => {
  it('파일에 tier가 있으면 파일 tier 반환', () => {
    expect(getEffectiveTier({ tier: 'company' }, { tier: 'public' })).toBe('company');
  });

  it('파일 tier가 없으면 폴더 tier 반환', () => {
    expect(getEffectiveTier({}, { tier: 'private' })).toBe('private');
  });

  it('둘 다 없으면 public 반환', () => {
    expect(getEffectiveTier({}, undefined)).toBe('public');
  });

  it('파일 tier가 null이면 폴더 tier로 폴백', () => {
    expect(getEffectiveTier({ tier: null }, { tier: 'company' })).toBe('company');
  });
});

// ─── changeFileTier ───────────────────────────────────────────────────────────

describe('changeFileTier', () => {
  const makeConfig = () => ({
    version: '4.0',
    folders: {
      FOLD1: { tier: 'public', displayName: 'AI Study' },
      FOLD2: { tier: 'company', displayName: 'Work' },
    },
    files: {
      FILE1: { filename: 'a.html', categoryHash: 'FOLD1', visible: true },
      FILE2: { filename: 'b.html', categoryHash: 'FOLD1', visible: true },
      FILE3: { filename: 'c.html', categoryHash: 'FOLD2', visible: true },
    },
  });

  it('존재하지 않는 fileHash는 무시', () => {
    const cfg = makeConfig();
    changeFileTier(cfg, 'NOTEXIST', 'private');
    expect(cfg.files.FILE1.tier).toBeUndefined();
  });

  it('newTier가 folderTier와 같으면 f.tier 삭제', () => {
    const cfg = makeConfig();
    cfg.files.FILE1.tier = 'private'; // 먼저 오버라이드 설정
    changeFileTier(cfg, 'FILE1', 'public'); // folder tier = 'public'
    expect(cfg.files.FILE1.tier).toBeUndefined();
  });

  it('newTier가 folderTier와 다르면 f.tier 설정', () => {
    const cfg = makeConfig();
    changeFileTier(cfg, 'FILE1', 'private');
    expect(cfg.files.FILE1.tier).toBe('private');
  });

  it('파일 A tier 변경 시 파일 B는 영향받지 않음', () => {
    const cfg = makeConfig();
    changeFileTier(cfg, 'FILE1', 'private');
    expect(cfg.files.FILE2.tier).toBeUndefined();
  });

  it('folder가 없는 파일은 public 기준으로 처리', () => {
    const cfg = makeConfig();
    cfg.files.FILE1.categoryHash = 'NOFOLDER';
    changeFileTier(cfg, 'FILE1', 'public'); // folderTier = 'public' → delete
    expect(cfg.files.FILE1.tier).toBeUndefined();
  });
});

// ─── applyAdminOverrides ──────────────────────────────────────────────────────

describe('applyAdminOverrides', () => {
  const makeConfig = () => ({
    version: '4.0',
    directories: [{ id: 'dir1', name: 'AI', visible: true }],
    folders: {
      FOLD1: { tier: 'public', visible: true, collapsed: false, dirId: 'dir1' },
    },
    files: {
      FILE1: { filename: 'a.html', categoryHash: 'FOLD1', visible: true, tier: undefined },
    },
  });

  it('version 일치 시 tier 오버라이드 적용', () => {
    const cfg = makeConfig();
    applyAdminOverrides(cfg, {
      version: '4.0',
      folders: {},
      files: { FILE1: { tier: 'private' } },
      directories: [],
    });
    expect(cfg.files.FILE1.tier).toBe('private');
  });

  it('version 불일치 시 오버라이드 미적용', () => {
    const cfg = makeConfig();
    applyAdminOverrides(cfg, {
      version: '3.9',
      folders: {},
      files: { FILE1: { tier: 'private' } },
      directories: [],
    });
    expect(cfg.files.FILE1.tier).toBeUndefined();
  });

  it('cached tier가 undefined면 file.tier 삭제', () => {
    const cfg = makeConfig();
    cfg.files.FILE1.tier = 'company'; // 이전에 설정된 tier
    applyAdminOverrides(cfg, {
      version: '4.0',
      folders: {},
      files: { FILE1: {} }, // tier 없음
      directories: [],
    });
    expect(cfg.files.FILE1.tier).toBeUndefined();
  });

  it('shareToken 오버라이드 적용', () => {
    const cfg = makeConfig();
    applyAdminOverrides(cfg, {
      version: '4.0',
      folders: {},
      files: { FILE1: { shareToken: 'abc123' } },
      directories: [],
    });
    expect(cfg.files.FILE1.shareToken).toBe('abc123');
  });

  it('folder tier 오버라이드 적용', () => {
    const cfg = makeConfig();
    applyAdminOverrides(cfg, {
      version: '4.0',
      folders: { FOLD1: { tier: 'company' } },
      files: {},
      directories: [],
    });
    expect(cfg.folders.FOLD1.tier).toBe('company');
  });

  it('cached에 없는 file은 변경하지 않음', () => {
    const cfg = makeConfig();
    cfg.files.FILE1.visible = true;
    applyAdminOverrides(cfg, {
      version: '4.0',
      folders: {},
      files: {},
      directories: [],
    });
    expect(cfg.files.FILE1.visible).toBe(true);
  });
});

// ─── generateToken ────────────────────────────────────────────────────────────

describe('generateToken', () => {
  it('기본 길이 8', () => {
    expect(generateToken()).toHaveLength(8);
  });

  it('지정 길이 반환', () => {
    expect(generateToken(16)).toHaveLength(16);
  });

  it('소문자+숫자만 포함', () => {
    expect(generateToken(32)).toMatch(/^[a-z0-9]+$/);
  });

  it('두 번 호출 결과가 다름 (충분히 높은 확률)', () => {
    const a = generateToken(16);
    const b = generateToken(16);
    expect(a).not.toBe(b);
  });
});
