import { describe, it, expect, beforeEach } from 'vitest';
import {
  getUnlockedDefenders,
  loadUnlocks,
  saveUnlocks,
  updateUnlocksAfterLevel,
  needsLoadoutSelection,
  MAX_LOADOUT,
} from '../src/systems/DefenderUnlocks';

class MockStorage implements Storage {
  private data: Map<string, string> = new Map();
  get length(): number { return this.data.size; }
  clear(): void { this.data.clear(); }
  getItem(key: string): string | null { return this.data.get(key) ?? null; }
  key(_index: number): string | null { return null; }
  removeItem(key: string): void { this.data.delete(key); }
  setItem(key: string, value: string): void { this.data.set(key, value); }
}

describe('DefenderUnlocks', () => {
  let storage: MockStorage;

  beforeEach(() => {
    storage = new MockStorage();
  });

  it('initial defenders are generator and shooter', () => {
    const unlocked = loadUnlocks(storage);
    expect(unlocked).toEqual(['generator', 'shooter']);
    expect(needsLoadoutSelection(unlocked)).toBe(false);
  });

  it('selection cap at 4 — MAX_LOADOUT is 4', () => {
    expect(MAX_LOADOUT).toBe(4);
  });

  it('completing L3 (index 2) unlocks Block Tower and Water Cannon', () => {
    let unlocked = loadUnlocks(storage);
    // Complete L3 (index 2) → unlocks wall (Block Tower) + cannon (Water Cannon)
    unlocked = updateUnlocksAfterLevel(unlocked, 2);
    expect(unlocked).toContain('wall');
    expect(unlocked).toContain('cannon');
    expect(unlocked).toHaveLength(4);
    // 4 defenders = 4 → no loadout selection needed (not > 4)
    expect(needsLoadoutSelection(unlocked)).toBe(false);
  });

  it('completing L1 or L2 does not unlock anything', () => {
    let unlocked = loadUnlocks(storage);
    unlocked = updateUnlocksAfterLevel(unlocked, 0);
    expect(unlocked).toHaveLength(2);
    unlocked = updateUnlocksAfterLevel(unlocked, 1);
    expect(unlocked).toHaveLength(2);
  });

  it('completing L5 (index 4) unlocks Glitter Bomb', () => {
    let unlocked = loadUnlocks(storage);
    for (let i = 0; i <= 4; i++) {
      unlocked = updateUnlocksAfterLevel(unlocked, i);
    }
    expect(unlocked).toContain('bomb');
    expect(unlocked).toHaveLength(5); // generator, shooter, wall, cannon, bomb
    // 5 > 4 → loadout selection needed
    expect(needsLoadoutSelection(unlocked)).toBe(true);
  });

  it('completing only L1-L4 (indices 0-3) does not yield trapper, mine, or bomb', () => {
    let unlocked = loadUnlocks(storage);
    expect(unlocked).not.toContain('trapper');
    expect(unlocked).not.toContain('mine');
    expect(unlocked).not.toContain('bomb');
    // Complete L1-L4 — wall + cannon at L3 only
    for (let i = 0; i < 4; i++) {
      unlocked = updateUnlocksAfterLevel(unlocked, i);
    }
    expect(unlocked).not.toContain('trapper');
    expect(unlocked).not.toContain('mine');
    expect(unlocked).not.toContain('bomb');
  });

  it('completing L6 (index 5) unlocks trapper (Honey Bear)', () => {
    let unlocked = loadUnlocks(storage);
    for (let i = 0; i <= 5; i++) {
      unlocked = updateUnlocksAfterLevel(unlocked, i);
    }
    expect(unlocked).toContain('trapper');
    expect(unlocked).not.toContain('mine');
  });

  it('completing L8 (index 7) unlocks mine (Marble Mine)', () => {
    let unlocked = loadUnlocks(storage);
    for (let i = 0; i <= 7; i++) {
      unlocked = updateUnlocksAfterLevel(unlocked, i);
    }
    expect(unlocked).toContain('trapper');
    expect(unlocked).toContain('mine');
  });

  it('needsLoadoutSelection returns true when 5+ defenders unlocked (after L5)', () => {
    let unlocked = loadUnlocks(storage);
    // After L3: generator, shooter, wall, cannon = 4 → not yet
    for (let i = 0; i <= 2; i++) {
      unlocked = updateUnlocksAfterLevel(unlocked, i);
    }
    expect(needsLoadoutSelection(unlocked)).toBe(false);
    // After L5: + bomb = 5 → needs selection (5 > 4)
    unlocked = updateUnlocksAfterLevel(unlocked, 3);
    unlocked = updateUnlocksAfterLevel(unlocked, 4);
    expect(needsLoadoutSelection(unlocked)).toBe(true);
  });

  it('loadout array persisted and restored from localStorage', () => {
    let unlocked = loadUnlocks(storage);
    unlocked = updateUnlocksAfterLevel(unlocked, 2); // +wall +cannon
    saveUnlocks(unlocked, storage);

    const restored = loadUnlocks(storage);
    expect(restored).toEqual(['generator', 'shooter', 'wall', 'cannon']);
  });
});
