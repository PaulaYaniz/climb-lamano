export default class Climber {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create climber sprite using emoji
        this.sprite = scene.add.text(x, y, '🧗', {
            fontSize: '48px'
        }).setOrigin(0.5);

        // Add physics
        scene.physics.add.existing(this.sprite);
        this.body = this.sprite.body;
        this.body.setSize(40, 40);

        // Physics properties
        this.body.setCollideWorldBounds(true);
        this.body.setDrag(300, 0);
        this.body.setMaxVelocity(400, 600);
        this.body.setGravityY(0); // Use world gravity
        this.body.setBounce(0, 0);

        // Climbing state
        this.isGrabbing = false;
        this.currentHold = null;
        this.stamina = 100;
        this.maxStamina = 100;

        // Movement constants
        this.moveSpeed = 220;
        this.climbSpeed = 200;
        this.staminaDrainRate = 0.2;
        this.staminaRecoveryRate = 2.0;

        // Input
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasdKeys = scene.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Animation state
        this.animationState = 'idle';
    }

    update(holds) {
        // Find nearest hold
        const nearestHold = this.findNearestHold(holds);

        // Handle grabbing
        this.handleGrabbing(nearestHold);

        // Handle movement
        this.handleMovement();

        // Update stamina
        this.updateStamina();

        // Update visual state
        this.updateVisuals();

        return {
            nearestHold: nearestHold,
            isGrabbing: this.isGrabbing,
            currentHold: this.currentHold
        };
    }

    findNearestHold(holds) {
        let nearest = null;
        let minDistance = Infinity;
        const grabDistance = 150; // Increased for easier grabbing

        holds.forEach(hold => {
            const dx = this.sprite.x - hold.x;
            const dy = this.sprite.y - hold.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                minDistance = distance;
                nearest = { hold, distance };
            }
        });

        // Only return if within grab range
        if (nearest && nearest.distance < grabDistance) {
            return nearest;
        }

        return null;
    }

    handleGrabbing(nearestHold) {
        const wasGrabbing = this.isGrabbing;

        if (this.spaceKey.isDown && nearestHold && this.stamina > 1) {
            // Start or continue grabbing
            if (!this.isGrabbing) {
                this.isGrabbing = true;
                this.currentHold = nearestHold.hold;

                // Snap to hold slightly for better feel
                const snapStrength = 0.3;
                this.sprite.x += (nearestHold.hold.x - this.sprite.x) * snapStrength;
                this.sprite.y += (nearestHold.hold.y - this.sprite.y) * snapStrength;

                // Particle effect on grab
                this.createGrabParticles();
            }

            // Disable gravity when grabbing
            this.body.setGravityY(-800); // Counter world gravity
            this.body.setDrag(900, 900);

        } else {
            // Release
            if (this.isGrabbing) {
                this.isGrabbing = false;
                this.currentHold = null;
            }

            // Enable gravity when not grabbing
            this.body.setGravityY(0); // Use world gravity
            this.body.setDrag(300, 0);
        }
    }

    handleMovement() {
        // Horizontal movement - always works (arrow keys or A/D)
        const leftPressed = this.cursors.left.isDown || this.wasdKeys.A.isDown;
        const rightPressed = this.cursors.right.isDown || this.wasdKeys.D.isDown;
        
        if (leftPressed) {
            this.body.velocity.x = -this.moveSpeed;
        } else if (rightPressed) {
            this.body.velocity.x = this.moveSpeed;
        } else {
            // Slow down when no input
            this.body.velocity.x = 0;
        }

        // Vertical movement - always works (arrow keys or W/S)
        const upPressed = this.cursors.up.isDown || this.wasdKeys.W.isDown;
        const downPressed = this.cursors.down.isDown || this.wasdKeys.S.isDown;

        if (upPressed) {
            if (this.isGrabbing && this.stamina > 1) {
                // Climbing up while grabbing
                this.body.velocity.y = -this.climbSpeed;
                this.animationState = 'climbing';
            } else if (!this.isGrabbing) {
                // Free movement up (like flying/swimming)
                this.body.velocity.y = -this.climbSpeed;
            }
        } else if (downPressed) {
            if (this.isGrabbing) {
                // Climbing down while grabbing
                this.body.velocity.y = this.climbSpeed;
                this.animationState = 'descending';
            } else {
                // Free movement down
                this.body.velocity.y = this.climbSpeed;
            }
        } else {
            // No vertical input
            if (this.isGrabbing) {
                // Hold position when grabbing
                this.body.velocity.y = 0;
            }
            // Otherwise gravity handles falling
        }
    }

    updateStamina() {
        const upPressed = this.cursors.up.isDown || this.wasdKeys.W.isDown;
        const downPressed = this.cursors.down.isDown || this.wasdKeys.S.isDown;
        
        if (upPressed) {
            // Drain stamina when moving up (whether grabbing or not)
            this.stamina = Math.max(0, this.stamina - this.staminaDrainRate);
        } else if (this.isGrabbing && !upPressed && !downPressed) {
            // Slowly drain when just hanging (very slow)
            this.stamina = Math.max(0, this.stamina - this.staminaDrainRate * 0.05);
        } else {
            // Recover when not moving up or just moving horizontally
            this.stamina = Math.min(this.maxStamina, this.stamina + this.staminaRecoveryRate);
        }

        // If stamina depleted, can't grab
        if (this.stamina <= 0) {
            this.isGrabbing = false;
            this.currentHold = null;
        }
    }

    updateVisuals() {
        // Rotate climber based on movement
        const velocityX = this.body.velocity.x;
        const targetAngle = velocityX * 0.02; // Slight tilt

        this.scene.tweens.add({
            targets: this.sprite,
            angle: targetAngle,
            duration: 100,
            ease: 'Power1'
        });

        // Scale pulse when grabbing
        if (this.isGrabbing && this.animationState === 'climbing') {
            if (!this.climbPulse) {
                this.climbPulse = true;
                this.scene.tweens.add({
                    targets: this.sprite,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 200,
                    yoyo: true,
                    onComplete: () => {
                        this.climbPulse = false;
                    }
                });
            }
        }

        // Reset animation state
        const upPressed = this.cursors.up.isDown || this.wasdKeys.W.isDown;
        if (!upPressed) {
            this.animationState = 'idle';
        }
    }

    createGrabParticles() {
        // Create chalk dust particles
        const particles = this.scene.add.particles(this.sprite.x, this.sprite.y, 'particle', {
            speed: { min: 20, max: 60 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            alpha: { start: 0.8, end: 0 },
            lifespan: 400,
            quantity: 8,
            blendMode: 'ADD'
        });

        // Auto-destroy after burst
        this.scene.time.delayedCall(500, () => {
            particles.destroy();
        });
    }

    getStamina() {
        return this.stamina;
    }

    getHeight() {
        return Math.max(0, Math.floor((700 - this.sprite.y) / 10));
    }

    getPosition() {
        return {
            x: this.sprite.x,
            y: this.sprite.y
        };
    }

    getCurrentFinger(holds) {
        if (!this.currentHold) {
            if (this.sprite.y > 600) return 'Palm';
            return 'Between';
        }

        const fingerName = this.currentHold.finger;
        return fingerName.charAt(0).toUpperCase() + fingerName.slice(1);
    }

    checkGoalCollision(goals) {
        for (let goal of goals) {
            const dx = this.sprite.x - goal.x;
            const dy = this.sprite.y - goal.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
                return goal;
            }
        }
        return null;
    }
}
