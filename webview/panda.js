const buddy = document.getElementById("panda");
const wrap = document.getElementById("buddyWrap");
const squad = document.getElementById("squad");
const quote = document.getElementById("quote");
const challenge = document.getElementById("challenge");
const actionPanel = document.getElementById("actionPanel");

const characterBadge = document.getElementById("characterBadge");
const stateBadge = document.getElementById("stateBadge");
const moodBadge = document.getElementById("moodBadge");
const bambooBadge = document.getElementById("bambooBadge");
const skinBadge = document.getElementById("skinBadge");
const achievementBadge = document.getElementById("achievementBadge");
const actionCountBadge = document.getElementById("actionCountBadge");

const quotes = {
  panda: {
    idle: "🐼 Panda is chilling with bamboo vibes...",
    run: "🐼 Panda zoom mode: bamboo-powered execution!",
    success: "🐼 Great job! Panda is doing happy wiggles.",
    error: "🐼 Oops! Panda bumped into a compile wall.",
    sleep: "🐼 Task queue empty. Panda nap protocol enabled.",
    celebrate: "🐼 Tests passed! Panda confetti dance activated.",
    debug: "🐼 Detective Panda is tracing suspicious stack lines..."
  },
  bunny: {
    idle: "🐰 Bunny is listening for build footsteps...",
    run: "🐰 Bunny sprinting through your command queue!",
    success: "🐰 Flawless! Bunny performs turbo hops.",
    error: "🐰 Build failed. Bunny dropped the carrot stack.",
    sleep: "🐰 Bunny curled up in the editor corner.",
    celebrate: "🐰 Green checks! Bunny party-hop unlocked.",
    debug: "🐰 Bunny detective nose found a breakpoint clue."
  },
  fox: {
    idle: "🦊 Fox is watching logs like a detective.",
    run: "🦊 Fox dashing across terminal tracks!",
    success: "🦊 Nice! Fox nailed the build landing.",
    error: "🦊 Uh-oh. Fox found a sneaky bug trail.",
    sleep: "🦊 No commits? Fox entered stealth rest mode.",
    celebrate: "🦊 Victory! Fox spins with pixel confetti.",
    debug: "🦊 Fox opened forensic mode for your debugger."
  }
};

const stateClasses = {
  idle: "panda-idle",
  run: "panda-run",
  success: "panda-success",
  error: "panda-error",
  sleep: "panda-sleep",
  celebrate: "panda-celebrate",
  debug: "panda-debug"
};

const characters = {
  panda: { className: "character-panda", label: "🐼 Panda" },
  bunny: { className: "character-bunny", label: "🐰 Bunny" },
  fox: { className: "character-fox", label: "🦊 Fox" }
};

const skins = [
  { id: "classic", label: "Classic", unlock: 0 },
  { id: "ninja", label: "Ninja", unlock: 5 },
  { id: "cyber", label: "Cyber", unlock: 12 },
  { id: "galaxy", label: "Galaxy", unlock: 25 }
];

const achievements = [
  { id: "starter", label: "Starter", rule: (ctx) => ctx.bambooPoints >= 0 },
  { id: "momentum", label: "Momentum", rule: (ctx) => ctx.successStreak >= 3 },
  { id: "bug-slayer", label: "Bug Slayer", rule: (ctx) => ctx.totalErrors >= 5 && ctx.totalSuccess >= 8 },
  { id: "zen-master", label: "Zen Master", rule: (ctx) => ctx.bambooPoints >= 30 },
  { id: "legend", label: "Legend", rule: (ctx) => ctx.bambooPoints >= 50 && ctx.totalSuccess >= 20 }
];

const randomEvents = [
  { type: "reward", message: "🎁 Surprise bamboo drop! +2" },
  { type: "moodBoost", message: "✨ Team morale boost!" },
  { type: "skinPulse", message: "🌀 Skin overclock pulse!" },
  { type: "quote", message: "📣 Buddy says: Keep shipping greatness." }
];

