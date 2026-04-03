# PvZ1 Game Systems Reference

Comprehensive reference of Plants vs. Zombies' core game systems: sun economy, wave/round structure, progression unlocks, and Crazy Dave. Stats reflect the original PC/console release.

## Sun Economy

### Sun sources

| Source | Sun produced | Interval | Notes |
|---|---|---|---|
| Sky drops (Day levels) | 25 | ~10 seconds | Falls randomly across the lawn. Only available during Day and Pool worlds. |
| Sunflower | 25 | ~24 seconds | Primary economy plant. First sun produced ~24s after planting. |
| Twin Sunflower | 50 (2 × 25) | ~24 seconds | Upgrade of Sunflower. Must be planted on an existing Sunflower. |
| Sun-shroom | 15 → 25 → 50 | ~24 seconds | Grows over time. Starts small (15), medium (25) after ~120s, large (50) after ~240s. Free at night. |
| Marigold | Coins (not sun) | ~24 seconds | Produces silver/gold coins, not sun. Economy plant for money, not in-level resources. |

### Starting sun and economy curve

| World | Starting sun | Sky drops? | Typical opener |
|---|---|---|---|
| Day | 50 | Yes | Sunflower → Sunflower → wait for sky drops → plant offence |
| Night | 50 | No | Sun-shroom (free) → Puff-shroom (free) → Sun-shroom → build economy slowly |
| Pool | 50 | Yes | Sunflower × 2 → Lily Pad + Sunflower → cover 6 lanes |
| Fog | 50 | No | Sun-shroom → Puff-shroom → Plantern → slow economy build |
| Roof | 50 | Yes | Flower Pot + Sunflower → Flower Pot + Sunflower → lobber plants |

### Sun value reference

- Each sun token = 25 sun (sky drops, Sunflower)
- Small Sun-shroom sun = 15
- Large Sun-shroom sun = 50
- Twin Sunflower cycle = 50 (two 25-sun tokens)
- Earning rate: A mature Sunflower economy (6-8 Sunflowers) produces ~150-200 sun per 24-second cycle

## Wave / Round Structure

### Wave composition

Each Adventure mode level consists of a fixed number of waves, determined by the world:

| World | Total waves | Flag waves | Final wave |
|---|---|---|---|
| Day (1-1 to 1-10) | 5-10 (escalating) | Every 2nd wave | "A huge wave of zombies is approaching!" |
| Night (2-1 to 2-10) | 8-12 | Every 2nd wave | Same indicator |
| Pool (3-1 to 3-10) | 10-15 | Every 2nd wave | Same indicator |
| Fog (4-1 to 4-10) | 10-15 | Every 2nd wave | Same indicator |
| Roof (5-1 to 5-10) | 10-20 | Every 2nd wave | Same indicator |

### Wave timing

| Parameter | Value | Notes |
|---|---|---|
| Initial delay | ~25-30 seconds | Time before first zombie appears. Gives player setup time. |
| Wave interval | ~20-30 seconds | Time between regular waves. Decreases slightly in later worlds. |
| Flag wave frequency | Every 2 waves | Flag waves are signalled by a Flag Zombie and contain 2-3× the zombies of a normal wave. |
| Final wave indicator | Text + horn sound | "A huge wave of zombies is approaching!" appears on screen with a horn sound ~3 seconds before the final massive wave. |
| Zombie spawn stagger | ~1-3 seconds | Within a wave, individual zombies spawn with slight delays (not all at once). |
| Flag wave spawn burst | ~0.5-1 second stagger | Flag waves spawn zombies more rapidly than regular waves. |

### Wave escalation

- Early waves: 1-3 basic zombies per wave
- Mid waves: 3-6 mixed zombies with one special type
- Flag waves: 6-12 zombies including special types and tough variants
- Final wave: 10-20+ zombies, all types available for that world, simultaneous multi-lane pressure
- Survival Endless: wave difficulty scales infinitely — wave 100+ features multiple Gargantuars per flag

### Wave mechanics

- **Flag counter**: A progress bar with flags shows wave progression. Each flag = 2 waves completed.
- **Zombie preview**: At level start, a "Zombies Found" screen shows which zombie types will appear (silhouetted until encountered).
- **Lane assignment**: Zombies are randomly assigned to lanes, but the game ensures pressure across all lanes by mid-game.
- **Special spawn triggers**: Some zombies only appear in specific wave ranges (e.g., Gargantuar in late waves only).

## Progression Unlocks

### Adventure mode unlocks

Plants are unlocked sequentially through Adventure mode:

