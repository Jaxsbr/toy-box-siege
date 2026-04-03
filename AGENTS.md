# Zombo

## Purpose

**Toy Box Siege** — a bedroom-themed tower defense game inspired by Plants vs Zombies, built as a gift for Jaco's kids. Defenders are toys (Water Pistol, Jack-in-the-Box, Block Tower), enemies are household nuisances (Dust Bunnies, Cleaning Robots). The game starts with a title screen, uses PvZ-style wave pacing with setup periods and announcements, and ends with themed win/lose results.

## Tech stack

- **Language:** TypeScript (strict mode)
- **Game framework:** Phaser 3 (>=3.60)
- **Bundler:** Vite
- **Test runner:** Vitest

## Directory layout

| Directory | Contents |
|---|---|
| `src/main.ts` | Entry point — creates `Phaser.Game` instance |
| `src/config/` | Game configuration — Phaser config (`game.ts`), defender type registry (`defenders.ts`), enemy type registry (`enemies.ts`), level config (`levels.ts`) |
| `src/scenes/` | Phaser scenes — `TitleScene.ts` (title + play), `GameScene.ts` (gameplay), `GameOverScene.ts` (win/lose + restart) |
| `src/systems/` | Pure game logic modules — `Grid.ts`, `Economy.ts`, `Placement.ts`, `WaveManager.ts`, `EnemyMovement.ts`, `Combat.ts`, `GameFlow.ts`, `SFX.ts` |
| `src/entities/` | Phaser game objects — `DefenderEntity.ts` (per-key shape drawing, idle animations, combat reactions), `EnemyEntity.ts` (per-key shape drawing, movement animations, hit flash), `ProjectileEntity.ts` (yellow circle) |
| `test/` | Vitest unit tests — one test file per game logic module |
| `docs/reference/` | PvZ1 game design reference library — plant catalogue, zombie catalogue, level/map reference, game systems, art/audio direction, spin-off proposals |
| `docs/product/` | Product specs — PRD, per-phase spec files |
| `docs/plan/` | Build loop state — progress, phase goals, logs, archive |
| `docs/architecture/` | Architecture docs — structural intent and module topology |

## Running

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript compile + Vite production build |
| `npm test` | Run Vitest unit tests |
| `npm run test:watch` | Run Vitest in watch mode |

## Game logic architecture

- **Grid** (5 rows × 9 cols): cell-coordinate API, bounds validation, occupancy via Placement
- **Economy**: balance tracking, spend with rejection, reset. Income from two sources: floating spark tokens (click to collect, replaces passive timer) and generator defenders (automatic)
- **Defenders**: 3 types — Jack-in-the-Box/generator (produces income), Water Pistol/shooter (ranged projectile attack), Block Tower/wall (high-health blocker). Each has distinct Phaser Graphics shapes (not just colored rectangles).
- **Enemies**: 2 types — Dust Bunny/basic (fast, low health, fluffy pink blob) and Cleaning Robot/tough (slow, high health, boxy purple robot). Each has distinct shapes.
- **WaveManager**: state machine driving wave progression: setup (delay before first wave) → announcing (wave announcement text) → spawning (enemy spawns) → waiting (inter-wave delay) → complete. Exposes typed `waveState` property. Configurable `setupDelay`, `interWaveDelay`, `announceDuration`.
- **Combat**: shooter auto-fires projectiles at nearest lane enemy in range; walls block enemies and take damage. Hit flash (white overlay), death particles (per-type color burst), projectile impact burst, camera shake on final wave
- **SFX**: procedural sound effects via Web Audio API (OscillatorNode, GainNode, noise buffers). Pure TypeScript, no Phaser dependency. Lazy AudioContext creation for Node test compatibility. Trigger functions: place, fire, hit, death, collect, announce. Mute toggle in HUD
- **Animations**: all entity types have tween-based animations — defenders: idle loops (bob/wiggle/sway) and combat reactions (recoil/pulse), enemies: movement animations (bounce/rock). Placement bounce-in on defender creation
- **Spark collection**: floating blue diamond tokens spawn above grid, drift down, player clicks to collect. Uncollected sparks removed at grid bottom. Replaces invisible passive income timer
- **Atmosphere**: bedroom environment — furniture silhouettes, decorative toy details, floating dust motes (all at depth -10, no pointer input). Themed backgrounds on TitleScene and GameOverScene
- **GameFlow**: playing/won/lost state machine — lose when enemy reaches col 0, win when all waves spent and no enemies alive

## Testing conventions

- All game logic lives in `src/systems/` and `src/config/` as pure TypeScript — no Phaser dependencies in logic modules
- Each module has a corresponding `test/<Module>.test.ts` file
- Tests use Vitest with `node` environment (no browser needed for logic tests)
- Phaser-dependent code (scenes, rendering) is not unit tested — logic is separated from rendering
- `SFX.ts` uses lazy AudioContext (created on first sound trigger, not on import) so tests pass in Node without browser APIs

## Quality checks

- no-silent-pass
- no-bare-except
- error-path-coverage
- agents-consistency
