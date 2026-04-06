import { describe, it, expect } from 'vitest';
import {
  createHoneyPot,
  updateHoneyPots,
  getSpeedModifier,
  HONEY_POT_DURATION,
  HONEY_POT_SLOW,
} from '../src/systems/HoneyTrap';

describe('HoneyTrap — honey pot state management', () => {
  it('creates a pot with correct position and duration', () => {
    const pot = createHoneyPot(2, 5, 8000);
    expect(pot.row).toBe(2);
    expect(pot.col).toBe(5);
    expect(pot.remainingMs).toBe(8000);
    expect(pot.durationMs).toBe(8000);
  });

  it('pot expires after its duration elapses', () => {
    const pots = [createHoneyPot(1, 3, 8000)];
    const remaining = updateHoneyPots(pots, 8001);
    expect(remaining).toHaveLength(0);
  });

  it('speed modifier returns 0.5 for cell with active pot', () => {
    const pots = [createHoneyPot(2, 4)];
    expect(getSpeedModifier(pots, 2, 4)).toBe(HONEY_POT_SLOW);
  });

  it('speed modifier returns 1.0 for cell without pot', () => {
    const pots = [createHoneyPot(2, 4)];
    expect(getSpeedModifier(pots, 3, 4)).toBe(1.0);
    expect(getSpeedModifier(pots, 2, 5)).toBe(1.0);
  });

  it('multiple pots on different cells apply independently', () => {
    const pots = [
      createHoneyPot(0, 3),
      createHoneyPot(2, 6),
      createHoneyPot(4, 1),
    ];
    expect(getSpeedModifier(pots, 0, 3)).toBe(HONEY_POT_SLOW);
    expect(getSpeedModifier(pots, 2, 6)).toBe(HONEY_POT_SLOW);
    expect(getSpeedModifier(pots, 4, 1)).toBe(HONEY_POT_SLOW);
    expect(getSpeedModifier(pots, 1, 3)).toBe(1.0); // empty cell
  });

  it('expired pot no longer applies slow modifier', () => {
    const pots = [createHoneyPot(2, 4, 5000)];
    const remaining = updateHoneyPots(pots, 5001);
    expect(remaining).toHaveLength(0);
    // Even checking original array — pot's remainingMs is negative
    expect(getSpeedModifier(pots, 2, 4)).toBe(1.0);
  });

  it('uses default HONEY_POT_DURATION when no duration specified', () => {
    const pot = createHoneyPot(1, 1);
    expect(pot.durationMs).toBe(HONEY_POT_DURATION);
    expect(pot.remainingMs).toBe(HONEY_POT_DURATION);
  });

  it('partial update keeps pot alive with reduced time', () => {
    const pots = [createHoneyPot(3, 2, 8000)];
    const remaining = updateHoneyPots(pots, 3000);
    expect(remaining).toHaveLength(1);
    expect(remaining[0].remainingMs).toBe(5000);
    expect(getSpeedModifier(remaining, 3, 2)).toBe(HONEY_POT_SLOW);
  });

  it('honey pools from projectile-hit path expire after HONEY_POT_DURATION and apply correct slow modifier', () => {
    // Simulates the projectile-hit code path: createHoneyPot for each AOE row
    const aoeRows = [1, 2, 3]; // target row 2 ± 1
    const hitCol = 5;
    const pots = aoeRows.map(row => createHoneyPot(row, hitCol, HONEY_POT_DURATION));

    // All 3 pools are active and apply slow
    for (const row of aoeRows) {
      expect(getSpeedModifier(pots, row, hitCol)).toBe(HONEY_POT_SLOW);
    }

    // After full duration, all pools expire
    const remaining = updateHoneyPots(pots, HONEY_POT_DURATION + 1);
    expect(remaining).toHaveLength(0);
    for (const row of aoeRows) {
      expect(getSpeedModifier(pots, row, hitCol)).toBe(1.0);
    }
  });
});
