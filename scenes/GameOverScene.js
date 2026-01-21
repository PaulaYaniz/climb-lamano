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
        const banner = this.add.rectangle(600, 150, 800, 120, 0xFFD700);
        banner.setStrokeStyle(6, 0xDAA520);

        const victoryText = this.add.text(600, 150, '🎉 SUMMIT CONQUERED! 🎉', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#8B4513',
            fontStyle: 'bold',
            stroke: '#654321',
            strokeThickness: 4
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
        const statsContainer = this.add.rectangle(600, 420, 700, 350, 0xFFFFFF);
        statsContainer.setStrokeStyle(5, 0x8B7355);
        statsContainer.setAlpha(0.95);

        // Stats header
        const statsHeader = this.add.text(600, 280, 'YOUR CLIMB', {
            fontSize: '36px',
            fontFamily: 'Arial',
            color: '#8B4513',
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
            { icon: fingerEmoji, label: 'Finger Conquered', value: this.finger.toUpperCase() },
            { icon: '⛰️', label: 'Height Reached', value: `${this.height}m` },
            { icon: '⏱️', label: 'Time', value: timeStr }
        ];

        stats.forEach((stat, index) => {
            const y = 350 + index * 70;

            const statText = this.add.text(
                400,
                y,
                `${stat.icon} ${stat.label}:`,
                {
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    color: '#333',
                    fontStyle: 'bold'
                }
            );

            const valueText = this.add.text(
                800,
                y,
                stat.value,
                {
                    fontSize: '28px',
                    fontFamily: 'Arial',
                    color: '#e74c3c',
                    fontStyle: 'bold'
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
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#8B4513',
            fontStyle: 'italic',
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
            thumb: "The Hitchhiker's Guide to Victory!",
            index: "You're Number One!",
            middle: "Standing Tall at the Top!",
            ring: "You've Earned This Victory!",
            pinky: "Small but Mighty Climber!"
        };

        return messages[finger.toLowerCase()] || "Incredible Climb!";
    }

    createButtons() {
        // Play Again button
        const playButton = this.add.rectangle(450, 710, 280, 60, 0xe74c3c);
        playButton.setStrokeStyle(4, 0x922b21);
        playButton.setInteractive({ useHandCursor: true });

        const playText = this.add.text(450, 710, '🔄 CLIMB AGAIN', {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Main Menu button
        const menuButton = this.add.rectangle(750, 710, 280, 60, 0x3498db);
        menuButton.setStrokeStyle(4, 0x2980b9);
        menuButton.setInteractive({ useHandCursor: true });

        const menuText = this.add.text(750, 710, '🏠 MAIN MENU', {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Play Again hover
        playButton.on('pointerover', () => {
            playButton.setFillStyle(0xc0392b);
            this.tweens.add({
                targets: [playButton, playText],
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 200
            });
        });

        playButton.on('pointerout', () => {
            playButton.setFillStyle(0xe74c3c);
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
            menuButton.setFillStyle(0x2980b9);
            this.tweens.add({
                targets: [menuButton, menuText],
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 200
            });
        });

        menuButton.on('pointerout', () => {
            menuButton.setFillStyle(0x3498db);
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
