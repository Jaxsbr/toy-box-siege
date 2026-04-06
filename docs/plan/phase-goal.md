## Phase goal

Balance and pacing pass to make the game feel gentler and more forgiving for kids — PvZ-style where most players clear stage one comfortably. All changes are config value updates in `src/config/enemies.ts` (speed values) and `src/config/levels.ts` (spawn intervals, setup delays). No system or scene code changes.

### Stories in scope
- US-50 — Reduce enemy speeds for kid-friendly pacing
- US-51 — Rebalance wave pacing L1-L9 for smooth difficulty curve

### Done-when (observable)

#### US-50 — Reduce enemy speeds for kid-friendly pacing
- [ ] Dust Bunny (`ENEMY_TYPES.basic`) speed in range [0.2, 0.3] cells/s (reduced from 0.4) [US-50]
- [ ] Armored Bunny (`ENEMY_TYPES.armored`) speed strictly less than Dust Bunny speed [US-50]
- [ ] Cleaning Robot (`ENEMY_TYPES.tough`) speed in range [0.1, 0.18] cells/s (reduced from 0.25) — slowest enemy [US-50]
- [ ] Sock Puppet (`ENEMY_TYPES.jumper`) speed in range [0.25, 0.35] cells/s (reduced from 0.455) — fastest enemy [US-50]
- [ ] Speed hierarchy holds: `jumper.speed > basic.speed > armored.speed > tough.speed` [US-50]
- [ ] `test/EnemyTypes.test.ts` speed/stat assertions updated to match new values [US-50]
- [ ] `test/Enemies.test.ts` "basic.speed > tough.speed" assertion still holds (already true, but verify armored is also covered) [US-50]
- [ ] New test in `test/EnemyTypes.test.ts` (or `test/Enemies.test.ts`) validates the full speed hierarchy: `jumper.speed > basic.speed > armored.speed > tough.speed` [US-50]
- [ ] `npm test` passes [US-50]

#### US-51 — Rebalance wave pacing L1-L9 for smooth difficulty curve
- [ ] No wave in any level (L1-L9) has a minimum spawn interval below 2.0s [US-51]
- [ ] Minimum spawn intervals do not tighten faster than levels progress: for each pair of adjacent levels, the tighter-interval level's minimum spawn gap is >= 70% of the wider-interval level's minimum spawn gap [US-51]
- [ ] Within each level, the last wave's minimum spawn interval is no less than 60% of the first wave's minimum spawn interval (prevents within-level difficulty cliffs) [US-51]
- [ ] Setup delay for levels with `enemyBio` (L5, L6, L8) >= 25s [US-51]
- [ ] Setup delay for all levels >= 18s [US-51]
- [ ] Level wave counts unchanged: L1(1), L2(2), L3(3), L4(3), L5(4), L6(4), L7(4), L8(4), L9(5) [US-51]
- [ ] Enemy type composition per wave preserved (all existing composition test assertions in `Levels.test.ts` pass) [US-51]
- [ ] Total enemy count per level is the same or higher than current values [US-51]
- [ ] A new test in `test/Levels.test.ts` validates the smooth difficulty curve: minimum spawn interval across all waves in level N is >= minimum spawn interval across all waves in level N+1 [US-51]
- [ ] `test/Levels.test.ts` starting balance and timing assertions updated to match new config values [US-51]
- [ ] `npm test` passes [US-51]

#### Structural
- [ ] `AGENTS.md` level progression description updated to reflect new enemy speeds and pacing philosophy (gentle curve, PvZ-style stage one) [phase]
- [ ] `docs/product/stage-one.md` design notes section updated to mention the difficulty tuning rationale [phase]

### Golden principles (phase-relevant)
- Config-driven entities — all changes are config value updates in `enemies.ts` and `levels.ts`; no system/scene code changes
- Game logic separated from Phaser rendering — speed values and spawn delays are consumed by existing pure TS systems (EnemyMovement, WaveManager)
- no-silent-pass — new difficulty curve test must have unconditional assertions (no early returns before assertions)
- agents-consistency — AGENTS.md updated to reflect shipped balance values before phase is marked complete
