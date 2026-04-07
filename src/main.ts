import Phaser from 'phaser';
import { gameConfig } from './config/game';

const game = new Phaser.Game(gameConfig);

// QA helper — call toyboxReset() in browser console to wipe all save data and restart
(window as unknown as Record<string, unknown>).toyboxReset = () => {
  const keys = Object.keys(localStorage).filter(
    k => k === 'toybox_progress' || k === 'toybox_unlocks' || k === 'tutorial_complete'
      || k.startsWith('bio_shown_defender_') || k.startsWith('bio_shown_enemy_'),
  );
  keys.forEach(k => localStorage.removeItem(k));
  console.log(`toyboxReset: cleared ${keys.length} keys — ${keys.join(', ')}`);
  game.scene.start('MainMenuScene');
};

export { game };
