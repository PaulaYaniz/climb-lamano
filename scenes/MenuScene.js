export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Load hand image for preview
        this.load.image('hand', 'assets/hand.png');
    }

    create() {
        // Sky gradient background
        const sky = this.add.rectangle(700, 400, 1400, 800, 0x87CEEB);

        // Add more clouds for atmosphere
        for (let i = 0; i < 8; i++) {
            const cloud = this.add.text(
                Phaser.Math.Between(50, 1350),
                Phaser.Math.Between(30, 250),
                '☁️',
                { fontSize: Phaser.Math.Between(40, 60) + 'px' }
            );
            cloud.setAlpha(Phaser.Math.Between(40, 70) / 100);

            this.tweens.add({
                targets: cloud,
                x: cloud.x + Phaser.Math.Between(30, 100),
                duration: Phaser.Math.Between(15000, 25000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }

        // Mountains at bottom for depth
        const mountain1 = this.add.triangle(200, 800, 0, 200, 300, 200, 150, 0, 0x5D6D7E);
        const mountain2 = this.add.triangle(500, 800, 0, 200, 400, 200, 200, 0, 0x7F8C8D);
        const mountain3 = this.add.triangle(900, 800, 0, 200, 350, 200, 175, 0, 0x5D6D7E);
        const mountain4 = this.add.triangle(1200, 800, 0, 200, 300, 200, 150, 0, 0x7F8C8D);

        // Title background glow
        const titleGlow = this.add.rectangle(700, 100, 650, 120, 0xFFFFFF, 0.15);
        titleGlow.setStrokeStyle(3, 0xFFFFFF, 0.3);

        // Title with shadow effect
        const title = this.add.text(700, 100, '🧗 LA MANO 🧗', {
            fontSize: '76px',
            fontFamily: 'Arial Black',
            color: '#FFFFFF',
            stroke: '#2C3E50',
            strokeThickness: 10
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

        // Subtitle with better styling
        const subtitle = this.add.text(700, 165, 'Conquista la Cumbre', {
            fontSize: '26px',
            fontFamily: 'Arial',
            color: '#F39C12',
            stroke: '#2C3E50',
            strokeThickness: 4,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Left panel with shadow effect
        const leftShadow = this.add.rectangle(305, 455, 480, 580, 0x000000, 0.3);
        const leftPanel = this.add.rectangle(300, 450, 480, 580, 0x34495E, 0.95);
        leftPanel.setStrokeStyle(5, 0x3498db, 0.8);

        // Panel header with icon
        const leftHeader = this.add.rectangle(300, 235, 400, 50, 0x3498db, 0.3);
        this.add.text(300, 235, '🎯 EL DESAFÍO', {
            fontSize: '26px',
            fontFamily: 'Arial',
            color: '#3498db',
            fontStyle: 'bold',
            stroke: '#1a5276',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Hand preview image with glow
        const handGlow = this.add.circle(300, 400, 120, 0xFFFFFF, 0.1);
        const handPreview = this.add.image(300, 380, 'hand');
        handPreview.setScale(0.35);
        handPreview.setAlpha(0.95);

        // Animated climber on hand
        const miniClimber = this.add.text(300, 480, '🧗', {
            fontSize: '52px'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: miniClimber,
            y: 330,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Challenge description with better styling
        const descBox = this.add.rectangle(300, 630, 420, 90, 0x2C3E50, 0.6);
        this.add.text(300, 615, '¡Escala la mano gigante', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(300, 645, 'y conquista la cima! 🚩', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#F39C12',
            align: 'center'
        }).setOrigin(0.5);

        // Right panel with shadow
        const rightShadow = this.add.rectangle(905, 455, 600, 580, 0x000000, 0.3);
        const rightPanel = this.add.rectangle(900, 450, 600, 580, 0x34495E, 0.95);
        rightPanel.setStrokeStyle(5, 0xe74c3c, 0.8);

        // Panel header with icon
        const rightHeader = this.add.rectangle(900, 235, 500, 50, 0xe74c3c, 0.3);
        this.add.text(900, 235, '📖 CÓMO JUGAR', {
            fontSize: '26px',
            fontFamily: 'Arial',
            color: '#e74c3c',
            fontStyle: 'bold',
            stroke: '#922b21',
            strokeThickness: 3
        }).setOrigin(0.5);

        let yPos = 310;

        // Step 1 with improved styling
        const step1Container = this.add.rectangle(900, yPos + 20, 540, 85, 0x27ae60, 0.2);
        step1Container.setStrokeStyle(3, 0x27ae60, 0.5);

        const step1Number = this.add.circle(750, yPos + 20, 22, 0x27ae60);
        this.add.text(750, yPos + 20, '1', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(900, yPos + 5, '⬆️ Usa las FLECHAS ⬇️', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 32, 'Muévete en cualquier dirección', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#BDC3C7',
            align: 'center'
        }).setOrigin(0.5);

        yPos += 110;

        // Step 2
        const step2Container = this.add.rectangle(900, yPos + 20, 540, 85, 0xf39c12, 0.2);
        step2Container.setStrokeStyle(3, 0xf39c12, 0.5);

        const step2Number = this.add.circle(750, yPos + 20, 22, 0xf39c12);
        this.add.text(750, yPos + 20, '2', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(900, yPos + 5, '🤚 Mantén ESPACIO', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 32, 'Congela tu posición y recupera resistencia', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#BDC3C7',
            align: 'center'
        }).setOrigin(0.5);

        yPos += 110;

        // Step 3
        const step3Container = this.add.rectangle(900, yPos + 20, 540, 85, 0xe74c3c, 0.2);
        step3Container.setStrokeStyle(3, 0xe74c3c, 0.5);

        const step3Number = this.add.circle(750, yPos + 20, 22, 0xe74c3c);
        this.add.text(750, yPos + 20, '3', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(900, yPos + 5, '🚩 Llega a la Cima', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ECF0F1',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(900, yPos + 32, 'Alcanza cualquier bandera dorada', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#BDC3C7',
            align: 'center'
        }).setOrigin(0.5);

        // Start button with shadow and glow
        const buttonShadow = this.add.rectangle(705, 735, 400, 80, 0x000000, 0.4);
        const buttonGlow = this.add.rectangle(700, 730, 400, 80, 0xFFFFFF, 0.15);
        const startButton = this.add.rectangle(700, 730, 400, 80, 0x27ae60);
        startButton.setStrokeStyle(6, 0x229954);
        startButton.setInteractive({ useHandCursor: true });

        const startText = this.add.text(700, 730, '🚀 COMENZAR AVENTURA 🚀', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold',
            stroke: '#1a5490',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Pulsing glow animation
        this.tweens.add({
            targets: buttonGlow,
            alpha: 0.3,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Button hover effects
        startButton.on('pointerover', () => {
            startButton.setFillStyle(0x2ecc71);
            buttonGlow.setFillStyle(0x2ecc71);
            this.tweens.add({
                targets: [startButton, startText, buttonGlow],
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 200,
                ease: 'Back.easeOut'
            });
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(0x27ae60);
            buttonGlow.setFillStyle(0xFFFFFF);
            this.tweens.add({
                targets: [startButton, startText, buttonGlow],
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
