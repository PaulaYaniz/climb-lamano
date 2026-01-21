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

        const victoryText = this.add.text(600, 120, '¡CIMA CONQUISTADA!', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Pulse animation on victory text
        this.tweens.add({
            targets: victoryText,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Stats header
        const statsHeader = this.add.text(600, 240, 'TU ESCALADA', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
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
            { icon: fingerEmoji, label: 'Dedo Conquistado', value: this.finger.toUpperCase() },
            { icon: '⛰️', label: 'Altura Alcanzada', value: `${this.height}m` },
            { icon: '⏱️', label: 'Tiempo', value: timeStr }
        ];

        stats.forEach((stat, index) => {
            const y = 320 + index * 80;

            const statText = this.add.text(
                600,
                y,
                `${stat.icon} ${stat.label}`,
                {
                    fontSize: '18px',
                    fontFamily: 'Arial',
                    color: 'rgba(255, 255, 255, 0.8)',
                    align: 'center'
                }
            ).setOrigin(0.5);

            const valueText = this.add.text(
                600,
                y + 30,
                stat.value,
                {
                    fontSize: '32px',
                    fontFamily: 'Arial',
                    color: '#FFFFFF',
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Animate stats appearing
            statText.setAlpha(0);
            valueText.setAlpha(0);

            this.tweens.add({
                targets: [statText, valueText],
                alpha: 1,
                duration: 500,
                delay: 500 + index * 200,
                ease: 'Power2'
            });
        });

        // Star rating based on time
        const rating = this.calculateRating(this.time, this.height);
        this.showStarRating(rating, 600, 590);

        // Achievement message
        const achievement = this.getAchievementMessage(this.finger, this.height, this.time);
        const achievementText = this.add.text(600, 650, achievement, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.7)',
            align: 'center'
        }).setOrigin(0.5);

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
        const playButton = this.add.rectangle(450, 730, 250, 55);
        playButton.setStrokeStyle(3, 0xFFFFFF);
        playButton.setFillStyle(0x000000, 0);
        playButton.setInteractive({ useHandCursor: true });

        const playText = this.add.text(450, 730, 'JUGAR DE NUEVO', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Main Menu button
        const menuButton = this.add.rectangle(750, 730, 250, 55);
        menuButton.setStrokeStyle(3, 0xFFFFFF);
        menuButton.setFillStyle(0x000000, 0);
        menuButton.setInteractive({ useHandCursor: true });

        const menuText = this.add.text(750, 730, 'MENÚ PRINCIPAL', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Play Again hover
        playButton.on('pointerover', () => {
            playButton.setFillStyle(0xFFFFFF, 1);
            playText.setColor('#000000');
            this.tweens.add({
                targets: [playButton, playText],
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 150
            });
        });

        playButton.on('pointerout', () => {
            playButton.setFillStyle(0x000000, 0);
            playText.setColor('#FFFFFF');
            this.tweens.add({
                targets: [playButton, playText],
                scaleX: 1,
                scaleY: 1,
                duration: 150
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
            menuButton.setFillStyle(0xFFFFFF, 1);
            menuText.setColor('#000000');
            this.tweens.add({
                targets: [menuButton, menuText],
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 150
            });
        });

        menuButton.on('pointerout', () => {
            menuButton.setFillStyle(0x000000, 0);
            menuText.setColor('#FFFFFF');
            this.tweens.add({
                targets: [menuButton, menuText],
                scaleX: 1,
                scaleY: 1,
                duration: 150
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
