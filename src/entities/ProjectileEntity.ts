import Phaser from 'phaser';
import { CELL_SIZE, HUD_HEIGHT } from '../config/game';

const PROJECTILE_COLOR = 0xfbbf24;
const HONEY_PROJECTILE_COLOR = 0xe65100; // amber — distinct from Water Pistol yellow
const PROJECTILE_RADIUS = 5;
const HONEY_PROJECTILE_RADIUS = 11; // big fat honey glob

export class ProjectileEntity extends Phaser.GameObjects.Container {
  readonly lane: number;
  col: number;
  readonly damage: number;
  readonly speed: number;
  readonly isHoney: boolean;

  constructor(
    scene: Phaser.Scene,
    lane: number,
    col: number,
    damage: number,
    speed: number,
    isHoney: boolean = false,
  ) {
    const x = col * CELL_SIZE + CELL_SIZE / 2;
    const y = HUD_HEIGHT + lane * CELL_SIZE + CELL_SIZE / 2;
    super(scene, x, y);

    this.lane = lane;
    this.col = col;
    this.damage = damage;
    this.speed = speed;
    this.isHoney = isHoney;

    const g = scene.add.graphics();
    if (isHoney) {
      // Outer glow ring
      g.fillStyle(0xffb300, 0.25);
      g.fillCircle(0, 0, HONEY_PROJECTILE_RADIUS + 4);
      // Main glob
      g.fillStyle(HONEY_PROJECTILE_COLOR, 0.9);
      g.fillCircle(0, 0, HONEY_PROJECTILE_RADIUS);
      // Hot center highlight
      g.fillStyle(0xffd54f, 0.6);
      g.fillCircle(-2, -2, 5);
    } else {
      g.fillStyle(PROJECTILE_COLOR, 1);
      g.fillCircle(0, 0, PROJECTILE_RADIUS);
    }
    this.add(g);

    scene.add.existing(this);
  }

  updatePosition(): void {
    this.x = this.col * CELL_SIZE + CELL_SIZE / 2;
  }
}