| Level | Unlock |
|---|---|
| 1-1 | Peashooter, Sunflower (given at start) |
| 1-2 | Cherry Bomb |
| 1-3 | Wall-nut |
| 1-4 | Potato Mine |
| 1-5 | Snow Pea |
| 1-7 | Chomper |
| 1-8 | Repeater |
| 2-1 | Puff-shroom, Sun-shroom |
| 2-2 | Fume-shroom |
| 2-3 | Grave Buster |
| 2-4 | Hypno-shroom |
| 2-5 | Scaredy-shroom |
| 2-7 | Ice-shroom |
| 2-8 | Doom-shroom |
| 3-1 | Lily Pad |
| 3-2 | Squash |
| 3-3 | Threepeater |
| 3-4 | Tangle Kelp |
| 3-5 | Jalapeno |
| 3-7 | Spikeweed |
| 3-8 | Torchwood |
| 4-1 | Tall-nut |
| 4-2 | Sea-shroom |
| 4-3 | Plantern |
| 4-4 | Cactus |
| 4-5 | Blover |
| 4-7 | Split Pea |
| 4-8 | Starfruit |
| 5-1 | Pumpkin |
| 5-2 | Magnet-shroom |
| 5-3 | Cabbage-pult |
| 5-4 | Flower Pot |
| 5-5 | Kernel-pult |
| 5-7 | Coffee Bean |
| 5-8 | Garlic, Umbrella Leaf, Melon-pult |

### Post-Adventure unlocks

| Unlock | Source | Cost |
|---|---|---|
| Gatling Pea | Crazy Dave's Twiddydinkies (shop) | $5,000 |
| Twin Sunflower | Shop | $5,000 |
| Gloom-shroom | Shop | $7,500 |
| Cattail | Shop | $10,000 |
| Winter Melon | Shop | $10,000 |
| Gold Magnet | Shop | $10,000 |
| Spikerock | Shop | $7,500 |
| Cob Cannon | Shop | $20,000 |
| Imitater | Shop | $30,000 |
| Mini-games | Complete Adventure mode | Free — unlocks mini-games menu |
| Puzzle mode | Complete Adventure mode | Free — unlocks Vasebreaker and I, Zombie |
| Survival mode | Complete Adventure mode | Free — unlocks Survival menu |
| Zen Garden | Complete level 5-4 | Free — unlocks plant-care mini-game |

### Seed slot progression

| Unlock point | Seed slots available | Notes |
|---|---|---|
| Start of game | 6 | Default loadout capacity |
| After 2-4 | 7 | First extra slot (free) |
| After 3-2 | 8 | Second extra slot (free) |
| After 4-1 | 9 | Third extra slot (free) |
| Shop purchase | 10 | Costs $20,000 — maximum slots |

## Crazy Dave

### Who is Crazy Dave?

Crazy Dave (full name: Craaaaazy Dave) is the player's neighbour and guide character. He's a friendly, eccentric man who wears a pot on his head and speaks in gibberish (with subtitle translations). He serves as the game's tutorial voice, shopkeeper, and comic relief.

### Roles

| Role | Description |
|---|---|
| **Tutorial guide** | Appears at key moments in Adventure mode to explain new mechanics (first night level, first pool level, etc.). Tutorials are brief and contextual — never longer than 2-3 dialogue bubbles. |
| **Shopkeeper** | Runs "Crazy Dave's Twiddydinkies" — a car-boot shop selling upgrade plants, extra seed slots, and cosmetic items (Zen Garden tools, plant food). Shop unlocks after completing Adventure mode level 3-4. |
| **Pre-level advisor** | Before certain levels, gives hints or flavour dialogue. E.g., "The zombies are coming... and they look hungry!" Sometimes gives genuinely useful tips. |
| **Loadout locker** | In some levels (especially later worlds), Crazy Dave pre-selects 1-3 plants for the player's loadout before they choose the rest. This forces adaptation and prevents the same optimal loadout every time. |

### Appearance triggers

| Trigger | Context |
|---|---|
| Level 1-1 | Introduction — explains basic planting and sun collection |
| Level 1-3 | Introduces Wall-nut and defensive play |
| Level 2-1 | Explains night mechanics — no sun drops, mushrooms awake |
| Level 3-1 | Introduces pool lanes and Lily Pad |
| Level 3-4 | Opens his shop (Twiddydinkies) |
| Level 4-1 | Explains fog mechanics and Plantern |
| Level 5-1 | Explains roof mechanics and Flower Pot |
| Various later levels | Pre-selects loadout plants, offers hints |
| Zen Garden | Appears to sell watering cans, fertiliser, music boxes, etc. |

### Personality traits (for character design reference)

- Speaks in garbled nonsense ("Wabby wabbo!") — subtitles provide the real dialogue
- Wears a cooking pot on his head at all times
- Obsessed with tacos (recurring joke)
- Genuinely helpful despite seeming unhinged
- Fourth-wall aware — references "the game" occasionally
- Memorable catchphrase: "BECAUSE I'M CRAAAAAAZY!"
