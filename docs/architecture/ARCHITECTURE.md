# Zombo — Architecture

## Tech stack

- **Runtime:** Browser (HTML5)
- **Language:** TypeScript (strict mode)
- **Game framework:** Phaser 3 (>=3.60)
- **Bundler:** Vite
- **Test runner:** Vitest

## Module topology

```
src/
├── main.ts              # Phaser.Game entry point, scene registration
├── config/
│   ├── game.ts          # Phaser game config (dimensions, physics, scenes)
│   ├── defenders.ts     # Defender type registry (name, cost, health, damage, range)
│   ├── enemies.ts       # Enemy type registry (name, health, speed)
│   └── levels.ts        # Level config registry (waves, enemy composition, difficulty)
├── scenes/
│   ├── GameScene.ts     # Main gameplay scene — grid, HUD, placement, combat loop
│   └── GameOverScene.ts # Win/lose display, restart button
├── systems/
│   ├── Grid.ts          # Grid state — cell coordinates, occupancy tracking
│   ├── Economy.ts       # Resource balance — income, spend, passive generation
│   ├── Placement.ts     # Defender placement logic — cell validation, cost deduction
│   ├── WaveManager.ts   # Wave progression — spawn timing, wave config, completion
│   ├── EnemyMovement.ts # Enemy movement logic — leftward advance, speed handling
│   ├── Combat.ts        # Projectile firing, damage application, health tracking
│   └── GameFlow.ts      # Win/lose detection, game state machine
└── entities/
    ├── DefenderEntity.ts  # Defender game object — colored rectangle, health bar
    ├── EnemyEntity.ts     # Enemy game object — colored circle, health bar
    └── ProjectileEntity.ts # Projectile game object — yellow circle, movement
```

(shipped in `core-loop` phase; `entities/`, `config/levels.ts`, and `systems/EnemyMovement.ts` shipped in `playable` phase)

## Data flow

```
Player click → Placement → Grid (occupancy) + Economy (spend)
                              ↓
Passive timer → Economy (addIncome) → HUD update
                              ↓
WaveManager → Enemy spawn → Enemy movement (per tick)
                              ↓
Combat → Defender fires Projectile → Projectile hits Enemy → Enemy.health -= damage
                              ↓
GameFlow → checks win (no enemies + waves done) / lose (enemy at col 0)
                              ↓
GameOverScene → restart → reset all systems
```

## Key design decisions

- **Game logic separated from Phaser rendering:** `systems/` modules contain pure logic (grid, economy, combat math) testable without Phaser. Scenes consume these systems but rendering is not required for unit tests.
- **Config-driven entities:** Defender and enemy types are defined in `config/` registries, not hardcoded in entity classes. Adding a new type is a config addition, not a code change.
- **No theme coupling:** All names, colors, and labels are generic placeholders. Theming is a separate concern for a future phase.

## AGENTS.md sections affected by playable phase

- Directory layout (new `src/entities/` directory, `src/config/levels.ts`)
- Game logic architecture (entity layer bridges systems and rendering)
- Testing conventions (level config unit test added)

## Structural intent — game-feel phase (planned)

### New modules
- `src/scenes/TitleScene.ts` (planned for `game-feel` phase) — title screen with "Toy Box Siege" branding and Play button

### Modified modules
- `src/systems/WaveManager.ts` — adds wave state machine (setup → announcing → spawning → waiting → complete), setupDelay, interWaveDelay parameters
- `src/entities/DefenderEntity.ts` — replaces single fillRect with per-key shape drawing (Water Pistol, Jack-in-the-Box, Block Tower)
- `src/entities/EnemyEntity.ts` — replaces single fillCircle with per-key shape drawing (Dust Bunny, Cleaning Robot)
- `src/config/defenders.ts` — renames to Toy Box Siege theme names
- `src/config/enemies.ts` — renames to Toy Box Siege theme names
- `src/scenes/GameScene.ts` — bedroom carpet grid, themed HUD ("Sparks"), wave progress indicator, wave announcements, camera fade transitions
- `src/scenes/GameOverScene.ts` — themed win/lose messaging, camera fade transitions
- `src/config/game.ts` — registers TitleScene as first scene
- `src/config/levels.ts` — rebalances LEVEL_1 to 3 waves with PvZ-style escalation

### Data flow change
```
Game launch → TitleScene (Play button) → fade → GameScene
                                                    ↓
WaveManager state: setup (20-30s) → announcing (2-3s) → spawning → waiting (15-20s) → announcing → ...
                                                    ↓
GameScene reads waveState → renders progress bar + announcements
                                                    ↓
GameFlow win/lose → fade → GameOverScene → fade → GameScene (restart)
```

### AGENTS.md sections affected by game-feel phase
- Purpose (add Toy Box Siege theme identity)
- Directory layout (new TitleScene)
- Game logic architecture (WaveManager wave-state system, theme names)
- Entity descriptions (developer art rendering per key)