const classicActions = [
  ["Keyboard Drum Solo", "Buddy plays a 4ms drum fill on your keyboard.", "celebrate"],
  ["Rubber Duck Standup", "Daily standup now hosted by a rubber duck.", "debug"],
  ["Terminal Moonwalk", "Buddy moonwalks across the terminal output.", "run"],
  ["Bug Karate", "A flying kick was delivered to a sneaky bug.", "success"],
  ["Compile Espresso", "Buddy brewed espresso directly from CPU heat.", "run"],
  ["Stack Trace Poetry", "A tragic poem was written from your stack trace.", "debug"],
  ["Whitespace Yoga", "All spaces aligned with inner peace.", "idle"],
  ["Lint Disco", "Lint warnings converted into disco lighting.", "celebrate"],
  ["Refactor Tango", "Buddy and your code just danced a tango.", "success"],
  ["Merge Conflict Wrestling", "Conflict pinned in round two.", "error"],
  ["Breakpoint Detective", "Buddy examined clues with tiny magnifier.", "debug"],
  ["Hot Reload Hype", "Hot reload entered superstar mode.", "celebrate"],
  ["Null Pointer Shield", "Buddy blocked null pointer with bamboo shield.", "error"],
  ["CI Cheerleading", "Buddy chants: green build! green build!", "success"],
  ["Semicolon Snipe", "Missing semicolon neutralized from 200m.", "debug"],
  ["Cache Treasure Hunt", "Ancient cache artifact has been discovered.", "run"],
  ["Log Karaoke", "Logs started singing your release notes.", "celebrate"],
  ["Regex Wizardry", "A regex spell matched only what you needed.", "success"],
  ["Commit Confetti", "Every commit now drops virtual confetti.", "celebrate"],
  ["Binary Breakdance", "Buddy spins on 101010 beat.", "run"],
  ["Latency Sprint", "Buddy outran network latency by motivation.", "run"],
  ["Feature Flag Fortune", "Fortune says: ship boldly, rollback wisely.", "idle"],
  ["Build Ninja Entrance", "Smoke bomb + successful build combo.", "success"],
  ["Exception Trampoline", "All exceptions bounced safely back.", "error"],
  ["Dark Mode Ritual", "Brightness sacrificed to code gods.", "idle"],
  ["Commit Haiku", "Tiny poem auto-generated for commit mood.", "celebrate"],
  ["Debugger Jazz", "Stepping through code with smooth jazz hands.", "debug"],
  ["PR Parade", "Pull request escorted by tiny marching band.", "celebrate"],
  ["Memory Garden", "Unused memory reclaimed and planted as trees.", "success"],
  ["Console Roast", "Console gave a gentle roast and moved on.", "error"],
  ["Unit Test High-Five", "Each passing test earned a high-five.", "success"],
  ["API Surfing", "Buddy surfed your API waves gracefully.", "run"],
  ["Bamboo Backup", "Emergency bamboo backup loaded.", "idle"],
  ["Microservice Choir", "Services now harmonizing in C major.", "celebrate"],
  ["Bug Freeze Ray", "A freeze ray paused the bug mid-jump.", "debug"],
  ["Code Archaeology", "Buddy excavated a 2018 TODO fossil.", "debug"],
  ["Deploy Drumroll", "Deployment launched with dramatic drumroll.", "run"],
  ["Sandbox Sandcastle", "Buddy built a production-safe sandcastle.", "idle"],
  ["Syntax Fireworks", "Valid syntax triggered fireworks.", "celebrate"],
  ["Error Pogo", "Buddy pogo-jumped over error logs.", "error"],
  ["Refactor Rocket", "Refactor launched without collateral damage.", "success"],
  ["Patch Potion", "A patch potion healed flaky tests.", "success"],
  ["Cron Nap", "Cron jobs tucked buddy into short nap.", "sleep"],
  ["Infinite Loop Escape", "Buddy escaped loop using dance move.", "error"],
  ["Autocomplete Symphony", "Autocomplete played a full symphony.", "run"],
  ["Emoji Compiler", "Compiler now communicates in pure emoji.", "celebrate"],
  ["Git Rebase Parkour", "Buddy did parkour through commits.", "debug"],
  ["Scope Telescope", "Scope inspected via tiny telescope.", "debug"],
  ["Happy Path Parade", "Happy path celebrated downtown.", "success"],
  ["Bamboo Victory Lap", "Buddy takes a glorious victory lap.", "celebrate"]
];

