# La Mano - Rock Climbing Game

A polished indie climbing game inspired by the iconic hand-shaped climbing wall "La Mano". Built with Phaser.js for smooth physics and professional game feel.

## Features

### Core Mechanics
- **Physics-Based Climbing**: Realistic momentum and gravity using Phaser's Arcade Physics
- **Stamina System**: Manage your energy - you can only grab holds when you have stamina
- **5 Unique Fingers**: Each finger tower has different heights and challenges
- **Smart Hold Detection**: Nearby holds glow to guide you

### Game Feel & Polish
- **Particle Effects**: Chalk dust when grabbing holds, confetti on victory
- **Smooth Animations**: Camera follow, hold highlighting, climber movements
- **Dynamic HUD**: Live tracking of height, stamina, time, and current finger
- **Victory Celebration**: Freeze frames, screen shake, particle burst on summit

### Scenes
1. **Menu Scene**: Instructions and start screen
2. **Game Scene**: Main climbing gameplay
3. **Game Over Scene**: Victory stats with star rating system

## Controls

- **← →** - Move left/right
- **SPACE** (hold) - Grab nearby holds (they'll glow!)
- **↑** (while grabbing) - Climb up
- **↓** - Descend

## Goal

Reach any of the 5 fingertip flags:
- 👍 Thumb (280px)
- ☝️ Index (420px)
- 🖕 Middle (480px) - Tallest!
- 💍 Ring (410px)
- 🤙 Pinky (320px)

## Technical Details

### Technology Stack
- **Phaser 3.60.0** - Game framework loaded via CDN
- **ES6 Modules** - Clean, organized code structure
- **Arcade Physics** - Lightweight 2D physics engine
- **Canvas Rendering** - 60fps optimized rendering

### File Structure
```
hand-climbing-phaser/
├── index.html          # Main HTML entry point
├── game.js             # Phaser configuration
├── scenes/
│   ├── MenuScene.js    # Title screen
│   ├── GameScene.js    # Main gameplay
│   └── GameOverScene.js # Victory screen
└── entities/
    ├── HandWall.js     # 5-finger wall structure
    └── Climber.js      # Player character
```

### Key Classes

**HandWall**: Creates the hand structure with 5 fingers, climbing holds, and goal flags
- Each finger is a separate tower with unique height
- Holds are distributed algorithmically
- Visual highlighting system for holds

**Climber**: Player character with physics-based movement
- Arcade Physics body with gravity
- Stamina system with drain/recovery
- Grab detection using distance calculation
- Visual feedback (rotation, scaling, particles)

**GameScene**: Main game loop coordinating everything
- Camera follows player
- HUD updates
- Hold highlighting
- Goal detection
- Victory sequence

## Star Rating System

Climb faster to earn more stars:
- ⭐⭐⭐ Under 30 seconds
- ⭐⭐ Under 60 seconds
- ⭐ Complete the climb

## Development

### Running Locally
1. Simply open `index.html` in any modern browser
2. No build process or server required
3. Works offline once Phaser CDN is cached

### Deploying
- Host on any static site hosting (GitHub Pages, Netlify, Vercel)
- All files are included, no build step needed
- Total size: ~1.5MB (including Phaser via CDN)

## Future Enhancement Ideas

- Sound effects (grab, climb, victory)
- Background music
- Additional wall shapes
- Multiplayer race mode
- Leaderboard system
- Mobile touch controls
- Different difficulty levels
- Unlockable climber characters
- Weather effects (wind, rain)

## Credits

Inspired by the real "La Mano" climbing wall.
Built with ❤️ using Phaser.js
