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

        // Victory banner (subtle)
        const banner = this.add.rectangle(600, 150, 800, 100, 0xFFFFFF, 0.1);

        const victoryText = this.add.text(600, 150, '¡CIMA CONQUISTADA!', {
            fontSize: '42px',
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

        // Stats container
        const statsContainer = this.add.rectangle(600, 420, 700, 350, 0x000000, 0.3);
        statsContainer.setStrokeStyle(1, 0xFFFFFF, 0.3);

        // Stats header
        const statsHeader = this.add.text(600, 280, 'TU ESCALADA', {
            fontSize: '28px',
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
            const y = 350 + index * 70;

            const statText = this.add.text(
                400,
                y,
                `${stat.icon} ${stat.label}:`,
                {
                    fontSize: '20px',
                    fontFamily: 'Arial',
                    color: 'rgba(255, 255, 255, 0.9)'
                }
            );

            const valueText = this.add.text(
                800,
                y,
                stat.value,
                {
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    color: 'rgba(255, 255, 255, 0.9)'
                }
            ).setOrigin(1, 0);

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
        this.showStarRating(rating, 600, 540);

        // Buttons
        this.createButtons();

        // Confetti particles
        this.createConfetti();

        // Achievement message
        const achievement = this.getAchievementMessage(this.finger, this.height, this.time);
        const achievementText = this.add.text(600, 620, achievement, {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: 'rgba(255, 255, 255, 0.8)',
            align: 'center'
        }).setOrigin(0.5);
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
        const playButton = this.add.rectangle(450, 710, 280, 60, 0xFFFFFF, 0.1);
        playButton.setStrokeStyle(2, 0xFFFFFF, 0.5);
        playButton.setInteractive({ useHandCursor: true });

        const playText = this.add.text(450, 710, 'JUGAR DE NUEVO', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Main Menu button
        const menuButton = this.add.rectangle(750, 710, 280, 60, 0xFFFFFF, 0.1);
        menuButton.setStrokeStyle(2, 0xFFFFFF, 0.5);
        menuButton.setInteractive({ useHandCursor: true });

        const menuText = this.add.text(750, 710, 'MENÚ PRINCIPAL', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Play Again hover
        playButton.on('pointerover', () => {
            playButton.setFillStyle(0xFFFFFF, 0.2);
            this.tweens.add({
                targets: [playButton, playText],
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 200
            });
        });

        playButton.on('pointerout', () => {
            playButton.setFillStyle(0xFFFFFF, 0.1);
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
            menuButton.setFillStyle(0xFFFFFF, 0.2);
            this.tweens.add({
                targets: [menuButton, menuText],
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 200
            });
        });

        menuButton.on('pointerout', () => {
            menuButton.setFillStyle(0xFFFFFF, 0.1);
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