const proActions = [
  ["Quantum Commit", "Commit exists in two branches until reviewed.", "debug"],
  ["Latency Time Warp", "Buddy bent time around slow requests.", "run"],
  ["Coffee Stack Overflow", "Too much coffee, still no overflow.", "celebrate"],
  ["Refactor Origami", "Messy function folded into elegant shape.", "success"],
  ["Keyboard Drift", "Buddy drifted sideways across hotkeys.", "run"],
  ["Null Panic Alarm", "Buddy sounded alarm before crash.", "error"],
  ["CI Fireworks 2.0", "Pipeline exploded into green sparkles.", "celebrate"],
  ["Bug Whisperer", "Bug agreed to leave peacefully.", "debug"],
  ["Sleep Mode Sprint", "Napped and still beat the deadline.", "sleep"],
  ["Merge Zen", "Conflicts resolved through pure calm.", "success"],
  ["Branch Acrobat", "Buddy flipped between branches flawlessly.", "run"],
  ["Test Totem", "Totem grants +10 confidence to tests.", "success"],
  ["Deploy Fire Escape", "Rollback route mapped before deploy.", "debug"],
  ["Syntax Samurai", "One slash fixed a nasty parser bug.", "success"],
  ["Terminal Beatbox", "CLI noises became rhythmic beats.", "celebrate"],
  ["Breakpoint Park Bench", "Buddy sat and watched variables grow.", "debug"],
  ["Chill Commit", "Micro-commit with macro impact.", "idle"],
  ["Error Origami", "Exception folded into neat warning.", "error"],
  ["Boolean Ballet", "true and false danced in perfect sync.", "run"],
  ["Release Rocket MkII", "Release lifted off with no alarms.", "celebrate"],
  ["Ghost in Logs", "Buddy found hidden clue in logs.", "debug"],
  ["Lint Monk", "Warnings silenced by disciplined formatting.", "success"],
  ["Cache Mirage", "Stale cache vanished like illusion.", "run"],
  ["Hotfix Highway", "Emergency fix reached prod in record time.", "success"],
  ["Stacktrace Salsa", "Stacktrace moved to salsa rhythm.", "celebrate"],
  ["Thread Tamer", "Race conditions calmed with bamboo rope.", "debug"],
  ["Infinite Scroll Patrol", "Buddy patrolled endless UI loop.", "run"],
  ["Dependency Detox", "Unused packages sent on vacation.", "success"],
  ["Proxy Prank", "Proxy redirected to a joke endpoint.", "error"],
  ["Refactor Meteor", "Legacy code hit by clean-code meteor.", "success"],
  ["Prod Ninja Tiptoe", "Buddy deployed without waking alerts.", "run"],
  ["API Fortune Cookie", "API response included wise quote.", "idle"],
  ["Exception Escape Room", "All errors solved before timeout.", "debug"],
  ["Console Campfire", "Logs gathered around a warm campfire.", "idle"],
  ["Breakpoint Beatdrop", "Debugger dropped the beat at line 42.", "celebrate"],
  ["Testcase Tornado", "Buddy spun up 300 tiny tests.", "run"],
  ["Schema Stargaze", "Data model mapped like constellations.", "debug"],
  ["Commit Cannon", "Small fix launched across repo.", "success"],
  ["Rollback Rollercoaster", "Safe rollback with dramatic screams.", "error"],
  ["Panic-to-Party", "Critical alert converted into celebration.", "celebrate"],
  ["Memory Mirage", "Leak disappeared after hydration break.", "success"],
  ["Bamboo Benchmarks", "Buddy benchmarked while snacking bamboo.", "run"],
  ["Debug Dragonfly", "Tiny dragonfly followed execution path.", "debug"],
  ["Whitespace Wave", "Code spacing flowed like ocean tide.", "idle"],
  ["Chaos Monkey Hug", "Chaos monkey got a calming hug.", "error"],
  ["Pipeline Parade XL", "CI bots marched with tiny flags.", "celebrate"],
  ["Version Vault", "Buddy locked release into safe vault.", "success"],
  ["Terminal Meteor Shower", "ASCII meteors crossed terminal sky.", "celebrate"],
  ["Silent Refactor", "Big refactor, zero drama.", "success"],
  ["Legendary Bamboo Crown", "Buddy equips the crown of shipping.", "celebrate"]
];

