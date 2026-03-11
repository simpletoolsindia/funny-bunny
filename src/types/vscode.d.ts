declare function setInterval(handler: (...args: unknown[]) => void, timeout?: number): { __timerBrand: "interval" };
declare function clearInterval(intervalId: { __timerBrand: "interval" }): void;

type Thenable<T> = PromiseLike<T>;

declare module "vscode" {
  export interface Disposable {
    dispose(): void;
  }

  export interface ExtensionContext {
    extensionUri: Uri;
    subscriptions: Disposable[];
  }

  export interface Webview {
    html: string;
    postMessage(message: unknown): Thenable<boolean>;
    asWebviewUri(uri: Uri): Uri;
  }

  export interface WebviewPanel {
    webview: Webview;
    reveal(column?: ViewColumn): void;
    onDidDispose(listener: () => void): Disposable;
    dispose(): void;
  }

  export enum ViewColumn {
    Beside = -2
  }

  export interface Uri {
    toString(): string;
  }

  export namespace Uri {
    function joinPath(base: Uri, ...pathSegments: string[]): Uri;
  }

  export namespace commands {
    function registerCommand(command: string, callback: (...args: unknown[]) => unknown): Disposable;
    function executeCommand(command: string, ...rest: unknown[]): Thenable<unknown>;
  }

  export namespace window {
    function createWebviewPanel(
      viewType: string,
      title: string,
      showOptions: ViewColumn,
      options?: {
        enableScripts?: boolean;
        retainContextWhenHidden?: boolean;
      }
    ): WebviewPanel;

    function showInformationMessage(message: string): Thenable<string | undefined>;
  }
}
