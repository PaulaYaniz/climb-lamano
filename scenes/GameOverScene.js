export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finger = data.finger || 'Unknown';
        this.height = data.height || 0;
        this.time = data.time || 0;
    }

    create() {
        // Background with gradient effect
        const bg = this.add.rectangle(600, 400, 1200, 800, 0xFFD700);
        bg.setAlpha(0.3);

        const sky = this.add.rectangle(600, 400, 1200, 800, 0x87CEEB);
        sky.setAlpha(0.7);

        // Victory banner
        const banner = this.add.rectangle(600, 120, 900, 140, 0x27ae60);
        banner.setStrokeStyle(6, 0x229954);

        const victoryText = this.add.text(600, 120, '🎉 ¡CIMA CONQUISTADA! 🎉', {
            fontSize: '52px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold',
            stroke: '#1e8449',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Pulse animation on victory text
        this.tweens.add({
            targets: victoryText,
            scaleX: 1.08,
            scaleY: 1.08,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Stats container
        const statsContainer = this.add.rectangle(600, 420, 750, 380, 0x2C3E50, 0.9);
        statsContainer.setStrokeStyle(5, 0x34495E);

        // Stats header
        this.add.text(600, 260, 'TU ESCALADA', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#3498db',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Format time
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Finger conquered with emoji
        const fingerEmojis = {
            thumb: '👍',
            index: '☝️',
            middle: '🖕',
            ring: '💍',
            pinky: '🤙'
        };
        const fingerEmoji = fingerEmojis[this.finger.toLowerCase()] || '✋';

        // Individual stats
        const stats = [
            { icon: fingerEmoji, label: 'Dedo', value: this.finger.toUpperCase() },
            { icon: '⛰️', label: 'Altura', value: `${this.height}m` },
            { icon: '⏱️', label: 'Tiempo', value: timeStr }
        ];

        let yPos = 330;

        stats.forEach((stat, index) => {
            const statBg = this.add.rectangle(600, yPos + 35, 680, 80, 0x34495E, 0.5);

            const iconText = this.add.text(350, yPos + 20, stat.icon, {
                fontSize: '40px'
            }).setOrigin(0.5);

            const labelText = this.add.text(450, yPos + 10, stat.label + ':', {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#BDC3C7',
                fontStyle: 'bold'
            });

            const valueText = this.add.text(450, yPos + 38, stat.value, {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#ECF0F1',
                fontStyle: 'bold'
            });

            // Animate stats appearing
            statBg.setAlpha(0);
            iconText.setAlpha(0);
            labelText.setAlpha(0);
            valueText.setAlpha(0);

            this.tweens.add({
                targets: [statBg, iconText, labelText, valueText],
                alpha: 1,
                duration: 500,
                delay: 500 + index * 200,
                ease: 'Power2'
            });

            yPos += 95;
        });

        // Star rating based on time
        const rating = this.calculateRating(this.time, this.height);
        this.showStarRating(rating, 600, 650);

        // Buttons
        this.createButtons();

        // Confetti particles
        this.createConfetti();
    }

    calculateRating(time, height) {
        // Rate based on completion time
        if (time < 30) return 3; // 3 stars
        if (time < 60) return 2; // 2 stars
        return 1; // 1 star
    }

    showStarRating(rating, x, y) {
        const starContainer = this.add.container(x, y);

        for (let i = 0; i < 3; i++) {
            const starX = (i - 1) * 60;
            const star = this.add.text(starX, 0, i < rating ? '⭐' : '☆', {
                fontSize: '48px'
            }).setOrigin(0.5);

            starContainer.add(star);

            // Animate stars
            if (i < rating) {
                star.setScale(0);
                this.tweens.add({
                    targets: star,
                    scale: 1,
                    duration: 400,
                    delay: 1000 + i * 200,
                    ease: 'Back.easeOut'
                });
            }
        }
    }

    getAchievementMessage(finger, height, time) {
        const messages = {
            thumb: "¡La Guía del Auto-stopista hacia la Victoria!",
            index: "¡Eres el Número Uno!",
            middle: "¡De Pie en lo Más Alto!",
            ring: "¡Te Has Ganado Esta Victoria!",
            pinky: "¡Escalador Pequeño pero Poderoso!"
        };

        return messages[finger.toLowerCase()] || "¡Escalada Increíble!";
    }

    createButtons() {
        // Play Again button
        const playButton = this.add.rectangle(450, 735, 280, 60, 0x3498db);
        playButton.setStrokeStyle(4, 0x2980b9);
        playButton.setInteractive({ useHandCursor: true });

        const playText = this.add.text(450, 735, '🔄 JUGAR DE NUEVO', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold',
            stroke: '#2980b9',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Main Menu button
        const menuButton = this.add.rectangle(750, 735, 280, 60, 0xe74c3c);
        menuButton.setStrokeStyle(4, 0xc0392b);
        menuButton.setInteractive({ useHandCursor: true });

        const menuText = this.add.text(750, 735, '🏠 MENÚ PRINCIPAL', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold',
            stroke: '#c0392b',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Play Again hover
        playButton.on('pointerover', () => {
            playButton.setFillStyle(0x5dade2);
            this.tweens.add({
                targets: [playButton, playText],
                scaleX: 1.08,
                scaleY: 1.08,
                duration: 200,
                ease: 'Back.easeOut'
            });
        });

        playButton.on('pointerout', () => {
            playButton.setFillStyle(0x3498db);
            this.tweens.add({
                targets: [playButton, playText],
                scaleX: 1,
                scaleY: 1,
                duration: 200
            });
        });

        playButton.on('pointerdown', () => {
            this.cameras.main.fade(300, 0, 0, 0);
            this.time.delayedCall(300, () => {
                this.scene.start('GameScene');
            });
        });

        // Menu hover
        menuButton.on('pointerover', () => {
            menuButton.setFillStyle(0xec7063);
            this.tweens.add({
                targets: [menuButton, menuText],
                scaleX: 1.08,
                scaleY: 1.08,
                duration: 200,
                ease: 'Back.easeOut'
            });
        });

        menuButton.on('pointerout', () => {
            menuButton.setFillStyle(0xe74c3c);
            this.tweens.add({
                targets: [menuButton, menuText],
                scaleX: 1,
                scaleY: 1,
                duration: 200
            });
        });

        menuButton.on('pointerdown', () => {
            this.cameras.main.fade(300, 0, 0, 0);
            this.time.delayedCall(300, () => {
                this.scene.start('MenuScene');
            });
        });

        // Keyboard shortcuts
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('MenuScene');
        });
    }

    createConfetti() {
        const emojis = ['🎉', '🎊', '⭐', '🏆', '🚩', '💪', '🧗'];

        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 100, () => {
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                const confetti = this.add.text(
                    Phaser.Math.Between(200, 1000),
                    -50,
                    emoji,
                    { fontSize: '32px' }
                );

                this.tweens.add({
                    targets: confetti,
                    y: 850,
                    x: confetti.x + Phaser.Math.Between(-100, 100),
                    angle: Phaser.Math.Between(-360, 360),
                    alpha: 0.3,
                    duration: 3000,
                    ease: 'Cubic.easeIn',
                    onComplete: () => confetti.destroy()
                });
            });
        }
    }
}