const funnyActions = [...classicActions, ...proActions].map((entry, index) => ({
  id: index + 1,
  title: entry[0],
  detail: entry[1],
  state: entry[2]
}));

const actionAnimationProfiles = Array.from({ length: 50 }, (_, index) => ({
  dx: `${(index % 6) * 2 + 4}px`,
  dy: `${(index % 5) * -2 - 2}px`,
  rot: `${(index % 7) * 3 + 6}deg`,
  scale: (1 + (index % 4) * 0.04).toFixed(2),
  duration: `${480 + (index % 8) * 40}ms`
}));

let currentState = "idle";
let currentCharacter = "panda";
let bambooPoints = 0;
let selectedSkin = "classic";
let successStreak = 0;
let errorStreak = 0;
let totalSuccess = 0;
let totalErrors = 0;
let currentAchievement = "Starter";
let squadMode = false;
let ambientFx = true;
let lastActionTimestamp = Date.now();
let actionIndex = 0;
let currentActionId = 0;

function getMood() {
  if (errorStreak >= 3) return "Frustrated";
  if (successStreak >= 4) return "Hyped";
  if (currentState === "debug") return "Focused";
  if (currentState === "sleep") return "Sleepy";
  if (bambooPoints >= 20) return "Legendary";
  return "Calm";
}

function unlockedSkins() {
  return skins.filter((skin) => bambooPoints >= skin.unlock);
}

function ensureSkinIsUnlocked() {
  const unlocked = unlockedSkins().map((skin) => skin.id);
  if (!unlocked.includes(selectedSkin)) {
    selectedSkin = unlocked[0];
  }
}

function rewardBamboo(points = 1) {
  bambooPoints += points;
}

function handleProgressByState() {
  if (currentState === "success") {
    successStreak += 1;
    totalSuccess += 1;
    errorStreak = 0;
    rewardBamboo(1);
  } else if (currentState === "celebrate") {
    successStreak += 1;
    totalSuccess += 1;
    errorStreak = 0;
    rewardBamboo(2);
  } else if (currentState === "error") {
    errorStreak += 1;
    totalErrors += 1;
    successStreak = 0;
  } else if (currentState === "debug") {
    errorStreak = Math.max(0, errorStreak - 1);
  } else {
    successStreak = Math.max(0, successStreak - 1);
  }
}

function updateAchievement() {
  const ctx = { bambooPoints, successStreak, totalErrors, totalSuccess };
  const lastUnlocked = achievements.filter((a) => a.rule(ctx)).at(-1);
  currentAchievement = lastUnlocked ? lastUnlocked.label : "Starter";
}

function cycleNextSkin() {
  const unlocked = unlockedSkins();
  const currentIndex = unlocked.findIndex((skin) => skin.id === selectedSkin);
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % unlocked.length : 0;
  selectedSkin = unlocked[nextIndex].id;
}

function renderSquad() {
  if (!squadMode) {
    squad.innerHTML = "";
    return;
  }

  squad.innerHTML = "";
  Object.entries(characters).forEach(([key, character]) => {
    const card = document.createElement("div");
    card.className = `mini ${character.className} ${key === currentCharacter ? "active" : ""}`;
    card.textContent = character.label;
    squad.appendChild(card);
  });
}

