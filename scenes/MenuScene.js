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

        // Left panel - Hand preview
        const leftPanel = this.add.rectangle(300, 450, 480, 520, 0x000000, 0.3);

        this.add.text(300, 250, 'EL DESAFÍO', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Hand preview image
        const handPreview = this.add.image(300, 450, 'hand');
        handPreview.setScale(0.35);
        handPreview.setAlpha(0.8);

        // Animated climber on hand
        const miniClimber = this.add.text(300, 550, '🧗', {
            fontSize: '48px'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: miniClimber,
            y: 400,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.add.text(300, 650, '¡Escala la mano gigante\npara llegar a la cima!', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            align: 'center',
            lineSpacing: 5
        }).setOrigin(0.5);

        // Right panel - Instructions
        const rightPanel = this.add.rectangle(900, 450, 680, 520, 0x000000, 0.3);

        this.add.text(900, 250, 'CÓMO JUGAR', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        let yPos = 300;

        // Step 1
        this.add.text(650, yPos, '1', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.6)'
        }).setOrigin(0.5);
        this.add.text(750, yPos + 10, 'SUELTA ESPACIO Y USA FLECHAS', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.9)'
        }).setOrigin(0, 0.5);
        this.add.text(750, yPos + 35, 'Muévete ↑ ↓ ← → solo al soltar espacio', {
            fontSize: '15px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)'
        }).setOrigin(0, 0.5);

        yPos += 100;

        // Step 2
        this.add.text(650, yPos, '2', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.6)'
        }).setOrigin(0.5);
        this.add.text(750, yPos + 10, 'MANTÉN ESPACIO PARA CONGELAR', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.9)'
        }).setOrigin(0, 0.5);
        this.add.text(750, yPos + 35, 'Detén tu caída y mantén posición', {
            fontSize: '15px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)'
        }).setOrigin(0, 0.5);

        yPos += 100;

        // Step 3
        this.add.text(650, yPos, '3', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.6)'
        }).setOrigin(0.5);
        this.add.text(750, yPos + 10, 'SUELTA PARA RECUPERAR', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.9)'
        }).setOrigin(0, 0.5);
        this.add.text(750, yPos + 35, 'Resistencia se recupera al soltar espacio', {
            fontSize: '15px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)'
        }).setOrigin(0, 0.5);

        yPos += 100;

        // Step 4
        this.add.text(650, yPos, '4', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.6)'
        }).setOrigin(0.5);
        this.add.text(750, yPos + 10, '¡LLEGA A LA CIMA!', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.9)'
        }).setOrigin(0, 0.5);
        this.add.text(750, yPos + 35, 'Llega a cualquier bandera dorada 🚩', {
            fontSize: '15px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)'
        }).setOrigin(0, 0.5);

        // Start button
        const startButton = this.add.rectangle(700, 730, 400, 70, 0xFFFFFF, 0.1);
        startButton.setStrokeStyle(2, 0xFFFFFF, 0.5);
        startButton.setInteractive({ useHandCursor: true });

        const startText = this.add.text(700, 730, 'COMENZAR', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Button hover effects
        startButton.on('pointerover', () => {
            startButton.setFillStyle(0xFFFFFF, 0.2);
            this.tweens.add({
                targets: [startButton, startText],
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 200,
                ease: 'Power2'
            });
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(0xFFFFFF, 0.1);
            this.tweens.add({
                targets: [startButton, startText],
                scaleX: 1,
                scaleY: 1,
                duration: 200,
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

        // Add decorative rocks at bottom
        for (let i = 0; i < 8; i++) {
            const rock = this.add.text(
                Phaser.Math.Between(100, 1300),
                Phaser.Math.Between(720, 780),
                '🪨',
                { fontSize: '32px' }
            );
            rock.setAlpha(0.6);
        }
    }
}
