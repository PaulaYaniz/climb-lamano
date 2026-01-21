export default class HandWall {
    constructor(scene) {
        this.scene = scene;
        this.holds = [];
        this.fingers = [];
        this.goals = [];

        this.createHand();
    }

    createHand() {
        // Display the hand image - centered and scaled larger
        const handImage = this.scene.add.image(520, 420, 'hand');
        handImage.setScale(1.05);
        handImage.setDepth(-1);

        // Define finger positions based on the actual image
        // Fingers from left to right: thumb, index, middle, ring, pinky

        // Thumb (leftmost, with brown holds visible in image)
        this.createFingerWithHolds('thumb', 280, 500, 280, [
            { x: 270, y: 530 },
            { x: 275, y: 470 },
            { x: 270, y: 410 },
            { x: 275, y: 350 },
            { x: 270, y: 290 }
        ]);

        // Index (second from left, with brown holds visible)
        this.createFingerWithHolds('index', 390, 550, 380, [
            { x: 390, y: 540 },
            { x: 395, y: 480 },
            { x: 390, y: 420 },
            { x: 395, y: 360 },
            { x: 390, y: 300 },
            { x: 390, y: 240 },
            { x: 390, y: 180 }
        ]);

        // Middle (center, tallest, with brown holds visible)
        this.createFingerWithHolds('middle', 510, 550, 430, [
            { x: 510, y: 540 },
            { x: 510, y: 480 },
            { x: 510, y: 420 },
            { x: 510, y: 360 },
            { x: 510, y: 300 },
            { x: 510, y: 240 },
            { x: 510, y: 180 },
            { x: 510, y: 130 }
        ]);

        // Ring (second from right, light colored)
        this.createFingerWithHolds('ring', 630, 550, 380, [
            { x: 630, y: 540 },
            { x: 630, y: 480 },
            { x: 630, y: 420 },
            { x: 630, y: 360 },
            { x: 630, y: 300 },
            { x: 630, y: 240 },
            { x: 630, y: 180 }
        ]);

        // Pinky (rightmost, shorter, light colored) - lowered positions
        this.createFingerWithHolds('pinky', 740, 550, 300, [
            { x: 740, y: 580 },
            { x: 740, y: 520 },
            { x: 740, y: 460 },
            { x: 740, y: 400 },
            { x: 740, y: 340 }
        ]);

        // Add scattered holds on palm and between fingers
        this.createScatteredHolds();
    }

    createScatteredHolds() {
        const scatteredPositions = [
            // Palm area (bottom)
            { x: 300, y: 600, finger: 'palm' },
            { x: 350, y: 620, finger: 'palm' },
            { x: 420, y: 610, finger: 'palm' },
            { x: 480, y: 620, finger: 'palm' },
            { x: 550, y: 610, finger: 'palm' },
            { x: 610, y: 620, finger: 'palm' },
            { x: 680, y: 600, finger: 'palm' },

            // Below the red line (starting area)
            { x: 320, y: 650, finger: 'start' },
            { x: 400, y: 660, finger: 'start' },
            { x: 470, y: 655, finger: 'start' },
            { x: 540, y: 660, finger: 'start' },
            { x: 610, y: 655, finger: 'start' },
            { x: 680, y: 650, finger: 'start' },

            // Bottom row (ground level)
            { x: 300, y: 700, finger: 'ground' },
            { x: 370, y: 710, finger: 'ground' },
            { x: 440, y: 705, finger: 'ground' },
            { x: 510, y: 710, finger: 'ground' },
            { x: 580, y: 705, finger: 'ground' },
            { x: 650, y: 710, finger: 'ground' },
            { x: 720, y: 700, finger: 'ground' },

            // Between thumb and index
            { x: 320, y: 560, finger: 'between' },
            { x: 340, y: 520, finger: 'between' },
            { x: 330, y: 450, finger: 'between' },
            { x: 320, y: 380, finger: 'between' },

            // Between index and middle
            { x: 440, y: 560, finger: 'between' },
            { x: 450, y: 500, finger: 'between' },
            { x: 445, y: 440, finger: 'between' },
            { x: 450, y: 380, finger: 'between' },
            { x: 445, y: 320, finger: 'between' },
            { x: 450, y: 260, finger: 'between' },

            // Between middle and ring
            { x: 570, y: 560, finger: 'between' },
            { x: 565, y: 500, finger: 'between' },
            { x: 570, y: 440, finger: 'between' },
            { x: 565, y: 380, finger: 'between' },
            { x: 570, y: 320, finger: 'between' },
            { x: 565, y: 260, finger: 'between' },

            // Between ring and pinky
            { x: 690, y: 560, finger: 'between' },
            { x: 685, y: 500, finger: 'between' },
            { x: 690, y: 440, finger: 'between' },
            { x: 685, y: 380, finger: 'between' }
        ];

        const holdColors = [0xFF6B6B, 0xFFA07A, 0xFF8C69, 0xCD5C5C];

        scatteredPositions.forEach(pos => {
            const holdSize = 12 + Math.random() * 6;
            const color = holdColors[Math.floor(Math.random() * holdColors.length)];

            const hold = this.scene.add.circle(pos.x, pos.y, holdSize, color);
            hold.setStrokeStyle(2, 0x8B4513);
            hold.setDepth(10);

            // Add physics body
            this.scene.physics.add.existing(hold, true);

            // Store hold data
            this.holds.push({
                sprite: hold,
                finger: pos.finger,
                x: pos.x,
                y: pos.y,
                size: holdSize,
                originalScale: 1,
                originalColor: color
            });
        });
    }

    createFingerWithHolds(fingerName, x, baseY, height, holdPositions) {
        // Store finger info
        this.fingers.push({
            name: fingerName,
            x,
            baseY,
            height
        });

        // Create climbing holds at specified positions
        const holdColors = [0xFF6B6B, 0xFFA07A, 0xFF8C69, 0xCD5C5C];

        holdPositions.forEach(pos => {
            const holdSize = 14 + Math.random() * 6;
            const color = holdColors[Math.floor(Math.random() * holdColors.length)];

            const hold = this.scene.add.circle(pos.x, pos.y, holdSize, color);
            hold.setStrokeStyle(2, 0x8B4513);
            hold.setDepth(10);

            // Add physics body
            this.scene.physics.add.existing(hold, true);

            // Store hold data
            this.holds.push({
                sprite: hold,
                finger: fingerName,
                x: pos.x,
                y: pos.y,
                size: holdSize,
                originalScale: 1,
                originalColor: color
            });
        });

        // Create goal at the top of this finger (closer to top hold)
        const topHold = holdPositions[holdPositions.length - 1];
        this.createGoal(fingerName, topHold.x, topHold.y - 30);
    }

    createGoal(fingerName, x, y) {
        // Goal collision area (slightly visible)
        const goalZone = this.scene.add.circle(x, y, 80, 0xFFD700, 0.15);
        goalZone.setStrokeStyle(3, 0xFFD700, 0.3);
        goalZone.setDepth(5);
        this.scene.physics.add.existing(goalZone, true);

        // Pulse animation for goal zone
        this.scene.tweens.add({
            targets: goalZone,
            alpha: 0.05,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Flag emoji or visual
        const flag = this.scene.add.text(x, y, '🚩', {
            fontSize: '48px'
        }).setOrigin(0.5);
        flag.setDepth(20);

        // Add gentle waving animation
        this.scene.tweens.add({
            targets: flag,
            angle: { from: -10, to: 10 },
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.goals.push({
            finger: fingerName,
            sprite: flag,
            zone: goalZone,
            x: x,
            y: y
        });
    }

    getHolds() {
        return this.holds;
    }

    getGoals() {
        return this.goals;
    }

    highlightNearbyHold(hold, isGrabbing) {
        if (!hold) return;

        if (isGrabbing) {
            // Grabbed - bright and large
            this.scene.tweens.add({
                targets: hold.sprite,
                scaleX: 1.4,
                scaleY: 1.4,
                duration: 100,
                ease: 'Power2'
            });
            hold.sprite.setFillStyle(0xFFD700);
        } else {
            // Just nearby - pulse
            this.scene.tweens.add({
                targets: hold.sprite,
                scaleX: 1.15,
                scaleY: 1.15,
                duration: 300,
                yoyo: true,
                repeat: 0,
                ease: 'Sine.easeInOut'
            });
        }
    }

    resetHoldHighlight(hold) {
        if (!hold) return;

        this.scene.tweens.add({
            targets: hold.sprite,
            scaleX: 1,
            scaleY: 1,
            duration: 200,
            ease: 'Power2'
        });
        // Restore original color for circles
        hold.sprite.setFillStyle(hold.originalColor);
    }

    update() {
        // Any per-frame updates if needed
    }
}
