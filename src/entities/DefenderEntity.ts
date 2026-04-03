import Phaser from 'phaser';
import { DefenderType } from '../config/defenders';
import { CELL_SIZE, HUD_HEIGHT } from '../config/game';

const HEALTH_BAR_HEIGHT = 4;
const HEALTH_BAR_OFFSET = 4;
const OUTLINE = 2;

function drawWaterPistol(g: Phaser.GameObjects.Graphics): void {
  const s = CELL_SIZE;
  // Body — bright blue rectangle
  g.fillStyle(0x2196f3, 1);
  g.fillRect(-12, -6, 24, 14);
  // Nozzle — narrow barrel extending right
  g.fillStyle(0x64b5f6, 1);
  g.fillRect(12, -3, 10, 8);
  // Handle/trigger — below body
  g.fillStyle(0x1565c0, 1);
  g.fillRect(-4, 8, 10, 10);
  // Trigger — small bump
  g.fillStyle(0xff9800, 1);
  g.fillRect(2, 10, 4, 4);
  // Thick outline
  g.lineStyle(OUTLINE, 0x000000, 1);
  g.strokeRect(-12, -6, 24, 14);
  g.strokeRect(12, -3, 10, 8);
  g.strokeRect(-4, 8, 10, 10);
}

function drawJackInTheBox(g: Phaser.GameObjects.Graphics): void {
  // Box — bright yellow
  g.fillStyle(0xffc107, 1);
  g.fillRect(-14, 2, 28, 20);
  g.lineStyle(OUTLINE, 0x000000, 1);
  g.strokeRect(-14, 2, 28, 20);
  // Box lid line
  g.lineStyle(OUTLINE, 0x000000, 1);
  g.lineBetween(-14, 2, 14, 2);
  // Spring — zigzag from box top
  g.lineStyle(2, 0x9e9e9e, 1);
  g.beginPath();
  g.moveTo(0, 2);
  g.lineTo(-6, -4);
  g.lineTo(6, -10);
  g.lineTo(-6, -16);
  g.lineTo(0, -20);
  g.strokePath();
  // Head — red circle on top of spring
  g.fillStyle(0xf44336, 1);
  g.fillCircle(0, -24, 7);
  g.lineStyle(OUTLINE, 0x000000, 1);
  g.strokeCircle(0, -24, 7);
  // Eyes on head
  g.fillStyle(0xffffff, 1);
  g.fillCircle(-3, -25, 2);
  g.fillCircle(3, -25, 2);
  g.fillStyle(0x000000, 1);
  g.fillCircle(-3, -25, 1);
  g.fillCircle(3, -25, 1);
}

function drawBlockTower(g: Phaser.GameObjects.Graphics): void {
  // Bottom block — red
  g.fillStyle(0xf44336, 1);
  g.fillRect(-14, 8, 28, 12);
  g.lineStyle(OUTLINE, 0x000000, 1);
  g.strokeRect(-14, 8, 28, 12);
  // Middle block — blue, slightly offset
  g.fillStyle(0x2196f3, 1);
  g.fillRect(-11, -4, 22, 12);
  g.lineStyle(OUTLINE, 0x000000, 1);
  g.strokeRect(-11, -4, 22, 12);
  // Top block — yellow, smaller
  g.fillStyle(0xffc107, 1);
  g.fillRect(-8, -16, 16, 12);
  g.lineStyle(OUTLINE, 0x000000, 1);
  g.strokeRect(-8, -16, 16, 12);
}

const DRAW_DEFENDER: Record<string, (g: Phaser.GameObjects.Graphics) => void> = {
  shooter: drawWaterPistol,
  generator: drawJackInTheBox,
  wall: drawBlockTower,
};

export class DefenderEntity extends Phaser.GameObjects.Container {
  readonly defenderType: DefenderType;
  readonly defenderKey: string;
  readonly gridRow: number;
  readonly gridCol: number;
  health: number;

  // CombatEntity interface
  get lane(): number { return this.gridRow; }
  get col(): number { return this.gridCol; }
  private readonly maxHealth: number;
  private readonly healthBar: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    row: number,
    col: number,
    key: string,
    type: DefenderType,
  ) {
    const x = col * CELL_SIZE + CELL_SIZE / 2;
    const y = HUD_HEIGHT + row * CELL_SIZE + CELL_SIZE / 2;
    super(scene, x, y);

    this.defenderType = type;
    this.defenderKey = key;
    this.gridRow = row;
    this.gridCol = col;
    this.health = type.health;
    this.maxHealth = type.health;

    const shape = scene.add.graphics();
    const drawFn = DRAW_DEFENDER[key];
    if (drawFn) {
      drawFn(shape);
    } else {
      // Fallback: plain rectangle
      shape.fillStyle(0xffffff, 1);
      const padding = 6;
      shape.fillRect(
        -CELL_SIZE / 2 + padding,
        -CELL_SIZE / 2 + padding,
        CELL_SIZE - padding * 2,
        CELL_SIZE - padding * 2,
      );
    }
    this.add(shape);

    this.healthBar = scene.add.graphics();
    this.add(this.healthBar);
    this.drawHealthBar();

    scene.add.existing(this);
  }

  drawHealthBar(): void {
    this.healthBar.clear();
    const barWidth = CELL_SIZE - 12;
    const fraction = Math.max(0, this.health / this.maxHealth);

    const barY = -CELL_SIZE / 2 + HEALTH_BAR_OFFSET;

    // Background (red)
    this.healthBar.fillStyle(0xef4444, 1);
    this.healthBar.fillRect(-barWidth / 2, barY, barWidth, HEALTH_BAR_HEIGHT);

    // Foreground (green → red gradient via fraction)
    const green = Math.floor(fraction * 0x88);
    const red = Math.floor((1 - fraction) * 0xee);
    const barColor = (red << 16) | (green << 8) | 0x22;
    this.healthBar.fillStyle(barColor, 1);
    this.healthBar.fillRect(-barWidth / 2, barY, barWidth * fraction, HEALTH_BAR_HEIGHT);
  }
}
