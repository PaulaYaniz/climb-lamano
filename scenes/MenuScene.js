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

        // Title with shadow effect
        const title = this.add.text(700, 100, 'LA MANO', {
            fontSize: '80px',
            fontFamily: 'Arial Black',
            color: '#FFFFFF',
            stroke: '#2C3E50',
            strokeThickness: 8
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
        this.add.text(700, 165, 'Juego de Escalada', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            stroke: '#2C3E50',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Left panel
        const leftPanel = this.add.rectangle(300, 450, 480, 580, 0x2C3E50, 0.85);
        leftPanel.setStrokeStyle(4, 0x3498db);

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

        this.add.text(300, 240, 'EL DESAFÍO', {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#3498db',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(300, 650, '¡Escala la mano gigante\nhasta alcanzar la cima!', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        // Right panel
        const rightPanel = this.add.rectangle(900, 450, 600, 580, 0x2C3E50, 0.85);
        rightPanel.setStrokeStyle(4, 0xe74c3c);

        this.add.text(900, 240, 'CÓMO JUGAR', {
            fontSize: '26px',
            fontFamily: 'Arial',
            color: '#e74c3c',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        let yPos = 310;

        // Step 1
        const step1Bg = this.add.rectangle(900, yPos + 20, 520, 70, 0x34495E, 0.6);
        this.add.text(900, yPos, '1. Usa las FLECHAS para moverte', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 25, 'Muévete ↑ ↓ ← → en cualquier dirección', {
            fontSize: '15px',
            fontFamily: 'Arial',
            color: '#BDC3C7',
            align: 'center'
        }).setOrigin(0.5);

        yPos += 100;

        // Step 2
        const step2Bg = this.add.rectangle(900, yPos + 20, 520, 70, 0x34495E, 0.6);
        this.add.text(900, yPos, '2. Mantén ESPACIO para agarrarte', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 25, 'Congela tu posición y no caigas', {
            fontSize: '15px',
            fontFamily: 'Arial',
            color: '#BDC3C7',
            align: 'center'
        }).setOrigin(0.5);

        yPos += 100;

        // Step 3
        const step3Bg = this.add.rectangle(900, yPos + 20, 520, 70, 0x34495E, 0.6);
        this.add.text(900, yPos, '3. Llega a la bandera 🚩', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 25, 'Alcanza cualquier bandera en la cima', {
            fontSize: '15px',
            fontFamily: 'Arial',
            color: '#BDC3C7',
            align: 'center'
        }).setOrigin(0.5);

        // Start button
        const startButton = this.add.rectangle(700, 730, 380, 70, 0x27ae60);
        startButton.setStrokeStyle(5, 0x229954);
        startButton.setInteractive({ useHandCursor: true });

        const startText = this.add.text(700, 730, '🚀 COMENZAR A ESCALAR', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold',
            stroke: '#1e8449',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Button hover effects
        startButton.on('pointerover', () => {
            startButton.setFillStyle(0x2ecc71);
            this.tweens.add({
                targets: [startButton, startText],
                scaleX: 1.08,
                scaleY: 1.08,
                duration: 200,
                ease: 'Back.easeOut'
            });
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(0x27ae60);
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

        // Keyboard shortcut
        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('GameScene');
            });
        });
    }
}