function render() {
  ensureSkinIsUnlocked();
  updateAchievement();

  wrap.classList.toggle("fx-on", ambientFx);
  wrap.classList.toggle("fx-off", !ambientFx);

  buddy.className = "panda";
  buddy.classList.add(characters[currentCharacter].className);
  buddy.classList.add(`skin-${selectedSkin}`);
  buddy.classList.add(stateClasses[currentState]);

  quote.textContent = quotes[currentCharacter][currentState];
  characterBadge.textContent = characters[currentCharacter].label;
  stateBadge.textContent = currentState.charAt(0).toUpperCase() + currentState.slice(1);
  moodBadge.textContent = `Mood: ${getMood()}`;
  bambooBadge.textContent = `Bamboo: ${bambooPoints}`;
  achievementBadge.textContent = `Achievement: ${currentAchievement}`;
  actionCountBadge.textContent = `Action: ${currentActionId}/${funnyActions.length}`;

  const skin = skins.find((entry) => entry.id === selectedSkin) ?? skins[0];
  skinBadge.textContent = `Skin: ${skin.label}`;

  renderSquad();
}

function setPandaState(state) {
  currentState = stateClasses[state] ? state : "idle";
  lastActionTimestamp = Date.now();
  handleProgressByState();
  render();
}

function setCharacter(character) {
  currentCharacter = characters[character] ? character : "panda";
  lastActionTimestamp = Date.now();
  render();
}

function applyActionAnimation(actionId) {
  const profile = actionAnimationProfiles[(actionId - 1) % actionAnimationProfiles.length];
  buddy.style.setProperty("--action-dx", profile.dx);
  buddy.style.setProperty("--action-dy", profile.dy);
  buddy.style.setProperty("--action-rot", profile.rot);
  buddy.style.setProperty("--action-scale", profile.scale);
  buddy.style.setProperty("--action-duration", profile.duration);

  buddy.classList.remove("panda-action-flash", "panda-action-style");
  void buddy.offsetWidth;
  buddy.classList.add("panda-action-flash", "panda-action-style");

  window.setTimeout(() => {
    buddy.classList.remove("panda-action-flash", "panda-action-style");
  }, 520);
}

function applyFunnyAction(action) {
  currentActionId = action.id;
  actionPanel.textContent = `🎭 #${action.id} ${action.title}: ${action.detail}`;
  setPandaState(action.state);
  applyActionAnimation(action.id);
}

function nextFunnyAction() {
  const action = funnyActions[actionIndex % funnyActions.length];
  actionIndex += 1;
  applyFunnyAction(action);
}

function randomFunnyAction() {
  const action = funnyActions[Math.floor(Math.random() * funnyActions.length)];
  applyFunnyAction(action);
}

function runRandomEvent() {
  const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
  if (event.type === "reward") rewardBamboo(2);
  if (event.type === "moodBoost") successStreak += 1;
  if (event.type === "skinPulse") cycleNextSkin();
  challenge.textContent = `🎲 Random Event: ${event.message}`;
}

function handleMeta(action) {
  if (action === "reward") rewardBamboo(1);
  if (action === "nextSkin") cycleNextSkin();
  if (action === "toggleSquad") squadMode = !squadMode;
  if (action === "toggleFx") ambientFx = !ambientFx;
  if (action === "randomEvent") runRandomEvent();
  if (action === "nextAction") nextFunnyAction();
  if (action === "randomAction") randomFunnyAction();

  lastActionTimestamp = Date.now();
  render();
}

function setChallenge(text) {
  challenge.textContent = `🎯 Challenge: ${text}`;
}

function initSpriteVar() {
  const sprite = window.__PANDA_SPRITE_URL__;
  if (sprite) {
    buddy.style.setProperty("--sprite-url", `url('${sprite}')`);
  }
}

window.addEventListener("message", (event) => {
  const message = event.data;
  if (message?.command === "panda") setPandaState(message.state);
  if (message?.command === "character") setCharacter(message.character);
  if (message?.command === "meta") handleMeta(message.action);
  if (message?.command === "challenge") setChallenge(message.challenge);
});

window.setInterval(() => {
  const idleForMs = Date.now() - lastActionTimestamp;
  if (idleForMs > 30000 && currentState !== "sleep") {
    setPandaState("sleep");
  }
}, 5000);

initSpriteVar();
render();
