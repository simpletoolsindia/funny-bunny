import * as vscode from "vscode";

let currentPanel: vscode.WebviewPanel | undefined;
let currentCharacter: BuddyCharacter = "panda";
let demoTimer: ReturnType<typeof setInterval> | undefined;

type PandaState = "idle" | "run" | "success" | "error" | "sleep" | "celebrate" | "debug";
type BuddyCharacter = "panda" | "bunny" | "fox";
type MetaAction =
  | "reward"
  | "nextSkin"
  | "toggleSquad"
  | "toggleFx"
  | "randomEvent"
  | "nextAction"
  | "randomAction";

const demoStates: PandaState[] = ["run", "success", "celebrate", "debug", "error", "sleep", "idle"];
const challengeOptions = [
  "Clear 3 successes in a row without an error.",
  "Switch through all 3 buddies and celebrate once.",
  "Reach 10 bamboo points in this session.",
  "Run debug -> success -> celebrate combo."
];
let demoIndex = 0;

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("pandaDevBuddy.start", () => {
      openPanel(context);
      sendCharacter(currentCharacter);
      sendState("idle");
    }),
    vscode.commands.registerCommand("pandaDevBuddy.run", () => sendState("run")),
    vscode.commands.registerCommand("pandaDevBuddy.success", () => sendState("success")),
    vscode.commands.registerCommand("pandaDevBuddy.error", () => sendState("error")),
    vscode.commands.registerCommand("pandaDevBuddy.sleep", () => sendState("sleep")),
    vscode.commands.registerCommand("pandaDevBuddy.celebrate", () => sendState("celebrate")),
    vscode.commands.registerCommand("pandaDevBuddy.debug", () => sendState("debug")),
    vscode.commands.registerCommand("pandaDevBuddy.characterPanda", () => sendCharacter("panda")),
    vscode.commands.registerCommand("pandaDevBuddy.characterBunny", () => sendCharacter("bunny")),
    vscode.commands.registerCommand("pandaDevBuddy.characterFox", () => sendCharacter("fox")),
    vscode.commands.registerCommand("pandaDevBuddy.rewardBamboo", () => sendMeta("reward")),
    vscode.commands.registerCommand("pandaDevBuddy.nextSkin", () => sendMeta("nextSkin")),
    vscode.commands.registerCommand("pandaDevBuddy.toggleSquadMode", () => sendMeta("toggleSquad")),
    vscode.commands.registerCommand("pandaDevBuddy.toggleAmbientFx", () => sendMeta("toggleFx")),
    vscode.commands.registerCommand("pandaDevBuddy.triggerRandomEvent", () => sendMeta("randomEvent")),
    vscode.commands.registerCommand("pandaDevBuddy.nextFunnyAction", () => sendMeta("nextAction")),
    vscode.commands.registerCommand("pandaDevBuddy.randomFunnyAction", () => sendMeta("randomAction")),
    vscode.commands.registerCommand("pandaDevBuddy.showDailyChallenge", showDailyChallenge),
    vscode.commands.registerCommand("pandaDevBuddy.toggleDemoMode", toggleDemoMode)
  );
}

function openPanel(context: vscode.ExtensionContext): void {
  if (currentPanel) {
    currentPanel.reveal(vscode.ViewColumn.Beside);
    return;
  }

  currentPanel = vscode.window.createWebviewPanel("pandaDevBuddy", "Panda Dev Buddy", vscode.ViewColumn.Beside, {
    enableScripts: true,
    retainContextWhenHidden: true
  });

  currentPanel.onDidDispose(() => {
    currentPanel = undefined;
    stopDemoMode();
  });

  currentPanel.webview.html = getWebviewHtml(currentPanel.webview, context.extensionUri);
}

function ensurePanel(): void {
  if (!currentPanel) {
    void vscode.commands.executeCommand("pandaDevBuddy.start");
  }
}

function sendState(state: PandaState): void {
  ensurePanel();
  currentPanel?.webview.postMessage({ command: "panda", state });
}

function sendCharacter(character: BuddyCharacter): void {
  currentCharacter = character;
  ensurePanel();
  currentPanel?.webview.postMessage({ command: "character", character });
}

function sendMeta(action: MetaAction): void {
  ensurePanel();
  currentPanel?.webview.postMessage({ command: "meta", action });
}

function showDailyChallenge(): void {
  const index = new Date().getDate() % challengeOptions.length;
  const challenge = challengeOptions[index];
  ensurePanel();
  currentPanel?.webview.postMessage({ command: "challenge", challenge });
  void vscode.window.showInformationMessage(`🎯 Panda Daily Challenge: ${challenge}`);
}

function toggleDemoMode(): void {
  if (demoTimer) {
    stopDemoMode();
    void vscode.window.showInformationMessage("🐼 Panda Dev Buddy demo mode stopped.");
    return;
  }

  ensurePanel();
  demoTimer = setInterval(() => {
    const state = demoStates[demoIndex % demoStates.length];
    demoIndex += 1;
    sendState(state);
    if (state === "success" || state === "celebrate") {
      sendMeta("reward");
    }
    if (demoIndex % 3 === 0) {
      sendMeta("randomAction");
    }
    if (demoIndex % 4 === 0) {
      sendMeta("randomEvent");
    }
  }, 1300);

  void vscode.window.showInformationMessage("🎬 Panda Dev Buddy demo mode started.");
}

function stopDemoMode(): void {
  if (!demoTimer) {
    return;
  }

  clearInterval(demoTimer);
  demoTimer = undefined;
}

function getWebviewHtml(webview: vscode.Webview, extensionUri: vscode.Uri): string {
  const cssUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "webview", "panda.css"));
  const jsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "webview", "panda.js"));
  const spriteUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "panda-sprite.png"));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="${cssUri}" />
  <title>Panda Dev Buddy</title>
</head>
<body>
  <main class="buddy-wrap" id="buddyWrap">
    <div class="status-row">
      <span id="characterBadge" class="badge">🐼 Panda</span>
      <span id="stateBadge" class="badge">Idle</span>
      <span id="moodBadge" class="badge">Mood: Calm</span>
      <span id="bambooBadge" class="badge">Bamboo: 0</span>
      <span id="skinBadge" class="badge">Skin: Classic</span>
      <span id="achievementBadge" class="badge">Achievement: Starter</span>
      <span id="actionCountBadge" class="badge">Action: 0/100</span>
    </div>
    <div id="squad" class="squad"></div>
    <div id="panda" class="panda character-panda skin-classic panda-idle" aria-label="Animated coding buddy"></div>
    <p id="quote" class="quote">🐼 Panda is chilling with bamboo vibes...</p>
    <p id="actionPanel" class="action">🎭 Funny Action: Ready to launch 100 actions (50 classic + 50 pro).</p>
    <p id="challenge" class="challenge">🎯 Challenge: Ask me with command “Show Daily Challenge”.</p>
    <p class="hint">Try commands: Next Funny Action, Random Funny Action, Toggle Squad Mode, Trigger Random Event. Now with 100 actions!</p>
  </main>

  <script>
    window.__PANDA_SPRITE_URL__ = "${spriteUri}";
  </script>
  <script src="${jsUri}"></script>
</body>
</html>`;
}

export function deactivate(): void {
  stopDemoMode();
  currentPanel?.dispose();
  currentPanel = undefined;
}
