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

        // Title
        const title = this.add.text(700, 100, 'LA MANO', {
            fontSize: '72px',
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

        // Subtitle
        const subtitle = this.add.text(700, 170, 'Juego de escalada', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)'
        }).setOrigin(0.5);

        // Hand preview image
        const handPreview = this.add.image(300, 400, 'hand');
        handPreview.setScale(0.35);

        // Animated climber on hand
        const miniClimber = this.add.text(300, 500, '🧗', {
            fontSize: '48px'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: miniClimber,
            y: 350,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.add.text(300, 620, '¡Escala la mano gigante\npara llegar a la cima!', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        this.add.text(900, 240, 'CÓMO JUGAR', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        let yPos = 310;

        // Step 1
        this.add.text(900, yPos, '1. Suelta espacio y usa flechas', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 28, 'Muévete ↑ ↓ ← → solo al soltar espacio', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)',
            align: 'center'
        }).setOrigin(0.5);

        yPos += 100;

        // Step 2
        this.add.text(900, yPos, '2. Mantén espacio para congelar', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 28, 'Detén tu caída y mantén posición', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)',
            align: 'center'
        }).setOrigin(0.5);

        yPos += 100;

        // Step 3
        this.add.text(900, yPos, '3. Suelta para recuperar', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 28, 'Resistencia se recupera al soltar espacio', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)',
            align: 'center'
        }).setOrigin(0.5);

        yPos += 100;

        // Step 4
        this.add.text(900, yPos, '4. ¡Llega a la cima!', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 28, 'Llega a cualquier bandera dorada 🚩', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)',
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

        // Keyboard shortcut hint
        this.add.text(700, 785, 'Presiona ESPACIO para comenzar', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.5)'
        }).setOrigin(0.5);

        // Keyboard shortcut
        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('GameScene');
            });
        });
    }
}
