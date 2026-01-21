export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Load hand image for preview
        this.load.image('hand', 'assets/hand.png');
    }

    create() {
        // Background gradient
        const bg = this.add.rectangle(700, 400, 1400, 800, 0x87CEEB);

        // Add clouds
        for (let i = 0; i < 5; i++) {
            const cloud = this.add.text(
                Phaser.Math.Between(100, 1300),
                Phaser.Math.Between(50, 200),
                '☁️',
                { fontSize: '48px' }
            );
            cloud.setAlpha(0.5);

            this.tweens.add({
                targets: cloud,
                x: cloud.x + Phaser.Math.Between(50, 150),
                duration: Phaser.Math.Between(20000, 30000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }

        // Title background
        const titleBg = this.add.rectangle(700, 100, 500, 100, 0x000000);

        // Title
        const title = this.add.text(700, 100, 'LA MANO', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Title animation
        this.tweens.add({
            targets: title,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Left section background
        const leftBg = this.add.rectangle(300, 450, 500, 600, 0x000000);

        // Hand preview image
        const handPreview = this.add.image(300, 380, 'hand');
        handPreview.setScale(0.35);

        // Animated climber on hand
        const miniClimber = this.add.text(300, 480, '🧗', {
            fontSize: '48px'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: miniClimber,
            y: 330,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.add.text(300, 600, '¡Escala la mano!', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Right section background
        const rightBg = this.add.rectangle(900, 450, 600, 600, 0x000000);

        this.add.text(900, 220, 'CONTROLES', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        let yPos = 300;

        // Controls
        this.add.text(900, yPos, 'FLECHAS: Muévete', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        yPos += 80;

        this.add.text(900, yPos, 'ESPACIO: Congelar', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        yPos += 120;

        this.add.text(900, yPos, 'Llega a la bandera 🚩', {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Start button
        const startButton = this.add.rectangle(700, 730, 300, 60);
        startButton.setStrokeStyle(3, 0xFFFFFF);
        startButton.setFillStyle(0x000000, 0);
        startButton.setInteractive({ useHandCursor: true });

        const startText = this.add.text(700, 730, 'COMENZAR', {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Button hover effects
        startButton.on('pointerover', () => {
            startButton.setFillStyle(0xFFFFFF, 1);
            startText.setColor('#000000');
            this.tweens.add({
                targets: [startButton, startText],
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 150,
                ease: 'Power2'
            });
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(0x000000, 0);
            startText.setColor('#FFFFFF');
            this.tweens.add({
                targets: [startButton, startText],
                scaleX: 1,
                scaleY: 1,
                duration: 150,
                ease: 'Power2'
            });
        });

        startButton.on('pointerdown', () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('GameScene');
            });
        });

        // Keyboard shortcut
        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('GameScene');
            });
        });
    }
}
