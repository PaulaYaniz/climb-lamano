import HandWall from '../entities/HandWall.js';
import Climber from '../entities/Climber.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load hand image
        this.load.image('hand', 'assets/hand.png');

        // Create a simple particle texture
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(4, 4, 4);
        graphics.generateTexture('particle', 8, 8);
        graphics.destroy();
    }

    create() {
        // Ensure this scene receives input
        this.input.keyboard.enabled = true;

        // Background gradient (already set in config, but add some clouds)
        this.createBackground();

        // Create ground platform
        const ground = this.add.rectangle(550, 790, 1100, 40, 0x8B7355);
        this.physics.add.existing(ground, true); // static body

        // Create the hand wall
        this.handWall = new HandWall(this);

        // Create the climber - start on the ground
        this.climber = new Climber(this, 480, 750);

        // Add collision between climber and ground
        this.physics.add.collider(this.climber.sprite, ground);

        // Track state
        this.gameTime = 0;
        this.gameActive = true;
        this.lastNearestHold = null;

        // Create HUD
        this.createHUD();

        // Setup camera
        this.setupCamera();

        // Game timer
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Instructions are in the side panel
    }

    createBackground() {
        // Add some decorative clouds
        for (let i = 0; i < 3; i++) {
            const cloud = this.add.text(
                Phaser.Math.Between(100, 1100),
                Phaser.Math.Between(50, 300),
                '☁️',
                { fontSize: '48px' }
            );
            cloud.setAlpha(0.6);

            // Gentle drift
            this.tweens.add({
                targets: cloud,
                x: cloud.x + Phaser.Math.Between(50, 150),
                duration: Phaser.Math.Between(15000, 25000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }

    createHUD() {
        const panelX = 1150;
        const panelWidth = 240;

        // Side panel background
        const panel = this.add.rectangle(panelX, 400, panelWidth, 800, 0x000000);

        // Title
        this.add.text(panelX, 50, 'LA MANO', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        let yPos = 120;

        // Stamina
        this.add.text(panelX, yPos, 'RESISTENCIA', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        yPos += 40;
        const staminaWidth = 180;
        const staminaHeight = 25;

        this.staminaBg = this.add.rectangle(
            panelX,
            yPos,
            staminaWidth,
            staminaHeight,
            0x000000,
            0
        );
        this.staminaBg.setStrokeStyle(2, 0xFFFFFF);

        this.staminaBar = this.add.rectangle(
            panelX - staminaWidth / 2,
            yPos,
            staminaWidth,
            staminaHeight,
            0xFFFFFF
        );
        this.staminaBar.setOrigin(0, 0.5);

        yPos += 40;
        this.staminaText = this.add.text(panelX, yPos, '100%', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Stats
        yPos += 60;
        this.heightText = this.add.text(panelX, yPos, '0m', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        yPos += 40;
        this.timerText = this.add.text(panelX, yPos, '0:00', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        yPos += 60;
        this.grabIndicator = this.add.text(panelX, yPos, '', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Set everything to be fixed on screen
        this.children.list
            .filter(obj => obj.x >= 1000)
            .forEach(obj => obj.setScrollFactor(0).setDepth(100));
    }


    setupCamera() {
        // Camera follows climber
        this.cameras.main.setBounds(0, 0, 1100, 800);
        this.cameras.main.startFollow(this.climber.sprite, false, 0.1, 0.15);
        this.cameras.main.setFollowOffset(0, 150); // Offset so player is lower in view
    }

    update() {
        if (!this.gameActive) return;

        // Update climber and get state
        const climberState = this.climber.update(this.handWall.getHolds());

        // Update hold highlights
        this.updateHoldHighlights(climberState);

        // Update HUD
        this.updateHUD(climberState);

        // Check for goal
        const reachedGoal = this.climber.checkGoalCollision(this.handWall.getGoals());
        if (reachedGoal) {
            this.winGame(reachedGoal);
        }
    }

    updateHoldHighlights(climberState) {
        const { nearestHold, isGrabbing, currentHold } = climberState;

        // Reset previous hold highlight
        if (this.lastNearestHold && this.lastNearestHold !== currentHold) {
            this.handWall.resetHoldHighlight(this.lastNearestHold);
        }

        // Highlight nearest hold
        if (nearestHold) {
            this.handWall.highlightNearbyHold(nearestHold.hold, isGrabbing);
            this.lastNearestHold = nearestHold.hold;
        } else {
            this.lastNearestHold = null;
        }
    }

    updateHUD(climberState) {
        // Height
        const height = this.climber.getHeight();
        this.heightText.setText(`${height}m`);

        // Stamina bar
        const stamina = this.climber.getStamina();
        const staminaPercent = stamina / 100;
        this.staminaBar.width = 180 * staminaPercent;

        // Stamina percentage text
        this.staminaText.setText(`${Math.floor(stamina)}%`);

        // Keep stamina bar always white
        if (stamina < 30) {
            // Pulse warning when low
            if (!this.staminaPulse) {
                this.staminaPulse = true;
                this.tweens.add({
                    targets: this.staminaBar,
                    alpha: 0.5,
                    duration: 400,
                    yoyo: true,
                    onComplete: () => {
                        this.staminaPulse = false;
                    }
                });
            }
        } else {
            this.staminaBar.setAlpha(1);
        }

        // Grab indicator
        if (climberState.nearestHold && !climberState.isGrabbing) {
            this.grabIndicator.setText('Cerca');
        } else if (climberState.isGrabbing) {
            this.grabIndicator.setText('AGARRADO');
        } else {
            this.grabIndicator.setText('');
        }
    }

    updateTimer() {
        if (!this.gameActive) return;

        this.gameTime++;
        const minutes = Math.floor(this.gameTime / 60);
        const seconds = this.gameTime % 60;
        this.timerText.setText(`Tiempo: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    }

    winGame(goal) {
        this.gameActive = false;

        // Freeze frame effect
        this.time.delayedCall(100, () => {
            // Celebration particles
            this.createVictoryParticles(goal);

            // Camera shake
            this.cameras.main.shake(300, 0.005);

            // Transition to game over
            this.time.delayedCall(2000, () => {
                this.scene.start('GameOverScene', {
                    finger: goal.finger,
                    height: this.climber.getHeight(),
                    time: this.gameTime
                });
            });
        });
    }

    createVictoryParticles(goal) {
        // Confetti burst
        const emojis = ['🎉', '🎊', '⭐', '🏆', '🚩', '💪'];

        for (let i = 0; i < 30; i++) {
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const particle = this.add.text(
                goal.x,
                goal.y,
                emoji,
                { fontSize: '32px' }
            );

            particle.setDepth(150);

            this.tweens.add({
                targets: particle,
                x: goal.x + Phaser.Math.Between(-200, 200),
                y: goal.y + Phaser.Math.Between(-150, 300),
                angle: Phaser.Math.Between(-360, 360),
                alpha: 0,
                scale: 0.5,
                duration: 1500,
                ease: 'Cubic.easeOut',
                onComplete: () => particle.destroy()
            });
        }

        // Victory text
        const victoryText = this.add.text(600, 300, '🎉 ¡CIMA ALCANZADA! 🎉', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#FFD700',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        victoryText.setScrollFactor(0).setDepth(200);

        this.tweens.add({
            targets: victoryText,
            scale: 1.2,
            duration: 500,
            yoyo: true,
            ease: 'Bounce'
        });
    }
}
