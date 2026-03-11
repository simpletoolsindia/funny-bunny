# funny-bunny

## 🐼 Panda Dev Buddy (VS Code Extension)

![Panda Dev Buddy logo](media/panda-dev-buddy-logo.svg)

Panda Dev Buddy adds playful animated coding buddies in a VS Code webview panel — now with progression, achievements, squad mode, daily challenges, random events, and a 100-action funny engagement engine (50 classic + 50 new pro actions).

## Characters

- 🐼 Panda
- 🐰 Bunny
- 🦊 Fox

Switch character commands:

- `Panda Dev Buddy: Character Panda`
- `Panda Dev Buddy: Character Bunny`
- `Panda Dev Buddy: Character Fox`

## State commands

- **Idle** (`pandaDevBuddy.start`) – breathing
- **Run** (`pandaDevBuddy.run`) – sprite running + sprint bounce
- **Success** (`pandaDevBuddy.success`) – dance combo, streak + bamboo reward
- **Error** (`pandaDevBuddy.error`) – crash + dizzy effect
- **Sleep** (`pandaDevBuddy.sleep`) – sleepy bobbing
- **Celebrate** (`pandaDevBuddy.celebrate`) – confetti-style bounce, bonus bamboo
- **Debug** (`pandaDevBuddy.debug`) – scanning animation with detective ring

## Innovation features (new)

- **Achievement engine**: live achievement badge based on performance milestones (`Starter`, `Momentum`, `Bug Slayer`, `Zen Master`, `Legend`).
- **Daily challenge command**: `pandaDevBuddy.showDailyChallenge` rotates fun challenge goals by date.
- **Squad mode**: `pandaDevBuddy.toggleSquadMode` shows mini cards for all buddies and highlights active buddy.
- **Ambient FX toggle**: `pandaDevBuddy.toggleAmbientFx` enables/disables extra visual ambient effects.
- **Random event system**: `pandaDevBuddy.triggerRandomEvent` injects surprise events (bonus bamboo, mood boost, skin pulse, motivational prompt).

- **100 Funny Actions Engine**: 100 unique developer engagement actions with names, descriptions, and auto-mapped buddy states.
- **Action commands**:
  - `pandaDevBuddy.nextFunnyAction` → play next action in the 1..100 sequence
  - `pandaDevBuddy.randomFunnyAction` → trigger a random action from the 100-action pool
- **Action animation profiles**: 50 dynamic animation profiles are applied across actions for varied motion/energy.

## Existing progression

- **Mood system**: mood reacts to success streaks, error streaks, debug state, and progression level.
- **Bamboo rewards**: rewards increase on success/celebrate and through manual command.
- **Unlockable skins**:
  - Classic (0 bamboo)
  - Ninja (5 bamboo)
  - Cyber (12 bamboo)
  - Galaxy (25 bamboo)
- **Next skin command**: cycle through unlocked skins with `pandaDevBuddy.nextSkin`.
- **Auto sleep**: buddy sleeps automatically after 30 seconds of inactivity.
- **Auto demo mode**: `pandaDevBuddy.toggleDemoMode` cycles through states and random events.

## Extra commands

- `pandaDevBuddy.rewardBamboo` → adds +1 bamboo
- `pandaDevBuddy.nextSkin` → cycles currently unlocked skins
- `pandaDevBuddy.toggleDemoMode` → starts/stops auto state cycling demo
- `pandaDevBuddy.toggleSquadMode` → toggles multi-buddy strip
- `pandaDevBuddy.toggleAmbientFx` → toggles ambient visual effects
- `pandaDevBuddy.triggerRandomEvent` → triggers one random event instantly
- `pandaDevBuddy.showDailyChallenge` → displays today’s coding challenge

## Project Structure

```
.
├── media/
│   └── panda-sprite.png   # optional sprite sheet (108px x 108px frames in a row)
├── src/
│   └── extension.ts
├── webview/
│   ├── panda.css
│   └── panda.js
├── package.json
└── tsconfig.json
```

## Run locally

```bash
npm install
npm run compile
```

Then press `F5` in VS Code to launch the Extension Development Host and run buddy commands from the Command Palette.

## Sprite sheet notes

- Expected frame size is **108x108**.
- Running animation uses the first **4 horizontal frames**.
- If `media/panda-sprite.png` is missing, built-in CSS character visuals are used.

## Developer

- **Developer:** Sridhar Karuppusamy
- **Company:** SimpleTools

